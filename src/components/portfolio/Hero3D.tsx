import { useEffect, useRef } from "react";

/**
 * Pure-CSS 3D hero decoration: a rotating wireframe cube, an orbiting ring
 * and floating glass tiles. Parallax reacts to pointer position.
 */
export function Hero3D() {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const px = e.clientX / window.innerWidth - 0.5;
      const py = e.clientY / window.innerHeight - 0.5;
      el.style.setProperty("--px", String(px));
      el.style.setProperty("--py", String(py));
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div ref={stage} aria-hidden="true" className="scene-3d">
      <div className="scene-3d-inner">
        <div className="cube-3d">
          {["front", "back", "right", "left", "top", "bottom"].map((f) => (
            <span key={f} className={`cube-face cube-${f}`} />
          ))}
        </div>
        <div className="ring-3d ring-a" />
        <div className="ring-3d ring-b" />
        <div className="tile-3d tile-a">FastAPI</div>
        <div className="tile-3d tile-b">Python</div>
        <div className="tile-3d tile-c">MySQL</div>
        <div className="tile-3d tile-d">JavaScript</div>
      </div>
    </div>
  );
}
