import { useRef, useState, type MouseEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import portrait from "@/assets/portrait.png";


export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.08]);
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = photoRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: -py * 8, ry: px * 10 });
  };

  const paragraphs = [
    "I started with a curiosity about how a blank page could become a living interface — a single line of HTML, a broken CSS layout, a first console.log that finally worked at 2 AM.",
    "That curiosity turned into obsession. JavaScript became React. React introduced me to design systems, motion, and the details that separate polished products from prototypes. On the other side, Java and Spring Boot taught me the discipline of building systems that don't break.",
    "Along the way I've freelanced for small teams, contributed to open source, and learned that engineering is rarely about frameworks — it's about problem solving, taste, and the empathy to build things people actually enjoy using.",
    "Right now, I'm chasing the intersection of craft and scale: interfaces that feel cinematic, backends that stay boring, and products that respect the user's time. The goal is simple — build software that lasts.",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full px-6 py-32 sm:px-10 lg:px-16 lg:py-48"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Photo */}
        <motion.div
          style={{ y: photoY }}
          className="lg:col-span-5"
        >
          <div
            ref={photoRef}
            onMouseMove={onMove}
            onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
            className="group relative"
            style={{ perspective: "1200px" }}
          >
            {/* Animated conic border */}
            <div
              aria-hidden
              className="absolute -inset-[1px] rounded-2xl opacity-70"
              style={{
                background:
                  "conic-gradient(from var(--a,0deg), rgba(255,255,255,0.35), transparent 30%, rgba(255,255,255,0.15) 60%, transparent 90%)",
                animation: "spin 12s linear infinite",
                filter: "blur(0.5px)",
              }}
            />
            <motion.div
              style={{
                scale: photoScale,
                rotateX: tilt.rx,
                rotateY: tilt.ry,
                transformStyle: "preserve-3d",
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
              animate={{ y: [0, -6, 0] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E0E] will-change-transform"
            >
              {/* soft glow */}
              <div
                aria-hidden
                className="absolute inset-0 opacity-80"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
                }}
              />
              <img
                src={portrait}
                alt="Portrait of Ankit Yadav"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top opacity-95"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 55%, rgba(5,5,5,0.55) 90%, rgba(5,5,5,0.9) 100%)",
                }}
              />

              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                <span>A.Y — 001</span>
                <span>2026</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Text */}
        <div className="lg:col-span-7 lg:pt-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8 }}
            className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
          >
            (01) — Who I Am
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display mt-8 text-4xl leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl"
          >
            Engineer by trade.{" "}
            <span className="text-[#8E8E8E]">Craftsman</span> at heart.
          </motion.h2>

          <div className="mt-10 space-y-6">
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-xl text-base leading-relaxed text-[#B8B8B8] sm:text-lg"
              >
                {p}
              </motion.p>
            ))}
          </div>

          {/* meta cards */}
          <div className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              { k: "Focus", v: "Full-Stack" },
              { k: "Style", v: "Product-first" },
              { k: "Timezone", v: "IST / UTC+5:30" },
            ].map((c, i) => (
              <motion.div
                key={c.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.7 }}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm"
              >
                <p className="text-[10px] uppercase tracking-[0.24em] text-[#8E8E8E]">
                  {c.k}
                </p>
                <p className="mt-2 text-sm text-white">{c.v}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
