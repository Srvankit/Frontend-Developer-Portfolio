import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 350, mass: 0.4 });
  const springY = useSpring(y, { damping: 30, stiffness: 350, mass: 0.4 });

  const outerX = useSpring(x, { damping: 22, stiffness: 120, mass: 0.6 });
  const outerY = useSpring(y, { damping: 22, stiffness: 120, mass: 0.6 });

  const [label, setLabel] = useState<string>("");
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const magnetTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = 0;
    let my = 0;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      setVisible(true);

      // Magnetic effect
      const target = magnetTarget.current;
      if (target) {
        const rect = target.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (mx - cx) * 0.35;
        const dy = (my - cy) * 0.35;
        target.style.transform = `translate(${dx}px, ${dy}px)`;
        x.set(cx + dx);
        y.set(cy + dy);
      } else {
        x.set(mx);
        y.set(my);
      }
    };

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>(
        "a, button, [data-cursor], [role='button'], input, textarea",
      );
      if (el) {
        setHovering(true);
        const custom = el.getAttribute("data-cursor");
        setLabel(custom ?? "");
        if (el.hasAttribute("data-magnetic")) {
          magnetTarget.current = el;
        }
      } else {
        setHovering(false);
        setLabel("");
        if (magnetTarget.current) {
          magnetTarget.current.style.transform = "";
          magnetTarget.current = null;
        }
      }
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over);
    window.addEventListener("mouseleave", leave);
    window.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mouseleave", leave);
      window.removeEventListener("mouseenter", enter);
    };
  }, [x, y]);

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="rounded-full bg-white"
          animate={{
            width: hovering ? 8 : 6,
            height: hovering ? 8 : 6,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center"
        style={{
          x: outerX,
          y: outerY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: visible ? 1 : 0,
        }}
      >
        <motion.div
          className="flex items-center justify-center rounded-full border border-white/30 backdrop-blur-[2px]"
          animate={{
            width: label ? 84 : hovering ? 48 : 34,
            height: label ? 84 : hovering ? 48 : 34,
            backgroundColor: label ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          {label && (
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/90">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
}
