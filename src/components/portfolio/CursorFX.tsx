import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: a small solid dot that tracks instantly and a larger ring
 * that eases behind it. Grows on interactive elements. Disabled on touch and
 * for reduced-motion users.
 */
export function CursorFX() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest("a, button, input, textarea, [data-cursor]");
      ring.current?.classList.toggle("is-active", interactive);
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    document.documentElement.classList.add("has-custom-cursor");
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div ref={ring} aria-hidden="true" className="cursor-ring" />
      <div ref={dot} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
