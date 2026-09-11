/*
 * Profile: who you are, how to reach you, your career path.
 * Edit the values below; the page re-renders from this file.
 * A value of null hides that item on the page.
 *
 * Two languages: any text can be a plain string (same in English and German)
 * or { en: "...", de: "..." }. Dates are "YYYY-MM" or "YYYY" and are
 * written out in the reader's language automatically.
 */
window.SITE = window.SITE || {};

window.SITE.profile = {
  name: "Arash Bahari Kordabad",
  // Every spelling of your name that appears in author lists gets emphasized.
  authorAliases: ["A. Bahari Kordabad", "Arash Bahari Kordabad", "A. B. Kordabad", "Bahari Kordabad, A.", "Bahari Kordabad, Arash"],

  position: { en: "Postdoctoral Researcher", de: "Postdoktorand" },
  affiliation: {
    name: { en: "Max Planck Institute for Software Systems", de: "Max-Planck-Institut für Softwaresysteme" },
    short: "MPI-SWS",
    url: "https://www.mpi-sws.org/",
    place: { en: "Kaiserslautern, Germany", de: "Kaiserslautern, Deutschland" }
  },
  // TODO: confirm how you want NTNU listed (shown under your affiliation in the hero).
  previously: { en: "PhD, NTNU Trondheim", de: "Promotion an der NTNU Trondheim" },

  tagline: {
    en: "Guarantees for Uncertain Systems under Complex Tasks",
    de: "Garantien für unsichere Systeme bei komplexen Aufgaben"
  },

  photo: {
    src: "assets/img/photo.jpg",
    alt: { en: "Portrait of Arash Bahari Kordabad", de: "Porträt von Arash Bahari Kordabad" },
    width: 800,
    height: 1000
  },

  // Put your CV in the site root as cv.pdf, then change null to "cv.pdf".
  cv: null, // TODO

  email: "arashbk@mpi-sws.org",
  office: [
    { en: "Room 515, Building G 26", de: "Raum 515, Gebäude G 26" },
    "Paul-Ehrlich-Straße 26",
    { en: "67663 Kaiserslautern, Germany", de: "67663 Kaiserslautern, Deutschland" }
  ],

  // Links shown as icons in the hero and the contact section, in this order.
  links: {
    scholar: "https://scholar.google.com/citations?user=hEOInHkAAAAJ&hl=en",
    orcid: null,   // TODO: e.g. "https://orcid.org/0000-0000-0000-0000"
    dblp: null,    // TODO: e.g. "https://dblp.org/pid/xxx/xxxx.html"
    github: null,  // TODO: e.g. "https://github.com/Arashbaharik"
    researchgate: "https://www.researchgate.net/profile/Arash-Bahari-Kordabad",
    linkedin: "https://www.linkedin.com/in/arash-bahari/",
    x: "https://twitter.com/kordabad",
    mpi: "https://www.mpi-sws.org/people/arashbk"
  },

  // Visitor statistics with GoatCounter (goatcounter.com): no cookies, no IP addresses
  // stored; its dashboard shows visits by country, browser, referrer and page.
  // 1. Create a free site on goatcounter.com and choose a code, e.g. "arashbk".
  // 2. Put the code below. Counting starts as soon as the site is online.
  // 3. In GoatCounter's settings enable "Allow adding visitor counts on your website"
  //    to show the total in the footer, and make the dashboard public if you want the
  //    footer link "Visitor statistics" to open it (then set publicDashboard: true).
  analytics: {
    goatcounter: "arashbk", // dashboard: https://arashbk.goatcounter.com
    publicDashboard: true
  },

  // Imprint and privacy pages. German law expects an imprint for most personal sites.
  legal: {
    imprint: "imprint.html",
    privacy: "privacy.html"  // mentions GitHub Pages hosting and GoatCounter; update it if you add services
  },

  // Positions and education, newest first. `to: null` means "present".
  career: [
    {
      from: "2023-05", to: null,
      role: { en: "Postdoctoral Research Fellow", de: "Postdoktorand" },
      org: { en: "Max Planck Institute for Software Systems", de: "Max-Planck-Institut für Softwaresysteme" },
      orgUrl: "https://people.mpi-sws.org/~arashbk/",
      place: { en: "Kaiserslautern, Germany", de: "Kaiserslautern, Deutschland" },
      details: [
        { en: "Topic: multi-agent awareness and control with temporal logic specifications",
          de: "Thema: Wahrnehmung und Regelung von Multiagentensystemen mit Spezifikationen in temporaler Logik" },
        { en: "Supervisor: [Prof. Sadegh Soudjani](https://hycodev.com/ssoudjani)",
          de: "Betreuer: [Prof. Sadegh Soudjani](https://hycodev.com/ssoudjani)" },
        { en: "Projects: [SymAware](https://www.symaware.eu/) (EIC, May 2023 – Sep 2025); Auto-CyPheR (ERC, Sep 2025 – Sep 2027)",
          de: "Projekte: [SymAware](https://www.symaware.eu/) (EIC, Mai 2023 – Sep. 2025); Auto-CyPheR (ERC, Sep. 2025 – Sep. 2027)" }
      ]
    },
    {
      from: "2021-11", to: "2022-08",
      role: { en: "Visiting PhD Researcher", de: "Gastdoktorand" },
      org: "Aalborg University, Department of Electronic Systems",
      orgUrl: "https://vbn.aau.dk/da/activities/arash-bahari-kordabad",
      place: { en: "Aalborg, Denmark", de: "Aalborg, Dänemark" },
      details: [
        { en: "Research topic: safe reinforcement learning", de: "Forschungsthema: sicheres Reinforcement Learning" },
        { en: "Host: [Prof. Rafal Wisniewski](https://vbn.aau.dk/da/persons/raf)", de: "Gastgeber: [Prof. Rafal Wisniewski](https://vbn.aau.dk/da/persons/raf)" }
      ],
      photo: { src: "assets/img/aau-visit-2022.jpg", width: 800, height: 603,
        alt: { en: "Arash with a colleague in an office at Aalborg University", de: "Arash mit einem Kollegen in einem Büro der Aalborg University" },
        caption: { en: "Visiting Aalborg University, June 2022", de: "Forschungsaufenthalt an der Aalborg University, Juni 2022" } }
    },
    {
      from: "2020-02", to: "2023-04",
      role: { en: "PhD, Engineering Cybernetics", de: "Promotion, Technische Kybernetik" },
      org: "Norwegian University of Science and Technology (NTNU)",
      orgUrl: "https://www.ntnu.edu/itk",
      place: { en: "Trondheim, Norway", de: "Trondheim, Norwegen" },
      details: [
        { en: "Thesis: “Theoretical properties of learning-based MPC” ([NTNU Open](https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3062609))",
          de: "Dissertation: „Theoretical properties of learning-based MPC“ ([NTNU Open](https://ntnuopen.ntnu.no/ntnu-xmlui/handle/11250/3062609))" },
        { en: "Supervisor: [Prof. Sébastien Gros](https://www.ntnu.edu/employees/sebastien.gros); co-supervisor: [Prof. Anastasios Lekkas](https://www.ntnu.edu/employees/anastasios.lekkas)",
          de: "Betreuer: [Prof. Sébastien Gros](https://www.ntnu.edu/employees/sebastien.gros); Zweitbetreuer: [Prof. Anastasios Lekkas](https://www.ntnu.edu/employees/anastasios.lekkas)" },
        { en: "Committee: Prof. Ole Morten Aamo, Prof. Lars Grüne, Prof. Rolf Findeisen",
          de: "Prüfungskommission: Prof. Ole Morten Aamo, Prof. Lars Grüne, Prof. Rolf Findeisen" }
      ],
      photo: { src: "assets/img/phd-defence-2023.jpg", width: 960, height: 401,
        alt: { en: "Arash with the PhD committee and supervisors after the defence at NTNU", de: "Arash mit Prüfungskommission und Betreuern nach der Verteidigung an der NTNU" },
        caption: { en: "PhD defence, March 2023, Trondheim", de: "Verteidigung der Dissertation, März 2023, Trondheim" } }
    },
    {
      from: "2017-09", to: "2019-09",
      role: { en: "MSc, Mechanical Engineering", de: "M.Sc., Maschinenbau" },
      org: "Sharif University of Technology",
      orgUrl: null, // TODO: the old department link (mech.sharif.ir/home) returns 404
      place: { en: "Tehran, Iran", de: "Teheran, Iran" },
      details: [
        { en: "Thesis: “Control of bifurcation and chatter suppression in peripheral milling process”",
          de: "Masterarbeit: „Control of bifurcation and chatter suppression in peripheral milling process“" },
        { en: "Supervisor: [Prof. Hamed Moradi](https://mech.sharif.ir/~hamedmoradi/)", de: "Betreuer: [Prof. Hamed Moradi](https://mech.sharif.ir/~hamedmoradi/)" },
        { en: "GPA 19.41 / 20", de: "Notendurchschnitt 19,41 / 20" }
      ],
      photo: { src: "assets/img/msc-defence-2019.jpg", width: 800, height: 599,
        alt: { en: "Arash presenting his MSc thesis in a seminar room", de: "Arash präsentiert seine Masterarbeit in einem Seminarraum" },
        caption: { en: "MSc defence, July 2019, Tehran", de: "Verteidigung der Masterarbeit, Juli 2019, Teheran" } }
    },
    {
      from: "2013-09", to: "2017-09",
      role: { en: "BSc, Mechanical Engineering", de: "B.Sc., Maschinenbau" },
      org: "University of Tabriz",
      orgUrl: "https://mechanic.tabrizu.ac.ir/en",
      place: { en: "Tabriz, Iran", de: "Täbris, Iran" },
      details: [
        { en: "Thesis: “On the muscle models as viscoelastic material and comparison of force-length models for active skeletal muscle”",
          de: "Bachelorarbeit: „On the muscle models as viscoelastic material and comparison of force-length models for active skeletal muscle“" },
        { en: "Supervisor: Prof. Kamal Jahani", de: "Betreuer: Prof. Kamal Jahani" }, // TODO: the old profile link did not load; add a working one if you have it
        { en: "GPA 18.1 / 20", de: "Notendurchschnitt 18,1 / 20" }
      ]
    }
  ],

  projects: [
    { name: "Auto-CyPheR", period: "2025 – 2027", url: null,
      text: { en: "Funded by the European Research Council (ERC).", de: "Gefördert vom Europäischen Forschungsrat (ERC)." } },
    { name: "SymAware", period: "2023 – 2025", url: "https://www.symaware.eu/",
      text: { en: "A framework for awareness in multi-agent systems, funded by the European Innovation Council. Partners: MPI-SWS, KTH, Uppsala University, Eindhoven University of Technology, [Netherlands Aerospace Centre (NLR)](https://www.nlr.org/) and [Siemens Digital Industries Software](https://plm.sw.siemens.com/en-US/).",
              de: "Ein Rahmenwerk für Wahrnehmung (Awareness) in Multiagentensystemen, gefördert vom Europäischen Innovationsrat (EIC). Partner: MPI-SWS, KTH, Uppsala University, Eindhoven University of Technology, [Netherlands Aerospace Centre (NLR)](https://www.nlr.org/) und [Siemens Digital Industries Software](https://plm.sw.siemens.com/en-US/)." } },
    { name: "SARLEM", period: "2020 – 2023", url: null,
      text: { en: "“Safe Reinforcement Learning using Model Predictive Control”, the PhD project at NTNU (project no. UV988962100), supported by the Research Council of Norway (grant NFR 300172) with [DNV GL](https://www.dnv.com/) and [Kongsberg Maritime](https://www.kongsberg.com/maritime/).",
              de: "„Safe Reinforcement Learning using Model Predictive Control“, das Promotionsprojekt an der NTNU (Projekt-Nr. UV988962100), gefördert vom Norwegischen Forschungsrat (Förderkennzeichen NFR 300172) unter Beteiligung von [DNV GL](https://www.dnv.com/) und [Kongsberg Maritime](https://www.kongsberg.com/maritime/)." } },
    { name: { en: "Milling chatter", de: "Ratterschwingungen beim Fräsen" }, period: "2017 – 2019", url: null,
      text: { en: "MSc project in Tehran on controlling and reducing milling-process vibration, partially funded by a machinery company.",
              de: "Masterprojekt in Teheran zur Regelung und Reduktion von Schwingungen beim Fräsen, teilweise finanziert von einem Maschinenbauunternehmen." } }
  ],

  honours: [
    { en: "First rank in Dynamics and Control (GPA 19.41 / 20) and third among all mechanical engineering students, Sharif University of Technology, 2018.",
      de: "Erster Rang in Dynamik und Regelung (Notendurchschnitt 19,41 / 20) und Dritter unter allen Maschinenbaustudierenden, Sharif University of Technology, 2018." },
    { en: "Selected among the top 40 mechanical engineering students nationwide for the Iranian scientific Olympiad for university students, 2017.",
      de: "Unter den landesweit 40 besten Maschinenbaustudierenden für die iranische Wissenschaftsolympiade der Studierenden ausgewählt, 2017." },
    { en: "Ranked fifth of 99 students in the BSc programme in mechanical engineering, University of Tabriz, 2017.",
      de: "Fünfter von 99 Studierenden im Bachelorstudiengang Maschinenbau, University of Tabriz, 2017." },
    { en: "Top 0.25 % (rank 669 of over 250,000) in the [national university entrance exam](https://en.wikipedia.org/wiki/Iranian_University_Entrance_Exam), 2013.",
      de: "Unter den besten 0,25 % (Rang 669 von über 250.000) in der [nationalen Hochschulaufnahmeprüfung](https://en.wikipedia.org/wiki/Iranian_University_Entrance_Exam), 2013." },
    { en: "Honorary diploma, [International Mathematics Tournament of Towns](https://www.turgor.ru/en/), 2013.",
      de: "Ehrendiplom beim [International Mathematics Tournament of Towns](https://www.turgor.ru/en/), 2013." }
  ],

  service: [
    { en: "Reviewer for ACC, ECC, CDC and NMPC, and for journals including [ISA Transactions](Certificate_ISATRA_Recognised.pdf) and [Engineering Applications of Artificial Intelligence](Certificate_EAAI_Recognised.pdf).",
      de: "Gutachter für ACC, ECC, CDC und NMPC sowie für Zeitschriften wie [ISA Transactions](Certificate_ISATRA_Recognised.pdf) und [Engineering Applications of Artificial Intelligence](Certificate_EAAI_Recognised.pdf)." }
  ],

  // "Teaching & supervision" section. Newest first; `when` is free text.
  supervision: [
    {
      when: { en: "since 2023", de: "seit 2023" },
      title: { en: "Research interns", de: "Forschungspraktikanten" },
      org: { en: "Max Planck Institute for Software Systems", de: "Max-Planck-Institut für Softwaresysteme" },
      details: [
        { en: "Two six-month internships: [Andrea Da Col](https://www.linkedin.com/in/andrea-da-col-059792223/), now a PhD student at KTH, and Amirreza Valaei.",
          de: "Zwei sechsmonatige Praktika: [Andrea Da Col](https://www.linkedin.com/in/andrea-da-col-059792223/), heute Doktorand an der KTH, und Amirreza Valaei." },
        { en: "Joint papers: [Robust MPC for Aircraft Intent-Aware Collision Avoidance](https://arxiv.org/abs/2408.06999) and [Second-Order Policy Gradient Methods for the LQR](https://arxiv.org/abs/2511.02095).",
          de: "Gemeinsame Publikationen: [Robust MPC for Aircraft Intent-Aware Collision Avoidance](https://arxiv.org/abs/2408.06999) und [Second-Order Policy Gradient Methods for the LQR](https://arxiv.org/abs/2511.02095)." }
      ]
    }
  ],

  teaching: [
    {
      when: "2022",
      title: { en: "Textbook on reinforcement learning", de: "Lehrbuch zu Reinforcement Learning" },
      org: { en: "NTNU, PhD course Topics in Systems and Control Theory (TK8111)", de: "NTNU, Doktorandenkurs Topics in Systems and Control Theory (TK8111)" },
      details: [
        { en: "Concise textbook for the self-study course, from foundations to recent advances; evaluated by a committee.",
          de: "Kompaktes Lehrbuch für den Selbststudienkurs, von den Grundlagen bis zu aktuellen Entwicklungen; von einer Kommission begutachtet." }
      ]
    },
    {
      when: "2021",
      title: { en: "Course section: Stability of Perturbed Systems", de: "Kursabschnitt: Stabilität gestörter Systeme" },
      org: { en: "NTNU, PhD course Advanced Nonlinear Systems (TK8103)", de: "NTNU, Doktorandenkurs Advanced Nonlinear Systems (TK8103)" },
      details: [
        { en: "Taught this part of the course with slides, illustrations and handwritten proofs.",
          de: "Diesen Teil des Kurses mit Folien, Illustrationen und handschriftlichen Beweisen unterrichtet." }
      ]
    },
    {
      when: "2017 – 2019",
      title: { en: "Teaching assistant", de: "Lehrassistent" },
      org: "Sharif University of Technology",
      details: [
        { en: "Mechanical Vibrations (2019) and Automatic Control", de: "Mechanische Schwingungen (2019) und Regelungstechnik" }
      ]
    },
    {
      when: "2017 – 2019",
      title: { en: "High-school mathematics teacher and coordinator", de: "Mathematiklehrer und Koordinator (Oberstufe)" },
      org: { en: "[Kanoon Farhangi Amoozesh](https://en.wikipedia.org/wiki/Kanoon_Farhangi_Amoozesh), Tehran", de: "[Kanoon Farhangi Amoozesh](https://en.wikipedia.org/wiki/Kanoon_Farhangi_Amoozesh), Teheran" },
      details: [ { en: "Four semesters", de: "Vier Semester" } ]
    },
    {
      when: "2015 – 2017",
      title: { en: "High-school mathematics teacher", de: "Mathematiklehrer (Oberstufe)" },
      org: { en: "SAYERI Private Educational Institution, Tabriz", de: "SAYERI Private Educational Institution, Täbris" },
      details: [ { en: "Four semesters", de: "Vier Semester" } ]
    },
    {
      when: "2014 – 2016",
      title: { en: "Teaching assistant", de: "Lehrassistent" },
      org: "University of Tabriz",
      details: [
        { en: "Calculus I and II, Ordinary Differential Equations, Engineering Mathematics",
          de: "Analysis I und II, gewöhnliche Differentialgleichungen, Ingenieurmathematik" }
      ]
    }
  ],

  // Supervisors first, marked in parentheses; everyone else with their current title.
  collaborators: [
    { name: "Sébastien Gros", url: "https://www.ntnu.edu/employees/sebastien.gros",
      note: { en: "Professor and Head of the Department of Engineering Cybernetics, NTNU (PhD supervisor)",
              de: "Professor und Leiter des Department of Engineering Cybernetics, NTNU (Doktorvater)" } },
    { name: "Anastasios Lekkas", url: "https://www.ntnu.edu/employees/anastasios.lekkas",
      note: { en: "Associate Professor, NTNU (PhD co-supervisor)", de: "Associate Professor, NTNU (Zweitbetreuer der Promotion)" } },
    { name: "Sadegh Soudjani", url: "https://hycodev.com/ssoudjani",
      note: { en: "Chair in Cyber-Physical Systems, University of Birmingham, and Senior Research Group Leader, MPI-SWS (Postdoc supervisor)",
              de: "Lehrstuhl für Cyber-Physical Systems, University of Birmingham, und Senior Research Group Leader, MPI-SWS (Postdoc-Betreuer)" } },
    { name: "Rupak Majumdar", url: "https://people.mpi-sws.org/~rupak/",
      note: { en: "Scientific Director, MPI-SWS", de: "Wissenschaftlicher Direktor, MPI-SWS" } },
    { name: "Anne-Kathrin Schmuck", url: "https://wp.mpi-sws.org/akschmuck/",
      note: { en: "Tenure-track Faculty, MPI-SWS", de: "Tenure-Track-Faculty, MPI-SWS" } },
    { name: "Dimos Dimarogonas", url: "https://people.kth.se/~dimos/",
      note: { en: "Professor and Head of the Division of Decision and Control Systems, KTH",
              de: "Professor und Leiter der Abteilung Decision and Control Systems, KTH" } },
    { name: "Mario Zanon", url: "https://mariozanon.wordpress.com/",
      note: { en: "Full Professor, IMT School for Advanced Studies Lucca", de: "Ordentlicher Professor, IMT School for Advanced Studies Lucca" } },
    { name: "Rafal Wisniewski", url: "https://vbn.aau.dk/da/persons/raf",
      note: { en: "Professor, Aalborg University", de: "Professor, Aalborg University" } },
    { name: "Lars Lindemann", url: "https://control.ee.ethz.ch/people/profile.lars-lindemann.html",
      note: { en: "Assistant Professor, ETH Zürich", de: "Assistenzprofessor, ETH Zürich" } },
    { name: "Sybert Stroeve", url: "https://www.researchgate.net/profile/Sybert-Stroeve",
      note: { en: "Senior Scientist, Royal Netherlands Aerospace Centre (NLR)", de: "Senior Scientist, Royal Netherlands Aerospace Centre (NLR)" } },
    { name: "Hossein Nejatbakhsh Esfahani", url: "https://scholar.google.com/citations?user=DPSPuH4AAAAJ&hl=en",
      note: { en: "Postdoctoral Fellow, Clemson University", de: "Postdoc, Clemson University" } },
    { name: "Wenqi Cai", url: null, // TODO: add the institution and a working profile link (the old Scholar link returns 404)
      note: { en: "Postdoctoral Researcher", de: "Postdoc" } }
  ],

  // Featured awards, shown with their certificate at the top of "Honours & service".
  awards: [
    {
      title: "Engineering Applications of Artificial Intelligence Paper Prize Award 2026",
      date: "2026-08",
      by: { en: "Elsevier and the International Federation of Automatic Control (IFAC)", de: "Elsevier und die International Federation of Automatic Control (IFAC)" },
      text: {
        en: "Awarded to Wenqi Cai, Arash Bahari Kordabad and Sébastien Gros for the article [“Energy management in residential microgrid using model predictive control-based reinforcement learning and Shapley value”](https://doi.org/10.1016/j.engappai.2022.105793), Engineering Applications of Artificial Intelligence, vol. 119, March 2023, article 105793.",
        de: "Verliehen an Wenqi Cai, Arash Bahari Kordabad und Sébastien Gros für den Artikel [„Energy management in residential microgrid using model predictive control-based reinforcement learning and Shapley value“](https://doi.org/10.1016/j.engappai.2022.105793), Engineering Applications of Artificial Intelligence, Bd. 119, März 2023, Artikel 105793."
      },
      image: { src: "assets/img/award-eaai-2026.jpg", width: 1200, height: 848,
        alt: { en: "Certificate of the Engineering Applications of Artificial Intelligence Paper Prize Award 2026, from Elsevier and IFAC, awarded to Wenqi Cai, Arash Bahari Kordabad and Sébastien Gros",
               de: "Urkunde des Engineering Applications of Artificial Intelligence Paper Prize Award 2026 von Elsevier und IFAC für Wenqi Cai, Arash Bahari Kordabad und Sébastien Gros" } },
      pdf: "assets/docs/eaai-paper-prize-2026.pdf"
    }
  ],

  // Talks, newest first. `photo` is optional and appears in the gallery below the list.
  // title: null lists only the venue (use it when the talk title is not public yet).
  talks: [
    { date: "2026-08", title: null, // TODO: add the talk title
      venue: { en: "23rd IFAC World Congress, BEXCO, Busan, Korea", de: "23. IFAC-Weltkongress, BEXCO, Busan, Südkorea" },
      photo: { src: "assets/img/talk-ifac-2026.jpg", width: 1200, height: 800,
        alt: { en: "Arash speaking at the lectern of the 23rd IFAC World Congress in Busan", de: "Arash spricht am Rednerpult des 23. IFAC-Weltkongresses in Busan" },
        caption: { en: "IFAC World Congress, August 2026, Busan", de: "IFAC-Weltkongress, August 2026, Busan" } } },
    { date: "2026-07", title: "Quasi-Newton Compatible Actor-Critic for Deterministic Policies",
      venue: { en: "European Control Conference (ECC), Reykjavík, Iceland", de: "European Control Conference (ECC), Reykjavík, Island" },
      photo: { src: "assets/img/talk-ecc-2026.jpg", width: 1200, height: 900,
        alt: { en: "Arash presenting a slide comparing first-order policy gradient with second-order quasi-Newton updates", de: "Arash präsentiert eine Folie, die Policy-Gradient-Verfahren erster Ordnung mit Quasi-Newton-Verfahren zweiter Ordnung vergleicht" },
        caption: { en: "ECC, July 2026, Reykjavík", de: "ECC, Juli 2026, Reykjavík" } } },
    { date: "2025-12", title: "Intent-Aware MPC for Aircraft Detect-and-Avoid with Response Delay: A Comparative Study with ACAS Xu",
      venue: { en: "SESAR Innovation Days, Bled, Slovenia", de: "SESAR Innovation Days, Bled, Slowenien" },
      photo: { src: "assets/img/talk-sids-2025.jpg", width: 1200, height: 900,
        alt: { en: "Arash presenting at a lectern in front of a slide about aircraft intent and predicted trajectories", de: "Arash am Rednerpult vor einer Folie über Flugabsichten und vorhergesagte Trajektorien" },
        caption: { en: "SESAR Innovation Days, December 2025, Bled", de: "SESAR Innovation Days, Dezember 2025, Bled" } } },
    { date: "2025-06", title: "Robust Model Predictive Control for Aircraft Intent-Aware Collision Avoidance",
      venue: { en: "European Control Conference (ECC), Thessaloniki, Greece", de: "European Control Conference (ECC), Thessaloniki, Griechenland" },
      photo: { src: "assets/img/ecc-2025.jpg", width: 1200, height: 646,
        alt: { en: "Arash standing beside the ECC 2025 banner with the sea behind him", de: "Arash neben dem Banner der ECC 2025, im Hintergrund das Meer" },
        caption: { en: "ECC, June 2025, Thessaloniki", de: "ECC, Juni 2025, Thessaloniki" } } },
    { date: "2024", title: "Distributionally Robust Control for Chance-Constrained Signal Temporal Logic Specifications",
      venue: { en: "IEEE Conference on Decision and Control (CDC), Milan, Italy", de: "IEEE Conference on Decision and Control (CDC), Mailand, Italien" } },
    { date: "2023-07", title: "Reinforcement Learning for MPC: Fundamentals and Current Challenges",
      venue: { en: "IFAC World Congress, Yokohama, Japan. Invited session “Recent Advances in Automated Learning and Calibration of MPC Policies”, 75+ attendees",
               de: "IFAC-Weltkongress, Yokohama, Japan. Eingeladene Session „Recent Advances in Automated Learning and Calibration of MPC Policies“, über 75 Teilnehmende" },
      photo: { src: "assets/img/talk-ifac-2023.jpg", width: 800, height: 450,
        alt: { en: "Arash giving a talk in a full conference hall at IFAC 2023", de: "Arash hält einen Vortrag in einem vollen Konferenzsaal beim IFAC-Weltkongress 2023" },
        caption: { en: "IFAC World Congress, July 2023, Yokohama", de: "IFAC-Weltkongress, Juli 2023, Yokohama" } } },
    { date: "2023-03", title: "Introduction to Optimization with Temporal Logic",
      venue: { en: "NTNU, Trondheim, Norway", de: "NTNU, Trondheim, Norwegen" } },
    { date: "2023-02", title: "Intersection of Reinforcement Learning and MPC",
      venue: { en: "Eindhoven University of Technology, Netherlands. Host: Prof. Dinesh Krishnamoorthy", de: "Eindhoven University of Technology, Niederlande. Gastgeber: Prof. Dinesh Krishnamoorthy" } }
  ],

  // Slide decks hosted on OneDrive.
  slides: [
    { title: "Control Barrier Functions for Stochastic Systems under Signal Temporal Logic Tasks",
      kind: { en: "Research", de: "Forschung" }, url: "https://1drv.ms/p/s!AmLAwer5vhiGqDiAOwi8uH9pcXqf?e=8FfTtt" },
    { title: { en: "Theoretical Properties of Learning-based Model Predictive Control (PhD defence)", de: "Theoretical Properties of Learning-based Model Predictive Control (Verteidigung der Dissertation)" },
      kind: { en: "Research", de: "Forschung" }, url: "https://1drv.ms/p/s!AmLAwer5vhiGqmUEwgzN7Yvj8Wwu?e=C0YWZV" },
    { title: "Systemkarakteristikker for første- og andreordens systemer i frekvens- og tidsdomenet",
      kind: { en: "Teaching, in Norwegian", de: "Lehre, auf Norwegisch" }, url: "https://1drv.ms/p/s!AmLAwer5vhiGqDKnDJG0665Y1TTD?e=IHSSmW" },
    { title: "Stabiliteten til diskrete systemer",
      kind: { en: "Teaching, in Norwegian", de: "Lehre, auf Norwegisch" }, url: "https://1drv.ms/p/s!AmLAwer5vhiGqDQUf0TBeXMjUoCO?e=C8N3IE" }
  ],

  updated: "2026-09-11"
};
