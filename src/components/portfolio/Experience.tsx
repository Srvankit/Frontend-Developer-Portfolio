import { motion } from "framer-motion";

type Item = {
  kind: string;
  status: string;
  title: string;
  meta: string;
  body: string;
};

const items: Item[] = [
  {
    kind: "Internships",
    status: "Open",
    title: "Software Engineering Internship",
    meta: "Available immediately",
    body: "Looking for a team where I can ship product surface end-to-end — thoughtful UI, honest backends, and code reviews that raise the bar.",
  },
  {
    kind: "Freelance",
    status: "Ongoing",
    title: "Independent Client Work",
    meta: "Web apps · Interfaces · Motion",
    body: "Small teams and founders — helping them ship credible, polished web products on tight timelines without cutting corners on craft.",
  },
  {
    kind: "Open Source",
    status: "Contributing",
    title: "Community Contributions",
    meta: "Docs · Bug fixes · Small features",
    body: "Learning from other people's codebases the best way I know how: reading them carefully, and giving something back when I can.",
  },
  {
    kind: "Hackathons",
    status: "Repeat participant",
    title: "Weekend Product Sprints",
    meta: "Prototypes under 48 hours",
    body: "Where I test what I actually know. Ship-first energy, decisions in minutes, and a taste for problems worth solving.",
  },
  {
    kind: "Education",
    status: "In progress",
    title: "Computer Science",
    meta: "Undergraduate",
    body: "The classroom taught me fundamentals. The internet, open source, and side projects taught me everything else.",
  },
];

export function Experience() {
  return (
    <section
      id="experience"
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
          (04) — Experience
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          The work so far,{" "}
          <span className="text-[#8E8E8E]">and the work ahead.</span>
        </motion.h2>

        <div className="relative mt-20">
          {/* animated vertical line */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-2 top-0 h-full w-px origin-top bg-gradient-to-b from-white/30 via-white/10 to-transparent sm:left-3"
          />
          <ul className="space-y-6">
            {items.map((it, i) => (
              <motion.li
                key={it.title}
                initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="group relative pl-10 sm:pl-14"
              >
                <span className="absolute left-[3px] top-6 h-2 w-2 rounded-full bg-white/70 shadow-[0_0_16px_rgba(255,255,255,0.4)] sm:left-[7px]" />
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors group-hover:border-white/20 sm:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                      {it.kind}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.24em] text-white/70">
                      {it.status}
                    </p>
                  </div>
                  <h3 className="font-display mt-4 text-2xl text-white sm:text-3xl">
                    {it.title}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#8E8E8E]">
                    {it.meta}
                  </p>
                  <p className="mt-5 max-h-0 overflow-hidden text-sm text-[#B8B8B8] opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100 sm:text-base">
                    {it.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
