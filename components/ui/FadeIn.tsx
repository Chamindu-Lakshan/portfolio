"use client";

import { motion, type Variants } from "framer-motion";

/* ── Scroll-reveal wrapper ─────────────────────────────
   Wraps children in a Framer Motion div that fades up
   when it enters the viewport. `once: true` means it
   only animates on the first scroll-in.
   ───────────────────────────────────────────────────── */

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface FadeInProps {
  children: React.ReactNode;
  /** Extra delay in seconds (stagger children) */
  delay?: number;
  /** Additional className on the wrapper div */
  className?: string;
}

export default function FadeIn({
  children,
  delay = 0,
  className,
}: FadeInProps) {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
