import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Chamindu Wickramasinghe — Full Stack Developer",
    template: "%s | wickramasingha.dev",
  },
  description:
    "Portfolio and Everyday Utility Hub by Chamindu Lakshan Wickramasinghe — Full Stack Developer crafting performant web applications and developer tools.",
  metadataBase: new URL("https://wickramasingha.dev"),
  openGraph: {
    title: "Chamindu Wickramasinghe — Full Stack Developer",
    description:
      "Portfolio and Everyday Utility Hub by Chamindu Lakshan Wickramasinghe.",
    url: "https://wickramasingha.dev",
    siteName: "wickramasingha.dev",
    locale: "en_US",
    type: "website",
  },
};

/* ── Navigation ──────────────────────────────────────── */

function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight text-zinc-900 transition-colors hover:text-violet-600 dark:text-zinc-100 dark:hover:text-violet-400"
        >
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 text-xs font-black text-white shadow-md shadow-violet-600/20">
            CW
          </span>
          <span className="hidden sm:inline">wickramasingha.dev</span>
        </Link>

        <div className="flex items-center gap-1">
          <NavLink href="/" label="Home" />
          <NavLink href="/tools" label="Tools" />
        </div>
      </nav>
    </header>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    >
      {label}
    </Link>
  );
}

/* ── Footer ──────────────────────────────────────────── */

function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-10 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          &copy; {new Date().getFullYear()} Chamindu Wickramasinghe. Built with
          Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          <FooterLink href="https://github.com/chamindu-wickramasinghe" label="GitHub" />
          <FooterLink href="https://linkedin.com/in/chamindu-wickramasinghe" label="LinkedIn" />
          <FooterLink href="mailto:chamindu@wickramasingha.dev" label="Email" />
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      className="text-sm text-zinc-500 transition-colors hover:text-violet-600 dark:text-zinc-400 dark:hover:text-violet-400"
    >
      {label}
    </a>
  );
}

/* ── Root Layout ─────────────────────────────────────── */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
