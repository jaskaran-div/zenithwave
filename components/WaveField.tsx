"use client";

import { useEffect, useRef } from "react";

type Props = {
  lines?: number;
  className?: string;
  /** Index (0–1) of the highlighted brass "market" line. */
  highlight?: number;
  /** Show the London-session readout that follows the pointer. */
  readout?: boolean;
  intensity?: number;
};

// Session runs 08:00–16:30 London time, mapped left → right across the canvas.
const SESSION_START = 8 * 60;
const SESSION_LEN = 8.5 * 60;
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(Math.floor(m % 60)).padStart(2, "0")}`;

/** Animated wave lines behind the hero (ported from the ZenithWave brand site). */
export default function WaveField({ lines = 24, className = "", highlight = 0.58, readout = true, intensity = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999, on: 0, ton: 0 };

    // Colours come from the theme tokens in globals.css.
    const s = getComputedStyle(canvas);
    const colors = {
      line: s.getPropertyValue("--color-muted").trim() || "#4b5075",
      accent: s.getPropertyValue("--color-lime").trim() || "#2b45e8",
      brass: s.getPropertyValue("--color-brass").trim() || "#b5862a",
    };

    const yAt = (x: number, i: number, t: number) => {
      const base = h * 0.12 + (i / (lines - 1)) * h * 0.8;
      const amp = (10 + (i / lines) * 26) * intensity;
      let y = base + Math.sin(x * 0.0042 + t * 0.00042 + i * 0.32) * amp + Math.sin(x * 0.011 - t * 0.0007 + i * 0.9) * amp * 0.28;
      // Pointer lens: lines part around the cursor.
      const dx = x - pointer.x;
      const dy = base - pointer.y;
      const g = Math.exp(-(dx * dx) / (2 * 110 * 110)) * Math.exp(-(dy * dy) / (2 * 140 * 140));
      y += g * 64 * Math.sign(dy || 1) * pointer.on;
      return y;
    };

    function draw(now: number) {
      const t = now - start;
      pointer.x += (pointer.tx - pointer.x) * 0.12;
      pointer.y += (pointer.ty - pointer.y) * 0.12;
      pointer.on += (pointer.ton - pointer.on) * 0.08;
      ctx.clearRect(0, 0, w, h);
      const ease = (p: number) => 1 - Math.pow(1 - p, 3);
      const hi = Math.round(highlight * (lines - 1));

      for (let i = 0; i < lines; i++) {
        const p = reduce ? 1 : ease(Math.min(1, Math.max(0, (t - i * 28) / 1500)));
        if (p <= 0) continue;
        const xEnd = w * p;
        ctx.beginPath();
        for (let x = 0; x <= xEnd; x += 6) {
          const y = yAt(x, i, t);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        if (i === hi) {
          ctx.strokeStyle = colors.brass;
          ctx.lineWidth = 2.2;
          ctx.globalAlpha = 1;
        } else if (i % 6 === 2) {
          ctx.strokeStyle = colors.accent;
          ctx.lineWidth = 1.1;
          ctx.globalAlpha = 0.55;
        } else {
          ctx.strokeStyle = colors.line;
          ctx.lineWidth = 1;
          ctx.globalAlpha = 0.22;
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      if (readout && tipRef.current && dotRef.current) {
        const on = pointer.on > 0.05 && pointer.tx > 0 && pointer.tx < w;
        const x = Math.max(0, Math.min(w, pointer.x));
        const y = yAt(x, hi, t);
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`;
        dotRef.current.style.opacity = on ? "1" : "0";
        tipRef.current.style.transform = `translate(${Math.min(x + 14, w - 150)}px, ${y - 46}px)`;
        tipRef.current.style.opacity = on ? "1" : "0";
        tipRef.current.textContent = `${fmt(SESSION_START + (x / w) * SESSION_LEN)} London session`;
      }
    }

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = r.width;
      h = r.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(start + 5000);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const loop = (now: number) => {
      if (visible) draw(now);
      raf = requestAnimationFrame(loop);
    };
    if (!reduce) raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(canvas);

    // Listen on the hero section so the text layer above doesn't block the lens.
    const host = canvas.closest("section") ?? canvas.parentElement!;
    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.tx = e.clientX - r.left;
      pointer.ty = e.clientY - r.top;
      pointer.ton = 1;
      if (pointer.x < -1000) {
        pointer.x = pointer.tx;
        pointer.y = pointer.ty;
      }
    };
    const leave = () => {
      pointer.ton = 0;
    };
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
    };
  }, [lines, highlight, readout, intensity]);

  return (
    <div className={`wavefield ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} />
      {readout && (
        <>
          <span ref={dotRef} className="wave-dot" />
          <div ref={tipRef} className="wave-tip" />
        </>
      )}
    </div>
  );
}
