/*
 * Research: the overview figure on the first screen and the research themes.
 * Texts can be a plain string or { en: "...", de: "..." }.
 */
window.SITE = window.SITE || {};

/* The overview figure on the first screen, next to the name. There is one
   image per theme, each painted on that theme's page colour so it sits in
   the page without a frame: green #0B3D2E and light #F3F6F2.
   `caption` becomes the introduction of the Research section. */
window.SITE.researchOverview = {
  src: "assets/img/research-overview.jpg",
  srcSmall: "assets/img/research-overview-1000.jpg",
  srcLight: "assets/img/research-overview-light.jpg",
  srcLightSmall: "assets/img/research-overview-light-1000.jpg",
  width: 2000,
  height: 1244,
  alt: {
    en: "Research overview. Three panels, Optimization, Learning and Certificates, are linked to each other. Below them a vehicle follows a trajectory inside a tube from a start region to a goal region while avoiding an unsafe region, under the dynamics x+ = f(x, u, w). At the bottom, three shields show the guarantees: robust (for every disturbance), probabilistic (with probability at least 1 minus epsilon) and almost sure (with probability one).",
    de: "Forschungsüberblick. Drei miteinander verbundene Felder: Optimierung, Lernen und Zertifikate. Darunter folgt ein Fahrzeug einer Trajektorie in einem Schlauch von einer Start- zu einer Zielregion und meidet dabei eine unsichere Region, unter der Dynamik x+ = f(x, u, w). Unten zeigen drei Schilde die Garantien: robust (für jede Störung), probabilistisch (mit Wahrscheinlichkeit mindestens 1 minus Epsilon) und fast sicher (mit Wahrscheinlichkeit eins)."
  },
  // DRAFT caption. Edit freely.
  caption: {
    en: "The figure at the top of the page summarizes my work: three connected tools, optimization, learning and certificates, steer an uncertain system x₊ = f(x, u, w) so that its trajectory satisfies a task φ. The guarantees range from robust (φ holds for every disturbance w) through probabilistic (with probability at least 1 − ε) to almost sure (with probability one).",
    de: "Die Abbildung oben auf der Seite fasst meine Arbeit zusammen: Drei miteinander verbundene Werkzeuge, Optimierung, Lernen und Zertifikate, steuern ein unsicheres System x₊ = f(x, u, w) so, dass seine Trajektorie eine Aufgabe φ erfüllt. Die Garantien reichen von robust (φ gilt für jede Störung w) über probabilistisch (mit Wahrscheinlichkeit mindestens 1 − ε) bis fast sicher (mit Wahrscheinlichkeit eins)."
  }
};

/*
 * Research themes. Each theme's `id` is the tag used in publications.js
 * (the `themes` field), so "Related papers" can filter the list.
 * `short` is the label on the publication filter.
 * `glyph` picks one of the small line drawings: tube, levelsets, horizon, loop.
 * DRAFT: plain-language summaries. Edit freely.
 */
window.SITE.research = [
  {
    id: "stl",
    short: { en: "Temporal logic", de: "Temporale Logik" },
    title: { en: "Temporal logic for specification and control", de: "Temporale Logik für Spezifikation und Regelung" },
    glyph: "tube",
    summary: {
      en: "Signal Temporal Logic turns tasks such as “reach the target within ten seconds and always avoid the obstacle” into precise mathematics. I design controllers that satisfy these specifications for single and interacting agents, with probabilistic guarantees when the dynamics are stochastic and only data about the disturbance is available.",
      de: "Signal Temporal Logic übersetzt Aufgaben wie „erreiche das Ziel innerhalb von zehn Sekunden und meide stets das Hindernis“ in präzise Mathematik. Ich entwerfe Regler, die solche Spezifikationen für einzelne und interagierende Agenten erfüllen, mit probabilistischen Garantien, wenn die Dynamik stochastisch ist und nur Daten über die Störung vorliegen."
    }
  },
  {
    id: "certificates",
    short: { en: "Certificates", de: "Zertifikate" },
    title: { en: "Stochastic certificates for safety and reachability", de: "Stochastische Zertifikate für Sicherheit und Erreichbarkeit" },
    glyph: "levelsets",
    summary: {
      en: "A certificate is a function whose existence proves that a system behaves well, much as a Lyapunov function proves stability. I build supermartingale and sum-of-squares certificates that show a stochastic system stays safe or reaches its goal almost surely, and that can be searched for with convex optimization.",
      de: "Ein Zertifikat ist eine Funktion, deren Existenz beweist, dass sich ein System gut verhält, so wie eine Lyapunov-Funktion Stabilität beweist. Ich konstruiere Supermartingal- und Sum-of-Squares-Zertifikate, die zeigen, dass ein stochastisches System sicher bleibt oder sein Ziel fast sicher erreicht, und die sich mit konvexer Optimierung finden lassen."
    }
  },
  {
    id: "mpc",
    short: "MPC",
    title: { en: "Model predictive and optimization-based control", de: "Modellprädiktive und optimierungsbasierte Regelung" },
    glyph: "horizon",
    summary: {
      en: "Model predictive control repeatedly solves an optimization problem over a receding horizon. My work studies when these problems remain feasible, robust and tractable, including distributionally robust and chance-constrained formulations, with applications from energy systems to aircraft collision avoidance.",
      de: "Die modellprädiktive Regelung löst wiederholt ein Optimierungsproblem über einen gleitenden Horizont. Meine Arbeit untersucht, wann diese Probleme lösbar, robust und effizient berechenbar bleiben, auch in verteilungsrobusten und wahrscheinlichkeitsbeschränkten Formulierungen, mit Anwendungen von Energiesystemen bis zur Kollisionsvermeidung in der Luftfahrt."
    }
  },
  {
    id: "rl",
    short: { en: "Learning", de: "Lernen" },
    title: { en: "Reinforcement learning for control", de: "Reinforcement Learning für die Regelung" },
    glyph: "loop",
    summary: {
      en: "Instead of learning a neural-network policy from scratch, I use reinforcement learning to tune an entire MPC scheme (model, cost and constraints) from closed-loop data, which keeps the structure that makes the controller safe and explainable. I also develop second-order policy-gradient methods that make this learning faster and more reliable.",
      de: "Statt eine Strategie in Form eines neuronalen Netzes von Grund auf zu lernen, nutze ich Reinforcement Learning, um ein vollständiges MPC-Schema (Modell, Kosten und Nebenbedingungen) aus Daten des geschlossenen Regelkreises abzustimmen. So bleibt die Struktur erhalten, die den Regler sicher und erklärbar macht. Außerdem entwickle ich Policy-Gradient-Verfahren zweiter Ordnung, die dieses Lernen schneller und zuverlässiger machen."
    }
  }
];
