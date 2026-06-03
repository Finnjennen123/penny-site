"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { WHY, WHY_FEATURES } from "@/lib/content";
import { Reveal } from "./Reveal";
import { EASE_OUT_STRONG, inView } from "@/lib/easing";

const INDICES = ["01", "02", "03"] as const;

function ProblemRow({
  feature,
  idx,
}: {
  feature: (typeof WHY_FEATURES)[number];
  idx: number;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={`group relative cursor-default select-none border-t border-cream/[0.08] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 ${
        open ? "bg-cream/[0.03]" : ""
      }`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setOpen((v) => !v);
      }}
      tabIndex={0}
      role="button"
      aria-expanded={open}
    >
      {/* Accent bar on left edge */}
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px] origin-top bg-gold"
        initial={{ scaleY: 0 }}
        animate={reduce ? {} : { scaleY: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT_STRONG }}
      />

      <div className="flex items-start gap-6 px-6 py-9 lg:px-8">
        {/* Index */}
        <span className="mt-[0.45em] w-10 shrink-0 font-mono text-xs font-medium tabular-nums text-cream/20">
          {INDICES[idx]}
        </span>

        {/* Headline + body */}
        <div className="flex-1">
          <h3
            className="font-display font-bold leading-[1.06] tracking-[-0.025em] text-cream/80 transition-colors duration-300 group-hover:text-cream"
            style={{ fontSize: "clamp(1.6rem, 3.1vw, 2.75rem)" }}
          >
            {feature.title}
          </h3>

          <AnimatePresence>
            {open && (
              <motion.p
                key="body"
                initial={reduce ? false : { opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: "0.875rem" }}
                exit={reduce ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.32, ease: EASE_OUT_STRONG }}
                className="overflow-hidden font-sans text-base leading-relaxed text-cream/48 max-w-[52ch]"
              >
                {feature.body}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Plus indicator */}
        <motion.span
          aria-hidden
          animate={reduce ? {} : { rotate: open ? 45 : 0, opacity: open ? 0.7 : 0.22 }}
          transition={{ duration: 0.28, ease: EASE_OUT_STRONG }}
          className="mt-[0.5em] shrink-0 font-sans text-2xl font-thin leading-none text-cream"
        >
          +
        </motion.span>
      </div>

      {/* Bottom hairline on last row */}
      {idx === 2 && (
        <div className="border-t border-cream/[0.08]" />
      )}
    </div>
  );
}

export function WhySection() {
  const reduce = useReducedMotion();

  return (
    <section id="why" className="relative overflow-hidden bg-forest-deep text-cream">
      <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Header */}
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            {WHY.heading}
          </h2>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-cream/65">
            {WHY.body}
          </p>
        </Reveal>

        {/* Problem statement rows */}
        <motion.div
          className="mt-14"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, ease: EASE_OUT_STRONG, delay: 0.1 }}
        >
          {WHY_FEATURES.map((feature, i) => (
            <ProblemRow key={feature.title} feature={feature} idx={i} />
          ))}
        </motion.div>

        {/* Divider */}
        <div className="mt-16 border-t border-cream/10" />

        {/* Stats */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-brand-lg border border-cream/10 bg-cream/10 sm:grid-cols-3">
          {WHY.facts.map((fact, i) => (
            <Reveal key={fact.value} delay={i * 0.08} className="bg-forest-deep p-8">
              <p className="font-display text-5xl font-extrabold text-gold">{fact.value}</p>
              <p className="mt-3 font-sans text-base leading-relaxed text-cream/60">
                {fact.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
