import { useEffect } from "react";

type LenisLike = { stop: () => void; start: () => void };

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

let lockCount = 0;
let savedOverflow = "";
let savedPaddingRight = "";

function apply() {
  const body = document.body;
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  savedOverflow = body.style.overflow;
  savedPaddingRight = body.style.paddingRight;
  body.style.overflow = "hidden";
  if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  window.__lenis?.stop();
}

function release() {
  document.body.style.overflow = savedOverflow;
  document.body.style.paddingRight = savedPaddingRight;
  window.__lenis?.start();
}

export function lockScroll() {
  lockCount += 1;
  if (lockCount === 1) apply();
}

export function unlockScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) release();
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lockScroll();
    return () => unlockScroll();
  }, [active]);
}
