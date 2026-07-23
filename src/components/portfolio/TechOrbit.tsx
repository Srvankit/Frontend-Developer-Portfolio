import { useState } from "react";
import { motion } from "framer-motion";

type Tech = { name: string; desc: string; ring: 0 | 1 | 2 };

const techs: Tech[] = [
  { name: "React", desc: "UIs that compose and scale.", ring: 0 },
  { name: "TypeScript", desc: "Confidence at compile time.", ring: 0 },
  { name: "Tailwind", desc: "Design systems in utilities.", ring: 0 },
  { name: "Java", desc: "The language I trust for scale.", ring: 1 },
  { name: "Spring Boot", desc: "Production APIs, fast.", ring: 1 },
  { name: "PostgreSQL", desc: "Relational, reliable, real.", ring: 1 },
  { name: "Docker", desc: "It works — everywhere.", ring: 2 },
  { name: "Git", desc: "Small commits, sharp diffs.", ring: 2 },
  { name: "OpenAI", desc: "New tools, new interfaces.", ring: 2 },
];

const ringSizes = [220, 340, 460];
const durations = [22, 32, 44];

export function TechOrbit() {
  const [hovered, setHovered] = useState<Tech | null>(null);
  const paused = hovered !== null;

  const byRing: Tech[][] = [[], [], []];
  techs.forEach((t) => byRing[t.ring].push(t));

  return (
    <section
      id="stack"
      className="relative w-full overflow-hidden border-t border-white/5 px-6 py-32 sm:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
        >
          Stack — In Motion
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 max-w-3xl text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
        >
          The tools that orbit{" "}
          <span className="text-[#8E8E8E]">everything I build.</span>
        </motion.h2>
      </div>

      <div className="relative mx-auto mt-24 flex h-[520px] w-full max-w-6xl items-center justify-center">
        {/* Rings */}
        {ringSizes.map((size, i) => (
          <div
            key={size}
            aria-hidden
            className="absolute rounded-full border border-white/10"
            style={{ width: size, height: size }}
          />
        ))}

        {/* Center */}
        <div className="absolute z-10 flex h-32 w-32 items-center justify-center rounded-full border border-white/15 bg-[#0E0E0E]">
          <div
            aria-hidden
            className="absolute inset-0 rounded-full opacity-70"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.12), transparent 70%)",
            }}
          />
          <div className="relative text-center">
            <p className="font-display text-xl text-white">A.Y</p>
            <p className="mt-1 text-[9px] uppercase tracking-[0.28em] text-[#8E8E8E]">
              Core
            </p>
          </div>
        </div>

        {/* Orbits */}
        {byRing.map((ring, ri) => {
          const size = ringSizes[ri];
          const radius = size / 2;
          return (
            <motion.div
              key={ri}
              className="absolute"
              style={{ width: size, height: size }}
              animate={{ rotate: paused ? undefined : 360 }}
              transition={{
                duration: durations[ri],
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {ring.map((t, i) => {
                const angle = (360 / ring.length) * i;
                const rad = (angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;
                return (
                  <motion.button
                    key={t.name}
                    type="button"
                    onMouseEnter={() => setHovered(t)}
                    onMouseLeave={() => setHovered(null)}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ x, y }}
                    data-cursor="VIEW"
                    animate={{ rotate: paused ? 0 : -360 }}
                    transition={{
                      duration: durations[ri],
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.35 }}
                      transition={{ type: "spring", stiffness: 260, damping: 18 }}
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0E0E0E]/80 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur-sm hover:border-white/40"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                      {t.name}
                    </motion.div>
                  </motion.button>
                );
              })}
            </motion.div>
          );
        })}

        {/* Description */}
        <motion.div
          key={hovered?.name ?? "idle"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
        >
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
            {hovered ? hovered.name : "Hover to pause"}
          </p>
          <p className="mt-2 max-w-sm text-sm text-white/80">
            {hovered ? hovered.desc : "Nine tools, one core discipline."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
