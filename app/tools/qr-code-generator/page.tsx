"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react";
import { ArrowLeft, Download, Copy, Check, QrCode } from "lucide-react";

/* ── Constants ───────────────────────────────────────── */

const MIN_SIZE = 128;
const MAX_SIZE = 1024;
const DEFAULT_SIZE = 280;
const DEFAULT_BG = "#ffffff";
const DEFAULT_FG = "#7c3aed"; // violet-600

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

const EC_LEVELS: { value: ErrorCorrectionLevel; label: string }[] = [
  { value: "L", label: "Low" },
  { value: "M", label: "Medium" },
  { value: "Q", label: "Quartile" },
  { value: "H", label: "High" },
];

/* ── Page ────────────────────────────────────────────── */

export default function QrGeneratorPage() {
  const [text, setText] = useState("https://wickramasingha.dev");
  const [size, setSize] = useState(DEFAULT_SIZE);
  const [fgColor, setFgColor] = useState(DEFAULT_FG);
  const [bgColor, setBgColor] = useState(DEFAULT_BG);
  const [ecLevel, setEcLevel] = useState<ErrorCorrectionLevel>("M");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  /* Download QR as PNG */
  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = dataUrl;
    link.click();
  }, []);

  /* Copy QR as PNG to clipboard */
  const handleCopy = useCallback(async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const blob = await new Promise<Blob>((resolve) =>
        canvas.toBlob((b) => resolve(b!), "image/png")
      );
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API may not be available
    }
  }, []);

  const hasContent = text.trim().length > 0;

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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            <QrCode className="h-4 w-4" />
            Developer Tool
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            QR Code Generator
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Generate customisable QR codes instantly. Free, fast, and
            100% browser-based — no data leaves your device.
          </p>
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left: Controls */}
          <div className="flex flex-col gap-6">
            {/* Input */}
            <div>
              <label
                htmlFor="qr-input"
                className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                URL or Text
              </label>
              <textarea
                id="qr-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter a URL or any text…"
                rows={3}
                className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-600 dark:focus:ring-violet-600/20"
              />
            </div>

            {/* Size slider */}
            <div>
              <label className="mb-2 flex items-center justify-between text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <span>Size</span>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {size}px
                </span>
              </label>
              <input
                type="range"
                min={MIN_SIZE}
                max={MAX_SIZE}
                step={16}
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>

            {/* Error correction */}
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Error Correction
              </label>
              <div className="flex gap-2">
                {EC_LEVELS.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => setEcLevel(value)}
                    title={label}
                    className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      ecLevel === value
                        ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:border-violet-200 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-violet-800 dark:hover:text-violet-400"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Foreground
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
                  />
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {fgColor}
                  </span>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Background
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="h-10 w-10 cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
                  />
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                    {bgColor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Preview + Actions */}
          <div className="flex flex-col items-center gap-6">
            {/* QR Preview */}
            <div className="flex w-full flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
              {hasContent ? (
                <QRCodeCanvas
                  ref={canvasRef}
                  value={text}
                  size={size}
                  bgColor={bgColor}
                  fgColor={fgColor}
                  level={ecLevel}
                  includeMargin
                  className="rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <QrCode className="mb-4 h-16 w-16 text-zinc-200 dark:text-zinc-700" />
                  <p className="text-sm text-zinc-400 dark:text-zinc-500">
                    Type something to generate a QR code
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            {hasContent && (
              <div className="flex w-full gap-3">
                <button
                  onClick={handleDownload}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-600/25 transition-all hover:bg-violet-700 hover:shadow-lg active:scale-[0.98]"
                >
                  <Download className="h-4 w-4" />
                  Download PNG
                </button>
                <button
                  onClick={handleCopy}
                  className="flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition-all hover:border-violet-200 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-800 dark:hover:text-violet-400"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
