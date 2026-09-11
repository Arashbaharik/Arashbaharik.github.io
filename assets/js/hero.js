/*
 * Hero visual: trajectories of a stable linear system flowing inside the
 * elliptic level sets of its Lyapunov function V(x) = |T^-1 x|^2, kept out
 * of two unsafe disks by a control-barrier-function safety filter.
 *
 *   nominal   x' = f(x) = T A T^-1 x      (a damped rotation)
 *   barrier   h_i(x) = |x - c_i|^2 - r_i^2 >= 0
 *   filter    if grad h . f < -alpha h, add the smallest correction along grad h
 *
 * Two canvases: #field (static contours, redrawn on resize/theme change)
 * and #flow (moving trails). Pauses off-screen and in background tabs;
 * draws a single static frame under prefers-reduced-motion.
 */
(function () {
  "use strict";

  var host = document.querySelector(".hero-canvas");
  if (!host) return;
  var field = host.querySelector("#field");
  var flow = host.querySelector("#flow");
  if (!field || !flow || !field.getContext) return;
  var fctx = field.getContext("2d");
  var ctx = flow.getContext("2d");
  var reduceQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---- system ----------------------------------------------------------- */

  var a = 0.3, w = 1.0;                       /* decay and rotation rates */
  var T = [[1.25, 0.42], [-0.18, 0.72]];      /* shapes the level sets into tilted ellipses */
  var det = T[0][0] * T[1][1] - T[0][1] * T[1][0];
  var Ti = [[T[1][1] / det, -T[0][1] / det], [-T[1][0] / det, T[0][0] / det]];
  /* M = T A T^-1 with A = [[-a, -w], [w, -a]] */
  var A = [[-a, -w], [w, -a]];
  var TA = [
    [T[0][0] * A[0][0] + T[0][1] * A[1][0], T[0][0] * A[0][1] + T[0][1] * A[1][1]],
    [T[1][0] * A[0][0] + T[1][1] * A[1][0], T[1][0] * A[0][1] + T[1][1] * A[1][1]]
  ];
  var M = [
    [TA[0][0] * Ti[0][0] + TA[0][1] * Ti[1][0], TA[0][0] * Ti[0][1] + TA[0][1] * Ti[1][1]],
    [TA[1][0] * Ti[0][0] + TA[1][1] * Ti[1][0], TA[1][0] * Ti[0][1] + TA[1][1] * Ti[1][1]]
  ];

  var OBST = [
    { x: 1.05, y: 0.62, r: 0.32 },
    { x: -1.3, y: -0.42, r: 0.27 }
  ];
  var ALPHA = 2.2, MARGIN = 0.03;

  function V(x, y) {
    var zx = Ti[0][0] * x + Ti[0][1] * y, zy = Ti[1][0] * x + Ti[1][1] * y;
    return zx * zx + zy * zy;
  }

  function vel(x, y, out) {
    var fx = M[0][0] * x + M[0][1] * y;
    var fy = M[1][0] * x + M[1][1] * y;
    for (var i = 0; i < OBST.length; i++) {
      var o = OBST[i], dx = x - o.x, dy = y - o.y, rs = o.r + MARGIN;
      var h = dx * dx + dy * dy - rs * rs;
      var gx = 2 * dx, gy = 2 * dy;
      var lhs = gx * fx + gy * fy + ALPHA * h;
      if (lhs < 0) {
        var g2 = gx * gx + gy * gy || 1e-9;
        fx -= lhs * gx / g2;
        fy -= lhs * gy / g2;
      }
    }
    out[0] = fx; out[1] = fy;
  }

  function insideObstacle(x, y) {
    for (var i = 0; i < OBST.length; i++) {
      var o = OBST[i], dx = x - o.x, dy = y - o.y;
      if (dx * dx + dy * dy < (o.r + 0.08) * (o.r + 0.08)) return true;
    }
    return false;
  }

  /* ---- view ------------------------------------------------------------- */

  var W = 0, H = 0, dpr = 1, S = 1, ox = 0, oy = 0;
  var colors = {};
  var originCfg = (host.getAttribute("data-origin") || "").split(",").map(parseFloat);

  function sx(x) { return ox + x * S; }
  function sy(y) { return oy - y * S; }

  function readColors() {
    var cs = getComputedStyle(host);
    ["--cv-contour", "--cv-traj", "--cv-barrier", "--cv-hatch"].forEach(function (k) {
      colors[k] = cs.getPropertyValue(k).trim() || "#888";
    });
  }

  function resize() {
    var r = host.getBoundingClientRect();
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    [field, flow].forEach(function (c) {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    });
    fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    var narrow = W < 896;
    var cx = originCfg[0] || (narrow ? 0.74 : 0.3);
    var cy = originCfg[1] || (narrow ? 0.17 : 0.56);
    ox = W * cx;
    oy = H * cy;
    S = Math.min(W, H) * (narrow ? 0.3 : 0.23);
  }

  /* ---- static field ----------------------------------------------------- */

  function ellipse(c2, context) {
    var c = Math.sqrt(c2);
    context.beginPath();
    for (var k = 0; k <= 96; k++) {
      var th = k / 96 * Math.PI * 2;
      var zx = c * Math.cos(th), zy = c * Math.sin(th);
      var x = T[0][0] * zx + T[0][1] * zy, y = T[1][0] * zx + T[1][1] * zy;
      if (k) context.lineTo(sx(x), sy(y)); else context.moveTo(sx(x), sy(y));
    }
    context.closePath();
  }

  function drawField() {
    fctx.clearRect(0, 0, W, H);

    /* Lyapunov level sets */
    fctx.lineWidth = 1;
    fctx.strokeStyle = colors["--cv-contour"];
    var vmax = maxVisibleV();
    for (var c = 0.28; c * c < vmax * 1.1; c += 0.28) {
      ellipse(c * c, fctx);
      fctx.stroke();
    }

    /* Unsafe sets: hatched, bounded by the barrier's zero level set */
    OBST.forEach(function (o) {
      var X = sx(o.x), Y = sy(o.y), R = o.r * S;
      fctx.save();
      fctx.beginPath();
      fctx.arc(X, Y, R, 0, Math.PI * 2);
      fctx.clip();
      fctx.strokeStyle = colors["--cv-hatch"];
      fctx.lineWidth = 1;
      fctx.beginPath();
      for (var d = -R * 2; d < R * 2; d += 6) {
        fctx.moveTo(X + d - R, Y + R);
        fctx.lineTo(X + d + R, Y - R);
      }
      fctx.stroke();
      fctx.restore();

      fctx.strokeStyle = colors["--cv-barrier"];
      fctx.lineWidth = 1;
      fctx.setLineDash([3, 4]);
      fctx.beginPath();
      fctx.arc(X, Y, R, 0, Math.PI * 2);
      fctx.stroke();

      fctx.strokeStyle = colors["--cv-contour"];
      fctx.setLineDash([2, 5]);
      [1.4, 1.85].forEach(function (k) {
        fctx.beginPath();
        fctx.arc(X, Y, R * k, 0, Math.PI * 2);
        fctx.stroke();
      });
      fctx.setLineDash([]);
    });

    /* Equilibrium */
    fctx.strokeStyle = colors["--cv-traj"];
    fctx.lineWidth = 1;
    fctx.beginPath();
    fctx.arc(ox, oy, 4, 0, Math.PI * 2);
    fctx.stroke();
  }

  function maxVisibleV() {
    var m = 0;
    [[0, 0], [W, 0], [0, H], [W, H]].forEach(function (p) {
      var x = (p[0] - ox) / S, y = (oy - p[1]) / S;
      m = Math.max(m, V(x, y));
    });
    return m;
  }

  /* ---- particles -------------------------------------------------------- */

  var TRAIL = 90;
  var particles = [];
  var tmp = [0, 0], tmp2 = [0, 0];

  function spawn(p) {
    var vmax = maxVisibleV();
    for (var tries = 0; tries < 40; tries++) {
      var x = (Math.random() * W - ox) / S;
      var y = (oy - Math.random() * H) / S;
      var v = V(x, y);
      if (v > 0.25 * vmax && v > 0.6 && !insideObstacle(x, y)) {
        p.x = x; p.y = y;
        break;
      }
    }
    p.age = 0;
    p.trail = [];
    p.alpha = 0.45 + Math.random() * 0.45;
    return p;
  }

  function step(p, dt) {
    /* midpoint (RK2) step */
    vel(p.x, p.y, tmp);
    var mx = p.x + tmp[0] * dt * 0.5, my = p.y + tmp[1] * dt * 0.5;
    vel(mx, my, tmp2);
    p.x += tmp2[0] * dt;
    p.y += tmp2[1] * dt;
    p.age += dt;
  }

  function initParticles() {
    var n = Math.round(Math.min(46, Math.max(16, W * H / 26000)));
    particles = [];
    for (var i = 0; i < n; i++) {
      var p = spawn({});
      /* scatter ages so trails do not all start together */
      var warm = Math.random() * 6;
      for (var t = 0; t < warm; t += 0.05) step(p, 0.05);
      p.age = Math.random() * 2;
      particles.push(p);
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1.15;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = colors["--cv-traj"];
    var CH = 5;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i], tr = p.trail, n = tr.length;
      if (n < 2) continue;
      var fadeIn = Math.min(1, p.age / 1.4);
      var fadeOut = Math.min(1, V(p.x, p.y) / 0.06);
      var base = p.alpha * fadeIn * fadeOut;
      var per = Math.ceil(n / CH);
      for (var c = 0; c < CH; c++) {
        var s = c * per, e = Math.min(n - 1, s + per);
        if (e <= s) continue;
        ctx.globalAlpha = base * ((c + 1) / CH);
        ctx.beginPath();
        ctx.moveTo(tr[s][0], tr[s][1]);
        for (var k = s + 1; k <= e; k++) ctx.lineTo(tr[k][0], tr[k][1]);
        ctx.stroke();
      }
      ctx.globalAlpha = base;
      ctx.beginPath();
      ctx.arc(tr[n - 1][0], tr[n - 1][1], 1.3, 0, Math.PI * 2);
      ctx.fillStyle = colors["--cv-traj"];
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  var SPEED = 0.55;  /* model time per second */

  function advance(dtSec) {
    var dt = Math.min(dtSec, 0.05) * SPEED;
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      step(p, dt / 2);
      step(p, dt / 2);
      p.trail.push([sx(p.x), sy(p.y)]);
      if (p.trail.length > TRAIL) p.trail.shift();
      if (V(p.x, p.y) < 0.0025 || p.age > 45) spawn(p);
    }
  }

  /* Full trajectories for the reduced-motion still frame. */
  function drawStatic() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = colors["--cv-traj"];
    ctx.lineWidth = 1;
    var vmax = maxVisibleV();
    var R = Math.sqrt(vmax) * 0.95;
    var count = 14;
    for (var i = 0; i < count; i++) {
      var th = i / count * Math.PI * 2 + 0.3;
      var zx = R * Math.cos(th), zy = R * Math.sin(th);
      var p = { x: T[0][0] * zx + T[0][1] * zy, y: T[1][0] * zx + T[1][1] * zy, age: 0 };
      if (insideObstacle(p.x, p.y)) continue;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(sx(p.x), sy(p.y));
      for (var k = 0; k < 4000 && V(p.x, p.y) > 0.003; k++) {
        step(p, 0.02);
        ctx.lineTo(sx(p.x), sy(p.y));
      }
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  /* ---- loop ------------------------------------------------------------- */

  var visible = true, raf = 0, last = 0;

  function frame(now) {
    raf = 0;
    if (!shouldRun()) return;
    var dt = last ? (now - last) / 1000 : 0.016;
    last = now;
    advance(dt);
    drawParticles();
    raf = requestAnimationFrame(frame);
  }

  function shouldRun() { return visible && !document.hidden && !reduceQuery.matches; }

  function start() {
    if (raf || !shouldRun()) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  function stop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  function full() {
    stop();
    readColors();
    resize();
    drawField();
    if (reduceQuery.matches) {
      drawStatic();
    } else {
      initParticles();
      start();
    }
  }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(host);
  }
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  document.addEventListener("themechange", function () {
    readColors();
    drawField();
    if (reduceQuery.matches) drawStatic();
  });
  var rt;
  function onResize() { clearTimeout(rt); rt = setTimeout(full, 150); }
  if ("ResizeObserver" in window) new ResizeObserver(onResize).observe(host);
  else window.addEventListener("resize", onResize);
  if (reduceQuery.addEventListener) reduceQuery.addEventListener("change", full);

  full();
})();
