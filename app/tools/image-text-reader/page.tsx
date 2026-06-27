"use client";

import { useState, useCallback, useRef, type DragEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  ScanText,
  Upload,
  X,
  Loader2,
} from "lucide-react";
import Tesseract from "tesseract.js";

/* ── Types ───────────────────────────────────────────── */

type Status = "idle" | "loading" | "done";

/* ── Page ────────────────────────────────────────────── */

export default function ImageTextReaderPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [progress, setProgress] = useState(0);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* ── Run OCR ───────────────────────────────────────── */

  const runOcr = useCallback(async (file: File) => {
    setStatus("loading");
    setProgress(0);
    setExtractedText("");
    setError(null);

    /* Show preview */
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);

    try {
      const {
        data: { text },
      } = await Tesseract.recognize(file, "eng", {
        logger: (info) => {
          if (info.status === "recognizing text") {
            setProgress(Math.round(info.progress * 100));
          }
        },
      });

      setExtractedText(text.trim());
      setStatus("done");
    } catch {
      setError("OCR failed — please try a clearer image.");
      setStatus("idle");
    }
  }, []);

  /* ── File input handler ────────────────────────────── */

  const handleFile = useCallback(
    (file: File | undefined) => {
      if (!file) return;
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setError("Please upload a PNG or JPG image.");
        return;
      }
      runOcr(file);
    },
    [runOcr]
  );

  /* ── Drag & drop ───────────────────────────────────── */

  const onDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => setIsDragging(false), []);

  const onDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFile(e.dataTransfer.files?.[0]);
    },
    [handleFile]
  );

  /* ── Copy ──────────────────────────────────────────── */

  const handleCopy = useCallback(async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API unavailable */
    }
  }, [extractedText]);

  /* ── Reset ─────────────────────────────────────────── */

  const handleReset = useCallback(() => {
    setStatus("idle");
    setProgress(0);
    setImageSrc(null);
    setExtractedText("");
    setError(null);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Back link */}
        <Link
          href="/tools"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tools
        </Link>

        {/* Header */}
        <div className="mb-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300">
            <ScanText className="h-4 w-4" />
            Image Tool
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Image Text Reader (OCR)
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Extract text from images using client-side OCR. Nothing leaves your
            browser.
          </p>
        </div>

        {/* Drop zone (idle / loading) */}
        {status === "idle" && (
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => inputRef.current?.click()}
            className={`flex cursor-pointer flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed px-6 py-20 text-center transition-all ${
              isDragging
                ? "border-emerald-500 bg-emerald-500/5"
                : "border-zinc-300 hover:border-emerald-400 hover:bg-emerald-50/50 dark:border-zinc-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/20"
            }`}
          >
            <Upload className="h-10 w-10 text-zinc-400 dark:text-zinc-500" />
            <div>
              <p className="text-sm font-medium text-zinc-700 dark:text-zinc-200">
                Drag &amp; drop an image here
              </p>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                or click to browse — PNG, JPG accepted
              </p>
            </div>
            {error && (
              <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
            )}
            <input
              ref={inputRef}
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => handleFile(e.target.files?.[0])}
              className="hidden"
            />
          </div>
        )}

        {/* Loading state */}
        {status === "loading" && (
          <div className="flex flex-col items-center gap-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-6 py-16 dark:border-zinc-700 dark:bg-zinc-900/60">
            {/* Spinner */}
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-emerald-500" />
              <div className="absolute inset-0 rounded-full bg-emerald-500/10 blur-xl" />
            </div>

            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
              Extracting text…
            </p>

            {/* Progress bar */}
            <div className="w-full max-w-sm overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
              {progress}%
            </span>
          </div>
        )}

        {/* Result */}
        {status === "done" && (
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Image preview */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Uploaded Image
                </span>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-red-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-400"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
              {imageSrc && (
                <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-700">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="max-h-[420px] w-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Extracted text */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Extracted Text
                </span>
                <button
                  onClick={handleCopy}
                  disabled={!extractedText}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-emerald-600 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-emerald-400"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <textarea
                value={extractedText}
                onChange={(e) => setExtractedText(e.target.value)}
                rows={14}
                className="flex-1 resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-emerald-600 dark:focus:ring-emerald-600/20"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
