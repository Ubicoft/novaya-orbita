import { useEffect, useRef } from "react";
import { useTheme } from "../theme/ThemeProvider";
import type { ThemeId } from "../theme/types";

const INTERACTIVE: ThemeId[] = ["blue", "pink", "green"];

export function ThemeAmbient() {
  const { theme } = useTheme();
  const rootRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);

  const active = INTERACTIVE.includes(theme);

  useEffect(() => {
    if (!active) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root || reduce) return;

    const onMove = (event: PointerEvent) => {
      target.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.07;
      current.current.y += (target.current.y - current.current.y) * 0.07;
      const { x, y } = current.current;
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) => {
        const depth = Number(el.dataset.parallax || 1);
        el.style.transform = `translate3d(${x * 24 * depth}px, ${y * 18 * depth}px, 0)`;
      });
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [active, theme]);

  if (!active) return null;

  return (
    <div
      ref={rootRef}
      className={`theme-ambient theme-ambient--${theme}`}
      aria-hidden="true"
    >
      <div className="theme-ambient__grid" />
      <div data-parallax="1.1" className="theme-ambient__parallax">
        <div className="theme-ambient__blob theme-ambient__blob--a" />
      </div>
      <div data-parallax="-1.3" className="theme-ambient__parallax">
        <div className="theme-ambient__blob theme-ambient__blob--b" />
      </div>
      <div data-parallax="0.8" className="theme-ambient__parallax">
        <div className="theme-ambient__blob theme-ambient__blob--c" />
      </div>
      <div data-parallax="0.55" className="theme-ambient__parallax theme-ambient__orbits">
        <div className="theme-ambient__orbit theme-ambient__orbit--1">
          <span className="theme-ambient__orbit-dot" />
        </div>
        <div className="theme-ambient__orbit theme-ambient__orbit--2" />
      </div>
    </div>
  );
}
