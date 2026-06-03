// Shared motion constants. Centralized so every section animates with the
// same feel (framer-motion + emilkowal-animations governance).
import type { Transition, Variants } from "motion/react";

// Strong ease-out for entrances (emilkowal key value).
export const EASE_OUT_STRONG = [0.23, 1, 0.32, 1] as const;
// Strong ease-in-out for on-screen movement.
export const EASE_IN_OUT_STRONG = [0.77, 0, 0.175, 1] as const;

// Reusable spring for physical, interruptible motion (card landing, tilt).
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 18,
  mass: 1,
};

export const SPRING_SNAPPY: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 26,
};

// Standard entrance: fade + small rise. Duration kept short per emilkowal
// "faster is better" guidance.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT_STRONG },
  },
};

// Container that staggers its children's entrance.
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.15, staggerChildren: 0.08 },
  },
};

// Viewport config for whileInView reveals - fire once, a bit before fully in.
export const inView = { once: true, amount: 0.3 } as const;
