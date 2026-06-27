"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";

/* ── Spotlight Card ────────────────────────────────────
   Tracks local cursor position and renders a radial
   gradient "flashlight" that follows the mouse along
   the card border, creating a sci-fi glow effect.
   ───────────────────────────────────────────────────── */

interface SpotlightCardProps {
  children: ReactNode;
  /** Extra classes on the outer wrapper */
  className?: string;
  /** Spotlight color (CSS color string) */
  color?: string;
}

export default function SpotlightCard({
  children,
  className = "",
  color = "rgba(124,58,237,0.30)",
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    },
    []
  );

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden ${className}`}
      style={
        {
          "--spotlight-x": `${pos.x}px`,
          "--spotlight-y": `${pos.y}px`,
          "--spotlight-color": color,
        } as React.CSSProperties
      }
    >
      {/* Spotlight border glow — only visible on hover */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(650px circle at var(--spotlight-x) var(--spotlight-y), var(--spotlight-color), transparent 40%)`,
          mixBlendMode: "screen" as const,
        }}
      />

      {/* Thin bright border ring for extra punch */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(400px circle at var(--spotlight-x) var(--spotlight-y), rgba(168,85,247,0.4), transparent 35%)`,
          maskImage:
            "linear-gradient(black, black) content-box, linear-gradient(black, black)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Card content sits above the spotlight layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
