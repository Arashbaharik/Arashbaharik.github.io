/*
 * Renders the page from window.SITE (see /data) and wires up the
 * interactive bits: language and theme toggles, publication filters, BibTeX.
 * Vanilla JavaScript, no dependencies, no build step.
 *
 * Two languages (en, de). Data texts are plain strings or { en, de } objects;
 * interface strings live in UI below. Switching language re-renders.
 */
(function () {
  "use strict";

  var S = window.SITE || {};
  var P = S.profile || {};
  var THEMES = S.research || [];
  var PUBS = S.publications || [];
  var root = document.documentElement;
  var lang = root.lang === "de" ? "de" : "en";

  /* ---- interface strings -------------------------------------------------- */

  var UI = {
    en: {
      skip: "Skip to content", quickLinks: "Quick links", sections: "Sections",
      publications: "Publications", contact: "Contact", cv: "CV", research: "Research",
      careerH: "Career & education", projects: "Projects", selected: "Selected",
      browseAll: "Browse all {n} publications", hideAll: "Hide full list",
      type: "Type", theme: "Theme", all: "All",
      journal: "Journal", conference: "Conference", preprint: "Preprint",
      searchLabel: "Search titles, authors and venues", searchPh: "e.g. barrier, Automatica, Zanon",
      printList: "Print list", showingAll: "Showing all {n}", showingOf: "Showing {k} of {n}",
      noMatch: "No publications match these filters.", papers: "{n} papers",
      submittedTo: "Submitted to", accepted: "accepted", vol: "vol.", no: "no.", p: "p.", pp: "pp.", art: "art.",
      copyBib: "Copy BibTeX", copied: "Copied", pressCtrlC: "Press Ctrl+C",
      related: "Related papers ({n})",
      talksH: "Talks & slides", talkPhotos: "Photos from talks", slides: "Slides",
      honoursH: "Honours & service", honours: "Honours", service: "Reviewing & teaching", collaborators: "Collaborators",
      contactLead: "For collaborations, student projects or questions about a paper, email is the best way to reach me.",
      copy: "Copy", imprint: "Imprint", privacy: "Privacy", noTrackers: "No cookies, no trackers",
      anonStats: "No cookies, anonymous statistics", visits: "{n} visits", visitorStats: "Visitor statistics",
      updated: "Updated {d}", present: "present", previously: "Previously",
      certificate: "Certificate (PDF)", openCert: "Open the certificate",
      email: "Email", mpiProfile: "MPI-SWS profile", scholar: "Google Scholar",
      themeLight: "Use light theme", themeGreen: "Use green theme",
      langOther: "Deutsch", langOtherShort: "DE", langOtherCode: "de",
      goResearch: "Research overview; go to the Research section",
      rail_career: "Career", rail_research: "Research", rail_publications: "Publications",
      rail_talks: "Talks", rail_honours: "Honours", rail_contact: "Contact"
    },
    de: {
      skip: "Zum Inhalt springen", quickLinks: "Schnellzugriff", sections: "Abschnitte",
      publications: "Publikationen", contact: "Kontakt", cv: "Lebenslauf", research: "Forschung",
      careerH: "Werdegang & Ausbildung", projects: "Projekte", selected: "Ausgewählt",
      browseAll: "Alle {n} Publikationen anzeigen", hideAll: "Vollständige Liste ausblenden",
      type: "Art", theme: "Thema", all: "Alle",
      journal: "Zeitschrift", conference: "Konferenz", preprint: "Preprint",
      searchLabel: "Titel, Autoren und Publikationsorte durchsuchen", searchPh: "z. B. Barrier, Automatica, Zanon",
      printList: "Liste drucken", showingAll: "Alle {n} angezeigt", showingOf: "{k} von {n} angezeigt",
      noMatch: "Keine Publikationen passen zu diesen Filtern.", papers: "{n} Publikationen",
      submittedTo: "Eingereicht bei", accepted: "angenommen", vol: "Bd.", no: "Nr.", p: "S.", pp: "S.", art: "Art.",
      copyBib: "BibTeX kopieren", copied: "Kopiert", pressCtrlC: "Strg+C drücken",
      related: "Zugehörige Publikationen ({n})",
      talksH: "Vorträge & Folien", talkPhotos: "Fotos von Vorträgen", slides: "Folien",
      honoursH: "Auszeichnungen & Engagement", honours: "Auszeichnungen", service: "Gutachten & Lehre", collaborators: "Kooperationspartner",
      contactLead: "Für Kooperationen, studentische Projekte oder Fragen zu einer Publikation erreichen Sie mich am besten per E-Mail.",
      copy: "Kopieren", imprint: "Impressum", privacy: "Datenschutz", noTrackers: "Keine Cookies, kein Tracking",
      anonStats: "Keine Cookies, anonyme Statistik", visits: "{n} Besuche", visitorStats: "Besucherstatistik",
      updated: "Aktualisiert: {d}", present: "heute", previously: "Zuvor",
      certificate: "Urkunde (PDF)", openCert: "Urkunde öffnen",
      email: "E-Mail", mpiProfile: "MPI-SWS-Profil", scholar: "Google Scholar",
      themeLight: "Helles Design verwenden", themeGreen: "Grünes Design verwenden",
      langOther: "English", langOtherShort: "EN", langOtherCode: "en",
      goResearch: "Forschungsüberblick; zum Abschnitt Forschung",
      rail_career: "Werdegang", rail_research: "Forschung", rail_publications: "Publikationen",
      rail_talks: "Vorträge", rail_honours: "Auszeichnungen", rail_contact: "Kontakt"
    }
  };

  var MONTHS = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    de: ["Jan.", "Feb.", "März", "Apr.", "Mai", "Juni", "Juli", "Aug.", "Sep.", "Okt.", "Nov.", "Dez."]
  };

  function t(key, vars) {
    var s = (UI[lang] && UI[lang][key]) || UI.en[key] || key;
    return vars ? s.replace(/\{(\w+)\}/g, function (_, k) { return vars[k]; }) : s;
  }

  /* A data text: plain string, or { en, de }. */
  function L(v) {
    if (v && typeof v === "object" && !Array.isArray(v) && "en" in v) return v[lang] != null ? v[lang] : v.en;
    return v;
  }

  var LINK_META = {
    scholar: { label: "scholar", icon: "scholar" },
    orcid: { label: "ORCID", icon: "orcid" },
    dblp: { label: "DBLP", icon: "dblp" },
    github: { label: "GitHub", icon: "github" },
    researchgate: { label: "ResearchGate", icon: "researchgate" },
    linkedin: { label: "LinkedIn", icon: "linkedin" },
    x: { label: "X", icon: "x" },
    mpi: { label: "mpiProfile", icon: "mpi" }
  };

  /* ---- helpers ---------------------------------------------------------- */

  function $(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function safeUrl(u) {
    return /^(https?:|mailto:|#|[\w.\/-])/i.test(u) && !/^javascript:/i.test(u) ? u : "#";
  }

  /* Escape text, then turn [label](url) into links. */
  function inline(s) {
    return esc(L(s)).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, label, url) {
      return '<a href="' + safeUrl(url) + '">' + label + "</a>";
    });
  }

  function icon(name) {
    return '<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-' + name + '"></use></svg>';
  }

  function fold(s) {
    return String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  function formatDate(d) {
    var m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?$/.exec(d || "");
    if (!m) return esc(L(d));
    var out = m[1];
    if (m[2]) out = MONTHS[lang][parseInt(m[2], 10) - 1] + " " + out;
    if (m[3]) out = parseInt(m[3], 10) + (lang === "de" ? ". " : " ") + out;
    return out;
  }

  function formatPeriod(from, to) {
    return formatDate(from) + " – " + (to ? formatDate(to) : t("present"));
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
      document.body.removeChild(ta);
      if (ok) resolve(); else reject(new Error("copy failed"));
    });
  }

  function flash(btn, msg) {
    var old = btn.textContent;
    btn.textContent = msg;
    clearTimeout(btn._t);
    btn._t = setTimeout(function () { btn.textContent = old; }, 1800);
  }

  /* ---- static labels ----------------------------------------------------- */

  function applyStatic() {
    root.lang = lang;
    [].forEach.call(document.querySelectorAll("[data-i18n]"), function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    [].forEach.call(document.querySelectorAll("[data-i18n-placeholder]"), function (el) { el.placeholder = t(el.getAttribute("data-i18n-placeholder")); });
    [].forEach.call(document.querySelectorAll("[data-i18n-aria]"), function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    [].forEach.call(document.querySelectorAll("main .stage[data-rail]"), function (s) { s.setAttribute("data-rail", t("rail_" + s.id)); });
    var lb = $("lang-toggle");
    lb.textContent = t("langOtherShort");
    lb.setAttribute("aria-label", t("langOther"));
    lb.setAttribute("lang", t("langOtherCode"));
    $("hero-figure").querySelector("a").setAttribute("aria-label", t("goResearch"));
    if (P.name && P.tagline) document.title = P.name + " · " + L(P.tagline);
    syncThemeButton();
  }

  /* ---- links (hero + contact) ------------------------------------------ */

  function linkItems(includeAll) {
    var Lk = P.links || {};
    var out = [];
    var order = ["scholar", "orcid", "dblp", "github", "researchgate", "linkedin", "x"];
    if (includeAll) order.push("mpi");
    order.forEach(function (k) {
      if (Lk[k]) out.push({ href: Lk[k], label: t(LINK_META[k].label), icon: LINK_META[k].icon });
    });
    if (P.email) out.push({ href: "mailto:" + P.email, label: t("email"), icon: "mail" });
    if (P.cv) out.push({ href: P.cv, label: t("cv"), icon: "cv" });
    return out;
  }

  function renderLinks(el, items) {
    el.innerHTML = items.map(function (it) {
      return '<li><a href="' + esc(safeUrl(it.href)) + '">' + icon(it.icon) + "<span>" + esc(it.label) + "</span></a></li>";
    }).join("");
  }

  /* ---- hero -------------------------------------------------------------- */

  function renderHero() {
    if (P.name) {
      var parts = P.name.split(" ");
      $("name").innerHTML = '<span class="given">' + esc(parts[0]) + "</span> " + esc(parts.slice(1).join(" "));
    }
    $("tagline").textContent = L(P.tagline) || "";

    var a = P.affiliation || {};
    var line = esc(L(P.position) || "");
    if (a.name) line += (line ? ", " : "") + (a.url ? '<a href="' + esc(a.url) + '">' + esc(L(a.name)) + "</a>" : esc(L(a.name)));
    if (a.place) line += "<br>" + esc(L(a.place));
    if (P.previously) line += "<br>" + t("previously") + ": " + esc(L(P.previously));
    $("affil").innerHTML = line;

    renderLinks($("hero-links"), linkItems(false));

    var img = $("portrait");
    if (P.photo && P.photo.src) {
      if (img.getAttribute("src") !== P.photo.src) img.src = P.photo.src;
      img.alt = L(P.photo.alt) || P.name || "";
      if (P.photo.width) img.width = P.photo.width;
      if (P.photo.height) img.height = P.photo.height;
    }

    var cv = $("header-cv");
    if (P.cv) { cv.href = P.cv; cv.hidden = false; }
  }

  /* ---- research --------------------------------------------------------- */

  function papersFor(themeId) {
    return PUBS.filter(function (p) { return (p.themes || []).indexOf(themeId) >= 0; }).length;
  }

  function renderResearch() {
    /* The overview figure lives in the hero; its caption introduces the Research section. */
    var ov = S.researchOverview;
    if (ov && ov.src) {
      [["ov-dark", ov.src, ov.srcSmall], ["ov-light", ov.srcLight || ov.src, ov.srcLightSmall || ov.srcSmall]].forEach(function (v) {
        var img = $(v[0]);
        if (img.getAttribute("src") !== v[1]) {
          img.src = v[1];
          if (v[2]) img.srcset = v[2] + " 1000w, " + v[1] + " 2000w"; else img.removeAttribute("srcset");
        }
        if (ov.width) { img.width = ov.width; img.height = ov.height; }
        if (ov.alt) img.alt = L(ov.alt);
      });
      $("research-intro").innerHTML = ov.caption ? inline(ov.caption) : "";
    } else {
      $("hero-figure").hidden = true;
      $("research-intro").hidden = true;
    }

    $("themes").innerHTML = THEMES.map(function (th) {
      var n = papersFor(th.id);
      return '<li class="theme">' +
        '<svg class="glyph" aria-hidden="true" focusable="false"><use href="#g-' + esc(th.glyph || "tube") + '"></use></svg>' +
        "<h3>" + esc(L(th.title)) + "</h3>" +
        "<p>" + inline(th.summary) + "</p>" +
        (n ? '<a class="related" href="#publications" data-theme="' + esc(th.id) + '">' + t("related", { n: n }) + "</a>" : "") +
        "</li>";
    }).join("");
  }

  /* ---- publications ----------------------------------------------------- */

  var aliases = (P.authorAliases || [P.name]).map(fold);
  var hasMath = PUBS.some(function (p) { return /\$[^$]+\$/.test(p.title); });
  var filter = { type: "all", theme: "all", q: "" };
  var allOpen = false;

  function titleHtml(s) {
    if (!hasMath || !window.katex) return esc(s);
    return String(s).split(/(\$[^$]+\$)/).map(function (part) {
      if (/^\$[^$]+\$$/.test(part)) {
        try { return window.katex.renderToString(part.slice(1, -1), { throwOnError: false }); }
        catch (e) { return esc(part); }
      }
      return esc(part);
    }).join("");
  }

  function authorsHtml(list) {
    return (list || []).map(function (a) {
      return aliases.indexOf(fold(a)) >= 0 ? '<span class="me">' + esc(a) + "</span>" : esc(a);
    }).join(", ");
  }

  function venueHtml(p) {
    var v = "<cite>" + esc(p.venue || "") + "</cite>";
    var extra = [];
    if (p.volume) extra.push(t("vol") + " " + esc(p.volume));
    if (p.number) extra.push(t("no") + " " + esc(p.number));
    if (p.pages) extra.push((/[-–]/.test(p.pages) ? t("pp") : t("p")) + " " + esc(p.pages));
    if (p.article) extra.push(t("art") + " " + esc(p.article));
    if (extra.length) v += ", " + extra.join(", ");
    if (p.status === "submitted") v = t("submittedTo") + " " + v;
    v += ", " + esc(p.year);
    if (p.status === "accepted") v += '<span class="status">' + t("accepted") + "</span>";
    if (p.award) v += '<span class="award">' + esc(L(p.award)) + "</span>";
    return v;
  }

  function publisherLabel(url) {
    var host = "";
    try { host = new URL(url).hostname; } catch (e) { return "Publisher"; }
    if (/ieee\.org$/.test(host)) return "IEEE Xplore";
    if (/sciencedirect\.com$/.test(host)) return "ScienceDirect";
    if (/mdpi\.com$/.test(host)) return "MDPI";
    if (/researchgate\.net$/.test(host)) return "ResearchGate";
    if (/springer\.com$/.test(host)) return "Springer";
    return lang === "de" ? "Verlag" : "Publisher";
  }

  function linksHtml(p) {
    var Lk = p.links || {};
    var items = ['<li class="kind">' + esc(t(p.type) || p.type || "") + "</li>"];
    if (Lk.pdf) items.push('<li><a href="' + esc(Lk.pdf) + '">PDF</a></li>');
    if (Lk.arxiv) items.push('<li><a href="' + esc(Lk.arxiv) + '">arXiv</a></li>');
    if (Lk.doi) items.push('<li><a href="https://doi.org/' + esc(Lk.doi) + '">DOI</a></li>');
    if (Lk.publisher) items.push('<li><a href="' + esc(Lk.publisher) + '">' + publisherLabel(Lk.publisher) + "</a></li>");
    if (Lk.code) items.push('<li><a href="' + esc(Lk.code) + '">Code</a></li>');
    items.push('<li><button class="text-button" type="button" data-bib="' + esc(p.id) + '">' + t("copyBib") + "</button></li>");
    return '<ul class="pub-links">' + items.join("") + "</ul>";
  }

  function pubHtml(p, withYear) {
    return '<li class="pub">' +
      (withYear ? '<span class="pub-year">' + esc(p.year) + "</span>" : "") +
      "<div>" +
      '<p class="pub-title" data-raw="' + esc(p.title) + '">' + titleHtml(p.title) + "</p>" +
      '<p class="pub-authors">' + authorsHtml(p.authors) + "</p>" +
      '<p class="pub-venue">' + venueHtml(p) + "</p>" +
      linksHtml(p) +
      "</div></li>";
  }

  /* BibTeX: use the stored entry if present, otherwise build one from the data. */
  function bibName(a) {
    if (/,/.test(a)) return a;
    var parts = a.trim().split(/\s+/);
    var given = [];
    while (parts.length > 1 && /^[A-Z][a-z]?\.(?:-[A-Z]\.)?$/.test(parts[0])) given.push(parts.shift());
    if (!given.length && parts.length > 1) given.push(parts.shift());
    return parts.join(" ") + (given.length ? ", " + given.join(" ") : "");
  }

  function texEscape(s) { return String(s).replace(/([&%#_])/g, "\\$1"); }

  function bibtex(p) {
    if (p.bibtex) return p.bibtex.trim();
    var type = p.type === "journal" ? "article" : p.type === "conference" ? "inproceedings" : "misc";
    var f = [];
    f.push(["title", "{" + texEscape(p.title) + "}"]);
    f.push(["author", (p.authors || []).map(bibName).join(" and ")]);
    if (type === "article") f.push(["journal", texEscape(p.venue || "")]);
    if (type === "inproceedings") f.push(["booktitle", texEscape(p.venue || "")]);
    if (p.volume) f.push(["volume", p.volume]);
    if (p.number) f.push(["number", p.number]);
    if (p.pages || p.article) f.push(["pages", p.pages || p.article]);
    f.push(["year", String(p.year)]);
    var Lk = p.links || {};
    if (Lk.doi) f.push(["doi", Lk.doi]);
    var arx = Lk.arxiv && /arxiv\.org\/(?:abs|pdf)\/([^?#\s]+)/.exec(Lk.arxiv);
    if (arx) { f.push(["eprint", arx[1].replace(/\.pdf$/, "")]); f.push(["archivePrefix", "arXiv"]); }
    if (p.status === "submitted") f.push(["note", "Submitted to " + texEscape(p.venue || "")]);
    if (p.status === "accepted") f.push(["note", "Accepted for publication"]);
    var url = Lk.publisher || Lk.arxiv || Lk.pdf;
    if (url && !Lk.doi) f.push(["url", url]);
    return "@" + type + "{" + p.id + ",\n" + f.map(function (kv) {
      return "  " + kv[0] + " = {" + kv[1] + "}";
    }).join(",\n") + "\n}";
  }

  function onBibClick(e) {
    var btn = e.target.closest("button[data-bib]");
    if (!btn) return;
    var id = btn.getAttribute("data-bib");
    var p = PUBS.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var text = bibtex(p);
    copyText(text).then(function () {
      flash(btn, t("copied"));
    }, function () {
      /* Clipboard unavailable: show the entry so it can be copied by hand. */
      var holder = btn.closest(".pub");
      if (holder && !holder.querySelector("pre")) {
        var pre = document.createElement("pre");
        pre.className = "bib";
        pre.textContent = text;
        holder.querySelector("div").appendChild(pre);
      }
    });
  }

  function chip(name, value, label, count, checked) {
    return '<label class="chip"><input type="radio" name="' + name + '" value="' + esc(value) + '"' + (checked ? " checked" : "") + ">" +
      "<span>" + esc(label) + (count != null ? " " + count : "") + "</span></label>";
  }

  function renderPubControls() {
    var counts = { journal: 0, conference: 0, preprint: 0 };
    PUBS.forEach(function (p) { if (counts[p.type] != null) counts[p.type]++; });
    $("type-chips").innerHTML =
      chip("ptype", "all", t("all"), PUBS.length, filter.type === "all") +
      ["journal", "conference", "preprint"].filter(function (k) { return counts[k]; }).map(function (k) {
        return chip("ptype", k, t(k), counts[k], filter.type === k);
      }).join("");
    $("theme-chips").innerHTML =
      chip("ptheme", "all", t("all"), null, filter.theme === "all") +
      THEMES.map(function (th) { return chip("ptheme", th.id, L(th.short) || L(th.title), null, filter.theme === th.id); }).join("");
  }

  function matches(p) {
    if (filter.type !== "all" && p.type !== filter.type) return false;
    if (filter.theme !== "all" && (p.themes || []).indexOf(filter.theme) < 0) return false;
    if (filter.q) {
      var hay = fold([p.title, (p.authors || []).join(" "), p.venue, p.year].join(" "));
      var terms = fold(filter.q).split(/\s+/).filter(Boolean);
      for (var i = 0; i < terms.length; i++) if (hay.indexOf(terms[i]) < 0) return false;
    }
    return true;
  }

  function renderAllPubs() {
    var list = PUBS.filter(matches);
    var byYear = {};
    list.forEach(function (p) { (byYear[p.year] = byYear[p.year] || []).push(p); });
    var years = Object.keys(byYear).sort(function (a, b) { return b - a; });
    $("pub-all").innerHTML = years.length ? years.map(function (y) {
      return '<section class="year-group" aria-label="' + esc(y) + '"><h3>' + esc(y) + "</h3>" +
        '<ol class="pub-list">' + byYear[y].map(function (p) { return pubHtml(p, false); }).join("") + "</ol></section>";
    }).join("") : '<p class="empty">' + t("noMatch") + "</p>";
    $("pub-result").textContent = list.length === PUBS.length
      ? t("showingAll", { n: PUBS.length })
      : t("showingOf", { k: list.length, n: PUBS.length });
  }

  function setChecked(name, value) {
    var el = document.querySelector('input[name="' + name + '"][value="' + value + '"]');
    if (el) el.checked = true;
  }

  function syncAllPubsToggle() {
    $("all-pubs-body").hidden = !allOpen;
    var btn = $("all-pubs-toggle");
    btn.setAttribute("aria-expanded", String(allOpen));
    btn.textContent = allOpen ? t("hideAll") : t("browseAll", { n: PUBS.length });
  }

  function toggleAllPubs(open) {
    allOpen = open;
    syncAllPubsToggle();
    document.dispatchEvent(new CustomEvent("layoutchange"));
  }

  function showAllPubs(state) {
    filter.type = state.type; filter.theme = state.theme; filter.q = state.q;
    setChecked("ptype", filter.type);
    setChecked("ptheme", filter.theme);
    $("pub-search").value = filter.q;
    renderAllPubs();
    toggleAllPubs(true);
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $("pub-controls").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  function renderPublications() {
    var selected = PUBS.filter(function (p) { return p.selected; });
    selected.sort(function (a, b) { return b.year - a.year; });
    $("pub-selected").innerHTML = selected.map(function (p) { return pubHtml(p, true); }).join("");
    $("pub-count").textContent = t("papers", { n: PUBS.length });
    renderPubControls();
    renderAllPubs();
    syncAllPubsToggle();
  }

  function loadKatex() {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "assets/vendor/katex/katex.min.css";
    document.head.appendChild(css);
    var js = document.createElement("script");
    js.src = "assets/vendor/katex/katex.min.js";
    js.onload = function () {
      [].forEach.call(document.querySelectorAll(".pub-title[data-raw]"), function (el) {
        el.innerHTML = titleHtml(el.getAttribute("data-raw"));
      });
    };
    document.head.appendChild(js);
  }

  /* ---- career, talks, honours ------------------------------------------ */

  function figureHtml(ph) {
    if (!ph) return "";
    return '<figure class="photo"><img src="' + esc(ph.src) + '" alt="' + esc(L(ph.alt) || "") + '" loading="lazy" decoding="async"' +
      (ph.width ? ' width="' + ph.width + '" height="' + ph.height + '"' : "") + ">" +
      (ph.caption ? "<figcaption>" + esc(L(ph.caption)) + "</figcaption>" : "") + "</figure>";
  }

  function renderCareer() {
    $("career-list").innerHTML = (P.career || []).map(function (c) {
      var org = L(c.org);
      var body =
        "<div><h3>" + esc(L(c.role)) + "</h3>" +
        '<p class="org">' + (c.orgUrl ? '<a href="' + esc(c.orgUrl) + '">' + esc(org) + "</a>" : esc(org)) + "</p>" +
        '<span class="place">' + esc(L(c.place) || "") + "</span>" +
        (c.details && c.details.length ? '<ul class="details">' + c.details.map(function (d) { return "<li>" + inline(d) + "</li>"; }).join("") + "</ul>" : "") +
        "</div>";
      if (c.photo) body = '<div class="with-photo">' + body + figureHtml(c.photo) + "</div>";
      var when = c.from ? formatPeriod(c.from, c.to) : esc(L(c.period));
      return '<li><span class="when">' + when + "</span>" + body + "</li>";
    }).join("");

    $("project-list").innerHTML = (P.projects || []).map(function (p) {
      var name = p.url ? '<a href="' + esc(p.url) + '">' + esc(L(p.name)) + "</a>" : esc(L(p.name));
      return "<div><dt>" + name + '<span class="when">' + esc(p.period || "") + "</span></dt><dd>" + inline(p.text || "") + "</dd></div>";
    }).join("");
  }

  function renderTalks() {
    var talks = P.talks || [];
    $("talk-list").innerHTML = talks.map(function (tk) {
      var when = tk.date ? formatDate(tk.date) : esc(L(tk.year));
      return '<li><span class="when">' + when + "</span><p>" +
        (tk.title ? '<span class="talk-title">' + inline(tk.title) + "</span>" + '<span class="talk-venue">' + inline(tk.venue) + "</span>"
                  : '<span class="talk-title">' + inline(tk.venue) + "</span>") +
        "</p></li>";
    }).join("");
    $("talk-gallery").innerHTML = talks.filter(function (tk) { return tk.photo; }).map(function (tk) {
      return "<li>" + figureHtml(tk.photo) + "</li>";
    }).join("");

    var slides = P.slides || [];
    $("slide-list").innerHTML = slides.map(function (s) {
      return '<li><a href="' + esc(safeUrl(s.url)) + '">' + esc(L(s.title)) + '</a><span class="kind">' + esc(L(s.kind) || "") + "</span></li>";
    }).join("");
    $("slide-list").previousElementSibling.hidden = !slides.length;
  }

  function renderHonours() {
    $("awards").innerHTML = (P.awards || []).map(function (a) {
      var img = a.image
        ? '<a class="award-cert" href="' + esc(a.pdf || a.image.src) + '" aria-label="' + esc(t("openCert")) + '">' +
          '<img src="' + esc(a.image.src) + '" alt="' + esc(L(a.image.alt) || "") + '" loading="lazy" decoding="async"' +
          (a.image.width ? ' width="' + a.image.width + '" height="' + a.image.height + '"' : "") + "></a>"
        : "";
      return '<article class="award-block">' + img + "<div>" +
        '<p class="award-meta"><time datetime="' + esc(a.date) + '">' + formatDate(a.date) + "</time>" + (a.by ? " · " + esc(L(a.by)) : "") + "</p>" +
        "<h3>" + esc(L(a.title)) + "</h3>" +
        "<p>" + inline(a.text || "") + "</p>" +
        (a.pdf ? '<p class="award-link"><a href="' + esc(a.pdf) + '">' + t("certificate") + "</a></p>" : "") +
        "</div></article>";
    }).join("");

    $("honour-list").innerHTML = (P.honours || []).map(function (h) { return "<li>" + inline(h) + "</li>"; }).join("");
    $("service-list").innerHTML = (P.service || []).map(function (h) { return "<li>" + inline(h) + "</li>"; }).join("");
    $("people-list").innerHTML = (P.collaborators || []).map(function (c) {
      var n = c.url ? '<a href="' + esc(c.url) + '">' + esc(c.name) + "</a>" : esc(c.name);
      return "<li>" + n + '<span class="note">' + esc(L(c.note) || "") + "</span></li>";
    }).join("");
  }

  /* ---- contact, footer -------------------------------------------------- */

  function renderContact() {
    if (P.email) {
      var a = $("email");
      a.href = "mailto:" + P.email;
      a.textContent = P.email;
    }
    $("office").innerHTML = (P.office || []).map(function (l) { return esc(L(l)); }).join("<br>");
    renderLinks($("contact-links"), linkItems(true));

    var legal = P.legal || {};
    if (legal.imprint) $("imprint").href = legal.imprint; else $("imprint").hidden = true;
    if (legal.privacy) $("privacy").href = legal.privacy; else $("privacy").hidden = true;
    $("updated").textContent = P.updated ? t("updated", { d: formatDate(P.updated) }) : "";
    $("year").textContent = String(new Date().getFullYear());
    renderStats();
  }

  /* ---- visitor statistics (GoatCounter, optional) ----------------------- */

  var stats = { base: null, count: null };

  function renderStats() {
    $("privacy-note").textContent = stats.base ? t("anonStats") : t("noTrackers");
    var el = $("stats");
    var A = P.analytics || {};
    var parts = [];
    if (stats.count) parts.push(esc(t("visits", { n: stats.count })));
    if (stats.base && A.publicDashboard) parts.push('<a href="' + esc(stats.base) + '/">' + t("visitorStats") + "</a>");
    el.innerHTML = parts.join(" · ");
    el.hidden = !parts.length;
  }

  /* Counting is cookie-free and skips localhost; visitors who send
     Do Not Track or Global Privacy Control are not counted. */
  function initAnalytics() {
    var code = (P.analytics || {}).goatcounter;
    /* Either a GoatCounter code ("arashbk") or a full https:// address (custom domain). */
    var base = /^[a-z0-9-]+$/i.test(code || "") ? "https://" + code + ".goatcounter.com"
             : /^https:\/\/[\w.-]+\/?$/.test(code || "") ? code.replace(/\/$/, "") : null;
    if (!base) return;
    stats.base = base;
    var optOut = navigator.doNotTrack === "1" || window.doNotTrack === "1" || navigator.globalPrivacyControl === true;
    if (!optOut) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "assets/vendor/goatcounter/count.js";
      s.setAttribute("data-goatcounter", base + "/count");
      document.body.appendChild(s);
    }
    /* Needs "Allow adding visitor counts on your website" in GoatCounter's settings. */
    if (window.fetch) {
      fetch(base + "/counter/TOTAL.json")
        .then(function (r) { return r.ok ? r.json() : null; })
        .then(function (d) {
          /* Show the total only once there is something to show. */
          if (d && d.count && /[1-9]/.test(String(d.count))) { stats.count = String(d.count).replace(/\s/g, "\u202f"); renderStats(); }
        })
        .catch(function () {});
    }
    renderStats();
  }

  /* ---- theme and language ---------------------------------------------- */

  function syncThemeButton() {
    var light = root.getAttribute("data-theme") === "light";
    var btn = $("theme-toggle");
    btn.setAttribute("aria-pressed", String(light));
    btn.setAttribute("aria-label", light ? t("themeGreen") : t("themeLight"));
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", light ? "#F3F6F2" : "#0B3D2E");
  }

  function renderAll() {
    applyStatic();
    renderHero();
    renderCareer();
    renderResearch();
    renderPublications();
    renderTalks();
    renderHonours();
    renderContact();
  }

  function setLang(next) {
    lang = next;
    try { localStorage.setItem("lang", next); } catch (e) {}
    if (/[?&]lang=/.test(location.search)) {
      history.replaceState(null, "", location.pathname + "?lang=" + next + location.hash);
    }
    renderAll();
    document.dispatchEvent(new CustomEvent("langchange"));
    document.dispatchEvent(new CustomEvent("layoutchange"));
  }

  /* ---- listeners (attached once) ---------------------------------------- */

  function initOnce() {
    $("theme-toggle").addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "green" : "light";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
      syncThemeButton();
      document.dispatchEvent(new CustomEvent("themechange"));
    });

    $("lang-toggle").addEventListener("click", function () { setLang(lang === "de" ? "en" : "de"); });

    $("themes").addEventListener("click", function (e) {
      var a = e.target.closest("a[data-theme]");
      if (!a) return;
      e.preventDefault();
      showAllPubs({ theme: a.getAttribute("data-theme"), type: "all", q: "" });
    });

    $("pub-controls").addEventListener("change", function (e) {
      if (e.target.name === "ptype") filter.type = e.target.value;
      if (e.target.name === "ptheme") filter.theme = e.target.value;
      renderAllPubs();
    });
    var timer;
    $("pub-search").addEventListener("input", function (e) {
      clearTimeout(timer);
      var v = e.target.value;
      timer = setTimeout(function () { filter.q = v; renderAllPubs(); }, 120);
    });
    $("all-pubs-toggle").addEventListener("click", function () { toggleAllPubs(!allOpen); });
    $("publications").addEventListener("click", onBibClick);
    $("print-pubs").addEventListener("click", function () {
      document.body.classList.add("print-pubs");
      window.print();
    });
    window.addEventListener("afterprint", function () { document.body.classList.remove("print-pubs"); });

    $("copy-email").addEventListener("click", function () {
      var btn = this;
      copyText(P.email || "").then(function () { flash(btn, t("copied")); }, function () { flash(btn, t("pressCtrlC")); });
    });

    var header = $("site-header");
    var scrolled = false;
    function onScroll() {
      var s = window.scrollY > 8;
      if (s !== scrolled) { header.classList.toggle("is-scrolled", s); scrolled = s; }
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---- go --------------------------------------------------------------- */

  renderAll();
  initOnce();
  initAnalytics();
  if (hasMath) loadKatex();

  /* Re-apply a deep link now that the content exists. */
  if (location.hash && location.hash.length > 1) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
})();
