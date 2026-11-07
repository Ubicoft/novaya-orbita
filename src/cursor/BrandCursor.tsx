import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  'a, button, [role="button"], [role="option"], [role="menuitem"], [role="link"], label[for], .shell-btn, .glass-header__link, .glass-chip__btn, .glass-chip__option, .nav-more__button, .mobile-nav__link, .brand-logo, summary, [data-cursor="pointer"]';

const TEXTUAL = 'input, textarea, select, [contenteditable="true"]';

function canUseCustomCursor() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(pointer: fine) and (hover: hover)").matches;
}

export function BrandCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const modeRef = useRef<"default" | "pointer" | "text" | "hidden">("hidden");
  const rafRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (hover: hover)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) {
      document.documentElement.classList.remove("has-brand-cursor");
      return;
    }

    document.documentElement.classList.add("has-brand-cursor");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lerp = reduced ? 1 : 0.22;

    const setMode = (mode: typeof modeRef.current) => {
      if (modeRef.current === mode) return;
      modeRef.current = mode;
      const root = rootRef.current;
      if (!root) return;
      root.dataset.mode = mode;
    };

    const onMove = (e: PointerEvent) => {
      pos.current.tx = e.clientX;
      pos.current.ty = e.clientY;
      if (modeRef.current === "hidden") setMode("default");

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || !(el instanceof Element)) {
        setMode("default");
        return;
      }
      if (el.closest(TEXTUAL)) {
        setMode("text");
        return;
      }
      if (el.closest(INTERACTIVE)) {
        setMode("pointer");
        return;
      }
      setMode("default");
    };

    const onLeave = () => setMode("hidden");
    const onDown = () => rootRef.current?.classList.add("brand-cursor--down");
    const onUp = () => rootRef.current?.classList.remove("brand-cursor--down");

    const tick = () => {
      pos.current.x += (pos.current.tx - pos.current.x) * lerp;
      pos.current.y += (pos.current.ty - pos.current.y) * lerp;
      const root = rootRef.current;
      if (root) {
        root.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-brand-cursor");
    };
  }, [enabled]);

  if (!enabled || !canUseCustomCursor()) return null;

  return (
    <div ref={rootRef} className="brand-cursor" data-mode="hidden" aria-hidden="true">
      <span ref={ringRef} className="brand-cursor__ring" />
      <span ref={dotRef} className="brand-cursor__dot" />
    </div>
  );
}
