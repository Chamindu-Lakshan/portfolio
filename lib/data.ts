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
  phone: string;
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
  image: string;
  verificationCode?: string;
}

export interface Skill {
  category: string;
  items: string[];
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
  tagline: "Recent BSc graduate passionate about full-stack web development and business process automation.",
  bio: "Passionate and recent BSc graduate in Physical Science from the University of Colombo, Faculty of Science. Skilled in full-stack web development and business process automation. Experienced in building dynamic applications using modern frameworks like Next.js and React, alongside cloud platforms such as Supabase and Google AppSheet. Proficient in PHP, MySQL, JavaScript, Python, Java, and C#.",
  university: "University of Colombo",
  faculty: "Faculty of Science",
  year: "BSc Graduate",
  email: "wickramasingha2002@gmail.com",
  phone: "+94 78 3246 790",
  github: "https://github.com/Chamindu-Lakshan",
  linkedin: "https://linkedin.com/in/chamindu-lakshan",
  location: "Galle, Sri Lanka",
};

/* ── Social Links ─────────────────────────────────────── */

export const socialLinks: SocialLink[] = [
  { platform: "GitHub", url: profile.github, icon: "Github" },
  { platform: "LinkedIn", url: profile.linkedin, icon: "Linkedin" },
  { platform: "Email", url: `mailto:${profile.email}`, icon: "Mail" },
];

/* ── Skills ───────────────────────────────────────────── */

export const skills: Skill[] = [
  {
    category: "Web Technologies & Frameworks",
    items: ["HTML", "CSS", "JavaScript", "PHP", "React", "Next.js", "JHipster", "Phaser.js", "WordPress"],
  },
  {
    category: "Programming Languages",
    items: ["Python", "Java", "C#", "SQL", "TypeScript"],
  },
  {
    category: "Data & Databases",
    items: ["MySQL", "PostgreSQL", "Supabase", "MATLAB", "Excel"],
  },
  {
    category: "Low-Code & Cloud",
    items: ["Google AppSheet", "Google Sheets", "Apps Script", "WordPress"],
  },
  {
    category: "Tools & Software",
    items: ["Git", "VS Code", "Visual Studio", "Office 365", "XAMPP"],
  },
];

/* ── Experience ───────────────────────────────────────── */

export const experiences: Experience[] = [
  {
    id: "finetech-intern",
    company: "Finetech",
    role: "Web Developer Intern",
    department: "Business and Services Department",
    period: "November 2025 — February 2026",
    description:
      "Contributed to cloud-based business process automation solutions, focusing on enterprise document and service management workflows using low-code and web technologies.",
    highlights: [
      "Developed low-code applications using Google AppSheet to enhance business workflows and automate manual processes.",
      "Participated in website design projects utilizing WordPress, improving the company's web presence.",
      "Gained hands-on experience with the Java platform within the JHipster framework for full-stack development.",
      "Led modifications to the Letter Management System, streamlining organisational letter drafting, approval routing, and archival processes.",
      "Enhanced the Internal Service Request Management System with improved request tracking, automated notifications, and multi-level approval workflows.",
    ],
    technologies: [
      "Google AppSheet",
      "WordPress",
      "JHipster",
      "Java",
      "Business Process Automation",
      "Web Development",
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
    id: "school-management",
    title: "School Management System",
    description:
      "A role-based web application for student records, grading, attendance, and automated year promotion workflows.",
    longDescription:
      "University project implementing a comprehensive school management system with role-based access for administrators, teachers, and students. The system handles student records, grade entry, attendance tracking, and automated year-end promotion workflows — significantly reducing manual record updates and standardising academic processes.",
    techStack: ["PHP", "MySQL", "HTML/CSS", "JavaScript", "XAMPP"],
    highlights: [
      "Role-based access control for admin, teacher, and student users.",
      "Standardised grade entry reducing manual record updates significantly.",
      "Automated year promotion workflows for seamless academic progression.",
      "Full CRUD operations for student records and attendance.",
    ],
    category: "Web Application",
    repoUrl: "https://github.com/Chamindu-Lakshan",
  },
  {
    id: "quality-management",
    title: "Online Quality Management System",
    description:
      "A product-quality monitoring dashboard with CRUD operations, user management, and batch-level quality tracking.",
    longDescription:
      "An academic and personal project building a product-quality dashboard with comprehensive CRUD operations, user management, and batch-level quality monitoring. Features role-specific access controls and navigation, deployed locally with XAMPP for development and testing.",
    techStack: ["PHP", "MySQL", "JavaScript", "XAMPP"],
    highlights: [
      "Batch-level quality monitoring with real-time status tracking.",
      "User management with role-specific access controls.",
      "Comprehensive CRUD operations for product data.",
      "Deployed locally with XAMPP for rapid development.",
    ],
    category: "Web Application",
    repoUrl: "https://github.com/Chamindu-Lakshan",
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
    id: "javascript-essentials-1",
    title: "JavaScript Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "May 2026",
    url: "https://www.credly.com/badges/d7cace01-b54c-4abc-aedb-d407dff20f27",
    image: "/certificates/javascript-essentials-1.pdf",
    verificationCode: "d7cace01-b54c-4abc-aedb-d407dff20f27",
  },
  {
    id: "data-science-python",
    title: "Data Science Essentials with Python",
    issuer: "Cisco Networking Academy",
    date: "February 2026",
    image: "/certificates/data-science-python.pdf",
    verificationCode: "cc00e125-bd4e-45d2-9abd-41f189974a3c",
  },
  {
    id: "software-engineering",
    title: "Software Engineering",
    issuer: "ICE Institute (Xuetang / NU-SE)",
    date: "December 2023",
    image: "/certificates/software-engineering.pdf",
    verificationCode: "90951973",
  },
  {
    id: "python-beginners",
    title: "Python for Beginners",
    issuer: "University of Moratuwa (CODL)",
    date: "April 2023",
    url: "https://open.uom.lk/verify",
    image: "/certificates/python-beginners.pdf",
    verificationCode: "IFjuFD2Do2",
  },
  {
    id: "skill-for-work",
    title: "Skills for Work – Professional Development",
    issuer: "British Council Sri Lanka",
    date: "2024",
    image: "/certificates/skill-for-work.jpg",
  },
];

/* ── Utility: Tool category labels ────────────────────── */

export const toolCategoryLabels: Record<ToolCategory, string> = {
  all: "All Tools",
  text: "Text",
  image: "Image",
  developer: "Developer",
};
