"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Copy,
  Check,
  Binary,
  ArrowRightLeft,
  AlertTriangle,
} from "lucide-react";

/* ── Types ───────────────────────────────────────────── */

type Mode = "encode" | "decode";

/* ── Page ────────────────────────────────────────────── */

export default function Base64EncoderPage() {
  const [mode, setMode] = useState<Mode>("encode");
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  /* ── Conversion ────────────────────────────────────── */

  const { result, error } = useMemo(() => {
    if (!input.trim()) return { result: "", error: null };

    try {
      if (mode === "encode") {
        return {
          result: btoa(
            /* Support full Unicode by encoding to UTF-8 byte sequence */
            encodeURIComponent(input).replace(
              /%([0-9A-F]{2})/g,
              (_, p1: string) => String.fromCharCode(parseInt(p1, 16))
            )
          ),
          error: null,
        };
      } else {
        return {
          result: decodeURIComponent(
            atob(input.trim())
              .split("")
              .map(
                (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
              )
              .join("")
          ),
          error: null,
        };
      }
    } catch {
      return {
        result: "",
        error:
          mode === "decode"
            ? "Invalid Base64 — make sure the input is correctly encoded."
            : "Could not encode this text.",
      };
    }
  }, [input, mode]);

  /* ── Copy ──────────────────────────────────────────── */

  const handleCopy = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard API unavailable */
    }
  }, [result]);

  /* ── Swap input/output ─────────────────────────────── */

  const handleSwap = useCallback(() => {
    if (result) {
      setInput(result);
      setMode((prev) => (prev === "encode" ? "decode" : "encode"));
    }
  }, [result]);

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
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-700 dark:border-orange-800 dark:bg-orange-950/50 dark:text-orange-300">
            <Binary className="h-4 w-4" />
            Developer Tool
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Base64 Encoder / Decoder
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Encode and decode Base64 strings instantly. 100% browser-based — no
            data leaves your device.
          </p>
        </div>

        {/* Mode toggle */}
        <div className="mb-8 flex items-center gap-2">
          {(["encode", "decode"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                mode === m
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/25"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-orange-200 hover:text-orange-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-orange-800 dark:hover:text-orange-400"
              }`}
            >
              {m === "encode" ? "Encode" : "Decode"}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="b64-input"
              className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              {mode === "encode" ? "Plain Text" : "Base64 String"}
            </label>
            <textarea
              id="b64-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Type or paste text to encode…"
                  : "Paste a Base64 string to decode…"
              }
              rows={10}
              spellCheck={false}
              className="flex-1 resize-y rounded-xl border border-zinc-200 bg-white px-4 py-3 font-mono text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-orange-600 dark:focus:ring-orange-600/20"
            />
          </div>

          {/* Output */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                {mode === "encode" ? "Base64 Output" : "Decoded Text"}
              </span>

              <div className="flex items-center gap-2">
                {/* Swap button */}
                <button
                  onClick={handleSwap}
                  disabled={!result}
                  title="Swap input ↔ output"
                  className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-orange-500 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
                >
                  <ArrowRightLeft className="h-4 w-4" />
                </button>

                {/* Copy button */}
                <button
                  onClick={handleCopy}
                  disabled={!result}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-orange-600 disabled:opacity-30 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-orange-400"
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
            </div>

            <pre className="min-h-[240px] flex-1 overflow-auto rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 font-mono text-sm break-all whitespace-pre-wrap text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200">
              {error ? (
                <span className="flex items-start gap-2 text-red-500 dark:text-red-400">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </span>
              ) : result ? (
                result
              ) : (
                <span className="text-zinc-400 dark:text-zinc-600">
                  {mode === "encode"
                    ? "Encoded Base64 will appear here…"
                    : "Decoded text will appear here…"}
                </span>
              )}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
