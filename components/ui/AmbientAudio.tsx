"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";

/* ── Ambient audio widget ──────────────────────────────
   Fixed bottom-right floating button that toggles a
   placeholder ambient audio track. Defaults to paused.
   Icon pulses with a purple glow when playing.
   ───────────────────────────────────────────────────── */

const AUDIO_SRC = "/audio/ambient-placeholder.mp3";

export default function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  /* Create the Audio element once on mount */
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.3;
    audio.preload = "none";
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        /* Autoplay blocked — silently fail */
      });
      setIsPlaying(true);
    }
    setHasInteracted(true);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-600 shadow-lg backdrop-blur-md transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900/90 dark:text-zinc-400 dark:hover:border-violet-700 dark:hover:text-violet-400"
        aria-label={isPlaying ? "Pause ambient audio" : "Play ambient audio"}
      >
        {/* Pulsing glow ring when playing */}
        <AnimatePresence>
          {isPlaying && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: "0 0 20px 4px rgba(124,58,237,0.35)",
              }}
            />
          )}
        </AnimatePresence>

        {/* Icon */}
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.span
              key="playing"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Music className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            </motion.span>
          ) : (
            <motion.span
              key="paused"
              initial={{ scale: 0, rotate: 90 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: -90 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {hasInteracted ? (
                <VolumeX className="h-5 w-5" />
              ) : (
                <Music className="h-5 w-5" />
              )}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Tooltip on first visit */}
      <AnimatePresence>
        {!hasInteracted && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ delay: 2, duration: 0.4 }}
            className="absolute bottom-1 right-14 whitespace-nowrap rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600 shadow-md dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
          >
            Ambient vibes 🎵
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
