import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  ExternalLink,
  MapPin,
  Sparkles,
  Award,
  ChevronRight,
  Download,
  Code,
  Phone,
} from "lucide-react";
import {
  profile,
  experiences,
  projects,
  certifications,
  skills,
} from "@/lib/data";
import CertificationsWrapper from "@/components/CertificationsWrapper";

/* ─────────────────────────────────────────────────────────
   Section wrapper component
   ───────────────────────────────────────────────────────── */

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-lg text-zinc-600 dark:text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Hero Section
   ───────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24">
      {/* Subtle gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-violet-100/60 to-transparent blur-3xl dark:from-violet-950/30" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
          {/* Text content */}
          <div className="flex-1">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
              <Sparkles className="h-4 w-4" />
              Open to opportunities
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-zinc-50">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                Chamindu
              </span>
            </h1>

            <p className="mt-2 text-xl font-semibold text-zinc-700 sm:text-2xl dark:text-zinc-300">
              {profile.title}
            </p>

            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {profile.tagline}
            </p>

            <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
              <GraduationCap className="h-4 w-4" />
              <span>
                {profile.year} — {profile.university}, {profile.faculty}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
              <MapPin className="h-4 w-4" />
              <span>{profile.location}</span>
            </div>
            <div className="mt-1.5 flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-500">
              <Phone className="h-4 w-4" />
              <span>{profile.phone}</span>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:shadow-xl hover:shadow-violet-600/30 hover:brightness-110 active:scale-[0.98]"
              >
                Explore Everyday Utilities &amp; Tools Hub
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                Get in Touch
              </a>
              <a
                href="/cv-chamindu-wickramasinghe.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-300 bg-white px-7 py-3.5 text-sm font-semibold text-zinc-700 transition-all hover:border-zinc-400 hover:bg-zinc-50 active:scale-[0.98] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </div>
          </div>

          {/* Profile photo */}
          <div className="hidden lg:block">
            <div className="relative h-72 w-72">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-2xl shadow-violet-600/20" />
              <div className="absolute inset-1 overflow-hidden rounded-[20px]">
                <Image
                  src="/images/profile-color.png"
                  alt="Chamindu Lakshan Wickramasinghe"
                  fill
                  sizes="280px"
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Experience Section
   ───────────────────────────────────────────────────────── */

function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Professional Experience"
      subtitle="Where I've been building and learning."
    >
      <div className="space-y-8">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group relative rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-violet-200 hover:shadow-md sm:p-8 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-800"
          >
            {/* Gradient accent bar */}
            <div className="absolute left-0 top-0 h-full w-1 rounded-l-2xl bg-gradient-to-b from-violet-500 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/50">
                    <Briefcase className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-medium text-violet-600 dark:text-violet-400">
                      {exp.company} — {exp.department}
                    </p>
                  </div>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-zinc-100 px-4 py-1.5 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                {exp.period}
              </span>
            </div>

            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              {exp.description}
            </p>

            <ul className="mt-4 space-y-2">
              {exp.highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:bg-violet-950/50 dark:text-violet-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Projects Section
   ───────────────────────────────────────────────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <div className="group relative flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-violet-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-violet-800">
      {/* Project number accent */}
      <span className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 text-xs font-bold text-white shadow-sm">
        {String(index + 1).padStart(2, "0")}
      </span>

      <span className="mb-2 text-xs font-semibold uppercase tracking-wider text-violet-600 dark:text-violet-400">
        {project.category}
      </span>

      <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
        {project.title}
      </h3>

      <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {project.description}
      </p>

      <ul className="mt-4 space-y-1.5">
        {project.highlights.slice(0, 3).map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-xs text-zinc-500 dark:text-zinc-500"
          >
            <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-violet-500" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Link placeholder */}
      <div className="mt-5 flex items-center gap-3 border-t border-zinc-100 pt-4 dark:border-zinc-800">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-violet-600 transition-colors hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Live Demo
          </a>
        )}
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            Source Code
          </a>
        )}
      </div>
    </div>
  );
}

function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Featured Projects"
      subtitle="A selection of projects I've built and shipped."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Skills Section
   ───────────────────────────────────────────────────────── */

function SkillsSection() {
  return (
    <Section
      id="skills"
      title="Technical Skills"
      subtitle="Technologies and tools I work with."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((group) => (
          <div
            key={group.category}
            className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/50">
                <Code className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                {group.category}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   Certifications Section
   ───────────────────────────────────────────────────────── */

function CertificationsSection() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Professional credentials and continuous learning. Click any certificate to view it."
    >
      <CertificationsWrapper certifications={certifications} />
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   CTA Banner
   ───────────────────────────────────────────────────────── */

function CTABanner() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-purple-700 p-10 text-center shadow-2xl shadow-violet-600/20 sm:p-16">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to explore?
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-violet-100">
              Discover a growing collection of free, browser-based developer
              utilities and everyday tools — no sign-up required.
            </p>
            <Link
              href="/tools"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-violet-700 shadow-lg transition-all hover:bg-violet-50 hover:shadow-xl active:scale-[0.98]"
            >
              Explore Everyday Utilities &amp; Tools Hub
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   Home Page
   ───────────────────────────────────────────────────────── */

export default function Home() {
  return (
    <>
      <HeroSection />

      <div className="section-divider mx-auto max-w-4xl" />

      <ExperienceSection />

      <div className="section-divider mx-auto max-w-4xl" />

      <ProjectsSection />

      <div className="section-divider mx-auto max-w-4xl" />

      <SkillsSection />

      <div className="section-divider mx-auto max-w-4xl" />

      <CertificationsSection />

      <CTABanner />
    </>
  );
}
