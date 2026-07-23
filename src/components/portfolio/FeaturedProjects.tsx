import { useEffect, useRef, useState, type MouseEvent } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";
import agree2metImg from "@/assets/project-agree2met.png.asset.json";
import dpiImg from "@/assets/project-dpi.png.asset.json";
import veloraImg from "@/assets/project-velora.png.asset.json";

function useEffectEsc(onClose: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
}

const projectImages: Record<string, string> = {
  Agree2Met: agree2metImg.url,
  "AI-Powered Deep Packet Inspection & Network Threat Analyzer": dpiImg.url,
  "Velora Markets": veloraImg.url,
};

type CaseStudySection = { heading: string; body: string };

type Project = {
  name: string;
  category: string;
  stack: string[];
  problem: string;
  solution: string;
  status: "Live" | "In progress" | "Private";
  github?: string;
  liveDemo?: string;
  caseStudy: {
    tagline: string;
    overview: string;
    sections: CaseStudySection[];
    challenges: { title: string; solution: string }[];
    learnings: string[];
    future: string[];
  };
};

const projects: Project[] = [
  {
    name: "Agree2Met",
    category: "SaaS Digital Agreement Management Platform",
    stack: ["React.js", "Spring Boot", "PostgreSQL", "RAG"],
    problem:
      "Organizations struggle with securely managing agreements, tracking document lifecycles, and handling reminders through scattered workflows.",
    solution:
      "A full-stack SaaS platform with secure authentication, centralized agreement management, lifecycle reminders, and an AI-powered assistant using RAG.",
    status: "Private",
    github: "https://github.com/Srvankit/Agree2Met",
    caseStudy: {
      tagline: "Where legal agreements meet intelligent automation.",
      overview:
        "Agree2Met is a SaaS platform built to replace fragmented agreement workflows — email threads, spreadsheets, and scattered PDFs — with a single, intelligent source of truth. It centralizes document lifecycles from draft through renewal and layers a Retrieval-Augmented Generation assistant on top so teams can query their own agreement corpus in natural language.",
      sections: [
        {
          heading: "The Challenge",
          body: "Mid-sized organizations manage hundreds of agreements across vendors, clients, and internal teams. Without a system, deadlines slip, renewals get missed, and legal risk compounds silently. The product needed to feel as calm as a document reader but as reliable as core infrastructure.",
        },
        {
          heading: "Architecture",
          body: "A React SPA talks to a Spring Boot REST API backed by PostgreSQL. Authentication is JWT-based with refresh rotation. Documents are stored via signed URLs; metadata, versions and audit trails live in Postgres. The RAG assistant runs as a separate service, chunking and embedding agreements on ingest and answering scoped queries at request time.",
        },
        {
          heading: "Technology Stack",
          body: "React.js and TypeScript on the frontend, Spring Boot with layered services on the backend, PostgreSQL for durable state, and a RAG pipeline for the assistant. REST APIs are versioned and documented; every write path is validated at the DTO layer.",
        },
        {
          heading: "Authentication Flow",
          body: "Users sign in through email/password with hashed credentials, receive a short-lived access token and a rotating refresh token, and see permissions enforced both in the API layer and in row-scoped Postgres queries.",
        },
        {
          heading: "Agreement Lifecycle",
          body: "Every agreement moves through Draft → Review → Signed → Active → Renewing → Archived. State transitions are explicit, auditable, and drive downstream reminders and notifications.",
        },
        {
          heading: "Document Management",
          body: "Versioning is first-class: every upload creates an immutable revision with a diffable metadata snapshot, so nothing is ever lost and rollbacks are one click away.",
        },
        {
          heading: "Reminder System",
          body: "A scheduled job scans upcoming deadlines daily and fans out notifications through email and in-app channels, with per-user quiet hours and per-agreement escalation rules.",
        },
        {
          heading: "AI Assistant powered by RAG",
          body: "Agreements are chunked, embedded and indexed on ingest. At query time, the assistant retrieves the most relevant clauses and grounds every answer in citations — no hallucinated obligations, only what the document actually says.",
        },
        {
          heading: "Key Features",
          body: "Centralized agreement vault, lifecycle automation, deadline reminders, role-based access control, full audit trail, and a grounded AI assistant for natural-language search across the corpus.",
        },
      ],
      challenges: [
        {
          title: "Grounding the AI assistant",
          solution:
            "Enforced strict retrieval bounds and citation-only responses so the assistant refuses to answer when the corpus is silent.",
        },
        {
          title: "Reliable reminder delivery",
          solution:
            "Idempotent job runs with a persisted delivery ledger prevent duplicates even if a worker restarts mid-batch.",
        },
        {
          title: "Multi-tenant data isolation",
          solution:
            "Every query is scoped by organization at the service and database level, with automated tests that fail loudly on cross-tenant leaks.",
        },
      ],
      learnings: [
        "Lifecycle state machines make audit and UX both easier — one source of truth.",
        "Grounded RAG is a UX problem as much as a retrieval problem — citations build trust.",
        "Boring backends win: predictable jobs beat clever ones at 3 AM.",
      ],
      future: [
        "E-signature integrations and clause-level suggestions.",
        "Fine-grained analytics on renewal risk and contract velocity.",
        "SSO and enterprise policy controls.",
      ],
    },
  },
  {
    name: "AI-Powered Deep Packet Inspection & Network Threat Analyzer",
    category: "Network Security Platform",
    stack: ["Spring Boot", "React.js", "PostgreSQL", "JWT"],
    problem:
      "Modern networks require intelligent packet monitoring and rapid threat detection without sacrificing performance.",
    solution:
      "A scalable DPI platform using Spring Boot and React with JWT authentication, REST APIs, and real-time packet monitoring.",
    status: "In progress",
    github: "https://github.com/Srvankit/AI-Powered-Deep-Packet-Inspection-and-Network-Threat-Analyzer",
    caseStudy: {
      tagline: "Real-time visibility into every packet that matters.",
      overview:
        "A network security platform that inspects packets at depth, surfaces anomalies in real time, and stays out of the way of the traffic it protects. The goal was operator-grade clarity: dashboards that read like an aircraft cockpit, backed by an API that any SOC tool can integrate with.",
      sections: [
        {
          heading: "Architecture",
          body: "A capture layer streams packets into a Spring Boot ingestion service, which normalizes protocol metadata and forwards enriched events to PostgreSQL for durable storage and to a live channel for the React dashboard.",
        },
        {
          heading: "Packet Inspection Workflow",
          body: "Packets are parsed at L2–L7, tagged with protocol, flow, and reputation metadata, and evaluated against a rules engine before being persisted.",
        },
        {
          heading: "Threat Detection Pipeline",
          body: "A layered pipeline combines signature-based rules with statistical anomaly detection, so both known and emerging patterns get flagged with severity and confidence scores.",
        },
        {
          heading: "Authentication",
          body: "JWT access tokens with rotating refresh tokens, role-based access for analyst / admin tiers, and per-endpoint scope checks.",
        },
        {
          heading: "REST API Design",
          body: "Versioned, resource-oriented endpoints with strict DTO validation, pagination, and consistent error envelopes so external tooling can integrate without guesswork.",
        },
        {
          heading: "Dashboard",
          body: "A React dashboard shows live flow rate, top talkers, active threats, and drill-down timelines — designed to be readable at a glance during an incident.",
        },
        {
          heading: "Database Design",
          body: "PostgreSQL with time-partitioned tables for packet events and materialized aggregates for the dashboard, so heavy queries never fight live ingestion.",
        },
        {
          heading: "Performance Considerations",
          body: "Backpressure at the ingestion boundary, batched writes, and pre-aggregated rollups keep the platform responsive under sustained high traffic.",
        },
        {
          heading: "Security",
          body: "Least-privilege service accounts, encrypted transport end-to-end, and immutable audit logs for every administrative action.",
        },
      ],
      challenges: [
        {
          title: "Ingestion under load",
          solution:
            "Bounded queues and batched inserts absorb bursts without dropping packets or blocking the dashboard.",
        },
        {
          title: "Signal vs. noise",
          solution:
            "Tunable severity thresholds and correlated alerts stop the SOC from drowning in low-value events.",
        },
        {
          title: "Long-term storage costs",
          solution:
            "Time-based partitioning with tiered retention keeps recent data hot and historical data cheap.",
        },
      ],
      learnings: [
        "In security tooling, latency is a feature — anything that slows the operator is a bug.",
        "A dashboard is a UX artifact, not a data dump. Hierarchy wins.",
      ],
      future: [
        "ML-assisted flow classification.",
        "Integrations with SIEM and SOAR platforms.",
        "Encrypted-traffic analytics without decryption.",
      ],
    },
  },
  {
    name: "Velora Markets",
    category: "AI Stock Trading Platform",
    stack: ["Java", "Spring Boot", "React.js", "PostgreSQL"],
    problem:
      "Retail investors often lack a modern platform that combines portfolio management with AI-assisted market insights.",
    solution:
      "A full-stack trading platform with secure portfolio management, transaction tracking, account validation, and an extensible architecture for AI-powered analytics.",
    status: "In progress",
    github: "https://github.com/Srvankit/Velora-Markets",
    caseStudy: {
      tagline: "A modern trading desk for the retail investor.",
      overview:
        "Velora Markets is a trading platform built around one belief: the retail investor deserves the same clarity, safety and speed that professional desks take for granted. It combines portfolio management, transaction integrity and an extensible surface for AI-assisted insights.",
      sections: [
        {
          heading: "System Architecture",
          body: "A Spring Boot service exposes a versioned REST API to a React frontend, with PostgreSQL as the system of record. Long-running analytics run out of band so the trading path stays fast.",
        },
        {
          heading: "Portfolio Management",
          body: "Positions, cost basis, realized and unrealized P&L are computed server-side against an authoritative transaction log, so the UI never has to lie.",
        },
        {
          heading: "Authentication",
          body: "JWT-based sessions with rotating refresh tokens, hashed credentials, and account validation gates for sensitive actions.",
        },
        {
          heading: "REST APIs",
          body: "Resource-oriented endpoints for accounts, portfolios, orders and transactions, each with strict input validation and consistent error contracts.",
        },
        {
          heading: "Database",
          body: "PostgreSQL with immutable transaction rows and derived views for portfolio state — auditability first, performance second, both taken seriously.",
        },
        {
          heading: "Transaction Flow",
          body: "Every trade moves through Draft → Validated → Booked → Settled. Each transition is atomic and idempotent, so retries never corrupt state.",
        },
        {
          heading: "AI Integration Roadmap",
          body: "The service boundary is designed for an AI insights module: portfolio snapshots and market context feed a reasoning layer that returns explanations and suggestions, never blind signals.",
        },
        {
          heading: "Technical Challenges",
          body: "Getting money-touching code right — idempotency, precise decimal math, and defensive validation — was the hardest and most important part of the build.",
        },
      ],
      challenges: [
        {
          title: "Financial correctness",
          solution:
            "All monetary values use exact decimal arithmetic; every write path has property-based tests covering rounding and edge cases.",
        },
        {
          title: "Extensible AI surface",
          solution:
            "The AI module talks to portfolios only through a stable read-model, so trading logic stays untouched as intelligence evolves.",
        },
      ],
      learnings: [
        "In fintech, boring is a compliment. Predictability compounds trust.",
        "Immutable transactions plus derived views is the cleanest ledger design I've shipped.",
      ],
      future: [
        "Real-time market data integrations.",
        "AI-generated portfolio commentary with citations.",
        "Advanced order types and risk controls.",
      ],
    },
  },
];

function CaseStudyModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useScrollLock(true);
  useEffectEsc(onClose);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[80] flex items-stretch justify-center bg-black/70 backdrop-blur-xl"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(10px)" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative mx-auto my-6 h-[calc(100dvh-3rem)] w-[min(1100px,calc(100vw-1.5rem))] overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E]"
      >
        {/* animated border */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[1px] rounded-3xl opacity-70"
          style={{
            background:
              "conic-gradient(from var(--a,0deg), rgba(255,255,255,0.35), transparent 30%, rgba(255,255,255,0.15) 60%, transparent 90%)",
            animation: "spin 14s linear infinite",
          }}
        />
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 sm:px-10">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] uppercase tracking-[0.28em] text-white/70 transition-colors hover:border-white/25 hover:text-white"
              data-cursor="BACK"
            >
              ← Back
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex-1 overflow-y-auto px-6 pb-16 pt-10 sm:px-10 lg:px-16">
            {/* Hero */}
            <div className="mx-auto max-w-3xl">
              <p className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]">
                Case Study — {project.category}
              </p>
              <h2 className="font-display mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
                {project.name}
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#B8B8B8] sm:text-lg">
                {project.caseStudy.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Cover */}
            <div className="mx-auto mt-14 max-w-4xl">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#0E0E0E] to-[#080808]">
                {projectImages[project.name] ? (
                  <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
                    <img
                      src={projectImages[project.name]}
                      alt={`${project.name} cover`}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : null}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.6) 70%, rgba(5,5,5,0.9) 100%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                  <span>{project.name}</span>
                  <span>{project.status}</span>
                </div>
              </div>
            </div>

            {/* Overview */}
            <section className="mx-auto mt-16 max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">Overview</p>
              <p className="mt-4 text-base leading-relaxed text-[#B8B8B8] sm:text-lg">
                {project.caseStudy.overview}
              </p>
            </section>

            {/* Problem / Approach */}
            <section className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">Problem</p>
                <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                  {project.problem}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">Approach</p>
                <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                  {project.solution}
                </p>
              </div>
            </section>

            {/* Sections */}
            <section className="mx-auto mt-16 max-w-3xl space-y-10">
              {project.caseStudy.sections.map((s) => (
                <div key={s.heading}>
                  <h3 className="font-display text-2xl text-white sm:text-3xl">{s.heading}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                    {s.body}
                  </p>
                </div>
              ))}
            </section>

            {/* Challenges */}
            <section className="mx-auto mt-16 max-w-3xl">
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                Challenges & Solutions
              </p>
              <div className="mt-6 space-y-4">
                {project.caseStudy.challenges.map((c) => (
                  <div
                    key={c.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm"
                  >
                    <p className="text-sm text-white">{c.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#B8B8B8]">{c.solution}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Learnings & Future */}
            <section className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-2">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                  Key Learnings
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                  {project.caseStudy.learnings.map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="mt-2 h-[2px] w-6 shrink-0 bg-white/40" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                  Future Scope
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                  {project.caseStudy.future.map((l) => (
                    <li key={l} className="flex gap-3">
                      <span className="mt-2 h-[2px] w-6 shrink-0 bg-white/40" />
                      <span>{l}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Actions */}
            <section className="mx-auto mt-16 flex max-w-3xl flex-wrap gap-3">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:border-white/30"
                  data-cursor="OPEN →"
                >
                  <Github className="h-3.5 w-3.5" /> Github
                </a>
              ) : null}
              {project.liveDemo ? (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:border-white/30"
                  data-cursor="VISIT →"
                >
                  Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/50"
                >
                  Live Demo — Coming Soon
                </span>
              )}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/70 transition-colors hover:border-white/25 hover:text-white"
              >
                ← Back to projects
              </button>
            </section>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProjectCard({
  p,
  index,
  onOpenCase,
}: {
  p: Project;
  index: number;
  onOpenCase: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.12, 1.18]);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 4, ry: px * 6 });
  };

  return (
    <div
      ref={ref}
      className="relative min-h-[90svh] w-full px-6 py-24 sm:px-10 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={onMove}
          onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
          onClick={onOpenCase}
          style={{
            rotateX: tilt.rx,
            rotateY: tilt.ry,
            transformStyle: "preserve-3d",
            perspective: "1400px",
          }}
          className="group relative cursor-pointer lg:col-span-7"
          data-cursor="VIEW PROJECT"
        >
          {/* animated border */}
          <div
            aria-hidden
            className="absolute -inset-[1px] rounded-3xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "conic-gradient(from var(--a,0deg), rgba(255,255,255,0.35), transparent 30%, rgba(255,255,255,0.2) 60%, transparent 90%)",
              animation: "spin 14s linear infinite",
            }}
          />
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0A0A0A] via-[#0E0E0E] to-[#080808]">
            <motion.div
              style={{ y: imageY, scale: imageScale }}
              className="absolute inset-0 flex items-center justify-center p-4 will-change-transform sm:p-6"
            >
              {projectImages[p.name] ? (
                <img
                  src={projectImages[p.name]}
                  alt={`${p.name} showcase`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-full max-w-full object-contain transition-transform duration-[900ms] ease-out will-change-transform group-hover:scale-[1.02]"
                />
              ) : null}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.55) 70%, rgba(5,5,5,0.85) 100%)",
                }}
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-x-6 bottom-6 flex items-end justify-between text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
              <span>{p.name}</span>
              <span>{p.status}</span>
            </div>
          </div>
        </motion.div>

        {/* Meta */}
        <div className="lg:col-span-5 lg:pt-8">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
          >
            0{index + 1} — {p.category}
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-6 text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl"
          >
            {p.name}
          </motion.h3>

          <div className="mt-6 flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <span
                key={s}
                className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/80"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-8 space-y-6 text-sm text-[#B8B8B8] sm:text-base">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">Problem</p>
              <p className="mt-2">{p.problem}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">Approach</p>
              <p className="mt-2">{p.solution}</p>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {p.github ? (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:border-white/30"
                data-cursor="OPEN →"
              >
                <Github className="h-3.5 w-3.5" /> Github
              </a>
            ) : null}
            {p.liveDemo ? (
              <a
                href={p.liveDemo}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:border-white/30"
                data-cursor="VISIT →"
              >
                Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : (
              <span
                aria-disabled="true"
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white/50"
              >
                Live Demo — Coming Soon
              </span>
            )}
            <button
              type="button"
              onClick={onOpenCase}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:border-white/30"
              data-cursor="READ →"
            >
              Case Study <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProjects() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="projects" className="relative w-full border-t border-white/5">
      <div className="mx-auto max-w-6xl px-6 pt-32 sm:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
        >
          (05) — Featured Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Selected work, <span className="text-[#8E8E8E]">told in full.</span>
        </motion.h2>
        <p className="mt-6 max-w-xl text-sm text-[#8E8E8E]">
          Real products, real architecture. Open a case study to read the problem, the
          approach, and the trade-offs behind each build.
        </p>
      </div>

      <div className="mt-12 space-y-16">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} p={p} index={i} onOpenCase={() => setActive(p)} />
        ))}
      </div>

      <AnimatePresence>
        {active ? (
          <CaseStudyModal project={active} onClose={() => setActive(null)} />
        ) : null}
      </AnimatePresence>
    </section>
  );
}
