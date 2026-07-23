import { motion, type Variants } from "framer-motion";
import { ArrowDown, MapPin } from "lucide-react";

const reveal: Variants = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: 0,
    transition: { delay: 1.8 + i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  }),
};

function RevealWord({ word, base }: { word: string; base: number }) {
  return (
    <span className="mr-[0.15em] inline-flex overflow-hidden align-baseline">
      {word.split("").map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block will-change-transform"
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={base + i}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-16 pt-40 sm:px-10 lg:px-16"
    >
      {/* soft background glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/3 h-[520px] w-[520px] rounded-full opacity-40 blur-[140px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full opacity-30 blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)" }}
      />

      {/* Top meta line */}
      <div className="relative z-10 flex items-start justify-between text-xs uppercase tracking-[0.28em] text-[#8E8E8E]">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="hidden sm:block"
        >
          Portfolio — 2026
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex items-center gap-2"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Available
        </motion.div>
      </div>

      {/* Main headline */}
      <div className="relative z-10 mt-14 grid grid-cols-1 gap-10 lg:mt-0 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <h1 className="font-display text-[19vw] font-light leading-[0.88] tracking-[-0.05em] text-white sm:text-[15vw] lg:text-[12vw]">
            <span className="block">
              <RevealWord word="ANKIT" base={0} />
            </span>
            <span className="block text-[#8E8E8E]">
              <RevealWord word="YADAV" base={6} />
            </span>
          </h1>

          <motion.div
            initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ delay: 2.9, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 max-w-xl"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-white/70">
              Software Engineer
            </p>
            <p className="mt-4 text-lg text-[#B8B8B8] sm:text-xl">
              Building scalable digital experiences with modern web technologies.
            </p>
          </motion.div>
        </div>

        {/* Right column — status card */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 3.0, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-4"
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-[#8E8E8E]">
              <span className="h-px w-6 bg-white/30" />
              Currently
            </div>
            <p className="mt-4 font-display text-2xl leading-tight text-white">
              Open for Software Engineering Internships
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[#8E8E8E]">Status</span>
                <span className="text-white">Available Immediately</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/5 pt-3">
                <span className="text-[#8E8E8E]">Location</span>
                <span className="flex items-center gap-1 text-white">
                  <MapPin className="h-3.5 w-3.5" /> India
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.3, duration: 1 }}
        className="relative z-10 mt-16 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
      >
        <span>Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 text-white/70"
        >
          <ArrowDown className="h-3.5 w-3.5" />
        </motion.div>
      </motion.div>
    </section>
  );
}
