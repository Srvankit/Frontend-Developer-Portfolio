import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Award } from "lucide-react";

type Milestone = {
  year: string;
  title: string;
  description: string;
  skills: string[];
  tech: string[];
  achievement: string;
};

const milestones: Milestone[] = [
  {
    year: "2024",
    title: "Started B.Tech Computer Science",
    description: "Began the formal journey into computer science — algorithms, systems, and the fundamentals that everything else stands on.",
    skills: ["Computer Fundamentals", "Discrete Math"],
    tech: ["C", "C++"],
    achievement: "Chapter one, officially open.",
  },
  {
    year: "2024",
    title: "Learned Java",
    description: "Discipline. Types. A language that taught me to think in objects before shipping.",
    skills: ["OOP", "Type systems"],
    tech: ["Java", "Maven"],
    achievement: "Fluency in a language that scales with teams.",
  },
  {
    year: "2024",
    title: "Started Data Structures & Algorithms",
    description: "Started the daily habit of solving problems — patterns became visible, complexity became intuition.",
    skills: ["Problem solving", "Big-O reasoning"],
    tech: ["Java", "Python"],
    achievement: "Foundation for every interview and every system.",
  },
  {
    year: "2024",
    title: "Built first Frontend projects",
    description: "First HTML/CSS pages that actually shipped — the joy of turning ideas into pixels.",
    skills: ["Layout", "Responsive design"],
    tech: ["HTML", "CSS", "JavaScript"],
    achievement: "Learned the browser is a canvas.",
  },
  {
    year: "2025",
    title: "Started React Development",
    description: "Composition, state and the joy of building UIs that feel alive.",
    skills: ["Component design", "State management"],
    tech: ["React", "Vite", "Tailwind CSS"],
    achievement: "Shipped the first real SPA end-to-end.",
  },
  {
    year: "2025",
    title: "Learned Spring Boot",
    description: "The invisible half — services, REST APIs, and databases that don't fall over at 3 AM.",
    skills: ["REST", "Layered architecture"],
    tech: ["Spring Boot", "PostgreSQL", "JWT"],
    achievement: "First production-shaped backend.",
  },
  {
    year: "2025",
    title: "Began Full Stack Development",
    description: "React on the front, Spring Boot on the back, PostgreSQL in the middle — one loop, end-to-end.",
    skills: ["System design", "API contracts"],
    tech: ["React", "Spring Boot", "PostgreSQL"],
    achievement: "Full ownership of the product surface.",
  },
  {
    year: "2025",
    title: "Started Freelancing",
    description: "Small teams and founders — helping them ship credible web products on tight timelines without cutting corners on craft.",
    skills: ["Client communication", "Delivery"],
    tech: ["React", "Next.js", "Tailwind CSS"],
    achievement: "Turning skills into real impact.",
  },
  {
    year: "2025",
    title: "Participated in Hackathons",
    description: "Ship-first energy, decisions in minutes, and a taste for problems worth solving.",
    skills: ["Rapid prototyping", "Teamwork"],
    tech: ["React", "Node.js", "Firebase"],
    achievement: "Turned weekends into launched prototypes.",
  },
  {
    year: "2025",
    title: "Contributed to Open Source",
    description: "Reading other people's code the best way I know how — carefully — and giving something back.",
    skills: ["Code review", "Communication"],
    tech: ["Git", "GitHub"],
    achievement: "First merged PRs into real repos.",
  },
  {
    year: "2025",
    title: "Google Summer of Code Contributions",
    description: "Contributing to serious open-source under real mentorship — engineering in public.",
    skills: ["OSS workflows", "Documentation"],
    tech: ["Git", "GitHub", "CI/CD"],
    achievement: "Working alongside senior maintainers.",
  },
  {
    year: "2025",
    title: "Aditya Birla Group IT Internship",
    description: "First taste of enterprise engineering — process, scale, and shipping into real systems.",
    skills: ["Enterprise practices", "Scale thinking"],
    tech: ["Java", "Spring Boot", "SQL"],
    achievement: "Delivered features used by real teams.",
  },
  {
    year: "2026",
    title: "Built Agree2Met",
    description: "A SaaS platform replacing fragmented agreement workflows with a single, intelligent source of truth — with a RAG-powered assistant on top.",
    skills: ["Product architecture", "RAG"],
    tech: ["React", "Spring Boot", "PostgreSQL", "RAG"],
    achievement: "First end-to-end SaaS product.",
  },
  {
    year: "2026",
    title: "Built AI Powered DPI",
    description: "Enterprise network security platform with deep packet inspection, live analytics and AI-assisted threat detection.",
    skills: ["Systems programming", "Security"],
    tech: ["Spring Boot", "React", "PostgreSQL", "JWT"],
    achievement: "Operator-grade dashboard for real traffic.",
  },
  {
    year: "2026",
    title: "Built Velora Markets",
    description: "A modern trading desk for the retail investor — portfolio management, transaction integrity, extensible AI insights.",
    skills: ["Financial correctness", "Idempotency"],
    tech: ["Java", "Spring Boot", "React", "PostgreSQL"],
    achievement: "Money-touching code, done right.",
  },
  {
    year: "2026",
    title: "Solved 200+ LeetCode Problems",
    description: "Consistency compounds — arrays, graphs, DP and system patterns, one problem at a time.",
    skills: ["DSA", "Pattern recognition"],
    tech: ["Java", "Python"],
    achievement: "200+ solved and counting.",
  },
  {
    year: "Present",
    title: "Continuously Building",
    description: "The story keeps writing itself — new products, new patents, new problems worth solving.",
    skills: ["Craft", "Consistency"],
    tech: ["React", "Spring Boot", "TypeScript"],
    achievement: "Every day is chapter one.",
  },
];

const patents = [
  {
    title: "FERM-TECH",
    caption: "Fermentation-technology innovation registered as intellectual property.",
  },
  {
    title: "Autonomous AI Driven Garment Identification System",
    caption: "Vision-driven system for identifying and classifying garments autonomously.",
  },
];

function MilestoneItem({ m, index }: { m: Milestone; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.li
      initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: (index % 4) * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="group relative pl-10 sm:pl-14"
    >
      <span className="absolute left-[3px] top-7 h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.4)] sm:left-[7px]" />
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        data-cursor={open ? "CLOSE" : "READ →"}
        className="w-full rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-left backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.04] sm:p-8"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
            {m.year}
          </p>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/10 text-white/70">
            {open ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
          </span>
        </div>
        <h3 className="font-display mt-4 text-2xl text-white sm:text-3xl">
          {m.title}
        </h3>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="mt-5 text-sm leading-relaxed text-[#B8B8B8] sm:text-base">
                {m.description}
              </p>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                    Skills
                  </p>
                  <ul className="mt-2 space-y-1 text-sm text-white/85">
                    {m.skills.map((s) => (
                      <li key={s}>— {s}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                    Technologies
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                    Achievement
                  </p>
                  <p className="mt-2 text-sm text-white/85">{m.achievement}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.li>
  );
}

export function EngineeringJourney() {
  return (
    <section
      id="engineering-journey"
      className="relative w-full border-t border-white/5 px-6 py-32 sm:px-10 lg:px-16 lg:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
        >
          (10) — Engineering Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-4xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Every milestone shaped the{" "}
          <span className="text-[#8E8E8E]">engineer I am today.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 max-w-2xl text-base text-[#B8B8B8] sm:text-lg"
        >
          Not just a timeline. A record of curiosity, consistency and
          continuous growth.
        </motion.p>

        <div className="relative mt-16">
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-2 top-0 h-full w-px origin-top bg-gradient-to-b from-white/30 via-white/10 to-transparent sm:left-3"
          />
          <ul className="space-y-5">
            {milestones.map((m, i) => (
              <MilestoneItem key={m.title} m={m} index={i} />
            ))}
          </ul>
        </div>

        {/* Patents */}
        <div className="mt-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
          >
            Patents
          </motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="font-display mt-6 max-w-2xl text-3xl leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl lg:text-5xl"
          >
            Innovation Beyond{" "}
            <span className="text-[#8E8E8E]">Code.</span>
          </motion.h3>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            {patents.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-all hover:-translate-y-[3px] hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(280px circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                  <Award className="h-4 w-4 text-white/70" /> Patent
                </div>
                <h4 className="font-display relative mt-6 text-2xl leading-tight tracking-[-0.02em] text-white sm:text-3xl">
                  {p.title}
                </h4>
                <p className="relative mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                  {p.caption}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
