"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HOW_IT_WORKS, STEPS } from "@/lib/content";

// ─── Glass widget variants per step ──────────────────────────────────────────

const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.72)",
  backdropFilter: "blur(14px) saturate(140%)",
  WebkitBackdropFilter: "blur(14px) saturate(140%)",
  boxShadow: "0 8px 32px -8px rgba(0,0,0,0.18)",
};

function ChoresWidget() {
  return (
    <div className="flex flex-col gap-2.5">
      <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-forest-deep/70">
        Today
      </p>
      {[
        { label: "Make the bed", done: true },
        { label: "Finish homework", done: true },
        { label: "Help with dinner", done: false },
      ].map(({ label, done }) => (
        <div key={label} className="flex items-center gap-2.5">
          <span
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
              done
                ? "border-forest bg-forest text-white"
                : "border-forest-deep/30 bg-transparent"
            }`}
          >
            {done && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                <path
                  d="M1 4l2.5 2.5L9 1"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
          <span
            className={`font-sans text-sm font-semibold ${
              done ? "text-forest-deep/45 line-through" : "text-forest-deep"
            }`}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

function EarnWidget() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-forest/15">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="9" stroke="#1a4731" strokeWidth="1.6" />
          <path
            d="M12 7v10M9.5 9.5C9.5 8.67 10.62 8 12 8s2.5.67 2.5 1.5S13.38 11 12 11s-2.5.67-2.5 1.5S10.62 14.5 12 14.5s2.5-.67 2.5-1.5"
            stroke="#1a4731"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.13em] text-forest-deep/65">
          Allowance paid
        </p>
        <p className="font-display text-3xl font-extrabold tracking-tight text-forest-deep">
          +$5.00
        </p>
        <p className="font-sans text-xs font-medium text-forest-deep/55">
          Moved to your pockets
        </p>
      </div>
    </div>
  );
}

function PocketsWidget() {
  const rows: [string, string, number, string][] = [
    ["Save", "50%", 50, "bg-forest"],
    ["Spend", "30%", 30, "bg-sky-500"],
    ["Invest", "15%", 15, "bg-amber-400"],
    ["Give", "5%", 5, "bg-rose-400"],
  ];
  return (
    <div className="flex flex-col gap-2.5">
      {rows.map(([label, pct, width, color]) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-[3.2rem] font-sans text-xs font-bold text-forest-deep">
            {label}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest-deep/12">
            <div className={`h-full rounded-full ${color}`} style={{ width: `${width}%` }} />
          </div>
          <span className="w-8 text-right font-sans text-xs font-semibold text-forest-deep/60">
            {pct}
          </span>
        </div>
      ))}
    </div>
  );
}

function CardWidget() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-400/20">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="2" y="5" width="20" height="14" rx="3" stroke="#92400e" strokeWidth="1.6" />
          <path d="M2 9h20" stroke="#92400e" strokeWidth="1.6" />
          <path d="M6 15h4M15 15h3" stroke="#92400e" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.13em] text-forest-deep/65">
          Goal reached
        </p>
        <p className="font-sans text-sm font-bold text-forest-deep">
          Card is on its way
        </p>
        <p className="font-sans text-xs font-medium text-forest-deep/55">
          Delivery in 3 to 5 business days
        </p>
      </div>
    </div>
  );
}

const STEP_WIDGETS = [ChoresWidget, EarnWidget, PocketsWidget, CardWidget];

// ─── Gutter decorations — real Penny & Co illustrations ─────────────────────

// ─── Single step card ─────────────────────────────────────────────────────────

function StepCard({
  index,
  step,
  reduce,
}: {
  index: number;
  step: (typeof STEPS)[number];
  reduce: boolean;
}) {
  const Widget = STEP_WIDGETS[index];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: 0, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: reduce ? undefined : "transform, opacity" }}
      className="overflow-hidden rounded-[2rem] border border-forest-deep/10 bg-white shadow-[0_28px_80px_-50px_oklch(0%_0_0_/_0.5)]"
    >
      <div className="grid min-h-[500px] lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
        {/* ── Left: text ── */}
        <div className="relative flex flex-col p-8 sm:p-10 lg:p-12">
          {/* Big background digit */}
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 select-none font-display font-extrabold leading-none text-forest-deep/[0.08]"
            style={{ fontSize: "clamp(9rem,14vw,14rem)" }}
            aria-hidden
          >
            {index + 1}
          </span>

          {/* Title */}
          <h3 className="relative font-display text-[clamp(1.75rem,2.8vw,2.8rem)] font-extrabold leading-[1.06] tracking-[-0.015em] text-forest-deep">
            {step.title}
          </h3>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Body */}
          <p className="relative max-w-[34rem] font-sans text-base leading-relaxed text-muted-foreground sm:text-[1.05rem]">
            {step.body}
          </p>

          <p className="relative mt-5 font-mono text-xs text-forest-deep/25">
            {String(index + 1).padStart(2, "0")} / {STEPS.length}
          </p>
        </div>

        {/* ── Right: image + glass widget ── */}
        <div className="relative min-h-[340px] overflow-hidden lg:rounded-r-[2rem]">
          <Image
            src={step.image}
            alt={step.title}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/22 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-[264px]">
            <div className="w-full rounded-2xl px-4 py-3.5" style={GLASS}>
              <Widget />
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function HowItWorks() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="how-it-works" className="relative scroll-mt-24 bg-cream py-24 lg:py-32">

      {/* ── Left gutter ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 hidden 2xl:block"
        style={{ width: "calc((100% - 1180px) / 2)" }}
      >
        {/* Penny face — top, slightly off-centre */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/penny-face.svg"
          alt=""
          loading="lazy"
          className="absolute opacity-[0.10] mix-blend-multiply"
          style={{ top: "6%", left: "50%", transform: "translateX(-60%) rotate(-4deg)", width: "clamp(90px, 55%, 140px)" }}
        />
        {/* Penny standing full body — lower third */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/penny-standing.svg"
          alt=""
          loading="lazy"
          className="absolute opacity-[0.12] mix-blend-multiply"
          style={{ top: "48%", left: "50%", transform: "translateX(-45%) rotate(2deg)", width: "clamp(110px, 70%, 200px)" }}
        />
        {/* Teddy bear — near bottom */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/teddy.svg"
          alt=""
          loading="lazy"
          className="absolute opacity-[0.09] mix-blend-multiply"
          style={{ bottom: "7%", left: "50%", transform: "translateX(-50%) rotate(-3deg)", width: "clamp(80px, 50%, 120px)" }}
        />
      </div>

      {/* ── Right gutter ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden 2xl:block"
        style={{ width: "calc((100% - 1180px) / 2)" }}
      >
        {/* Penny excited / waving — top */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/penny-excited.svg"
          alt=""
          loading="lazy"
          className="absolute opacity-[0.12] mix-blend-multiply"
          style={{ top: "4%", left: "50%", transform: "translateX(-45%) rotate(3deg)", width: "clamp(100px, 65%, 170px)" }}
        />
        {/* Mr Coin (grandpa with coin) — mid section */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/mr-coin.svg"
          alt=""
          loading="lazy"
          className="absolute opacity-[0.10] mix-blend-multiply"
          style={{ top: "38%", left: "50%", transform: "translateX(-55%) rotate(-2deg)", width: "clamp(100px, 65%, 165px)" }}
        />
        {/* Penny standing — bottom, mirrored */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/penny-standing.svg"
          alt=""
          loading="lazy"
          className="absolute opacity-[0.09] mix-blend-multiply"
          style={{ bottom: "5%", left: "50%", transform: "translateX(-50%) scaleX(-1) rotate(1deg)", width: "clamp(90px, 58%, 150px)" }}
        />
      </div>

      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-3xl">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4.5rem)] font-extrabold leading-[0.96] tracking-[-0.02em] text-forest-deep">
            {HOW_IT_WORKS.heading}
          </h2>
          <p className="mt-5 max-w-[40rem] font-sans text-lg leading-relaxed text-muted-foreground">
            {HOW_IT_WORKS.sub}
          </p>
        </div>

        {/* Cards — simple vertical stack, no phantom scroll space */}
        <div className="mt-14 flex flex-col gap-6 lg:gap-8">
          {STEPS.map((step, index) => (
            <StepCard key={step.title} index={index} step={step} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}
