"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { ArrowRight, Users, Buildings, GraduationCap } from "@phosphor-icons/react";
import { HERO } from "@/lib/content";
import { EASE_OUT_STRONG } from "@/lib/easing";
import { PennyCard } from "./visuals/PennyCard";
import { IPhone17Pro } from "./visuals/IPhone17Pro";

const copyContainer: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.5, staggerChildren: 0.09 } },
};
const copyItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT_STRONG } },
};

const phoneEntry: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE_OUT_STRONG, delay: 0.1 },
  },
};
const cardEntry: Variants = {
  hidden: { opacity: 0, y: 32, rotate: 7 },
  show: {
    opacity: 1,
    y: 0,
    rotate: 7,
    transition: { duration: 0.8, ease: EASE_OUT_STRONG, delay: 0.3 },
  },
};

const TRUST_ITEMS = [
  { Icon: Users, label: "5,000+ families" },
  { Icon: Buildings, label: "100+ schools" },
  { Icon: GraduationCap, label: "Financial advisors" },
];
const WORD_INTERVAL_MS = 2800;

export function Hero() {
  const reduce = useReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);
  const activeWord = HERO.rotatingWords[wordIndex] ?? HERO.rotatingWords[0];
  const longestWord = HERO.rotatingWords.reduce((longest, word) =>
    word.length > longest.length ? word : longest
  );

  useEffect(() => {
    if (reduce) return;

    const id = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % HERO.rotatingWords.length);
    }, WORD_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, [reduce]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 140, damping: 18, mass: 0.6 });

  const cardRotateY = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const cardRotateX = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const cardShiftX = useTransform(sx, [-0.5, 0.5], [-8, 8]);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handlePointerLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <section className="relative w-full overflow-hidden">
      {/* Mesh gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 90% 80% at 12% 25%, oklch(44% 0.155 155 / 0.07), transparent 58%)",
            "radial-gradient(ellipse 70% 60% at 88% 12%, oklch(68% 0.14 220 / 0.05), transparent 55%)",
            "radial-gradient(ellipse 65% 75% at 78% 88%, oklch(80% 0.17 82 / 0.08), transparent 60%)",
            "oklch(99.5% 0.004 95)",
          ].join(", "),
        }}
      />
      {/* Dot grid texture */}
      <div aria-hidden className="pointer-events-none absolute inset-0 dot-grid opacity-50" />

      <div className="relative mx-auto grid min-h-[100dvh] max-w-[1400px] grid-cols-1 items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:px-10 lg:pb-0">
        {/* LEFT: copy */}
        <motion.div
          variants={reduce ? undefined : copyContainer}
          initial={reduce ? false : "hidden"}
          animate={reduce ? false : "show"}
          className="relative z-10 max-w-xl"
        >
          {/* Live pill badge */}
          <motion.span
            variants={copyItem}
            className="inline-flex items-center gap-2 rounded-full border border-forest/20 bg-card px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-forest shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-forest" />
            </span>
            {HERO.eyebrow}
          </motion.span>

          <motion.h1
            variants={copyItem}
            className="mt-6 font-display text-[clamp(2.7rem,5.5vw,4.3rem)] font-extrabold leading-[1.03] tracking-[-0.03em] text-forest-deep"
            aria-label={`${HERO.headline} ${activeWord}.`}
          >
            <span className="block">{HERO.headline}</span>
            <span className="relative mt-1 block h-[1.18em] overflow-hidden pb-1 leading-[1.12] text-gold">
              <span aria-hidden className="invisible inline-block">
                {longestWord}
              </span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={activeWord}
                  aria-hidden
                  className="absolute left-0 top-0 inline-block will-change-transform"
                  initial={reduce ? false : { opacity: 0, y: "115%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: "-115%" }}
                  transition={{
                    duration: 0.62,
                    ease: EASE_OUT_STRONG,
                  }}
                >
                  {activeWord}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          <motion.p
            variants={copyItem}
            className="mt-6 max-w-md font-sans text-lg leading-relaxed text-muted-foreground"
          >
            {HERO.sub}
          </motion.p>

          <motion.div variants={copyItem} className="mt-9 flex flex-wrap items-center gap-3">
            <motion.a
              href="#waitlist"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_OUT_STRONG }}
              className="group inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-base font-bold text-forest-deep shadow-[0_8px_30px_-8px_oklch(80%_0.17_82_/_0.75)]"
            >
              {HERO.primaryCta}
              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </motion.a>
            <motion.a
              href="#how-it-works"
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE_OUT_STRONG }}
              className="inline-flex items-center rounded-full border border-forest/25 bg-card/70 px-7 py-3.5 font-sans text-base font-semibold text-forest backdrop-blur-sm"
            >
              {HERO.secondaryCta}
            </motion.a>
          </motion.div>

          {/* Trust micro-stats */}
          <motion.div
            variants={copyItem}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            {TRUST_ITEMS.map(({ Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-forest/10">
                  <Icon weight="fill" className="h-3.5 w-3.5 text-forest" />
                </span>
                <span className="font-sans text-sm font-semibold text-muted-foreground">
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT: device stage */}
        <div
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          className="relative z-10 mx-auto flex h-[clamp(26rem,52vh,38rem)] w-full max-w-[34rem] items-center justify-center [perspective:1100px]"
        >
          {/* Warm bloom behind devices */}
          <motion.div
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={reduce ? false : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE_OUT_STRONG }}
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(80% 0.17 82 / 0.30), oklch(66% 0.12 195 / 0.08) 60%, transparent 80%)",
            }}
          />

          {/* Phone */}
          <motion.div
            variants={reduce ? undefined : phoneEntry}
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
            className="absolute left-[2%] top-[44%] w-[46%] -translate-y-1/2"
          >
            <IPhone17Pro className="w-full" />
          </motion.div>

          {/* Card with 3D tilt */}
          <motion.div
            variants={reduce ? undefined : cardEntry}
            initial={reduce ? false : "hidden"}
            animate={reduce ? false : "show"}
            className="absolute right-0 top-[64%] w-[52%] [transform-style:preserve-3d]"
          >
            <motion.div
              className="relative"
              style={
                reduce
                  ? undefined
                  : {
                      rotateX: cardRotateX,
                      rotateY: cardRotateY,
                      x: cardShiftX,
                      transformStyle: "preserve-3d",
                    }
              }
            >
              <PennyCard />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
