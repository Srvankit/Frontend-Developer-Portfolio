import { motion } from "framer-motion";
import { GitPullRequest, GitMerge, Bug } from "lucide-react";

type Contribution = {
  repo: string;
  type: "PR" | "Merged" | "Issue";
  title: string;
  when: string;
  body: string;
};

const contributions: Contribution[] = [
  {
    repo: "example/frontend-lib",
    type: "Merged",
    title: "Fix keyboard focus trap in dialog primitive",
    when: "Placeholder — 2026",
    body: "Details of merged pull requests will appear here as real contributions are made.",
  },
  {
    repo: "example/docs",
    type: "PR",
    title: "Improve getting-started guide clarity",
    when: "Placeholder — 2026",
    body: "In-flight PRs and reviews will land here.",
  },
  {
    repo: "example/tooling",
    type: "Issue",
    title: "Reproducible bug in watch mode on large monorepos",
    when: "Placeholder — 2026",
    body: "Filed issues and reproductions will be listed with context.",
  },
];

const icon = {
  Merged: GitMerge,
  PR: GitPullRequest,
  Issue: Bug,
};

export function OpenSource() {
  return (
    <section
      id="open-source"
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
          (08) — Open Source
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Reading, fixing, and giving{" "}
          <span className="text-[#8E8E8E]">a little back.</span>
        </motion.h2>

        <div className="relative mt-20">
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-2 top-0 h-full w-px origin-top bg-gradient-to-b from-white/30 via-white/10 to-transparent sm:left-3"
          />
          <ul className="space-y-5">
            {contributions.map((c, i) => {
              const Icon = icon[c.type];
              return (
                <motion.li
                  key={c.title}
                  initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.9,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative pl-10 sm:pl-14"
                >
                  <span className="absolute left-[3px] top-6 flex h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.4)] sm:left-[7px]" />
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors group-hover:border-white/20 sm:p-8">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2 text-white">
                        <Icon className="h-3.5 w-3.5 text-[#8E8E8E]" />
                        <span className="font-mono text-xs text-[#B8B8B8]">
                          {c.repo}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                        {c.type} · {c.when}
                      </span>
                    </div>
                    <h3 className="font-display mt-4 text-xl text-white sm:text-2xl">
                      {c.title}
                    </h3>
                    <p className="mt-3 text-sm text-[#B8B8B8]">{c.body}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
