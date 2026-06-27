"use client";

import { useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";

/* ── Mouse-tracking glow effect ────────────────────────
   A soft purple radial gradient that follows the cursor
   with a fluid, lagging "breathing" motion powered by
   Framer Motion's useSpring.
   ───────────────────────────────────────────────────── */

export default function MouseGlow() {
  const [mounted, setMounted] = useState(false);

  /* Spring-animated x/y for smooth, lagging follow */
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouse = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [x, y]);

  /* Don't render on server or before first paint */
  if (!mounted) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      style={{ x, y }}
    >
      {/* The glow orb — centered on the spring-animated point */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(124,58,237,0.08) 0%, rgba(124,58,237,0.03) 35%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
