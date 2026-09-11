#!/usr/bin/env python3
"""
update_scholar.py: refresh data/scholar.js from the public Google Scholar profile.

    python tools/update_scholar.py            # fetch and write if the numbers changed
    python tools/update_scholar.py --dry-run  # fetch and print only

Runs daily in GitHub Actions (.github/workflows/scholar.yml) and can be run by
hand. Standard library only. If Google blocks the request or the page layout
changes, the script leaves the existing file untouched and exits 0, so the site
keeps showing the last good numbers.
"""
import argparse
import datetime
import json
import os
import re
import sys
import urllib.request

USER = "hEOInHkAAAAJ"
PROFILE = "https://scholar.google.com/citations?user=%s&hl=en" % USER
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(HERE, os.pardir, "data", "scholar.js")

HEADER = """/*
 * Google Scholar statistics shown on the first screen.
 * Written by tools/update_scholar.py (GitHub Action, daily). Do not edit by hand;
 * `updated` is the date the numbers last changed.
 */
window.SITE = window.SITE || {};

window.SITE.scholar = """


def note(level, msg):
    """Print, and in GitHub Actions also raise a visible annotation (notice/warning)."""
    print(msg)
    if os.environ.get("GITHUB_ACTIONS") == "true":
        print("::%s title=Scholar stats::%s" % (level, msg))


def fetch():
    req = urllib.request.Request(PROFILE, headers={
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                      "(KHTML, like Gecko) Chrome/126.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
    })
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", "replace")


def parse(html):
    table = [int(v) for v in re.findall(r'class="gsc_rsb_std">(\d+)<', html)]
    if len(table) < 6:
        raise ValueError("citation table not found (blocked or layout changed)")
    since = re.search(r'class="gsc_rsb_sth">Since (\d{4})<', html)

    years = [int(y) for y in re.findall(r'class="gsc_g_t"[^>]*>(\d{4})<', html)]
    counts = {i: 0 for i in range(len(years))}
    # Each bar carries z-index = (number of years - position); years with no
    # citations have no bar at all.
    for z, n in re.findall(r'class="gsc_g_a"[^>]*z-index:(\d+)[^>]*>\s*<span class="gsc_g_al">(\d+)<', html):
        pos = len(years) - int(z)
        if 0 <= pos < len(years):
            counts[pos] = int(n)
    if not years:
        raise ValueError("citation graph not found")

    return {
        "profile": PROFILE,
        "citations": table[0], "citationsSince": table[1],
        "hIndex": table[2], "hIndexSince": table[3],
        "i10Index": table[4], "i10IndexSince": table[5],
        "since": int(since.group(1)) if since else None,
        "perYear": [{"year": y, "count": counts[i]} for i, y in enumerate(years)],
    }


def read_existing():
    if not os.path.exists(OUT):
        return None
    src = open(OUT, encoding="utf-8").read()
    m = re.search(r"window\.SITE\.scholar\s*=\s*(\{.*\})\s*;?\s*$", src, re.S)
    return json.loads(m.group(1)) if m else None


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[1])
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    try:
        data = parse(fetch())
    except Exception as err:  # blocked, offline, or layout change: keep the old file
        note("warning", "Could not update Scholar stats: %s. Keeping the existing data." % err)
        return 0

    old = read_existing()
    if old:
        # Guard against a half-rendered page: citations never drop sharply.
        if data["citations"] < 0.8 * old.get("citations", 0):
            note("warning", "Suspicious drop (%s -> %s). Keeping the existing data." % (old.get("citations"), data["citations"]))
            return 0
        same = {k: v for k, v in old.items() if k != "updated"} == data
        if same:
            note("notice", "Fetched OK, no change: %d citations, h-index %d, i10-index %d." % (data["citations"], data["hIndex"], data["i10Index"]))
            return 0

    data["updated"] = datetime.date.today().isoformat()
    print(json.dumps(data, indent=2))
    if args.dry_run:
        print("Dry run: nothing written.")
        return 0
    with open(OUT, "w", encoding="utf-8", newline="\n") as fh:
        fh.write(HEADER + json.dumps(data, indent=2, ensure_ascii=False) + ";\n")
    note("notice", "Fetched OK and updated: %d citations, h-index %d, i10-index %d." % (data["citations"], data["hIndex"], data["i10Index"]))
    return 0


if __name__ == "__main__":
    sys.exit(main())
