import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, FileText } from "lucide-react";
import { useScrollLock } from "@/lib/scroll-lock";
import resumeAsset from "@/assets/resume.pdf.asset.json";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function ResumeModal({ open, onClose }: Props) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Resume preview"
          className="fixed inset-0 z-[150] flex items-center justify-center px-4 py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.button
            aria-label="Close resume"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            className="relative flex h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0E0E0E]"
            initial={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 16, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8E8E8E]">
                <FileText className="h-3.5 w-3.5" /> Resume — Ankit Yadav
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={resumeAsset.url}
                  download="Ankit_Yadav_Resume.pdf"
                  data-cursor="DOWNLOAD →"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-black transition-transform hover:-translate-y-[1px]"
                >
                  <Download className="h-3.5 w-3.5" /> Download
                </a>
                <button
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden bg-[#050505]">
              <iframe
                src={`${resumeAsset.url}#toolbar=0&navpanes=0`}
                title="Ankit Yadav Resume"
                className="h-full w-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
