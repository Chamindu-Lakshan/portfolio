"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface Screenshot {
  src: string;
  title: string;
}

export default function ProjectScreenshotGallery({
  projectTitle,
  screenshots,
}: {
  projectTitle: string;
  screenshots: Screenshot[];
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const closeSlideshow = () => setSelectedIndex(null);
  const showPrevious = () => {
    setSelectedIndex((current) =>
      current === null
        ? 0
        : (current - 1 + screenshots.length) % screenshots.length,
    );
  };
  const showNext = () => {
    setSelectedIndex((current) =>
      current === null ? 0 : (current + 1) % screenshots.length,
    );
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSlideshow();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        {screenshots.map((screenshot, index) => (
          <figure
            key={screenshot.src}
            className="overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group block w-full cursor-zoom-in text-left focus-visible:outline-none"
              aria-label={`Open ${screenshot.title} slideshow image`}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={screenshot.src}
                  alt={`${projectTitle} - ${screenshot.title}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 40vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <figcaption className="px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {screenshot.title}
              </figcaption>
            </button>
          </figure>
        ))}
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} screenshot slideshow`}
          onClick={closeSlideshow}
        >
          <div
            className="relative flex h-full w-full max-w-6xl flex-col items-center justify-center gap-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex w-full items-center justify-between gap-4 text-white">
              <p className="truncate text-sm font-medium sm:text-base">
                {screenshots[selectedIndex].title}
              </p>
              <span className="shrink-0 text-sm text-zinc-300">
                {selectedIndex + 1} / {screenshots.length}
              </span>
            </div>

            <div className="relative min-h-0 w-full flex-1">
              <Image
                src={screenshots[selectedIndex].src}
                alt={`${projectTitle} - ${screenshots[selectedIndex].title}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={showPrevious}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={closeSlideshow}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Close slideshow"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showNext}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Next screenshot"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
