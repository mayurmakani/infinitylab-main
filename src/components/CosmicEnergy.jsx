import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

/**
 * CosmicEnergy
 * An immersive, "out of this world" section for Infinity Energy.
 *
 * - Live canvas starfield (twinkle + depth parallax + occasional shooting stars)
 * - Glowing energy particles that orbit along a real infinity-symbol (lemniscate)
 *   path — a literal nod to "Infinity" Energy.
 * - Subtle mouse-driven parallax on the whole scene.
 * - Headline + stat counters that animate when scrolled into view.
 *
 * Self-contained: only uses framer-motion + react-intersection-observer,
 * both already in the project. No new dependencies.
 */

const STATS = [
  { value: 99.9, suffix: "%", label: "Round-trip efficiency" },
  { value: 6000, suffix: "+", label: "Charge cycles" },
  { value: 250, suffix: " MWh", label: "Deployed capacity" },
  { value: 24, suffix: "/7", label: "Smart monitoring" },
];

/* Count-up number that runs once the section is visible. */
function Counter({ value, suffix, active }) {
  const [display, setDisplay] = useState(0);
  const isFloat = !Number.isInteger(value);

  useEffect(() => {
    if (!active) return;
    let raf;
    const duration = 1600;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  const shown = isFloat ? display.toFixed(1) : Math.round(display);

  return (
    <span>
      {shown}
      {suffix}
    </span>
  );
}

export default function CosmicEnergy() {
  const canvasRef = useRef(null);
  const wrapRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let animId;
    let stars = [];
    let shootingStars = [];

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Rebuild starfield scaled to area.
      const count = Math.min(180, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(), // depth 0..1
        r: Math.random() * 1.4 + 0.3,
        tw: Math.random() * Math.PI * 2, // twinkle phase
        tws: Math.random() * 0.04 + 0.01, // twinkle speed
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    // Lemniscate of Bernoulli — the infinity path the energy travels.
    const lemniscate = (t, scale) => {
      const s = Math.sin(t);
      const c = Math.cos(t);
      const d = 1 + s * s;
      return {
        x: (scale * c) / d,
        y: (scale * s * c) / d,
      };
    };

    const ENERGY_COUNT = 26;
    const energy = Array.from({ length: ENERGY_COUNT }, (_, i) => ({
      t: (i / ENERGY_COUNT) * Math.PI * 2,
      speed: 0.006 + Math.random() * 0.004,
      hue: 180 + Math.random() * 80, // cyan -> violet
      size: 1.5 + Math.random() * 2.5,
    }));

    let frame = 0;

    const draw = () => {
      frame += 1;

      // Smooth the pointer parallax.
      pointer.current.x += (pointer.current.tx - pointer.current.x) * 0.05;
      pointer.current.y += (pointer.current.ty - pointer.current.y) * 0.05;
      const px = pointer.current.x;
      const py = pointer.current.y;

      ctx.clearRect(0, 0, width, height);

      // ---- Nebula glow ----
      const cx = width / 2 + px * 18;
      const cy = height / 2 + py * 18;
      const neb = ctx.createRadialGradient(
        cx,
        cy,
        0,
        cx,
        cy,
        Math.max(width, height) * 0.6
      );
      neb.addColorStop(0, "rgba(56, 189, 248, 0.10)");
      neb.addColorStop(0.4, "rgba(99, 102, 241, 0.08)");
      neb.addColorStop(1, "rgba(2, 6, 23, 0)");
      ctx.fillStyle = neb;
      ctx.fillRect(0, 0, width, height);

      // ---- Stars ----
      for (const s of stars) {
        const depth = 0.3 + s.z * 1.2;
        const sx = s.x + px * 12 * depth;
        const sy = s.y + py * 12 * depth;
        if (!prefersReduced) s.tw += s.tws;
        const twinkle = 0.5 + Math.sin(s.tw) * 0.5;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r * depth, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226, 232, 240, ${0.25 + twinkle * 0.6})`;
        ctx.fill();
      }

      // ---- Infinity energy orbit ----
      const scale = Math.min(width, height) * 0.62;
      const ocx = width / 2 + px * 30;
      const ocy = height / 2 + py * 30;

      // faint guide path
      ctx.beginPath();
      for (let t = 0; t <= Math.PI * 2 + 0.05; t += 0.05) {
        const p = lemniscate(t, scale);
        const x = ocx + p.x;
        const y = ocy + p.y * 0.78;
        if (t === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // traveling energy particles + trails
      ctx.globalCompositeOperation = "lighter";
      for (const e of energy) {
        if (!prefersReduced) e.t += e.speed;
        const p = lemniscate(e.t, scale);
        const x = ocx + p.x;
        const y = ocy + p.y * 0.78;

        // short trail
        const tp = lemniscate(e.t - e.speed * 6, scale);
        const tx = ocx + tp.x;
        const ty = ocy + tp.y * 0.78;

        const grad = ctx.createLinearGradient(tx, ty, x, y);
        grad.addColorStop(0, `hsla(${e.hue}, 90%, 65%, 0)`);
        grad.addColorStop(1, `hsla(${e.hue}, 90%, 70%, 0.8)`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = e.size;
        ctx.lineCap = "round";
        ctx.stroke();

        // glowing head
        const glow = ctx.createRadialGradient(x, y, 0, x, y, e.size * 4);
        glow.addColorStop(0, `hsla(${e.hue}, 95%, 80%, 0.9)`);
        glow.addColorStop(1, `hsla(${e.hue}, 95%, 60%, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, e.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // bright core where the loops cross
      const core = ctx.createRadialGradient(ocx, ocy, 0, ocx, ocy, 60);
      core.addColorStop(0, "rgba(186, 230, 253, 0.55)");
      core.addColorStop(1, "rgba(186, 230, 253, 0)");
      ctx.fillStyle = core;
      ctx.beginPath();
      ctx.arc(ocx, ocy, 60, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";

      // ---- Shooting stars (occasional) ----
      if (!prefersReduced && Math.random() < 0.012 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.5,
          len: 80 + Math.random() * 120,
          speed: 6 + Math.random() * 4,
          life: 1,
          angle: Math.PI / 4 + (Math.random() * 0.4 - 0.2),
        });
      }
      shootingStars = shootingStars.filter((sh) => sh.life > 0);
      for (const sh of shootingStars) {
        const dx = Math.cos(sh.angle);
        const dy = Math.sin(sh.angle);
        sh.x += dx * sh.speed;
        sh.y += dy * sh.speed;
        sh.life -= 0.012;
        const ex = sh.x - dx * sh.len;
        const ey = sh.y - dy * sh.len;
        const g = ctx.createLinearGradient(sh.x, sh.y, ex, ey);
        g.addColorStop(0, `rgba(255,255,255,${0.8 * sh.life})`);
        g.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = g;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Mouse / touch parallax target (normalized -1..1).
  const handlePointer = (clientX, clientY) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pointer.current.tx = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.current.ty = ((clientY - rect.top) / rect.height) * 2 - 1;
  };

  return (
    <section
      ref={(node) => {
        wrapRef.current = node;
        inViewRef(node);
      }}
      onMouseMove={(e) => handlePointer(e.clientX, e.clientY)}
      onTouchMove={(e) =>
        e.touches[0] && handlePointer(e.touches[0].clientX, e.touches[0].clientY)
      }
      className="relative isolate overflow-hidden rounded-3xl bg-[#020617] my-8"
      style={{ minHeight: "640px" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* vignette for text legibility */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 50%, rgba(2,6,23,0) 40%, rgba(2,6,23,0.7) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-200"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
          Infinity Energy
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-gradient-to-b from-white via-slate-100 to-slate-400 bg-clip-text text-4xl font-semibold leading-tight tracking-tight text-transparent md:text-6xl"
        >
          Power that defies
          <br />
          the limits of this world
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300/90 md:text-lg"
        >
          Energy moves in an endless loop — captured, stored, and released
          with precision. Our lithium systems keep it flowing, cycle after
          cycle, without end.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-14 grid w-full grid-cols-2 gap-6 md:grid-cols-4"
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 backdrop-blur-sm"
            >
              <div className="bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                <Counter value={s.value} suffix={s.suffix} active={inView} />
              </div>
              <div className="mt-2 text-xs text-slate-400 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
