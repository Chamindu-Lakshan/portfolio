"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  QrCode,
  ScanText,
  Binary,
  ArrowRight,
  Wrench,
} from "lucide-react";
import { tools, toolCategoryLabels, type ToolCategory } from "@/lib/data";
import SpotlightCard from "@/components/ui/SpotlightCard";

/* ── Icon resolver ───────────────────────────────────── */

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  QrCode,
  ScanText,
  Binary,
};

function ToolIcon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Icon = iconMap[name] ?? Wrench;
  return <Icon className={className} />;
}

/* ── Category filter buttons ─────────────────────────── */

const categories: ToolCategory[] = ["all", "text", "image", "developer", "pdf"];

function CategoryFilters({
  active,
  onChange,
}: {
  active: ToolCategory;
  onChange: (c: ToolCategory) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
            active === cat
              ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
              : "border border-zinc-200 bg-white text-zinc-600 hover:border-violet-200 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-violet-800 dark:hover:text-violet-400"
          }`}
        >
          {toolCategoryLabels[cat]}
        </button>
      ))}
    </div>
  );
}

/* ── Tool card ───────────────────────────────────────── */

function ToolCard({ tool }: { tool: (typeof tools)[number] }) {
  return (
    <SpotlightCard className="rounded-2xl">
      <Link
        href={`/tools/${tool.slug}`}
        className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-violet-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-800"
      >
        {/* Gradient icon badge */}
        <div
          className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-white shadow-lg`}
        >
          <ToolIcon name={tool.icon} className="h-6 w-6" />
        </div>

        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
          {tool.name}
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {tool.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-sm font-medium text-violet-600 transition-colors group-hover:gap-3 dark:text-violet-400">
          Open tool
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </div>

        {/* Status badge */}
        {tool.status === "coming-soon" && (
          <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/40 dark:text-amber-400">
            Coming Soon
          </span>
        )}
      </Link>
    </SpotlightCard>
  );
}

/* ── Page ────────────────────────────────────────────── */

export default function ToolsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<ToolCategory>("all");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        category === "all" || tool.category === category;
      const matchesSearch =
        search.trim() === "" ||
        tool.name.toLowerCase().includes(search.toLowerCase()) ||
        tool.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            <Wrench className="h-4 w-4" />
            Everyday Utility Hub
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            Tools &amp; Utilities
          </h1>
          <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
            Free, fast, browser-based tools for developers and everyday use.
            No sign-up, no tracking.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search tools…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 transition-colors focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-violet-600 dark:focus:ring-violet-600/20"
            />
          </div>

          {/* Category filters */}
          <CategoryFilters active={category} onChange={setCategory} />
        </div>

        {/* Tools grid */}
        {filteredTools.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 py-20 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
            <Search className="mb-4 h-10 w-10 text-zinc-300 dark:text-zinc-600" />
            <p className="text-lg font-medium text-zinc-500 dark:text-zinc-400">
              No tools match your search.
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              Try a different keyword or clear the filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
