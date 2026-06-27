"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

/* ── Phantom Glows ─────────────────────────────────────
   3 large blurred orbs that randomly reposition and
   pulse opacity on staggered intervals, creating a
   slow "breathing machine" ambience.
   ───────────────────────────────────────────────────── */

interface Orb {
  id: number;
  baseX: number;
  baseY: number;
  size: number;
  color: string;
  interval: number; // ms between repositions
}

const ORBS: Orb[] = [
  {
    id: 0,
    baseX: 15,
    baseY: 20,
    size: 500,
    color: "radial-gradient(circle, rgba(124,58,237,0.35) 0%, transparent 70%)",
    interval: 7000,
  },
  {
    id: 1,
    baseX: 70,
    baseY: 60,
    size: 450,
    color: "radial-gradient(circle, rgba(6,182,212,0.22) 0%, transparent 70%)",
    interval: 9000,
  },
  {
    id: 2,
    baseX: 45,
    baseY: 80,
    size: 400,
    color: "radial-gradient(circle, rgba(168,85,247,0.28) 0%, transparent 70%)",
    interval: 11000,
  },
];

function GlowOrb({ orb }: { orb: Orb }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0.15);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const drift = () => {
      const newX = (Math.random() - 0.5) * 300;
      const newY = (Math.random() - 0.5) * 300;
      const newOpacity = 0.1 + Math.random() * 0.25;

      animate(x, newX, { duration: orb.interval / 1000, ease: "easeInOut" });
      animate(y, newY, { duration: orb.interval / 1000, ease: "easeInOut" });
      animate(opacity, newOpacity, {
        duration: orb.interval / 2000,
        ease: "easeInOut",
      });
    };

    /* Initial pulse */
    drift();
    intervalRef.current = setInterval(drift, orb.interval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [x, y, opacity, orb.interval]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute rounded-full blur-[120px]"
      style={{
        left: `${orb.baseX}%`,
        top: `${orb.baseY}%`,
        width: orb.size,
        height: orb.size,
        background: orb.color,
        x,
        y,
        opacity,
      }}
    />
  );
}

export default function PhantomGlows() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden"
    >
      {ORBS.map((orb) => (
        <GlowOrb key={orb.id} orb={orb} />
      ))}
    </div>
  );
}
