const RING_ONE = ["Python", "JavaScript", "FastAPI", "MySQL", "REST APIs"];
const RING_TWO = ["HTML", "CSS", "SQL", "Git", "GitHub", "Postman"];

function Ring({ items, size, duration }: { items: string[]; size: number; duration: number }) {
  return (
    <div
      className="orbit-ring absolute left-1/2 top-1/2 rounded-full border border-border"
      style={{
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        animationDuration: `${duration}s`,
      }}
    >
      {items.map((item, i) => {
        const angle = (360 / items.length) * i;
        return (
          <span
            key={item}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translateX(${size / 2}px)` }}
          >
            <span className="block" style={{ transform: `rotate(${-angle}deg)` }}>
              <span
                className="orbit-chip block"
                style={{ animationDuration: `${duration}s` }}
              >
                <span className="block -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-border bg-card/85 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                  {item}
                </span>
              </span>
            </span>
          </span>
        );
      })}
    </div>
  );
}

export function SkillsOrbit() {
  return (
    <div
      aria-hidden="true"
      className="relative hidden h-[420px] w-full items-center justify-center md:flex"
    >
      <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-2xl" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-sm tracking-[0.3em] text-primary">
        STACK
      </span>
      <Ring items={RING_ONE} size={200} duration={38} />
      <Ring items={RING_TWO} size={340} duration={54} />
    </div>
  );
}
