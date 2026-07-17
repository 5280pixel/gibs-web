"use client";

import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

type MotionRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function MotionReveal({
  children,
  className = "",
  delay = 0,
  y = 18,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.7, delay, ease }
      }
    >
      {children}
    </motion.div>
  );
}
