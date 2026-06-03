"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { POCKETS } from "@/lib/content";
import { EASE_OUT_STRONG, inView } from "@/lib/easing";

/* ─────────────────────────────────────────────────────── */
/*  Isometric SVG icons                                    */
/* ─────────────────────────────────────────────────────── */

function IsoSave({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden>
      <path d="M 10 38 L 10 44 A 18 6 0 0 1 46 44 L 46 38" fill="currentColor" opacity="0.28" />
      <ellipse cx="28" cy="38" rx="18" ry="6" fill="currentColor" opacity="0.52" />
      <path d="M 10 24 L 10 30 A 18 6 0 0 1 46 30 L 46 24" fill="currentColor" opacity="0.48" />
      <ellipse cx="28" cy="24" rx="18" ry="6" fill="currentColor" />
      <text x="28" y="24.5" textAnchor="middle" dominantBaseline="middle"
        fill="white" fontSize="11" fontWeight="800" fontFamily="system-ui, sans-serif">$</text>
    </svg>
  );
}

function IsoSpend({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden>
      <path d="M 6 24 L 28 13 L 50 24 L 28 35 Z" fill="currentColor" />
      <path d="M 6 24 L 6 31 L 28 42 L 28 35 Z" fill="currentColor" opacity="0.48" />
      <path d="M 28 35 L 50 24 L 50 31 L 28 42 Z" fill="currentColor" opacity="0.32" />
      <path d="M 14 22 L 21 18.5 L 25 21.5 L 18 25 Z" fill="white" opacity="0.38" />
      <line x1="9" y1="27" x2="29" y2="17" stroke="white" strokeWidth="1.5" strokeOpacity="0.16" strokeLinecap="round" />
    </svg>
  );
}

function IsoInvest({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden>
      <path d="M 4 36 L 16 30 L 22 33 L 10 39 Z" fill="currentColor" opacity="0.9" />
      <path d="M 4 36 L 10 39 L 10 50 L 4 47 Z" fill="currentColor" opacity="0.55" />
      <path d="M 16 30 L 22 33 L 22 44 L 16 41 Z" fill="currentColor" opacity="0.38" />
      <path d="M 18 26 L 30 20 L 36 23 L 24 29 Z" fill="currentColor" opacity="0.95" />
      <path d="M 18 26 L 24 29 L 24 50 L 18 47 Z" fill="currentColor" opacity="0.55" />
      <path d="M 30 20 L 36 23 L 36 44 L 30 41 Z" fill="currentColor" opacity="0.38" />
      <path d="M 32 14 L 44 8 L 50 11 L 38 17 Z" fill="currentColor" />
      <path d="M 32 14 L 38 17 L 38 50 L 32 47 Z" fill="currentColor" opacity="0.55" />
      <path d="M 44 8 L 50 11 L 50 44 L 44 41 Z" fill="currentColor" opacity="0.38" />
    </svg>
  );
}

function IsoGive({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 56 56" fill="none" aria-hidden>
      <path d="M 8 28 L 8 44 L 28 54 L 28 38 Z" fill="currentColor" opacity="0.48" />
      <path d="M 28 38 L 48 28 L 48 44 L 28 54 Z" fill="currentColor" opacity="0.32" />
      <path d="M 8 22 L 8 28 L 28 38 L 28 32 Z" fill="currentColor" opacity="0.6" />
      <path d="M 28 32 L 48 22 L 48 28 L 28 38 Z" fill="currentColor" opacity="0.42" />
      <path d="M 8 22 L 28 12 L 48 22 L 28 32 Z" fill="currentColor" />
      <path d="M 25 12 L 28 10.5 L 31 12 L 31 32 L 25 32 Z" fill="white" opacity="0.28" />
      <path d="M 8 22 L 48 22" stroke="white" strokeWidth="3.5" strokeOpacity="0.22" />
      <path d="M 28 12 C 26 7 18 7 20 13 C 22 16 26 14 28 12 Z" fill="white" opacity="0.5" />
      <path d="M 28 12 C 30 7 38 7 36 13 C 34 16 30 14 28 12 Z" fill="white" opacity="0.4" />
      <circle cx="28" cy="12" r="2.5" fill="white" opacity="0.55" />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Card data                                              */
/* ─────────────────────────────────────────────────────── */

const STYLES = [
  {
    cell: "lg:col-span-6 lg:row-span-2",
    bg: "bg-forest-deep",
    name: "text-cream",
    pct: "text-gold",
    iconColor: "text-gold",
    backAccent: "bg-gold",
    backHead: "text-cream",
    backBody: "text-cream/55",
    shadow: "shadow-[0_32px_90px_-48px_oklch(11.5%_0.022_255_/_0.8)]",
  },
  {
    cell: "lg:col-span-6",
    bg: "bg-gold-soft",
    name: "text-forest-deep",
    pct: "text-amber",
    iconColor: "text-amber",
    backAccent: "bg-amber",
    backHead: "text-forest-deep",
    backBody: "text-forest-deep/55",
    shadow: "shadow-[0_22px_70px_-48px_oklch(78%_0.15_72_/_0.65)]",
  },
  {
    cell: "lg:col-span-3",
    bg: "bg-card",
    name: "text-forest-deep",
    pct: "text-teal",
    iconColor: "text-teal",
    backAccent: "bg-teal",
    backHead: "text-forest-deep",
    backBody: "text-forest-deep/55",
    shadow: "shadow-[0_22px_70px_-54px_oklch(66%_0.12_195_/_0.7)]",
  },
  {
    cell: "lg:col-span-3",
    bg: "bg-card",
    name: "text-forest-deep",
    pct: "text-coral",
    iconColor: "text-coral",
    backAccent: "bg-coral",
    backHead: "text-forest-deep",
    backBody: "text-forest-deep/55",
    shadow: "shadow-[0_22px_70px_-54px_oklch(70%_0.17_30_/_0.65)]",
  },
];

const POCKET_TEXT = ["text-gold", "text-amber", "text-teal", "text-coral"];
const ISO_ICONS = [IsoSave, IsoSpend, IsoInvest, IsoGive];

const BACK = [
  { headline: "The habit most adults never built.", body: "They're building it young." },
  { headline: "Fewer 'can I have' moments.", body: "Because they already have their own." },
  { headline: "The start you never got.", body: "Real markets. Way earlier than you did." },
  { headline: "Generosity as identity.", body: "Not a lesson. A default." },
];

/* ─────────────────────────────────────────────────────── */
/*  Individual card — own hover state so flip target is   */
/*  always the stationary outer div, not the rotating one */
/* ─────────────────────────────────────────────────────── */

function PocketCard({
  pocket,
  index,
  reduce,
}: {
  pocket: (typeof POCKETS)[number];
  index: number;
  reduce: boolean | null;
}) {
  const [flipped, setFlipped] = useState(false);
  const s = STYLES[index];
  const IsoIcon = ISO_ICONS[index];
  const back = BACK[index];
  const big = index === 0;

  return (
    <motion.div
      initial={reduce ? false : { y: 18, scale: 0.985 }}
      whileInView={reduce ? undefined : { y: 0, scale: 1 }}
      viewport={inView}
      transition={{ duration: 0.7, delay: index * 0.06, ease: EASE_OUT_STRONG }}
      /*
       * Hover is tracked on the outer, stationary card — not on the rotating
       * flipper. This prevents the hit-area flickering that causes stuck/
       * oscillating flips when whileHover is placed on the element itself.
       */
      onMouseEnter={() => { if (!reduce) setFlipped(true); }}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
      className={`group relative min-h-[280px] w-full min-w-0 cursor-pointer rounded-brand-lg border border-forest/10 ${s.cell} ${s.shadow} ${
        big ? "lg:min-h-[560px]" : "lg:min-h-[260px]"
      }`}
      /*
       * perspective lives here (not on the flip div) so the 3D context
       * surrounds the entire card. overflow:hidden is intentionally absent
       * here — it would flatten the 3D in WebKit. Each face carries its
       * own overflow:hidden + border-radius to clip its content instead.
       */
      style={{ perspective: "1100px" }}
    >
      {/* Flip container — CSS transition, not Motion, for reliable 3D */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: reduce ? "none" : "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >

        {/* ── FRONT ── */}
        <div
          className={`absolute inset-0 flex flex-col justify-between overflow-hidden rounded-brand-lg p-6 sm:p-7 ${big ? "lg:p-10" : ""} ${s.bg}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,white_0%,transparent_38%)] opacity-[0.07]" />
          <div
            aria-hidden
            className={`pointer-events-none absolute -bottom-2 -right-4 select-none font-display font-extrabold leading-none tracking-tight ${s.name}`}
            style={{
              fontSize: big ? "clamp(9rem,22vw,20rem)" : "clamp(7rem,15vw,11rem)",
              opacity: 0.055,
            }}
          >
            {pocket.percent}
          </div>

          <IsoIcon className={`relative shrink-0 ${s.iconColor} ${big ? "h-14 w-14" : "h-11 w-11"}`} />

          <div className="relative flex items-end justify-between gap-3">
            <h3
              className={`font-display font-extrabold leading-none tracking-tight ${s.name} ${
                big ? "text-[clamp(3.5rem,7vw,6.5rem)]" : "text-[clamp(2.4rem,4.5vw,3.5rem)]"
              }`}
            >
              {pocket.name}
            </h3>
            <span
              className={`shrink-0 font-display font-extrabold leading-none tracking-tight ${s.pct} ${
                big ? "text-[clamp(2rem,3.5vw,3rem)]" : "text-2xl"
              }`}
            >
              {pocket.percent}%
            </span>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-5 overflow-hidden rounded-brand-lg px-8 py-10 text-center ${s.bg}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,white_0%,transparent_38%)] opacity-[0.07]" />

          <p className={`relative font-sans text-[10px] font-bold uppercase tracking-[0.22em] ${s.backBody}`}>
            {pocket.name}
          </p>

          <div className={`relative h-[2px] w-8 rounded-full ${s.backAccent}`} />

          <p
            className={`relative font-display font-extrabold leading-tight tracking-[-0.02em] ${s.backHead} ${
              big ? "text-[clamp(1.8rem,3.5vw,2.6rem)]" : "text-[clamp(1.4rem,2.5vw,1.9rem)]"
            }`}
          >
            {back.headline}
          </p>

          <p className={`relative max-w-[22ch] font-sans text-sm leading-relaxed ${s.backBody}`}>
            {back.body}
          </p>
        </div>

      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────── */
/*  Section                                                */
/* ─────────────────────────────────────────────────────── */

export function FourPockets() {
  const reduce = useReducedMotion();

  return (
    <section id="pockets" className="relative isolate scroll-mt-24 overflow-hidden bg-cream">
      <div className="absolute inset-x-0 top-0 h-px bg-forest/10" />
      <div className="absolute left-1/2 top-20 -z-10 h-[460px] w-[min(80vw,980px)] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(80%_0.17_82_/_0.2),transparent_68%)] blur-3xl" />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32">

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.65, ease: EASE_OUT_STRONG }}
        >
          <h2>
            <span className="block font-display text-[clamp(2.4rem,4.5vw,4.5rem)] font-extrabold leading-[0.9] tracking-[-0.035em] text-forest-deep">
              Four pockets.
            </span>
            <span className="mt-5 flex flex-wrap items-center">
              {POCKETS.map((p, i) => (
                <span key={p.name} className="flex items-center">
                  {i > 0 && (
                    <span className="mx-4 block h-[1.2em] w-px bg-forest/15" aria-hidden />
                  )}
                  <span className={`font-display text-[clamp(1.25rem,2.2vw,2rem)] font-bold leading-none tracking-[-0.025em] ${POCKET_TEXT[i]}`}>
                    {p.name}
                  </span>
                </span>
              ))}
            </span>
          </h2>
        </motion.div>

        <div className="mt-10 grid w-full min-w-0 auto-rows-fr grid-cols-1 gap-5 lg:grid-cols-12">
          {POCKETS.map((pocket, i) => (
            <PocketCard key={pocket.name} pocket={pocket} index={i} reduce={reduce} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium tracking-wide text-forest/40 uppercase">
          *Allocation is customisable.
        </p>

      </div>
    </section>
  );
}
