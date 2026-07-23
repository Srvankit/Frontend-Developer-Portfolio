import { motion } from "framer-motion";
import { Code2, ArrowUpRight } from "lucide-react";

const LEETCODE = "https://leetcode.com/u/srv_ankit_/";

const bars = [
  { label: "Easy", pct: 68 },
  { label: "Medium", pct: 42 },
  { label: "Hard", pct: 18 },
];

export function Leetcode() {
  return (
    <section
      id="leetcode"
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
          (07) — Leetcode
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Where Logic Meets{" "}
          <span className="text-[#8E8E8E]">Consistency.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 max-w-2xl text-base text-[#B8B8B8] sm:text-lg"
        >
          Problem solving is one of the strongest foundations of software
          engineering. I continuously solve algorithmic challenges to improve
          data structures, algorithms and system thinking.
        </motion.p>

        <div className="mt-10">
          <a
            href={LEETCODE}
            target="_blank"
            rel="noreferrer"
            data-cursor="VISIT →"
            data-magnetic
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.24em] text-black transition-transform will-change-transform hover:-translate-y-[1px]"
          >
            <Code2 className="h-3.5 w-3.5" /> Visit LeetCode
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-3"
        >
          <a
            href={LEETCODE}
            target="_blank"
            rel="noreferrer"
            data-cursor="VISIT →"
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-colors hover:border-white/20 lg:col-span-2"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(300px circle at 20% 20%, rgba(255,255,255,0.06), transparent 60%)",
              }}
            />
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                <Code2 className="h-3.5 w-3.5" /> Solved
              </div>
              <ArrowUpRight className="h-4 w-4 text-[#8E8E8E] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
            </div>
            <p className="font-display relative mt-6 text-6xl leading-none tracking-[-0.03em] text-white sm:text-7xl">
              200<span className="text-[#8E8E8E]">+</span>
            </p>
            <p className="relative mt-4 text-sm text-[#B8B8B8]">
              Problems solved across arrays, graphs, DP and system design
              patterns.
            </p>

            <div className="relative mt-10 space-y-5">
              {bars.map((b, i) => (
                <div key={b.label}>
                  <div className="flex items-baseline justify-between text-sm text-white">
                    <span>{b.label}</span>
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                      Public profile
                    </span>
                  </div>
                  <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.pct}%` }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={{
                        delay: 0.2 + i * 0.1,
                        duration: 1.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="h-full bg-white/70"
                    />
                  </div>
                </div>
              ))}
            </div>
          </a>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
              Focus areas
            </p>
            <ul className="mt-6 space-y-4 text-sm text-white/85">
              {[
                "Data Structures",
                "Algorithms",
                "System Design",
                "Dynamic Programming",
                "Graph Theory",
              ].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-[2px] w-6 bg-white/40" />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
              Consistency compounds — one problem, every day.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
