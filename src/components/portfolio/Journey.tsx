import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

type Milestone = {
  year: string;
  title: string;
  caption: string;
  hint: string;
};

const milestones: Milestone[] = [
  {
    year: "The Spark",
    title: "Started Programming",
    caption: "A blank editor. A curious kid. The first Hello, World.",
    hint: "chapter 01",
  },
  {
    year: "The Web",
    title: "HTML & CSS",
    caption: "Learning that a browser could become a canvas.",
    hint: "chapter 02",
  },
  {
    year: "The Language",
    title: "JavaScript",
    caption: "Making pixels move. Making pages feel alive.",
    hint: "chapter 03",
  },
  {
    year: "The Framework",
    title: "React",
    caption: "Composition, state, and the joy of building UIs.",
    hint: "chapter 04",
  },
  {
    year: "The Engine",
    title: "Java",
    caption: "Discipline. Types. Systems that don't break.",
    hint: "chapter 05",
  },
  {
    year: "The Backend",
    title: "Spring Boot",
    caption: "APIs, services, databases — the invisible half.",
    hint: "chapter 06",
  },
  {
    year: "The Community",
    title: "Open Source",
    caption: "Reading other people's code. Contributing back.",
    hint: "chapter 07",
  },
  {
    year: "Today",
    title: "Building Real Products",
    caption: "Turning ideas into interfaces people actually use.",
    hint: "chapter 08",
  },
];

function Milestone({ item, index }: { item: Milestone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.02, 0.98]);

  return (
    <div
      ref={ref}
      className="relative flex min-h-[90svh] w-full items-center justify-center px-6 sm:px-10 lg:px-16"
    >
      {/* timeline dot */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_24px_rgba(255,255,255,0.4)]" />

      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto flex w-full max-w-6xl flex-col items-center text-center will-change-transform"
      >
        <p className="text-xs uppercase tracking-[0.32em] text-[#8E8E8E]">
          {String(index + 1).padStart(2, "0")} — {item.year}
        </p>
        <h3 className="font-display mt-8 text-[14vw] leading-[0.9] tracking-[-0.05em] text-white sm:text-[9vw] lg:text-[7vw]">
          {item.title}
        </h3>
        <p className="mt-8 max-w-xl text-base text-[#B8B8B8] sm:text-lg">
          {item.caption}
        </p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.4em] text-[#4A4A4A]">
          — {item.hint} —
        </p>
      </motion.div>
    </div>
  );
}

export function Journey() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full overflow-hidden border-t border-white/5"
    >
      {/* Section intro */}
      <div className="mx-auto flex max-w-6xl flex-col px-6 pt-32 sm:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
        >
          (02) — Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Every engineer has an origin story.{" "}
          <span className="text-[#8E8E8E]">This one's still being written.</span>
        </motion.h2>
      </div>

      {/* animated central line */}
      <motion.div
        aria-hidden
        style={{ scaleY: lineScale }}
        className="pointer-events-none absolute left-1/2 top-[420px] bottom-24 -z-10 hidden w-px origin-top bg-gradient-to-b from-white/30 via-white/10 to-transparent md:block"
      />

      <div className="mt-24">
        {milestones.map((m, i) => (
          <Milestone key={m.title} item={m} index={i} />
        ))}
      </div>
    </section>
  );
}
