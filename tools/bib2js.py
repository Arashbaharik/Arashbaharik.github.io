#!/usr/bin/env python3
"""
bib2js.py: merge a BibTeX file into data/publications.js.

    python tools/bib2js.py path/to/publications.bib            # merge and write
    python tools/bib2js.py path/to/publications.bib --dry-run  # only report

Standard library only. What it does:
  * parses @article, @inproceedings, @misc, ... (with @string macros,
    nested braces, quoted values and # concatenation);
  * converts LaTeX accents and symbols to Unicode (\\'e -> é, {\\"o} -> ö,
    \\v{s} -> š, \\ss -> ß, -- -> –) and removes grouping braces, but keeps
    inline math such as $\\mathcal{H}_\\infty$ for KaTeX;
  * writes authors as initials plus surname ("A. Bahari Kordabad"), the style
    used on the site (use --full-names to keep first names);
  * merges without duplicates: an entry matches an existing paper by DOI,
    otherwise by normalized title. A match only fills in missing fields
    (DOI, arXiv, pages, raw BibTeX, ...); your hand edits, themes and
    `selected` flags are never overwritten. New papers are appended with
    themes: [] and selected: false, ready for you to tag.

Comments inside the publications list are not preserved (keep notes in the
file header, which is kept as is).
"""
import argparse
import json
import os
import re
import sys
import unicodedata

HERE = os.path.dirname(os.path.abspath(__file__))
DEFAULT_OUT = os.path.join(HERE, os.pardir, "data", "publications.js")

KEY_ORDER = ["id", "title", "authors", "venue", "volume", "number", "pages", "article",
             "year", "type", "status", "award", "themes", "selected", "links", "bibtex"]

DEFAULT_HEADER = """/*
 * Publications. One object per paper. Generated/merged by tools/bib2js.py;
 * safe to edit by hand.
 */
window.SITE = window.SITE || {};

"""

# --------------------------------------------------------------------------
# BibTeX parsing
# --------------------------------------------------------------------------

MONTHS = {m: m for m in ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"]}


def _read_braced(s, i):
    """s[i] == '{'; return (content, index after closing brace)."""
    depth, j = 0, i
    while j < len(s):
        c = s[j]
        if c == "\\":
            j += 2
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return s[i + 1:j], j + 1
        j += 1
    raise ValueError("unbalanced braces near: " + s[i:i + 60])


def _read_quoted(s, i):
    """s[i] == '"'; quotes inside braces do not terminate."""
    depth, j = 0, i + 1
    while j < len(s):
        c = s[j]
        if c == "\\":
            j += 2
            continue
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        elif c == '"' and depth == 0:
            return s[i + 1:j], j + 1
        j += 1
    raise ValueError("unterminated quoted value")


def _read_value(s, i, macros):
    parts = []
    while True:
        while i < len(s) and s[i].isspace():
            i += 1
        if i >= len(s):
            break
        c = s[i]
        if c == "{":
            v, i = _read_braced(s, i)
            parts.append(v)
        elif c == '"':
            v, i = _read_quoted(s, i)
            parts.append(v)
        else:
            m = re.match(r"[^\s,#}]+", s[i:])
            tok = m.group(0) if m else ""
            i += len(tok)
            parts.append(macros.get(tok.lower(), MONTHS.get(tok.lower(), tok)))
        while i < len(s) and s[i].isspace():
            i += 1
        if i < len(s) and s[i] == "#":
            i += 1
            continue
        break
    return "".join(parts), i


def parse_bibtex(text):
    macros, entries = {}, []
    i = 0
    while True:
        at = text.find("@", i)
        if at < 0:
            break
        m = re.match(r"@\s*([A-Za-z]+)\s*([{(])", text[at:])
        if not m:
            i = at + 1
            continue
        kind = m.group(1).lower()
        open_ch = m.group(2)
        start = at + m.end() - 1
        if open_ch == "{":
            body, end = _read_braced(text, start)
        else:
            end = text.find(")", start)
            body = text[start + 1:end]
            end += 1
        raw = text[at:end]
        i = end
        if kind in ("comment", "preamble"):
            continue
        if kind == "string":
            k, _, v = body.partition("=")
            val, _ = _read_value(v, 0, macros)
            macros[k.strip().lower()] = val
            continue
        key, _, rest = body.partition(",")
        fields, j = {}, 0
        while j < len(rest):
            fm = re.match(r"\s*([A-Za-z][\w:.+-]*)\s*=\s*", rest[j:])
            if not fm:
                j += 1
                continue
            name = fm.group(1).lower()
            j += fm.end()
            val, j = _read_value(rest, j, macros)
            fields[name] = val.strip()
            while j < len(rest) and rest[j] in " \t\r\n,":
                j += 1
        entries.append({"type": kind, "key": key.strip(), "fields": fields, "raw": raw.strip()})
    return entries


# --------------------------------------------------------------------------
# LaTeX -> Unicode
# --------------------------------------------------------------------------

ACCENTS = {
    "'": "\u0301", "`": "\u0300", "^": "\u0302", '"': "\u0308", "~": "\u0303",
    "=": "\u0304", ".": "\u0307", "u": "\u0306", "v": "\u030C", "H": "\u030B",
    "c": "\u0327", "k": "\u0328", "r": "\u030A", "d": "\u0323", "b": "\u0331",
}
SYMBOLS = {
    "ss": "ß", "o": "ø", "O": "Ø", "aa": "å", "AA": "Å", "ae": "æ", "AE": "Æ",
    "oe": "œ", "OE": "Œ", "l": "ł", "L": "Ł", "i": "ı", "j": "ȷ",
    "&": "&", "%": "%", "$": "$", "_": "_", "#": "#", "{": "{", "}": "}",
    "textendash": "–", "textemdash": "—", "textquoteright": "’", "textquoteleft": "‘",
    "S": "§", "P": "¶", "dag": "†", "ddag": "‡", "copyright": "©", "pounds": "£",
}
TEXT_WRAPPERS = r"(?:emph|textit|textbf|textsc|textrm|textsf|texttt|mathrm|text|textup|textnormal|mbox|url)"


def latex_to_unicode(s):
    if not s:
        return s
    # Protect inline math: $...$ stays as is for KaTeX.
    pieces = re.split(r"(\$[^$]*\$)", s)
    out = []
    for p in pieces:
        if p.startswith("$") and p.endswith("$") and len(p) > 1:
            out.append(p)
            continue
        out.append(_text_to_unicode(p))
    return re.sub(r"\s+", " ", "".join(out)).strip()


def _text_to_unicode(s):
    # accent commands: \'e  \'{e}  {\'e}  \'{\i}  \v{s}
    def accent(m):
        cmd, arg = m.group(1), m.group(2) or m.group(3) or ""
        arg = arg.strip("{}")
        if arg in ("\\i", "i") and cmd != "c":
            arg = "i"
        if arg.startswith("\\") and arg[1:] in SYMBOLS:
            arg = SYMBOLS[arg[1:]]
        return unicodedata.normalize("NFC", (arg[:1] + ACCENTS[cmd] + arg[1:])) if arg else ""
    s = re.sub(r"\\([`'^\"~=.])\s*(?:\{([^{}]*)\}|(\\?[A-Za-z]))", accent, s)
    s = re.sub(r"\\([uvHckrdb])(?:\s*\{([^{}]*)\}|\s+(\\?[A-Za-z]))", accent, s)
    # symbols like \ss, \o, \&
    s = re.sub(r"\\([A-Za-z]+)\b\s?(?:\{\})?", lambda m: SYMBOLS.get(m.group(1), m.group(0)), s)
    s = re.sub(r"\\([&%$_#{}])", lambda m: SYMBOLS[m.group(1)], s)
    # \emph{x} -> x
    while re.search(r"\\" + TEXT_WRAPPERS + r"\s*\{", s):
        s = re.sub(r"\\" + TEXT_WRAPPERS + r"\s*\{([^{}]*)\}", r"\1", s)
    s = s.replace("---", "—").replace("--", "–").replace("``", "“").replace("''", "”")
    s = s.replace("~", " ")
    return s.replace("{", "").replace("}", "")


# --------------------------------------------------------------------------
# Fields -> site entry
# --------------------------------------------------------------------------

def split_authors(s):
    parts, depth, cur, i = [], 0, "", 0
    while i < len(s):
        c = s[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
        if depth == 0 and s[i:i + 5].lower() == " and ":
            parts.append(cur)
            cur, i = "", i + 5
            continue
        cur += c
        i += 1
    parts.append(cur)
    return [p.strip() for p in parts if p.strip() and p.strip().lower() != "others"]


def format_author(raw, full_names):
    name = latex_to_unicode(raw)
    if "," in name:
        last, _, first = name.partition(",")
        last, first = last.strip(), first.strip()
    else:
        toks = name.split()
        # keep lowercase particles (van, de, von) with the surname
        k = len(toks) - 1
        while k > 0 and toks[k - 1][:1].islower():
            k -= 1
        first, last = " ".join(toks[:k]), " ".join(toks[k:])
    if full_names or not first:
        return (first + " " + last).strip()

    def initial(tok):
        if re.fullmatch(r"[A-Z]\.?(?:-[A-Z]\.?)?", tok):
            return tok if tok.endswith(".") else tok + "."
        return "-".join(part[:1].upper() + "." for part in tok.split("-") if part)
    return " ".join(initial(t) for t in first.split()) + " " + last


def norm_title(t):
    t = latex_to_unicode(t or "")
    t = re.sub(r"\$[^$]*\$", "", t)
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]", "", t)


def norm_doi(d):
    d = (d or "").strip()
    d = re.sub(r"^(https?://)?(dx\.)?doi\.org/", "", d, flags=re.I)
    return d.lower()


ARXIV_RE = re.compile(r"(?:arxiv[:\s/]*|arxiv\.org/(?:abs|pdf)/)(\d{4}\.\d{4,5})", re.I)


def to_entry(e, full_names, aliases):
    f = e["fields"]
    title = latex_to_unicode(f.get("title", ""))
    journal = latex_to_unicode(f.get("journal", "") or f.get("journaltitle", ""))
    booktitle = latex_to_unicode(f.get("booktitle", ""))
    kind = e["type"]

    arxiv = None
    if f.get("eprint") and (f.get("archiveprefix", "").lower() == "arxiv" or re.fullmatch(r"\d{4}\.\d{4,5}(v\d+)?", f["eprint"])):
        arxiv = re.sub(r"v\d+$", "", f["eprint"])
    for src in (journal, f.get("url", ""), f.get("note", ""), f.get("howpublished", "")):
        if not arxiv:
            m = ARXIV_RE.search(src or "")
            if m:
                arxiv = m.group(1)

    if kind == "article" and not re.search(r"arxiv|preprint", journal, re.I):
        etype, venue = "journal", journal
    elif kind in ("inproceedings", "conference", "proceedings", "incollection"):
        etype, venue = "conference", booktitle or journal
    else:
        etype = "preprint"
        venue = "arXiv" if arxiv or re.search(r"arxiv", journal, re.I) else (journal or booktitle or latex_to_unicode(f.get("howpublished", "")))

    authors = [format_author(a, full_names) for a in split_authors(f.get("author", ""))]
    authors = [aliases.get(a, a) for a in authors]

    year = f.get("year", "")
    m = re.search(r"\d{4}", year or f.get("date", ""))
    year = int(m.group(0)) if m else None

    links = {}
    doi = norm_doi(f.get("doi"))
    if doi:
        links["doi"] = f.get("doi").strip().split("doi.org/")[-1]
    if arxiv:
        links["arxiv"] = "https://arxiv.org/abs/" + arxiv
    url = f.get("url", "").strip()
    if url and "arxiv.org" not in url and "doi.org" not in url:
        links["pdf" if url.lower().endswith(".pdf") else "publisher"] = url

    entry = {
        "id": re.sub(r"[^\w:.-]", "", e["key"]) or norm_title(title)[:30],
        "title": title,
        "authors": authors,
        "venue": venue,
        "year": year,
        "type": etype,
        "status": None,
        "themes": [],
        "selected": False,
        "links": links,
        "bibtex": e["raw"],
    }
    for k in ("volume", "number"):
        if f.get(k):
            entry[k] = latex_to_unicode(f[k])
    if f.get("pages"):
        entry["pages"] = latex_to_unicode(f["pages"]).replace("-", "–").replace("––", "–")
    return entry


# --------------------------------------------------------------------------
# Reading and writing publications.js
# --------------------------------------------------------------------------

def js_literal_to_json(src):
    """Tolerant JS object-literal -> JSON: strips comments and trailing
    commas, quotes bare keys, converts single-quoted strings."""
    segments, code, i, n = [], [], 0, len(src)   # segments: (is_string, text)

    def flush():
        if code:
            segments.append((False, "".join(code)))
            del code[:]

    while i < n:
        c = src[i]
        if c in "\"'":
            q, j, buf = c, i + 1, []
            while j < n and src[j] != q:
                if src[j] == "\\" and j + 1 < n:
                    buf.append(src[j:j + 2])
                    j += 2
                    continue
                buf.append(src[j])
                j += 1
            s = "".join(buf)
            if q == "'":
                s = s.replace('\\"', '"').replace('"', '\\"').replace("\\'", "'")
            flush()
            segments.append((True, '"' + s + '"'))
            i = j + 1
        elif src.startswith("//", i):
            i = src.find("\n", i)
            i = n if i < 0 else i
        elif src.startswith("/*", i):
            i = src.find("*/", i) + 2
        else:
            code.append(c)
            i += 1
    flush()
    # Quote bare keys only in code; a key always directly follows { or , in code.
    out = []
    for is_str, text in segments:
        if not is_str:
            text = re.sub(r"(^|[{,])(\s*)([A-Za-z_]\w*)(\s*):", r'\1\2"\3"\4:', text)
        out.append(text)
    return _strip_trailing_commas("".join(out))


def _strip_trailing_commas(s):
    """Drop a comma that is followed only by whitespace and } or ], outside strings."""
    out, i, n, in_str = [], 0, len(s), False
    while i < n:
        c = s[i]
        if in_str:
            out.append(c)
            if c == "\\" and i + 1 < n:
                out.append(s[i + 1])
                i += 2
                continue
            if c == '"':
                in_str = False
        elif c == '"':
            in_str = True
            out.append(c)
        elif c == ",":
            j = i + 1
            while j < n and s[j] in " \t\r\n":
                j += 1
            if j < n and s[j] in "}]":
                i += 1
                continue
            out.append(c)
        else:
            out.append(c)
        i += 1
    return "".join(out)


def read_existing(path):
    if not os.path.exists(path):
        return DEFAULT_HEADER, []
    src = open(path, encoding="utf-8").read()
    m = re.search(r"window\.SITE\.publications\s*=\s*", src)
    if not m:
        sys.exit("Could not find 'window.SITE.publications =' in " + path)
    header = src[:m.start()]
    body = src[m.end():].strip()
    body = body[:body.rfind("]") + 1]
    try:
        return header, json.loads(js_literal_to_json(body))
    except json.JSONDecodeError as err:
        sys.exit("Could not parse %s (%s). Fix the syntax and try again." % (path, err))


def dump_entry(p):
    keys = [k for k in KEY_ORDER if k in p] + [k for k in p if k not in KEY_ORDER]
    lines = []
    for k in keys:
        v = p[k]
        if isinstance(v, dict):
            txt = "{ " + ", ".join("%s: %s" % (json.dumps(a), json.dumps(b, ensure_ascii=False)) for a, b in v.items()) + " }" if v else "{}"
        else:
            txt = json.dumps(v, ensure_ascii=False)
        lines.append("    %s: %s" % (json.dumps(k), txt))
    return "  {\n" + ",\n".join(lines) + "\n  }"


def write_js(path, header, pubs):
    text = header.rstrip() + "\n\nwindow.SITE.publications = [\n" + ",\n".join(dump_entry(p) for p in pubs) + "\n];\n"
    with open(path, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(text)


def merge(existing, incoming):
    by_doi = {norm_doi((p.get("links") or {}).get("doi")): p for p in existing if (p.get("links") or {}).get("doi")}
    by_title = {norm_title(p.get("title")): p for p in existing}
    ids = {p.get("id") for p in existing}
    added, updated = [], []
    for e in incoming:
        doi = norm_doi(e["links"].get("doi"))
        target = by_doi.get(doi) if doi else None
        if target is None:
            target = by_title.get(norm_title(e["title"]))
        if target is None:
            base, k = e["id"], 2
            while e["id"] in ids:
                e["id"] = "%s-%d" % (base, k)
                k += 1
            ids.add(e["id"])
            existing.append(e)
            by_title[norm_title(e["title"])] = e
            if doi:
                by_doi[doi] = e
            added.append(e)
            continue
        changed = False
        links = target.setdefault("links", {})
        for k, v in e["links"].items():
            if v and not links.get(k):
                links[k] = v
                changed = True
        for k in ("volume", "number", "pages", "bibtex"):
            if e.get(k) and not target.get(k):
                target[k] = e[k]
                changed = True
        if changed:
            updated.append(target)
    existing.sort(key=lambda p: -(p.get("year") or 0))  # stable: keeps order within a year
    return added, updated


def main():
    ap = argparse.ArgumentParser(description="Merge a BibTeX file into data/publications.js")
    ap.add_argument("bib", help="BibTeX file, e.g. a Google Scholar or DBLP export")
    ap.add_argument("--out", default=DEFAULT_OUT, help="publications.js to update (default: data/publications.js)")
    ap.add_argument("--dry-run", action="store_true", help="report what would change without writing")
    ap.add_argument("--full-names", action="store_true", help="keep full first names instead of initials")
    ap.add_argument("--alias", action="append", default=[], metavar="FROM=TO",
                    help='rewrite an author name, e.g. --alias "A. B. Kordabad=A. Bahari Kordabad"')
    args = ap.parse_args()

    aliases = {"A. B. Kordabad": "A. Bahari Kordabad"}
    for a in args.alias:
        k, _, v = a.partition("=")
        aliases[k.strip()] = v.strip()

    with open(args.bib, encoding="utf-8-sig") as fh:
        entries = parse_bibtex(fh.read())
    incoming = [to_entry(e, args.full_names, aliases) for e in entries if e["fields"].get("title")]
    header, existing = read_existing(os.path.abspath(args.out))
    added, updated = merge(existing, incoming)

    print("Read %d BibTeX entries from %s" % (len(incoming), args.bib))
    print("  added:     %d" % len(added))
    for p in added:
        print("    + %s (%s)" % (p["title"], p.get("year")))
    print("  updated:   %d (missing fields filled in)" % len(updated))
    for p in updated:
        print("    ~ %s" % p["title"])
    print("  unchanged: %d" % (len(incoming) - len(added) - len(updated)))
    if args.dry_run:
        print("Dry run: nothing written.")
        return
    write_js(os.path.abspath(args.out), header, existing)
    print("Wrote %s" % os.path.normpath(args.out))
    if added:
        print("Next: open the file and set `themes` (and `selected`) for the new papers.")


if __name__ == "__main__":
    main()
