import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Stat = { k: string; v?: number; suffix?: string; label?: string };

const stats: Stat[] = [
  { k: "LeetCode Problems", v: 200, suffix: "+" },
  { k: "Major Full Stack Projects", v: 3 },
  { k: "Technical Patents", v: 2 },
  { k: "Open Source", label: "Contributor" },
  { k: "Software Engineer", label: "Full Stack" },
  { k: "Available", label: "Summer 2026" },
];

function Counter({ to, run, suffix }: { to: number; run: boolean; suffix?: string }) {
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

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <section
      id="achievements"
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
          (09) — Achievements
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          Small numbers,{" "}
          <span className="text-[#8E8E8E]">quietly compounding.</span>
        </motion.h2>

        <div
          ref={ref}
          className="mt-20 grid grid-cols-2 gap-3 sm:grid-cols-3"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                delay: i * 0.08,
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(240px circle at 50% 0%, rgba(255,255,255,0.06), transparent 60%)",
                }}
              />
              <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                {s.k}
              </p>
              <p className="font-display mt-6 text-5xl text-white sm:text-6xl">
                {typeof s.v === "number" ? (
                  <Counter to={s.v} run={inView} suffix={s.suffix} />
                ) : (
                  <span className="text-4xl sm:text-5xl">{s.label}</span>
                )}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
