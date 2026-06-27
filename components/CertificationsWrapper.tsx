"use client";

import dynamic from "next/dynamic";
import type { Certification } from "@/lib/data";

const CertificationsGrid = dynamic(() => import("./CertificationsGrid"), {
  ssr: false,
  loading: () => (
    <div className="grid gap-4 sm:grid-cols-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="flex animate-pulse items-start gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="h-10 w-10 shrink-0 rounded-xl bg-zinc-200 dark:bg-zinc-700" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
            <div className="h-3 w-1/2 rounded bg-zinc-200 dark:bg-zinc-700" />
          </div>
        </div>
      ))}
    </div>
  ),
});

export default function CertificationsWrapper({
  certifications,
}: {
  certifications: Certification[];
}) {
  return <CertificationsGrid certifications={certifications} />;
}
