"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowRight } from "@phosphor-icons/react";
import { CARD_SECTION } from "@/lib/content";
import { EASE_OUT_STRONG, inView } from "@/lib/easing";
import { PennyCardStack } from "./visuals/PennyCard";

export function CardSection() {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 150, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 150, damping: 18, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [9, -9]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-7, 7]);

  function move(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function leave() {
    px.set(0);
    py.set(0);
  }

  const CARD_FEATS = [
    "Real Mastercard debit card",
    "Tap to pay enabled",
    "Earned, not gifted",
    "Parent-controlled limits",
  ];

  return (
    <section id="card" className="relative scroll-mt-24 overflow-hidden bg-forest text-cream">
      {/* Subtle noise overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:gap-10 lg:px-10 lg:py-32">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
          className="order-2 lg:order-1"
        >
          <span className="inline-block rounded-full border border-cream/20 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-cream/60">
            The Penny Card
          </span>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            {CARD_SECTION.heading}
          </h2>
          <p className="mt-6 max-w-md font-sans text-lg leading-relaxed text-cream/70">
            {CARD_SECTION.body}
          </p>

          {/* Feature chips */}
          <div className="mt-8 flex flex-wrap gap-2">
            {CARD_FEATS.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1.5 rounded-full border border-cream/15 bg-cream/8 px-4 py-2 font-sans text-sm font-semibold text-cream/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {feat}
              </span>
            ))}
          </div>

          <motion.a
            href="#waitlist"
            whileHover={reduce ? undefined : { scale: 1.02 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT_STRONG }}
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-base font-bold text-forest-deep shadow-[0_8px_30px_-8px_oklch(80%_0.17_82_/_0.5)]"
          >
            {CARD_SECTION.cta}
            <ArrowRight
              weight="bold"
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </motion.a>
        </motion.div>

        <div
          onPointerMove={move}
          onPointerLeave={leave}
          className="order-1 flex justify-center [perspective:1100px] lg:order-2"
        >
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -6 }}
            whileInView={reduce ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
            viewport={inView}
            transition={{ type: "spring", stiffness: 130, damping: 16 }}
            className="w-full max-w-xl [transform-style:preserve-3d]"
            style={reduce ? undefined : { rotateX, rotateY }}
          >
            <PennyCardStack />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
