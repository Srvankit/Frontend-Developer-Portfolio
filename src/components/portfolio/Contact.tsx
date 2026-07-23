import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Github, Linkedin, FileText } from "lucide-react";
import { useState } from "react";
import { ResumeModal } from "./ResumeModal";

const channels = [
  {
    label: "Email",
    value: "ankityadav.reh@gmail.com",
    href: "mailto:ankityadav.reh@gmail.com",
    icon: Mail,
    cursor: "EMAIL →",
  },
  {
    label: "LinkedIn",
    value: "in/ankit-yadav-programmer",
    href: "https://www.linkedin.com/in/ankit-yadav-programmer",
    icon: Linkedin,
    cursor: "VISIT →",
  },
  {
    label: "Github",
    value: "@Srvankit",
    href: "https://github.com/Srvankit",
    icon: Github,
    cursor: "OPEN →",
  },
  {
    label: "Resume",
    value: "Open PDF",
    icon: FileText,
    cursor: "DOWNLOAD →",
  },
] as const;

export function Contact() {
  const [resume, setResume] = useState(false);
  return (
    <section
      id="contact"
      className="relative w-full border-t border-white/5 px-6 py-32 sm:px-10 lg:px-16 lg:py-48"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60%] opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 0%, rgba(255,255,255,0.06), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs uppercase tracking-[0.28em] text-[#8E8E8E]"
        >
          (11) — Contact
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display mt-8 text-5xl leading-[1.02] tracking-[-0.04em] text-white sm:text-7xl lg:text-[8rem]"
        >
          Let's build something{" "}
          <span className="text-[#8E8E8E]">amazing.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="mt-8 max-w-xl text-base text-[#B8B8B8]"
        >
          Open for internship and full-time engineering roles. If you're
          shipping something beautiful or unreasonably ambitious, I'd love to
          talk.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 gap-3 md:grid-cols-2">
          {channels.map((c, i) => {
            const isResume = c.label === "Resume";
            const inner = (
              <>
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/80 transition-colors group-hover:text-white">
                    <c.icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                      {c.label}
                    </p>
                    <p className="font-display mt-1 text-lg text-white">
                      {c.value}
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="h-5 w-5 text-[#8E8E8E] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
              </>
            );
            const className =
              "group relative flex items-center justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.04]";
            if (isResume) {
              return (
                <motion.button
                  key={c.label}
                  type="button"
                  onClick={() => setResume(true)}
                  data-cursor={c.cursor}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`${className} text-left`}
                >
                  {inner}
                </motion.button>
              );
            }
            return (
              <motion.a
                key={c.label}
                href={c.href!}
                target={c.href!.startsWith("http") ? "_blank" : undefined}
                rel={c.href!.startsWith("http") ? "noreferrer" : undefined}
                data-cursor={c.cursor}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={className}
              >
                {inner}
              </motion.a>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center gap-6 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
          <span className="inline-flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
            </span>
            Available — Summer 2026
          </span>
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3 w-3" /> India · Remote worldwide
          </span>
        </div>
      </div>

      <ResumeModal open={resume} onClose={() => setResume(false)} />
    </section>
  );
}
