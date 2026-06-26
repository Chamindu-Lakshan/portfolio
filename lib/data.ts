// ─────────────────────────────────────────────────────────
//  wickramasingha.dev — Centralised Data Architecture
// ─────────────────────────────────────────────────────────

/* ── Types ────────────────────────────────────────────── */

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  university: string;
  faculty: string;
  year: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  department: string;
  period: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  highlights: string[];
  category: string;
  liveUrl?: string;
  repoUrl?: string;
}

export type ToolCategory = "all" | "text" | "image" | "developer";

export interface Tool {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;          // Lucide icon name
  color: string;         // Tailwind gradient classes
  status: "active" | "coming-soon";
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

/* ── Profile ──────────────────────────────────────────── */

export const profile: Profile = {
  name: "Chamindu Lakshan Wickramasinghe",
  title: "Full Stack Developer",
  tagline: "Crafting seamless digital experiences from concept to deployment.",
  bio: "Full Stack Developer and 3rd-Year BSc (Hons) Computer Science student at the University of Colombo, Faculty of Science. Passionate about building performant web applications, cloud-based automation systems, and developer tooling that makes everyday life easier.",
  university: "University of Colombo",
  faculty: "Faculty of Science",
  year: "3rd Year",
  email: "chamindu@wickramasingha.dev",
  github: "https://github.com/chamindu-wickramasinghe",
  linkedin: "https://linkedin.com/in/chamindu-wickramasinghe",
  location: "Colombo, Sri Lanka",
};

/* ── Social Links ─────────────────────────────────────── */

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: profile.github, icon: "Github" },
  { platform: "LinkedIn", url: profile.linkedin, icon: "Linkedin" },
  { platform: "Email", url: `mailto:${profile.email}`, icon: "Mail" },
];

/* ── Experience ───────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    id: "finetech-intern",
    company: "Finetech",
    role: "Software Engineering Intern",
    department: "Business and Services Department",
    period: "2024 — Present",
    description:
      "Contributing to cloud-based business process automation solutions within the Business and Services Department, focusing on enterprise document and service management workflows.",
    highlights: [
      "Led modifications to the Letter Management System, streamlining organisational letter drafting, approval routing, and archival processes.",
      "Enhanced the Internal Service Request Management System with improved request tracking, automated notifications, and multi-level approval workflows.",
      "Collaborated with cross-functional teams to gather requirements and translate business needs into scalable technical solutions.",
      "Adopted cloud-native tooling and CI/CD practices to deliver reliable, zero-downtime deployments.",
    ],
    technologies: [
      "Cloud Platforms",
      "Business Process Automation",
      "Workflow Engines",
      "REST APIs",
      "Database Design",
    ],
  },
];

/* ── Featured Projects ────────────────────────────────── */

export const projects: Project[] = [
  {
    id: "eduscore",
    title: "EduScore",
    description:
      "A comprehensive school grading and evidence review platform built with Next.js and Supabase.",
    longDescription:
      "EduScore streamlines the academic grading process for schools by providing a modern interface for teachers to assign grades, upload evidence of student work, and generate insightful performance reports. Built on Next.js with Supabase as the backend, it offers real-time collaboration, role-based access control, and an intuitive dashboard for administrators.",
    techStack: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PostgreSQL"],
    highlights: [
      "Real-time grade entry with instant feedback and validation.",
      "Evidence upload system supporting images, PDFs, and documents.",
      "Role-based dashboards for teachers, administrators, and parents.",
      "Automated report generation with exportable PDF summaries.",
    ],
    category: "Web Application",
  },
  {
    id: "avurudu-arcade",
    title: "Avurudu Arcade",
    description:
      "An interactive collection of traditional Sinhala & Tamil New Year games built with React and Phaser.js.",
    longDescription:
      "Avurudu Arcade brings beloved traditional Sri Lankan New Year games to the browser with engaging animations and authentic gameplay. Players can enjoy Kana Muttiya (pot breaking), Olinda Keliya (mancala), and Pancha Keliya (five-seed game) — all faithfully recreated with modern web technologies and culturally rich visuals.",
    techStack: ["React", "Phaser.js", "TypeScript", "Vite", "CSS Animations"],
    highlights: [
      "Three fully playable traditional games with authentic rules and scoring.",
      "Immersive animations and culturally inspired visual design.",
      "Responsive gameplay that works seamlessly on desktop and mobile.",
      "Sound effects and celebratory animations for game milestones.",
    ],
    category: "Game / Interactive",
  },
  {
    id: "tender-management",
    title: "Tender Management System",
    description:
      "A no-code/low-code tender workflow tool built on Google AppSheet with a 21-step approval process.",
    longDescription:
      "A comprehensive tender management solution built on Google AppSheet that orchestrates a complex 21-step workflow with multi-stage approval logic. The system manages the full tender lifecycle — from initial bid publication and vendor submission through evaluation, scoring, negotiation, and final award — with automated notifications, deadline tracking, and audit trails at every step.",
    techStack: ["Google AppSheet", "Google Sheets", "Apps Script", "Workflow Automation"],
    highlights: [
      "21-step workflow covering the complete tender lifecycle.",
      "Multi-stage approval logic with role-based routing and escalation.",
      "Automated email and in-app notifications for pending actions.",
      "Comprehensive audit trail and document versioning.",
    ],
    category: "Enterprise / Automation",
  },
];

/* ── Tools Hub ────────────────────────────────────────── */

export const tools: Tool[] = [
  {
    id: "qr-code-generator",
    slug: "qr-code-generator",
    name: "QR Code Generator",
    description:
      "Generate customisable QR codes instantly for URLs, text, Wi-Fi credentials, and more. Download in PNG or SVG.",
    category: "developer",
    icon: "QrCode",
    color: "from-violet-500 to-purple-600",
    status: "active",
  },
  {
    id: "image-text-reader",
    slug: "image-text-reader",
    name: "Image Text Reader (OCR)",
    description:
      "Extract text from images and screenshots using client-side OCR. Supports multiple languages and exports clean text.",
    category: "image",
    icon: "ScanText",
    color: "from-emerald-500 to-teal-600",
    status: "active",
  },
  {
    id: "base64-encoder",
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description:
      "Encode and decode Base64 strings and files directly in your browser. Supports text and file conversion with instant preview.",
    category: "developer",
    icon: "Binary",
    color: "from-orange-500 to-amber-600",
    status: "active",
  },
];

/* ── Certifications ───────────────────────────────────── */

export const certifications: Certification[] = [
  {
    id: "meta-frontend",
    title: "Meta Front-End Developer Professional Certificate",
    issuer: "Meta (via Coursera)",
    date: "2024",
  },
  {
    id: "google-cloud",
    title: "Google Cloud Fundamentals: Core Infrastructure",
    issuer: "Google Cloud",
    date: "2024",
  },
];

/* ── Utility: Tool category labels ────────────────────── */

export const toolCategoryLabels: Record<ToolCategory, string> = {
  all: "All Tools",
  text: "Text",
  image: "Image",
  developer: "Developer",
};
