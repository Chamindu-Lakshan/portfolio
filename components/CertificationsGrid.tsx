"use client";

import { useState, useEffect, useCallback } from "react";
import { Award, X, Download, ExternalLink, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import type { Certification } from "@/lib/data";

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

function isImage(path: string) {
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(path);
}

/* ── Inline PDF Viewer ────────────────────────────────── */

function PdfViewer({ url }: { url: string }) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(0);
  const [loadError, setLoadError] = useState(false);

  function onDocumentLoadSuccess({ numPages: total }: { numPages: number }) {
    setNumPages(total);
    setPageNumber(1);
    setLoadError(false);
  }

  function onDocumentLoadError() {
    setLoadError(true);
  }

  if (loadError) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-zinc-500 dark:text-zinc-400">
        <Award className="h-12 w-12 text-amber-500" />
        <p>Unable to render this PDF inline.</p>
        <a
          href={url}
          download
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
        >
          Download Certificate
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full overflow-auto"
        ref={(el) => {
          if (el && containerWidth !== el.clientWidth) {
            setContainerWidth(el.clientWidth);
          }
        }}
      >
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={
            <div className="flex h-[60vh] items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth > 0 ? containerWidth : 600}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {numPages > 1 && (
        <div className="mt-3 flex items-center gap-4">
          <button
            type="button"
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber((p) => p - 1)}
            className="rounded-lg border border-zinc-300 p-1.5 transition-colors hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {pageNumber} of {numPages}
          </span>
          <button
            type="button"
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber((p) => p + 1)}
            className="rounded-lg border border-zinc-300 p-1.5 transition-colors hover:bg-zinc-100 disabled:opacity-40 dark:border-zinc-600 dark:hover:bg-zinc-800"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function CertificationsGrid({
  certifications,
}: {
  certifications: Certification[];
}) {
  const [selected, setSelected] = useState<Certification | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [closeModal]);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      {/* Certificate Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {certifications.map((cert) => (
          <button
            key={cert.id}
            type="button"
            onClick={() => setSelected(cert)}
            className="flex cursor-pointer items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 text-left transition-all hover:border-violet-300 hover:shadow-md hover:shadow-violet-100 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-700 dark:hover:shadow-violet-950/30"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/40">
              <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
                {cert.title}
              </h3>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                {cert.issuer} · {cert.date}
              </p>
              <p className="mt-2 text-xs font-medium text-violet-600 dark:text-violet-400">
                Click to view certificate →
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.title} certificate`}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-700 dark:bg-zinc-900">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-zinc-200 px-6 py-4 dark:border-zinc-700">
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                  {selected.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {selected.issuer} · {selected.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {/* Download Button */}
                <a
                  href={selected.image}
                  download
                  className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3 py-1.5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download
                </a>
                {/* Verify Button */}
                {selected.url && (
                  <a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-lg bg-violet-50 px-3 py-1.5 text-sm font-medium text-violet-700 transition-colors hover:bg-violet-100 dark:bg-violet-950/50 dark:text-violet-300 dark:hover:bg-violet-950"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Verify
                  </a>
                )}
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Certificate Viewer */}
            <div className="flex-1 overflow-auto p-4">
              {isImage(selected.image) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={selected.image}
                  alt={`${selected.title} certificate`}
                  className="mx-auto max-h-[70vh] w-auto rounded-lg object-contain"
                />
              ) : (
                <PdfViewer url={selected.image} />
              )}
            </div>

            {/* Verification Footer */}
            {selected.verificationCode && (
              <div className="border-t border-zinc-200 bg-zinc-50 px-6 py-4 dark:border-zinc-700 dark:bg-zinc-800/50">
                <div className="flex items-center gap-4">
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                    <span className="shrink-0 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Verification Code:
                    </span>
                    <code className="truncate rounded-md bg-zinc-200 px-2 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200">
                      {selected.verificationCode}
                    </code>
                  </div>
                  {selected.url && (
                    <div className="shrink-0 rounded-lg bg-white p-1.5 shadow-sm dark:bg-zinc-900">
                      <QRCodeSVG
                        value={selected.url}
                        size={64}
                        bgColor="transparent"
                        fgColor="currentColor"
                        className="text-zinc-900 dark:text-zinc-100"
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
