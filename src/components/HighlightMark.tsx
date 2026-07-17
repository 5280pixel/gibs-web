"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type HighlightMarkProps = {
  children: React.ReactNode;
  delay?: number;
};

export function HighlightMark({ children, delay = 0.45 }: HighlightMarkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="relative inline whitespace-nowrap">
      <motion.span
        aria-hidden
        className="absolute inset-x-[-0.06em] bottom-[0.12em] z-0 h-[0.52em] -skew-x-3 rounded-[0.12em] bg-[color-mix(in_srgb,var(--accent)_42%,transparent)]"
        initial={reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.65, delay, ease }
        }
        style={{ transformOrigin: "left center" }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
}
