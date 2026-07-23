import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ArrowUpRight, Star, GitCommit, GitPullRequest, Users, Package } from "lucide-react";

const GITHUB = "https://github.com/Srvankit";

const repos = [
  {
    name: "Agree2Met",
    url: "https://github.com/Srvankit/Agree2Met",
    description:
      "SaaS platform for creating, managing and sharing professionally structured digital agreements.",
    language: "TypeScript",
  },
  {
    name: "AI-Powered-Deep-Packet-Inspection-and-Network-Threat-Analyzer",
    url: "https://github.com/Srvankit/AI-Powered-Deep-Packet-Inspection-and-Network-Threat-Analyzer",
    description:
      "Enterprise network security platform with deep packet inspection, live flow analytics and AI-assisted threat detection.",
    language: "Java",
  },
  {
    name: "Velora-Markets",
    url: "https://github.com/Srvankit/Velora-Markets",
    description:
      "Modern trading desk for retail investors with portfolio management, market analytics and an extensible AI insights layer.",
    language: "TypeScript",
  },
  {
    name: "Portfolio",
    url: "https://github.com/Srvankit",
    description:
      "Personal engineering portfolio — cinematic scrolling, motion-first UI and end-to-end craft.",
    language: "TypeScript",
  },
];

const stats: { k: string; icon: typeof Package; value: number; suffix?: string }[] = [
  { k: "Repositories", icon: Package, value: 15 },
  { k: "Contributions", icon: GitCommit, value: 300, suffix: "+" },
  { k: "Pull Requests", icon: GitPullRequest, value: 12 },
  { k: "Open Source Projects", icon: Users, value: 5 },
];

function StatCounter({ to, run, suffix }: { to: number; run: boolean; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return (
    <>
      {n.toLocaleString()}
      {suffix ?? ""}
    </>
  );
}

export function GithubSection() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });
  return (
    <section
      id="github"
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
          (06) — Github
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-4xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Engineering Beyond the{" "}
          <span className="text-[#8E8E8E]">Portfolio.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 max-w-2xl text-base text-[#B8B8B8] sm:text-lg"
        >
          Everything I build doesn't end here. Explore my open-source
          contributions, software projects, engineering experiments and
          continuous learning journey directly on GitHub.
        </motion.p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN →"
            data-magnetic
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-medium uppercase tracking-[0.24em] text-black transition-transform will-change-transform hover:-translate-y-[1px]"
          >
            <Github className="h-3.5 w-3.5" /> Visit GitHub
          </a>
          <a
            href={GITHUB + "?tab=repositories"}
            target="_blank"
            rel="noreferrer"
            data-cursor="EXPLORE →"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-xs uppercase tracking-[0.24em] text-white transition-colors hover:bg-white/[0.06]"
          >
            Explore Repositories <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Profile + analytics */}
        <div className="mt-20 grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Profile card */}
          <motion.a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN →"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm transition-colors hover:border-white/20 lg:col-span-5"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "radial-gradient(280px circle at 30% 20%, rgba(255,255,255,0.08), transparent 60%)",
              }}
            />
            <div className="relative flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/10 bg-[#111]">
                <img
                  src="https://github.com/Srvankit.png"
                  alt="Srvankit — GitHub avatar"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <p className="font-display text-2xl text-white">Srvankit</p>
                <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                  Software Engineer · Full Stack · OSS
                </p>
              </div>
            </div>
            <p className="relative mt-8 max-w-md text-sm leading-relaxed text-[#B8B8B8]">
              Building scalable software, AI-powered applications and modern
              web experiences.
            </p>
            <div className="relative mt-8 flex items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
              <span className="inline-flex items-center gap-2 text-white/80">
                <Github className="h-3.5 w-3.5" /> @Srvankit
              </span>
              <span>India · Remote</span>
            </div>
          </motion.a>

          {/* Analytics */}
          <div ref={statsRef} className="grid grid-cols-2 gap-3 lg:col-span-7">
            {stats.map((s, i) => (
              <motion.a
                key={s.k}
                href={GITHUB}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN →"
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-white/20"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(200px circle at 50% 0%, rgba(255,255,255,0.06), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <s.icon className="h-4 w-4 text-white/70" />
                  <ArrowUpRight className="h-4 w-4 text-[#8E8E8E] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <p className="relative mt-8 font-display text-3xl leading-none tracking-[-0.03em] text-white sm:text-4xl">
                  <StatCounter to={s.value} run={statsInView} suffix={s.suffix} />
                </p>
                <p className="relative mt-3 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                  {s.k}
                </p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Featured repos */}
        <div className="mt-20">
          <div className="flex items-baseline justify-between">
            <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
              Featured Repositories
            </p>
            <a
              href={GITHUB + "?tab=repositories"}
              target="_blank"
              rel="noreferrer"
              data-cursor="EXPLORE →"
              className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.28em] text-white/80 hover:text-white"
            >
              All repos <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {repos.map((r, i) => (
              <motion.a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="EXPLORE →"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all hover:-translate-y-[2px] hover:border-white/25 hover:bg-white/[0.04]"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(260px circle at 50% 0%, rgba(255,255,255,0.07), transparent 60%)",
                  }}
                />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white">
                    <Github className="h-3.5 w-3.5 text-[#8E8E8E]" />
                    <span className="font-mono text-sm text-white">{r.name}</span>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-[#8E8E8E] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <p className="relative mt-4 text-sm leading-relaxed text-[#B8B8B8]">
                  {r.description}
                </p>
                <div className="relative mt-6 flex items-center gap-5 text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-white/70" />
                    {r.language}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-3 w-3" /> Public
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
