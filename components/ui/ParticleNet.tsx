"use client";

import { useEffect, useRef } from "react";
import { tsParticles } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

/* ── Optimised particle constellation background ───────
   Ultra-low density (30), dimmed cyberpunk palette,
   agonising drift speed, zero cursor interaction.
   Sits at z-[-20] behind text, cards & PhantomGlows.
   ───────────────────────────────────────────────────── */

const PARTICLE_CONFIG: ISourceOptions = {
  fullScreen: false,
  fpsLimit: 30,
  particles: {
    number: {
      value: 30,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: {
      value: ["#a855f7", "#06b6d4", "#7c3aed"],
    },
    opacity: {
      value: 0.2,
    },
    size: {
      value: { min: 1, max: 2.5 },
    },
    links: {
      enable: true,
      distance: 160,
      color: "#a855f7",
      opacity: 0.08,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.4,
      direction: "none",
      random: true,
      straight: false,
      outModes: { default: "out" },
    },
  },
  interactivity: {
    events: {
      onHover: { enable: false },
      onClick: { enable: false },
    },
  },
  detectRetina: true,
  background: { color: "transparent" },
};

export default function ParticleNet() {
  const containerRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;

    let destroyed = false;

    const init = async () => {
      await loadSlim(tsParticles);
      if (destroyed) return;

      await tsParticles.load({
        id: "particle-net",
        options: PARTICLE_CONFIG,
      });
    };

    init();

    return () => {
      destroyed = true;
      tsParticles.dom().forEach((c) => {
        if (c.id === "particle-net") c.destroy();
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="particle-net"
      className="pointer-events-none fixed inset-0 -z-20"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0px, transparent 300px, black 550px)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0px, transparent 300px, black 550px)",
      }}
    />
  );
}
