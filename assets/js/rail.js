/*
 * The rail: a trajectory drawn down the left edge that tracks scrolling.
 * Each section with data-rail is a waypoint; the dot is "the reader's state".
 * Also reveals sections as they enter the viewport (only when motion is allowed).
 */
(function () {
  "use strict";

  var root = document.documentElement;
  var sections = [].slice.call(document.querySelectorAll("main .stage[data-rail]"));
  var header = document.getElementById("site-header");
  var here = document.getElementById("here");
  var progress = header && header.querySelector(".progress");
  var rail = document.getElementById("rail");
  var motion = root.classList.contains("motion");

  /* ---- reveal ---------------------------------------------------------- */

  function revealAll() { sections.forEach(function (s) { s.classList.add("is-in"); }); }

  if (motion && "IntersectionObserver" in window) {
    sections.forEach(function (s) {
      var kids = s.querySelector(".stage-inner").children;
      for (var i = 0; i < kids.length; i++) kids[i].style.setProperty("--i", Math.min(i, 5));
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0 });
    sections.forEach(function (s) {
      var top = s.getBoundingClientRect().top;
      if (top < window.innerHeight * 0.88) s.classList.add("is-in");
      else io.observe(s);
    });
    /* Printing should never be blocked by pending reveals. */
    window.addEventListener("beforeprint", revealAll);
  } else {
    revealAll();
  }
  window.__siteReady = true;

  /* ---- rail geometry ---------------------------------------------------- */

  var NS = "http://www.w3.org/2000/svg";
  var svg = rail && rail.querySelector("svg");
  var tube, future, past, nodesG, dot, halo, linksOl;
  if (svg) {
    tube = svg.querySelector(".tube");
    future = svg.querySelector(".path-future");
    past = svg.querySelector(".path-past");
    nodesG = svg.querySelector(".nodes");
    dot = svg.querySelector(".state");
    halo = svg.querySelector(".state-halo");
    linksOl = rail.querySelector(".rail-links");
  }

  var W = 0, H = 0, PAD = 28, y0 = 0, y1 = 0;
  var nodes = [];   /* { el, link, y, t, section } */
  var maxScroll = 1;
  var railOn = false;

  /* Horizontal position of the trajectory at height y: a gentle, slightly
     irregular oscillation, like a state settling while it is steered. */
  function xAt(y) {
    var u = (y - y0) / Math.max(1, y1 - y0);
    return W * 0.26 + 9 * Math.sin(u * Math.PI * 3.1 + 0.5) * (1 - 0.35 * u) + 4 * Math.sin(u * Math.PI * 8.3);
  }

  function pathTo(yEnd) {
    var d = "", step = 6;
    for (var y = y0; y <= yEnd; y += step) d += (d ? "L" : "M") + xAt(y).toFixed(1) + " " + y.toFixed(1);
    d += (d ? "L" : "M") + xAt(yEnd).toFixed(1) + " " + yEnd.toFixed(1);
    return d;
  }

  function buildRail() {
    if (!svg) return;
    nodesG.textContent = "";
    linksOl.textContent = "";
    nodes = sections.map(function (s) {
      var goal = s.hasAttribute("data-goal");
      var el;
      if (goal) {
        el = document.createElementNS(NS, "path");
      } else {
        el = document.createElementNS(NS, "circle");
        el.setAttribute("r", "4.5");
      }
      el.setAttribute("class", "node");
      nodesG.appendChild(el);

      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.textContent = s.getAttribute("data-rail");
      li.appendChild(a);
      linksOl.appendChild(li);
      return { el: el, link: a, section: s, goal: goal, y: 0, t: 0 };
    });
  }

  function layout() {
    var docH = document.documentElement.scrollHeight;
    maxScroll = Math.max(1, docH - window.innerHeight);
    var headerH = header ? header.offsetHeight : 0;

    nodes.forEach(function (n) {
      var top = n.section.getBoundingClientRect().top + window.scrollY - headerH;
      n.t = Math.min(1, Math.max(0, top / maxScroll));
    });

    railOn = !!(rail && getComputedStyle(rail).display !== "none");
    if (!railOn) return;

    var r = rail.getBoundingClientRect();
    W = r.width; H = r.height;
    y0 = PAD; y1 = H - PAD;

    /* Waypoints sit where their section starts; keep a minimum gap so labels never collide. */
    var gap = 30;
    nodes.forEach(function (n, i) {
      var y = y0 + n.t * (y1 - y0);
      if (i > 0) y = Math.max(y, nodes[i - 1].y + gap);
      n.y = y;
    });
    for (var i = nodes.length - 1; i >= 0; i--) {
      var limit = i === nodes.length - 1 ? y1 : nodes[i + 1].y - gap;
      if (nodes[i].y > limit) nodes[i].y = limit;
    }

    var full = pathTo(y1);
    tube.setAttribute("d", full);
    future.setAttribute("d", full);

    nodes.forEach(function (n) {
      var x = xAt(n.y);
      if (n.goal) {
        var s = 6;
        n.el.setAttribute("d", "M" + x + " " + (n.y - s) + "L" + (x + s) + " " + n.y + "L" + x + " " + (n.y + s) + "L" + (x - s) + " " + n.y + "Z");
      } else {
        n.el.setAttribute("cx", x.toFixed(1));
        n.el.setAttribute("cy", n.y.toFixed(1));
      }
      n.link.style.left = (x + 14).toFixed(1) + "px";
      n.link.style.top = n.y.toFixed(1) + "px";
    });
    update();
  }

  /* Map scroll position to a height on the rail, piecewise-linear between
     waypoints so the dot reaches a node exactly when its section arrives. */
  function yForT(t) {
    if (!nodes.length) return y0 + t * (y1 - y0);
    var prevT = 0, prevY = y0;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (t <= n.t) {
        var span = n.t - prevT;
        return span > 0 ? prevY + (n.y - prevY) * (t - prevT) / span : n.y;
      }
      prevT = n.t; prevY = n.y;
    }
    var rest = 1 - prevT;
    return rest > 0 ? prevY + (y1 - prevY) * (t - prevT) / rest : prevY;
  }

  var current = -1;

  function update() {
    var t = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    if (progress) progress.style.setProperty("--progress", t.toFixed(4));

    /* Active section: the last one whose top has passed the upper third of the viewport. */
    var line = window.innerHeight * 0.35;
    var active = -1;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) active = i;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) active = sections.length - 1;
    if (active !== current) {
      current = active;
      if (here) here.textContent = active >= 0 ? sections[active].getAttribute("data-rail") : "";
      nodes.forEach(function (n, k) {
        if (k === active) n.link.setAttribute("aria-current", "true");
        else n.link.removeAttribute("aria-current");
      });
    }

    if (!railOn) return;
    var y = yForT(t);
    var x = xAt(y);
    past.setAttribute("d", pathTo(y));
    dot.setAttribute("cx", x.toFixed(1));
    dot.setAttribute("cy", y.toFixed(1));
    halo.setAttribute("cx", x.toFixed(1));
    halo.setAttribute("cy", y.toFixed(1));
    nodes.forEach(function (n) {
      n.el.classList.toggle("is-reached", y >= n.y - 0.5);
    });
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; update(); });
  }

  var relayoutTimer;
  function relayout() {
    clearTimeout(relayoutTimer);
    relayoutTimer = setTimeout(layout, 60);
  }

  buildRail();
  layout();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", relayout);
  window.addEventListener("load", relayout);
  document.addEventListener("layoutchange", relayout);
  /* Labels come from data-rail, which site.js rewrites when the language changes. */
  document.addEventListener("langchange", function () {
    nodes.forEach(function (n) { n.link.textContent = n.section.getAttribute("data-rail"); });
    current = -1;
    update();
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);
  if ("ResizeObserver" in window) new ResizeObserver(relayout).observe(document.getElementById("main"));
})();
