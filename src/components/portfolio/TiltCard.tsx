import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 7}deg) rotateY(${px * 9}deg) translateY(-6px)`;
    el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(900px) rotateX(0) rotateY(0) translateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("tilt-card group", className)}
    >
      {children}
    </div>
  );
}
