import { useState, type MouseEvent } from "react";
import { motion } from "framer-motion";

type Skill = { name: string; level: number; years: string };
type Category = { title: string; kicker: string; skills: Skill[] };

const categories: Category[] = [
  {
    title: "Frontend",
    kicker: "Interfaces & motion",
    skills: [
      { name: "React", level: 90, years: "2 yrs" },
      { name: "Tailwind CSS", level: 92, years: "2 yrs" },
      { name: "TypeScript", level: 82, years: "1.5 yrs" },
      { name: "Next.js", level: 74, years: "1 yr" },
      { name: "Framer Motion", level: 76, years: "1 yr" },
    ],
  },
  {
    title: "Backend",
    kicker: "Services & APIs",
    skills: [
      { name: "Spring Boot", level: 82, years: "1.5 yrs" },
      { name: "Node.js", level: 74, years: "1 yr" },
      { name: "REST APIs", level: 86, years: "1.5 yrs" },
      { name: "GraphQL", level: 55, years: "0.5 yr" },
    ],
  },
  {
    title: "Languages",
    kicker: "Speaking to machines",
    skills: [
      { name: "JavaScript", level: 90, years: "2 yrs" },
      { name: "TypeScript", level: 82, years: "1.5 yrs" },
      { name: "Java", level: 88, years: "2 yrs" },
      { name: "Python", level: 72, years: "1 yr" },
      { name: "SQL", level: 74, years: "1 yr" },
    ],
  },
  {
    title: "Databases",
    kicker: "Where state lives",
    skills: [
      { name: "PostgreSQL", level: 76, years: "1 yr" },
      { name: "MySQL", level: 74, years: "1 yr" },
      { name: "MongoDB", level: 60, years: "0.5 yr" },
      { name: "Redis", level: 55, years: "0.5 yr" },
    ],
  },
  {
    title: "Developer Tools",
    kicker: "The workshop",
    skills: [
      { name: "Git & GitHub", level: 92, years: "3+ yrs" },
      { name: "Docker", level: 74, years: "1+ yr" },
      { name: "Vite", level: 88, years: "2 yrs" },
      { name: "Figma", level: 82, years: "2 yrs" },
    ],
  },
  {
    title: "AI & Emerging",
    kicker: "New frontiers",
    skills: [
      { name: "OpenAI APIs", level: 78, years: "1 yr" },
      { name: "LangChain", level: 58, years: "0.5 yr" },
      { name: "LLMs", level: 78, years: "1 yr" },
      { name: "RAG", level: 60, years: "0.5 yr" },
      { name: "Prompt Engineering", level: 82, years: "1 yr" },
    ],
  },
];

function CategoryCard({ cat, index }: { cat: Category; index: number }) {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [pos, setPos] = useState({ x: 50, y: 50 });

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setTilt({ rx: -(py - 0.5) * 6, ry: (px - 0.5) * 8 });
    setPos({ x: px * 100, y: py * 100 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay: index * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        rotateX: tilt.rx,
        rotateY: tilt.ry,
        transformStyle: "preserve-3d",
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-7 backdrop-blur-sm transition-colors hover:border-white/20"
    >
      {/* glow follows mouse */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(240px circle at ${pos.x}% ${pos.y}%, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />

      <div className="relative flex items-baseline justify-between">
        <h3 className="font-display text-2xl text-white sm:text-3xl">
          {cat.title}
        </h3>
        <span className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#8E8E8E]">
        {cat.kicker}
      </p>

      <ul className="relative mt-8 space-y-4">
        {cat.skills.map((s, i) => (
          <li key={s.name}>
            <div className="flex items-baseline justify-between text-sm text-white">
              <span>{s.name}</span>
              <span className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                {s.years}
              </span>
            </div>
            <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{
                  delay: 0.2 + i * 0.08,
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full bg-white/70"
              />
            </div>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
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
          (03) — Skills
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          A toolkit for building{" "}
          <span className="text-[#8E8E8E]">things that last.</span>
        </motion.h2>

        <div
          className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: "1400px" }}
        >
          {categories.map((c, i) => (
            <CategoryCard key={c.title} cat={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
