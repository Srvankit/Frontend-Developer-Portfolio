import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ResumeModal } from "./ResumeModal";

const links = [
  { label: "About", href: "#about" },
  { label: "Journey", href: "#journey" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resume, setResume] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 20);
        if (y < 80) {
          setVisible(true);
        } else if (y > lastY + 6) {
          setVisible(false);
        } else if (y < lastY - 6) {
          setVisible(true);
        }
        lastY = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-4 z-[70] flex justify-center px-4 sm:top-6"
      >
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 px-4 py-2.5 backdrop-blur-xl transition-colors sm:px-6 ${
            scrolled ? "bg-[#0E0E0E]/70" : "bg-white/[0.03]"
          }`}
        >
          <a
            href="#home"
            data-cursor="HOME"
            className="font-display text-lg tracking-tight text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-full"
          >
            A<span className="text-[#8E8E8E]">.</span>Y
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative rounded-full px-3.5 py-1.5 text-sm text-[#8E8E8E] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setResume(true)}
              data-cursor="OPEN"
              data-magnetic
              className="group hidden items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-black transition-all hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:inline-flex"
            >
              Resume
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-4 top-20 z-[65] rounded-2xl border border-white/10 bg-[#0E0E0E]/95 p-6 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-4">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    onClick={() => setOpen(false)}
                    href={l.href}
                    className="font-display text-2xl text-white"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    setOpen(false);
                    setResume(true);
                  }}
                  className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-sm font-medium text-black"
                >
                  Resume <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <ResumeModal open={resume} onClose={() => setResume(false)} />
    </>
  );
}
