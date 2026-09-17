# LM-AURA — Project Report

> **Full Name:** LM-AURA (Learning Management – Advanced Understanding through Resource & Analytics)
> **Version:** 0.1.0
> **Platform:** Web Application
> **Status:** MVP Complete · Phase 2 – Analytics & Community (In Progress)
> **Last Updated:** July 2025

---

## 1. Executive Summary

LM-AURA is a modern, web-based Learning Management System (LMS) purpose-built for **A/L Geography students in Sri Lanka**. It combines interactive video lessons, real-time performance analytics, competitive leaderboards, and MCQ-based quizzes into a single cohesive platform. The system serves two audiences — **students** who learn and compete, and **administrators/teachers** who manage content, track performance, and oversee enrollment and payments.

The platform is designed with a distinctive **light glassmorphism aesthetic** using emerald green tones, soft meshes, and smooth Framer Motion animations to create an engaging, modern learning environment.

---

## 2. Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Framework** | Next.js 14 (App Router) | React 18, Server Components, file-based routing |
| **Language** | TypeScript | Strict types across the entire codebase |
| **Styling** | Tailwind CSS 3.4 | Custom `aura` palette, glassmorphism tokens, 20+ animations |
| **Animations** | Framer Motion 11 | Page transitions, hover effects, stagger animations |
| **Charts** | Recharts 2.15 | Line charts, bar charts, pie charts, histograms |
| **Video** | React Player 3.4 | YouTube & Vimeo embed support |
| **Database** | Supabase (PostgreSQL) | Row-level security, real-time subscriptions |
| **Auth** | localStorage-based | Custom login via REST API (email + password) |
| **Testing** | Jest 30 + React Testing Library | Component tests, CI-ready |
| **Deployment** | Vercel (recommended) | Zero-config Next.js deployment |

---

## 3. Design System

LM-AURA uses a **light emerald green** color scheme with glassmorphism UI patterns:

- **Background:** Soft green-white (#f4fbf5) with mesh gradient overlays
- **Primary:** Emerald-500 (#10b981) for buttons, links, and accents
- **Cards:** Semi-transparent white (`bg-white/40`) with `backdrop-blur-xl` and subtle shadows
- **Typography:** Clean, modern sans-serif with strong heading hierarchy
- **Animations:** Page fade-ins, card hover lifts, staggered list reveals, floating shapes
- **Special:** Glass card components (`glass-card`, `admin-glass`) with frosted-glass effects

---

## 4. User Roles

### 4.1 Student
- Browse and enroll in geography classes
- Watch video lessons organized by modules
- Take MCQ quizzes and view scores
- Track performance trends via personal dashboard
- View leaderboard rankings (overall, per-exam, per-class)
- Receive notifications and announcements

### 4.2 Admin / Teacher
- Full access to the **Admin Command Center** with 8 management modules
- Manage classes, video content, and modules
- Create and grade exams and quizzes
- Monitor student progress with analytics and reports
- Manage enrollments, payments, and billing
- Post announcements and site-wide notices
- Configure site settings and social links

---

## 5. Application Architecture

```
┌─────────────────────────────────────────────────┐
│                   LM-AURA App                    │
├─────────────┬───────────────────────────────────┤
│  Public     │  Student Portal    │  Admin Center │
│  Pages      │  (Authenticated)   │  (Admin/Staff)│
├─────────────┼───────────────────┬───────────────┤
│ Landing     │ Dashboard         │ Pulse         │
│ /           │ /dashboard        │ Classes       │
│ Classes     │ My Classes        │ Assessments   │
│ /classes    │ /my-classes       │ Reports       │
│ Leaderboard │ Leaderboard       │ Users         │
│ /leaderboard│ /leaderboard      │ Site Content  │
│ Sign In     │ Quizzes           │ Payments      │
│ /auth/signin│ /quizzes          │ Social Links  │
│             │ Class Detail      │               │
│             │ /classes/[id]     │               │
├─────────────┴───────────────────┴───────────────┤
│              REST API Routes (/api/*)            │
├─────────────────────────────────────────────────┤
│              Supabase (PostgreSQL)               │
└─────────────────────────────────────────────────┘
```

### 5.1 Route Structure

| Route | Description |
|---|---|
| `/` | Landing page with hero, stats, class preview, notice board |
| `/auth/signin` | Email/password sign-in page |
| `/dashboard` | Student dashboard with score trends and stats |
| `/classes` | Browse all available geography classes |
| `/classes/[classId]` | Class detail with module videos |
| `/classes/[classId]/videos` | Video library for a class |
| `/leaderboard` | Class and overall leaderboard rankings |
| `/my-classes` | Student's enrolled classes |
| `/quizzes` | Available quizzes list |
| `/quizzes/[id]` | Take a specific quiz |
| `/admin` | Admin Command Center (SPA with 8 modules) |
| `/api/*` | 20+ REST API endpoints |

---

## 6. Feature Overview

### 6.1 Landing Page
- Animated hero section with rotating geography quotes ("The Earth is a canvas painted by time and tectonics.")
- Statistics counters (video classes, quiz questions, video lessons)
- "Explore Classes" preview section
- "Why LM-AURA" feature highlights (6 cards): Video Lessons, Performance Analytics, Competitive Leaderboards, Interactive Quizzes, Learn at Your Pace, Community Driven
- Notice Board / Announcements section
- Call-to-action footer

### 6.2 Authentication
- Email and password sign-in
- localStorage-based session management via `useUser` hook
- Role-based access (admin, teacher, student)
- API endpoint: `POST /api/auth/login`

### 6.3 Student Dashboard
- Personalized greeting with student name
- Score trend line chart (Recharts)
- Performance summary cards
- Quick-access links to classes and quizzes

### 6.4 Classes & Video Delivery
- Class listing with cards showing name, description, and enrollment status
- Class detail pages with organized video modules
- YouTube and Vimeo video embedding via React Player
- Module-based content organization (monthly lesson plans)

### 6.5 Leaderboard
- Real-time rankings based on exam and quiz scores
- Percentile cards showing student's standing
- Score trend charts for individual students
- Filterable by class, batch, and exam

### 6.6 Quizzes (MCQ)
- Multiple-choice quiz engine
- Timed quiz sessions
- Instant scoring and result display
- Quiz history tracking

### 6.7 Notifications & Announcements
- Bell icon notification system
- Popup announcements with special/forced notice support
- Announcements feed on the landing page

---

## 7. Admin Command Center

The admin panel (`/admin`) is a single-page application with a sidebar navigation and 8 management modules:

### 7.1 Dashboard / Pulse
- Overview statistics and system health
- Quick-glance metrics for student activity

### 7.2 Classes & Media
- Create and manage geography classes
- Upload and organize video content by modules
- Module management (monthly lesson plans)
- Video library management

### 7.3 Assessments
- Create and manage formal exams
- Build MCQ quizzes using the Quiz Builder modal
- Grade management and result tracking
- Quiz status management (draft, published, closed)

### 7.4 Student Reports (New — Phase 2)
- **Individual Tab:** Detailed student report cards with profile info, module matrix (paid/unpaid), exam results, monthly progress charts, and CSV export
- **Batch Tab:** Batch-level leaderboards with gender/institute breakdowns (pie charts), top-N filtering, and CSV export
- **Lessons Tab:** Per-lesson average score analysis with horizontal bar charts, color-coded performance indicators
- **Exams Tab:** Exam result analysis with histogram distributions, class averages, and individual score breakdowns
- Powered by 4 dedicated API endpoints and Recharts visualization

### 7.5 User Management
- View and manage all registered users
- Role assignment (student, teacher, admin)
- Student detail modals with comprehensive profiles

### 7.6 Site Content
- Manage site-wide announcements and notices
- Content editing for landing page sections
- Notice scheduling and priority management

### 7.7 Payment Manager
- Track student payments and billing
- Payment slip uploads and verification
- Fast-track payment processing
- Billing history and reporting

### 7.8 Social Links
- Manage social media links displayed on the platform
- Configure external resource links

---

## 8. Database Schema

The application uses **Supabase (PostgreSQL)** with the following key tables (16 migrations):

| Table | Purpose |
|---|---|
| `users` | Student and admin accounts (name, email, password, role, student_id, DOB, NIC, gender, institute, A/L year) |
| `classes` | Geography class definitions |
| `modules` | Monthly lesson modules within classes |
| `videos` | Video lessons linked to modules |
| `main_exams` | Formal examination records |
| `mcq_quizzes` | MCQ quiz definitions and questions |
| `quiz_templates` | Reusable quiz templates |
| `enrollment_requests` | Student enrollment applications |
| `payment_slips` | Uploaded payment verification slips |
| `payments` | Payment records and billing |
| `announcements` | System-wide notices and announcements |
| `site_settings` | Platform configuration key-value pairs |
| `notifications` | Per-user notification records |

### Key Migrations:
- `001_init.sql` – Initial schema
- `002_add_roles.sql` – Role-based access
- `006_quiz_templates.sql` – Quiz system
- `012_billing_payments.sql` – Payment infrastructure
- `013_class_modules.sql` – Module organization
- `014_enrollment_requests_payment_slips.sql` – Enrollment workflow
- `015_site_settings.sql` – Site configuration
- `016_notifications.sql` – Notification system
- `020_student_reports_fields.sql` – Gender, NIC, institute for reports

---

## 9. API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/login` | POST | User authentication |
| `/api/classes` | GET | List all classes |
| `/api/classes/[classId]` | GET | Class details |
| `/api/modules` | GET/POST | Module CRUD |
| `/api/videos` | GET/POST | Video management |
| `/api/quizzes` | GET/POST | Quiz management |
| `/api/quizzes/[quizId]` | GET/PUT | Individual quiz |
| `/api/announcements` | GET/POST | Announcements |
| `/api/notifications` | GET | User notifications |
| `/api/enrollment-requests` | GET/POST | Enrollment workflow |
| `/api/payments` | GET/POST | Payment management |
| `/api/payment-slips` | GET/POST | Payment verification |
| `/api/payments/fast-track` | POST | Quick payment processing |
| `/api/site-settings` | GET/PUT | Site configuration |
| `/api/upload` | POST | File uploads |
| `/api/leaderboard/module` | GET | Module leaderboard data |
| `/api/analytics/class` | GET | Class analytics |
| `/api/analytics/student` | GET | Student analytics |
| `/api/reports/individual` | GET | Individual student report |
| `/api/reports/batch` | GET | Batch leaderboard report |
| `/api/reports/lessons` | GET | Lesson performance report |
| `/api/reports/exams` | GET | Exam analysis report |

---

## 10. Component Library

| Component | Description |
|---|---|
| `NavBar.tsx` | Main navigation bar with links |
| `NavBarWrapper.tsx` | NavBar layout container |
| `SiteFooter.tsx` | Site-wide footer |
| `FooterWrapper.tsx` | Footer layout wrapper |
| `VideoPlayer.tsx` | YouTube/Vimeo video embed |
| `Leaderboard.tsx` | Leaderboard display with rankings |
| `PercentileCard.tsx` | Student percentile score card |
| `ScoreTrendChart.tsx` | Recharts score trend visualization |
| `QuizBuilderModal.tsx` | Quiz creation/editing modal |
| `StudentDetailsModal.tsx` | Student profile detail modal |
| `NotificationsBell.tsx` | Notification bell with count badge |
| `NoticeDetailModal.tsx` | Announcement detail modal |
| `SpecialNoticePopup.tsx` | Forced notice popup overlay |
| `ReportsModule.tsx` | Full student reports module (4 tabs) |
| `Animations.tsx` | Framer Motion animation helpers |
| `AuroraBackground.tsx` | Aurora gradient background |
| `HeroTextContent.tsx` | Hero section text content |

---

## 11. Testing

- **Framework:** Jest 30 + React Testing Library
- **Test Files:**
  - `src/components/__tests__/Leaderboard.test.tsx`
  - `src/components/__tests__/PercentileCard.test.tsx`
- **Commands:**
  - `npm test` – Run all tests
  - `npm run test:watch` – Watch mode
  - `npm run test:coverage` – Coverage report

---

## 12. Development Commands

| Command | Description |
|---|---|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server (localhost:3000) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm test` | Run test suite |
| `node run_migration.js` | Run database migrations |

---

## 13. Project Screenshots

> Screenshots are stored in the `info/screenshots/` directory.

| # | Screenshot | Description |
|---|---|---|
| 1 | `01-landing-page.png` | Landing page — animated hero with rotating geography quotes, stats counters, "Explore Classes", feature cards, and notice board |
| 2 | `02-sign-in.png` | Sign-in page — glassmorphic card with email/password fields |
| 3 | `03-admin-dashboard.png` | Admin Command Center — Pulse dashboard overview with sidebar navigation |
| 4 | `04-admin-reports.png` | Student Reports — Individual report card tab with student search, profile, and charts |
| 5 | `05-admin-payments.png` | Payment Manager — Billing tracking, payment slips, and fast-track processing |
| 6 | `06-admin-classes.png` | Classes & Media — Class and video module management |
| 7 | `07-admin-assessments.png` | Assessments — Exam and quiz management interface |
| 8 | `08-admin-users.png` | User Management — Student and admin account management |
| 9 | `09-student-dashboard.png` | Student Dashboard — Personal score trends, performance summary, and quick links |
| 10 | `10-leaderboard.png` | Leaderboard — Class rankings with percentile cards and score trend charts |
| 11 | `11-classes.png` | Classes Page — Browse available geography courses with enrollment options |

> **Note:** Some pages may show empty states (e.g., "No classes available") because the Supabase database was temporarily unreachable when screenshots were captured. The UI structure and layout are fully intact.

---

## 14. Roadmap

### ✅ Phase 1 — MVP (Complete)
- Landing page, authentication, class browsing
- Video delivery with YouTube/Vimeo support
- Student dashboard with performance analytics
- Leaderboards with percentile rankings
- MCQ quiz engine
- Admin panel with class, assessment, and user management
- Payment and enrollment systems
- Announcements and notifications

### 🔄 Phase 2 — Analytics & Community (In Progress)
- ✅ Student Reports module with 4 analysis tabs
- Exam-specific leaderboards with filtering UI
- Aggregated analytics (moving averages, percentiles)
- Leaderboard badges and gamification

### 📋 Phase 3 — Teacher/Enhanced (Planned)
- Direct video hosting (Supabase Storage / Zoom / YouTube)
- Enhanced teacher admin panel
- Email notifications for student performance
- Mobile-responsive optimization

---

## 15. Environment Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account and project

### Environment Variables (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<your-anon-key>
service_role_key=<your-service-role-key>
```

### Quick Start
```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

*Report generated for LM-AURA — A/L Geography Learning Platform*
