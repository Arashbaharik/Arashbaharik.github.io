# Updating the website

Everything you normally change lives in three files in `data/`. Edit them in
any text editor, save, reload the page. There is no build step.

To preview locally, run this in the site folder and open http://localhost:8000:

```bash
python -m http.server 8000
```

(Opening `index.html` directly also works.)

## English and German

The site has an EN/DE switch in the header. Any text in the data files can be
either one string (used for both languages) or a pair:

```js
role: { en: "Postdoctoral Researcher", de: "Postdoktorand" },
```

If you only write English, the German page shows the English text. Dates are
written as `"2026-08"` (or just `"2026"`) and appear as "Aug 2026" / "Aug. 2026"
automatically. Paper titles and venues stay in their original language.

A link like `https://arashbaharik.github.io/?lang=de` opens the German version.
The button labels and section names are in `assets/js/site.js` (the `UI` list at the top).

## Add a paper

**By hand:** open `data/publications.js` and copy an existing entry:

```js
  {
    "id": "baharikordabad2027example",
    "title": "Title of the paper, may contain $\\mathcal{H}_\\infty$",
    "authors": ["A. Bahari Kordabad", "S. Soudjani"],
    "venue": "IEEE Transactions on Automatic Control",
    "year": 2027,
    "type": "journal",
    "status": null,
    "themes": ["certificates"],
    "selected": false,
    "links": { "arxiv": "https://arxiv.org/abs/2701.01234", "doi": "10.1109/TAC.2027.1234567" }
  },
```

- `id`: any unique word. It is also the BibTeX key.
- `type`: `"journal"`, `"conference"` or `"preprint"`.
- `status`: `null`, `"accepted"` or `"submitted"`.
- `themes`: any of `"stl"`, `"certificates"`, `"mpc"`, `"rl"` (see `data/research.js`).
- `selected: true` puts the paper in the "Selected" list.
- `award`: optional, e.g. `"Best Paper Award"`.
- `links`: any of `pdf`, `arxiv`, `doi` (just the DOI, no `https://doi.org/`), `publisher`, `code`.

Mind the commas between entries.

**From a BibTeX file** (Google Scholar or DBLP export):

```bash
python tools/bib2js.py path/to/publications.bib --dry-run
python tools/bib2js.py path/to/publications.bib
```

The first command only reports what would change. The second one writes
`data/publications.js`. Papers already on the site are recognised by DOI or
title and are only completed (DOI, pages, BibTeX), never overwritten. New
papers arrive with `themes: []`, so open the file afterwards and tag them.

## Add a position (Career)

In `data/profile.js`, add an entry at the top of `career:`. `to: null` means "present".

```js
    {
      from: "2027-01", to: null,
      role: { en: "Assistant Professor", de: "Juniorprofessor" },
      org: "University name", orgUrl: "https://...",
      place: { en: "City, Country", de: "Stadt, Land" },
      details: [{ en: "Topic: ...", de: "Thema: ..." }]
    },
```

## Add a talk or a photo from a talk

In `data/profile.js`, find `talks:` and add an entry at the top. The `photo`
part is optional. Save the image in `assets/img/` (about 1200 px wide, JPEG).

```js
    { date: "2026-10", title: "Talk title",
      venue: { en: "Conference, City, Country", de: "Konferenz, Stadt, Land" },
      photo: { src: "assets/img/talk-2026-city.jpg", width: 1200, height: 800,
               alt: { en: "What the photo shows", de: "Was das Foto zeigt" },
               caption: { en: "Conference, October 2026, City", de: "Konferenz, Oktober 2026, Stadt" } } },
```

## Teaching and supervision

`supervision:` and `teaching:` in `data/profile.js`, newest first. Each entry has
`when` (free text, e.g. `2021` or `since 2023`), `title`, `org` and a short `details` list.

## Collaborators

`collaborators:` in `data/profile.js`. Supervisors first with the role in
parentheses, everyone else with their current title.

## Change the photo

Replace `assets/img/photo.jpg` with a new portrait. A 4:5 crop of about 800 × 1000 px
works best. If the size changes, update `width` and `height` under `photo` in
`data/profile.js`.

## Replace or add the CV

Put the PDF in the site folder as `cv.pdf`. Then in `data/profile.js` change
`cv: null` to `cv: "cv.pdf"`. A CV link appears in the header, the first screen
and the contact section. To replace it later, just overwrite `cv.pdf`.

## Research overview figure

The figure on the first screen exists twice, one per colour theme, each painted on
that theme's page colour so it blends in:

- green theme: `assets/img/research-overview.jpg` (2000 px) and `research-overview-1000.jpg`, ground `#0B3D2E`
- light theme: `assets/img/research-overview-light.jpg` and `research-overview-light-1000.jpg`, ground `#F3F6F2`

The text that introduces the Research section is `researchOverview.caption` in `data/research.js`.

## Visitor statistics (GoatCounter)

The site can count visitors with [GoatCounter](https://www.goatcounter.com): free for personal
sites, no cookies, no IP addresses stored. Its dashboard shows visits per day, per page,
per country (location), browser and referring site.

1. Sign up at goatcounter.com and create a site; choose a code, e.g. `arashbk`.
2. In `data/profile.js` set `analytics: { goatcounter: "arashbk", publicDashboard: false }`.
3. In GoatCounter's settings tick **Allow adding visitor counts on your website**: the footer
   then shows the total, e.g. "1 234 visits".
4. Optional: make the dashboard viewable without login in GoatCounter's settings and set
   `publicDashboard: true`; the footer then links to it ("Visitor statistics").

Visits from localhost are never counted, and visitors who send Do Not Track or Global
Privacy Control are skipped. Mention GoatCounter in your privacy page.

## Google Scholar numbers

The card on the first screen (citations, h-index, i10-index, citations per year) reads
`data/scholar.js`. A Windows scheduled task on your computer, **Scholar stats update**, runs
`tools/refresh_scholar.ps1` every Monday at 10:00 (or at the next start-up if the computer was
off). It fetches your public Scholar profile and publishes the file only if the numbers changed;
it never pushes other unpublished changes. Log: `%LOCALAPPDATA%\arash-site\scholar-refresh.log`.

By hand: `python tools/update_scholar.py`, then commit and push. (Google blocks this request
from GitHub's own servers, which is why it runs on your computer.)

## Other text

- Tagline, links, career, projects, honours, collaborators, talks, slides: `data/profile.js`
- Research themes: `data/research.js`
- Awards with a certificate: `awards` in `data/profile.js`

## Publish

Commit and push to the `main` branch of `Arashbaharik.github.io`. GitHub Pages
serves the site as it is; there is nothing to build.
