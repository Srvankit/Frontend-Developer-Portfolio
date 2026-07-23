import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, FileText } from "lucide-react";
import { ResumeModal } from "./ResumeModal";

const socials = [
  { label: "Github", href: "https://github.com/Srvankit", icon: Github, cursor: "OPEN →" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ankit-yadav-programmer",
    icon: Linkedin,
    cursor: "VISIT →",
  },
  { label: "Email", href: "mailto:ankityadav.reh@gmail.com", icon: Mail, cursor: "EMAIL →" },
];

export function Footer() {
  const [resume, setResume] = useState(false);
  return (
    <footer className="relative w-full px-6 pb-14 pt-24 sm:px-10 lg:px-16">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto h-px max-w-6xl origin-left bg-white/10"
      />

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
            Designed & Engineered by
          </p>
          <p className="font-display mt-3 text-3xl leading-[1.1] tracking-[-0.03em] text-white sm:text-4xl">
            Ankit Yadav
          </p>
          <p className="mt-4 max-w-md text-sm text-[#B8B8B8]">
            Crafted with React, Spring Boot, TypeScript, Framer Motion and a
            passion for building impactful software.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setResume(true)}
            aria-label="Open resume"
            data-cursor="DOWNLOAD →"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <FileText className="h-4 w-4" />
          </button>
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={s.label}
              data-cursor={s.cursor}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <s.icon className="h-4 w-4" />
            </a>
          ))}
          <a
            href="#home"
            aria-label="Back to top"
            data-cursor="SCROLL"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-3 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E] sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 Ankit Yadav</p>
        <p>Crafted with React, Spring Boot & Framer Motion.</p>
      </div>

      <ResumeModal open={resume} onClose={() => setResume(false)} />
    </footer>
  );
}
