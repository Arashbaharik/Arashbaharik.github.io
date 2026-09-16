/*
 * Publications. One object per paper; the order here does not matter
 * (the page groups by year, newest first).
 *
 *   type:     "journal" | "conference" | "preprint"
 *   status:   null | "accepted" | "submitted"
 *   themes:   ids from research.js: "stl", "certificates", "mpc", "rl"
 *   selected: true shows the paper under "Selected publications"
 *   volume, number, pages, article: optional strings (article = article number)
 *   award:    optional, e.g. "Best Paper Award"; shown next to the venue
 *   links:    any of pdf, arxiv, doi (bare DOI "10.1109/...", or a publisher URL if none exists), publisher, code
 *   bibtex:   optional raw BibTeX; if missing, the "BibTeX" button builds one
 *
 * Titles may contain inline LaTeX between $...$ (rendered with KaTeX).
 * tools/bib2js.py rewrites this file when importing a .bib, so keep
 * notes in this header rather than inside the list.
 */
window.SITE = window.SITE || {};

window.SITE.publications = [
  {
    "id": "baharikordabad2026context",
    "title": "Context-Triggered Robust MPC for Temporal Logic Specifications",
    "authors": ["A. Bahari Kordabad", "S. P. Nayak", "S. Soudjani", "A.-K. Schmuck"],
    "venue": "Nonlinear Analysis: Hybrid Systems",
    "year": 2026,
    "type": "preprint",
    "status": "submitted",
    "themes": ["stl", "mpc"],
    "selected": false,
    "links": { "arxiv": "https://arxiv.org/abs/2607.01515" }
  },
  {
    "id": "vlahakis2026multiagent",
    "title": "Multi-Agent Temporal Logic Planning via Penalty Functions and Block-Coordinate Optimization",
    "authors": ["E. E. Vlahakis", "A. Bahari Kordabad", "L. Lindemann", "P. Sopasakis", "S. Soudjani", "D. V. Dimarogonas"],
    "venue": "IEEE Control Systems Letters",
    "year": 2026,
    "type": "journal",
    "status": null,
    "themes": ["stl"],
    "selected": false,
    "links": { "doi": "10.1109/lcsys.2026.3699405", "arxiv": "https://arxiv.org/abs/2602.17434" }
  },
  {
    "id": "baharikordabad2026continuous",
    "title": "Almost Sure Reachability in Continuous-time Stochastic Systems",
    "authors": ["A. Bahari Kordabad", "R. Majumdar", "S. Soudjani"],
    "venue": "Automatica",
    "year": 2026,
    "type": "preprint",
    "status": "submitted",
    "themes": ["certificates"],
    "selected": false,
    "links": { "arxiv": "https://arxiv.org/abs/2605.03595" }
  },
  {
    "id": "nejatbakhsh2026maritime",
    "title": "Advanced Control Strategies for Autonomous Maritime Systems",
    "authors": ["H. Nejatbakhsh Esfahani", "A. Bahari Kordabad", "D. Moreno-Salinas"],
    "venue": "Journal of Marine Science and Engineering",
    "volume": "14",
    "number": "3",
    "pages": "315",
    "year": 2026,
    "type": "journal",
    "status": null,
    "themes": ["mpc"],
    "selected": false,
    "links": { "doi": "10.3390/jmse14030315" }
  },
  {
    "id": "baharikordabad2026quasinewton",
    "title": "Quasi-Newton Compatible Actor-Critic for Deterministic Policies",
    "authors": ["A. Bahari Kordabad", "D. Brandner", "S. Gros", "S. Lucia", "S. Soudjani"],
    "venue": "European Control Conference (ECC)",
    "year": 2026,
    "type": "conference",
    "status": null,
    "themes": ["rl"],
    "selected": false,
    "links": { "doi": "https://ieeexplore.ieee.org/document/11625359", "arxiv": "https://arxiv.org/abs/2511.09509" }
  },
  {
    "id": "valaei2025secondorder",
    "title": "Second-Order Policy Gradient Methods for the Linear Quadratic Regulator",
    "authors": ["A. Valaei", "A. Bahari Kordabad", "S. Soudjani"],
    "venue": "Engineering Applications of Artificial Intelligence",
    "year": 2026,
    "type": "journal",
    "status": "accepted",
    "themes": ["rl"],
    "selected": false,
    "links": { "arxiv": "https://arxiv.org/abs/2511.02095" }
  },
  {
    "id": "baharikordabad2025sos",
    "title": "Sum-of-Squares Certificates for Almost-Sure Reachability of Stochastic Polynomial Systems",
    "authors": ["A. Bahari Kordabad", "R. Majumdar", "S. Soudjani"],
    "venue": "Nonlinear Analysis: Hybrid Systems",
    "volume": "62",
    "article": "101796",
    "year": 2026,
    "type": "journal",
    "status": null,
    "themes": ["certificates"],
    "selected": true,
    "links": { "doi": "10.1016/j.nahs.2026.101796", "arxiv": "https://arxiv.org/abs/2510.25513" }
  },
  {
    "id": "baharikordabad2025certificates",
    "title": "On Certificates for Almost Sure Reachability in Stochastic Systems",
    "authors": ["A. Bahari Kordabad", "R. Majumdar", "H. J. Motwani", "S. Soudjani"],
    "venue": "IEEE Transactions on Automatic Control",
    "year": 2026,
    "type": "journal",
    "status": null,
    "themes": ["certificates"],
    "selected": true,
    "links": { "doi": "10.1109/tac.2026.3719559", "arxiv": "https://arxiv.org/abs/2507.20194" }
  },
  {
    "id": "baharikordabad2025datadriven",
    "title": "Data-Driven Distributionally Robust Control for Interacting Agents under Logical Constraints",
    "authors": ["A. Bahari Kordabad", "E. E. Vlahakis", "L. Lindemann", "S. Gros", "D. V. Dimarogonas", "S. Soudjani"],
    "venue": "IEEE Transactions on Automatic Control",
    "year": 2025,
    "type": "preprint",
    "status": "submitted",
    "themes": ["stl", "mpc"],
    "selected": false,
    "links": { "arxiv": "https://arxiv.org/abs/2503.09816" }
  },
  {
    "id": "baharikordabad2025intentaware",
    "title": "Intent-Aware MPC for Aircraft Detect-and-Avoid with Response Delay: A Comparative Study with ACAS Xu",
    "authors": ["A. Bahari Kordabad", "A. Ghosh", "S. Stroeve", "S. Soudjani"],
    "venue": "SESAR Innovation Days (SIDs)",
    "year": 2025,
    "type": "conference",
    "status": null,
    "themes": ["mpc"],
    "selected": false,
    "links": { "doi": "https://www.sesarju.eu/sites/default/files/documents/sid/2025/papers/SIDs_2025_paper_49-final.pdf", "arxiv": "https://arxiv.org/abs/2503.23518" }
  },
  {
    "id": "baharikordabad2025aircraft",
    "title": "Robust Model Predictive Control for Aircraft Intent-Aware Collision Avoidance",
    "authors": ["A. Bahari Kordabad", "A. Da Col", "A. Ghosh", "S. Stroeve", "S. Soudjani"],
    "venue": "European Control Conference (ECC)",
    "year": 2025,
    "type": "conference",
    "status": null,
    "themes": ["mpc"],
    "selected": true,
    "links": { "doi": "10.23919/ecc65951.2025.11186903", "arxiv": "https://arxiv.org/abs/2408.06999" }
  },
  {
    "id": "anand2024optimality",
    "title": "Optimality Conditions for Model Predictive Control: Rethinking Predictive Model Design",
    "authors": ["A. S. Anand", "A. Bahari Kordabad", "M. Zanon", "S. Gros"],
    "venue": "Automatica",
    "year": 2024,
    "type": "preprint",
    "status": "submitted",
    "themes": ["mpc", "rl"],
    "selected": false,
    "links": { "arxiv": "https://arxiv.org/abs/2412.18268" }
  },
  {
    "id": "baharikordabad2024equivalence",
    "title": "Equivalence of Optimality Criteria for Markov Decision Process and Model Predictive Control",
    "authors": ["A. Bahari Kordabad", "M. Zanon", "S. Gros"],
    "venue": "IEEE Transactions on Automatic Control",
    "year": 2024,
    "type": "journal",
    "status": null,
    "themes": ["mpc", "rl"],
    "selected": true,
    "links": { "doi": "10.1109/tac.2023.3277309", "arxiv": "https://arxiv.org/abs/2210.04302" }
  },
  {
    "id": "baharikordabad2024lyapunov",
    "title": "Lyapunov-Based Robust Optimal Control for Time-Delay Systems with Application in Milling Process",
    "authors": ["A. Bahari Kordabad", "S. Gros"],
    "venue": "International Journal of Dynamics and Control",
    "year": 2024,
    "type": "journal",
    "status": null,
    "themes": ["certificates"],
    "selected": false,
    "links": { "doi": "10.1007/s40435-023-01217-2" }
  },
  {
    "id": "baharikordabad2024drstl",
    "title": "Distributionally Robust Control for Chance-Constrained Signal Temporal Logic Specifications",
    "authors": ["A. Bahari Kordabad", "E. E. Vlahakis", "L. Lindemann", "D. V. Dimarogonas", "S. Soudjani"],
    "venue": "63rd IEEE Conference on Decision and Control (CDC)",
    "year": 2024,
    "type": "conference",
    "status": null,
    "themes": ["stl"],
    "selected": true,
    "links": { "doi": "10.1109/cdc56724.2024.10886437", "arxiv": "https://arxiv.org/abs/2409.03855" }
  },
  {
    "id": "baharikordabad2024cbf",
    "title": "Control Barrier Functions for Stochastic Systems under Signal Temporal Logic Tasks",
    "authors": ["A. Bahari Kordabad", "M. Charitidou", "D. V. Dimarogonas", "S. Soudjani"],
    "venue": "European Control Conference (ECC)",
    "year": 2024,
    "type": "conference",
    "status": null,
    "themes": ["stl", "certificates"],
    "selected": false,
    "links": { "doi": "10.23919/ecc64448.2024.10591078" }
  },
  {
    "id": "cai2023microgrid",
    "title": "Energy Management in Residential Microgrid Using Model Predictive Control-Based Reinforcement Learning and Shapley Value",
    "authors": ["W. Cai", "A. Bahari Kordabad", "S. Gros"],
    "venue": "Engineering Applications of Artificial Intelligence",
    "volume": "119",
    "article": "105793",
    "year": 2023,
    "type": "journal",
    "status": null,
    "award": "EAAI Paper Prize Award 2026",
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1016/j.engappai.2022.105793" }
  },
  {
    "id": "nejatbakhsh2023mhe",
    "title": "Learning-Based State Estimation and Control Using MHE and MPC Schemes with Imperfect Models",
    "authors": ["H. Nejatbakhsh Esfahani", "A. Bahari Kordabad", "W. Cai", "S. Gros"],
    "venue": "European Journal of Control",
    "year": 2023,
    "type": "journal",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1016/j.ejcon.2023.100880" }
  },
  {
    "id": "sawant2023modelfree",
    "title": "Model-Free Data-Driven Predictive Control Using Reinforcement Learning",
    "authors": ["S. Sawant", "D. Reinhardt", "A. Bahari Kordabad", "S. Gros"],
    "venue": "62nd IEEE Conference on Decision and Control (CDC)",
    "year": 2023,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1109/cdc49753.2023.10383431" }
  },
  {
    "id": "baharikordabad2023rlmpc",
    "title": "Reinforcement Learning for MPC: Fundamentals and Current Challenges",
    "authors": ["A. Bahari Kordabad", "D. Reinhardt", "A. S. Anand", "S. Gros"],
    "venue": "22nd IFAC World Congress",
    "year": 2023,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": true,
    "links": { "doi": "10.1016/j.ifacol.2023.10.548" }
  },
  {
    "id": "baharikordabad2023cvar",
    "title": "Continuous-Time Chance-Constrained Stochastic Model Predictive Control Using Multiple Shooting and CVaR",
    "authors": ["A. Bahari Kordabad", "S. Gros"],
    "venue": "21st European Control Conference (ECC)",
    "year": 2023,
    "type": "conference",
    "status": null,
    "themes": ["mpc"],
    "selected": false,
    "links": { "doi": "10.23919/ecc57647.2023.10178324" }
  },
  {
    "id": "baharikordabad2023bias",
    "title": "Bias Correction of Discounted Optimal Steady State Using Cost Modification",
    "authors": ["A. Bahari Kordabad", "S. Gros"],
    "venue": "21st European Control Conference (ECC)",
    "year": 2023,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.23919/ecc57647.2023.10178359" }
  },
  {
    "id": "seel2022convex",
    "title": "Convex Neural Network-Based Cost Modifications for Learning Model Predictive Control",
    "authors": ["K. Seel", "A. Bahari Kordabad", "S. Gros", "J. T. Gravdahl"],
    "venue": "IEEE Open Journal of Control Systems",
    "year": 2022,
    "type": "journal",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1109/ojcsys.2022.3221063" }
  },
  {
    "id": "baharikordabad2022saferl",
    "title": "Safe Reinforcement Learning Using Wasserstein Distributionally Robust Model Predictive Control",
    "authors": ["A. Bahari Kordabad", "R. Wisniewski", "S. Gros"],
    "venue": "IEEE Access",
    "year": 2022,
    "type": "journal",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1109/access.2022.3228922" }
  },
  {
    "id": "baharikordabad2022storage",
    "title": "Q-Learning of the Storage Function in Economic Nonlinear Model Predictive Control",
    "authors": ["A. Bahari Kordabad", "S. Gros"],
    "venue": "Engineering Applications of Artificial Intelligence",
    "year": 2022,
    "type": "journal",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1016/j.engappai.2022.105343" }
  },
  {
    "id": "baharikordabad2022functional",
    "title": "Functional Stability of Discounted Markov Decision Processes Using Economic MPC Dissipativity Theory",
    "authors": ["A. Bahari Kordabad", "S. Gros"],
    "venue": "20th European Control Conference (ECC)",
    "year": 2022,
    "type": "conference",
    "status": null,
    "themes": ["mpc", "rl"],
    "selected": false,
    "links": { "doi": "10.23919/ecc55457.2022.9838064", "arxiv": "https://arxiv.org/abs/2203.16989" }
  },
  {
    "id": "baharikordabad2022quasinewton",
    "title": "Quasi-Newton Iteration in Deterministic Policy Gradient",
    "authors": ["A. Bahari Kordabad", "H. Nejatbakhsh Esfahani", "W. Cai", "S. Gros"],
    "venue": "American Control Conference (ACC)",
    "year": 2022,
    "type": "conference",
    "status": null,
    "themes": ["rl"],
    "selected": false,
    "links": { "doi": "10.23919/acc53348.2022.9867217", "arxiv": "https://arxiv.org/abs/2203.13854" }
  },
  {
    "id": "cai2021peak",
    "title": "Optimal Management of the Peak Power Penalty for Smart Grids Using MPC-Based Reinforcement Learning",
    "authors": ["W. Cai", "H. Nejatbakhsh Esfahani", "A. Bahari Kordabad", "S. Gros"],
    "venue": "60th IEEE Conference on Decision and Control (CDC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1109/cdc45484.2021.9683333", "arxiv": "https://arxiv.org/abs/2108.01459" }
  },
  {
    "id": "cai2021freight",
    "title": "MPC-Based Reinforcement Learning for a Simplified Freight Mission of Autonomous Surface Vehicles",
    "authors": ["W. Cai", "A. Bahari Kordabad", "H. Nejatbakhsh Esfahani", "A. M. Lekkas", "S. Gros"],
    "venue": "60th IEEE Conference on Decision and Control (CDC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1109/cdc45484.2021.9683750", "arxiv": "https://arxiv.org/abs/2106.08634" }
  },
  {
    "id": "baharikordabad2021multiagent",
    "title": "Multi-Agent Battery Storage Management Using MPC-Based Reinforcement Learning",
    "authors": ["A. Bahari Kordabad", "W. Cai", "S. Gros"],
    "venue": "IEEE Conference on Control Technology and Applications (CCTA)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1109/ccta48906.2021.9659202", "arxiv": "https://arxiv.org/abs/2106.03541" }
  },
  {
    "id": "baharikordabad2021dissipativity",
    "title": "Verification of Dissipativity and Evaluation of Storage Function in Economic Nonlinear MPC Using Q-Learning",
    "authors": ["A. Bahari Kordabad", "S. Gros"],
    "venue": "7th IFAC Conference on Nonlinear Model Predictive Control (NMPC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.1016/j.ifacol.2021.08.562", "arxiv": "https://arxiv.org/abs/2105.11313" }
  },
  {
    "id": "nejatbakhsh2021robust",
    "title": "Approximate Robust NMPC Using Reinforcement Learning",
    "authors": ["H. Nejatbakhsh Esfahani", "A. Bahari Kordabad", "S. Gros"],
    "venue": "19th European Control Conference (ECC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.23919/ecc54610.2021.9655129", "arxiv": "https://arxiv.org/abs/2104.02743" }
  },
  {
    "id": "baharikordabad2021bias",
    "title": "Bias Correction in Deterministic Policy Gradient Using Robust MPC",
    "authors": ["A. Bahari Kordabad", "H. Nejatbakhsh Esfahani", "S. Gros"],
    "venue": "19th European Control Conference (ECC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.23919/ecc54610.2021.9654962", "arxiv": "https://arxiv.org/abs/2104.02413" }
  },
  {
    "id": "baharikordabad2021economic",
    "title": "MPC-Based Reinforcement Learning for Economic Problems with Application to Battery Storage",
    "authors": ["A. Bahari Kordabad", "W. Cai", "S. Gros"],
    "venue": "19th European Control Conference (ECC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.23919/ecc54610.2021.9654852", "arxiv": "https://arxiv.org/abs/2104.02411" }
  },
  {
    "id": "nejatbakhsh2021mhe",
    "title": "Reinforcement Learning Based on MPC/MHE for Unmodeled and Partially Observable Dynamics",
    "authors": ["H. Nejatbakhsh Esfahani", "A. Bahari Kordabad", "S. Gros"],
    "venue": "American Control Conference (ACC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.23919/acc50511.2021.9483399", "arxiv": "https://arxiv.org/abs/2103.11871" }
  },
  {
    "id": "baharikordabad2021scenario",
    "title": "Reinforcement Learning Based on Scenario-Tree MPC for ASVs",
    "authors": ["A. Bahari Kordabad", "H. Nejatbakhsh Esfahani", "A. M. Lekkas", "S. Gros"],
    "venue": "American Control Conference (ACC)",
    "year": 2021,
    "type": "conference",
    "status": null,
    "themes": ["rl", "mpc"],
    "selected": false,
    "links": { "doi": "10.23919/acc50511.2021.9483100", "arxiv": "https://arxiv.org/abs/2103.11949" }
  },
  {
    "id": "baharikordabad2019emotional",
    "title": "Emotional Learning Based Intelligent Controller for MIMO Peripheral Milling Process",
    "authors": ["A. Bahari Kordabad", "M. Boroushaki"],
    "venue": "Journal of Applied and Computational Mechanics",
    "year": 2019,
    "type": "journal",
    "status": null,
    "themes": [],
    "selected": false,
    "links": { "doi": "10.22055/jacm.2019.30188.1696" }
  }
];
