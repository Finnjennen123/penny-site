"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, CheckFat, X } from "@phosphor-icons/react";
import { PARENT_POWERS } from "@/lib/content";
import { IPhone17Pro } from "./visuals/IPhone17Pro";
import { EASE_OUT_STRONG, inView } from "@/lib/easing";

/* ────────────────────────────────────────────────────────── */
/*  iOS-style notification shell                              */
/* ────────────────────────────────────────────────────────── */

const NOTIF: React.CSSProperties = {
  background: "rgba(29,29,31,0.88)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.08)",
  boxShadow: "0 8px 28px -6px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
};

function NotifHeader({ time }: { time: string }) {
  return (
    <div className="mb-2.5 flex items-center gap-2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icon-512.png"
        alt=""
        loading="lazy"
        className="h-[18px] w-[18px] shrink-0 overflow-hidden rounded-[4px] object-cover"
      />
      <span className="font-sans text-[10.5px] font-semibold tracking-[0.08em] text-cream/30">
        Penny
      </span>
      <span className="ml-auto font-sans text-[10.5px] text-cream/20">{time}</span>
    </div>
  );
}

function NotifEarned() {
  return (
    <div className="rounded-[20px] px-4 py-3.5" style={NOTIF}>
      <NotifHeader time="now" />
      <div className="flex min-w-0 gap-3">
        <div className="w-[2.5px] shrink-0 self-stretch rounded-full" style={{ background: "#34c759" }} />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[13.5px] font-semibold leading-snug text-cream">
            Mia earned $5.00
          </p>
          <p className="mt-0.5 font-sans text-[11.5px] text-cream/40">
            Bedroom chores · all 3 done ✓
          </p>
          <div className="mt-3">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-sans text-[10px] text-cream/25">Savings goal</span>
              <span className="font-sans text-[10px] font-semibold text-cream/45">$47 / $60</span>
            </div>
            <div className="h-[5px] overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{ width: "79%", background: "linear-gradient(90deg, #34c759, #30d158)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotifRequest() {
  return (
    <div className="rounded-[20px] px-4 py-3.5" style={NOTIF}>
      <NotifHeader time="2m ago" />
      <div className="flex min-w-0 gap-3">
        <div className="w-[2.5px] shrink-0 self-stretch rounded-full" style={{ background: "#ff9f0a" }} />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[13.5px] font-semibold leading-snug text-cream">
            Purchase request
          </p>
          <p className="mt-0.5 font-sans text-[11.5px] text-cream/40">Roblox · $12.99</p>
        </div>
      </div>
      <div
        className="mt-3 grid grid-cols-2 overflow-hidden rounded-[14px]"
        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <button
          className="flex items-center justify-center gap-1.5 py-2.5 font-sans text-[12px] font-semibold"
          style={{
            background: "rgba(52,199,89,0.18)",
            color: "#34c759",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <CheckFat weight="fill" className="h-3 w-3" />
          Approve
        </button>
        <button className="flex items-center justify-center gap-1.5 py-2.5 font-sans text-[12px] font-semibold text-cream/40">
          <X weight="bold" className="h-3 w-3" />
          Decline
        </button>
      </div>
    </div>
  );
}

function NotifSwipe() {
  return (
    <div className="rounded-[20px] px-4 py-3.5" style={NOTIF}>
      <NotifHeader time="5m ago" />
      <div className="flex min-w-0 gap-3">
        <div className="w-[2.5px] shrink-0 self-stretch rounded-full" style={{ background: "#64d2ff" }} />
        <div className="min-w-0 flex-1">
          <p className="font-sans text-[13.5px] font-semibold leading-snug text-cream">
            Card swiped · $2.50
          </p>
          <p className="mt-0.5 font-sans text-[11.5px] text-cream/40">
            7-Eleven · Spend pocket
          </p>
          <div
            className="mt-2.5 flex items-center justify-between rounded-[8px] px-2.5 py-1.5"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <span className="font-sans text-[10.5px] text-cream/30">Spend remaining</span>
            <span className="font-sans text-[10.5px] font-bold text-cream/60">$10.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Compound interest chart (animated, once, non-interactive) */
/* ────────────────────────────────────────────────────────── */

const RATE    = 0.10 / 52;
const WEEKLY  = 5;
const WEEKS   = 520; // 10 years

function fv(weeklyAmt: number, weeks: number): number {
  if (weeks === 0) return 0;
  return weeklyAmt * ((Math.pow(1 + RATE, weeks) - 1) / RATE);
}

// Pre-computed at module level — static chart, no slider
const TOTAL_CONTRIBUTED   = WEEKLY * WEEKS;                            // $2,600
const TOTAL_WITH_INTEREST = Math.round(fv(WEEKLY, WEEKS));             // ~$4,468 at 10%
const INTEREST_EARNED     = TOTAL_WITH_INTEREST - TOTAL_CONTRIBUTED;  // ~$796

// 100 points for a silky smooth curve
const DATA = Array.from({ length: 101 }, (_, i) => {
  const year  = (i / 100) * 10;
  const value = fv(WEEKLY, year * 52);
  return { year, value };
});

const SVG_W    = 360;
const SVG_H    = 110;
const TOP_PAD  = 0.14; // 14% breathing room at top
const MAX_VAL  = fv(WEEKLY, WEEKS);

function toX(year: number)  { return (year / 10) * SVG_W; }
function toY(value: number) { return SVG_H - (value / MAX_VAL) * SVG_H * (1 - TOP_PAD); }

function pts(arr: typeof DATA) {
  return arr.map(({ year, value }) => `${toX(year).toFixed(2)},${toY(value).toFixed(2)}`).join(" ");
}

// Line path (M ... L ... L ...)
const LINE_D = DATA.reduce((acc, { year, value }, i) => {
  const x = toX(year).toFixed(2);
  const y = toY(value).toFixed(2);
  return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
}, "");

// Area path (close to bottom)
const AREA_D = `${LINE_D} L ${SVG_W} ${SVG_H} L 0 ${SVG_H} Z`;

// Simple savings (linear) path — for the dashed reference line
const SIMPLE_D = Array.from({ length: 11 }, (_, i) => {
  const year  = i;
  const value = WEEKLY * year * 52;
  const x = toX(year).toFixed(2);
  const y = toY(value).toFixed(2);
  return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
}).join(" ");

const END_X = toX(10);
const END_Y = toY(MAX_VAL);

function CompoundChart() {
  const reduce = useReducedMotion();

  const LINE_DURATION   = 2.2;
  const AREA_DELAY      = LINE_DURATION - 0.3;
  const DOT_DELAY       = LINE_DURATION;
  const LABEL_DELAY     = LINE_DURATION + 0.15;

  return (
    <div
      className="overflow-hidden rounded-2xl"
      style={{
        background: "rgba(13,18,15,0.94)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 24px 60px -12px rgba(0,0,0,0.45), 0 8px 24px -6px rgba(0,0,0,0.3)",
      }}
    >
      {/* ── Text header ── */}
      <div className="px-6 pb-0 pt-6">
        <span className="font-sans text-[9.5px] font-bold uppercase tracking-[0.22em]" style={{ color: "rgba(52,199,89,0.6)" }}>
          Compound Interest
        </span>
        <p className="mt-2 font-sans text-[13px] leading-snug" style={{ color: "rgba(255,255,255,0.45)" }}>
          Save <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600 }}>${WEEKLY}/week</span> from age 10.
        </p>
        <p className="mt-1 font-display text-[26px] font-extrabold leading-tight tracking-tight text-white">
          ${TOTAL_WITH_INTEREST.toLocaleString('en-US')}
          <span className="ml-2 font-sans text-[13px] font-normal" style={{ color: "rgba(255,255,255,0.35)" }}>by age 20</span>
        </p>
      </div>

      {/* ── SVG chart ── */}
      <div className="mt-4 px-3">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ height: SVG_H, display: "block", overflow: "visible" }}
          aria-hidden
        >
          <defs>
            {/* Green gradient fill for the compound area */}
            <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%"   stopColor="#34c759" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#34c759" stopOpacity="0.02" />
            </linearGradient>
            {/* Subtle mask so area fades to nothing at the bottom */}
            <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%"   stopColor="#34c759" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#34c759" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Faint horizontal grid lines */}
          {[0.33, 0.66, 1].map((frac) => (
            <line
              key={frac}
              x1={0}
              x2={SVG_W}
              y1={toY(MAX_VAL * frac)}
              y2={toY(MAX_VAL * frac)}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="1"
            />
          ))}

          {/* Simple (contribution) reference — dashed */}
          <motion.path
            d={SIMPLE_D}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: LINE_DURATION * 0.85, ease: [0.23, 1, 0.32, 1] }
            }
          />

          {/* Area fill — fades in as line finishes */}
          <motion.path
            d={AREA_D}
            fill="url(#areaGrad)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={
              reduce
                ? { duration: 0 }
                : { delay: AREA_DELAY, duration: 0.7, ease: "easeOut" }
            }
          />

          {/* Compound interest line — draws itself */}
          <motion.path
            d={LINE_D}
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={
              reduce
                ? { duration: 0 }
                : { duration: LINE_DURATION, ease: [0.23, 1, 0.32, 1] }
            }
          />

          {/* End-point dot */}
          <motion.circle
            cx={END_X}
            cy={END_Y}
            r="4"
            fill="#34c759"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={
              reduce
                ? { duration: 0 }
                : { delay: DOT_DELAY, type: "spring", stiffness: 380, damping: 20 }
            }
          />

          {/* End-point glow ring */}
          <motion.circle
            cx={END_X}
            cy={END_Y}
            r="8"
            fill="none"
            stroke="#34c759"
            strokeWidth="1"
            strokeOpacity="0.3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={
              reduce
                ? { duration: 0 }
                : { delay: DOT_DELAY + 0.08, duration: 0.4, ease: "easeOut" }
            }
          />

          {/* Year axis labels */}
          <text x="2"   y={SVG_H - 3} fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">Age 10</text>
          <text x={SVG_W - 38} y={SVG_H - 3} fontSize="9" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">Age 20</text>
        </svg>
      </div>

      {/* ── Stat tiles ── */}
      <div className="grid grid-cols-2 gap-px px-3 pb-5 pt-3" style={{ background: "transparent" }}>
        <div
          className="flex flex-col gap-0.5 rounded-xl px-4 py-3"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <span className="font-sans text-[9.5px] uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.28)" }}>
            You put in
          </span>
          <span className="font-display text-[17px] font-extrabold text-white">
            ${TOTAL_CONTRIBUTED.toLocaleString('en-US')}
          </span>
        </div>
        <div
          className="flex flex-col gap-0.5 rounded-xl px-4 py-3"
          style={{ background: "rgba(52,199,89,0.08)" }}
        >
          <span className="font-sans text-[9.5px] uppercase tracking-widest" style={{ color: "rgba(52,199,89,0.5)" }}>
            Interest earned
          </span>
          <span className="font-display text-[17px] font-extrabold" style={{ color: "#34c759" }}>
            +${INTEREST_EARNED.toLocaleString('en-US')}
          </span>
        </div>
      </div>

      {/* ── Einstein footnote ── */}
      <div className="border-t px-6 pb-4 pt-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <p className="font-sans text-[10px] italic leading-relaxed" style={{ color: "rgba(255,255,255,0.22)" }}>
          &ldquo;Compound interest is the 8th wonder of the world.&rdquo; &mdash; Albert Einstein
        </p>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  Lesson topic pills                                        */
/* ────────────────────────────────────────────────────────── */

const LESSON_TOPICS = [
  "Compound interest",
  "Needs vs. Wants",
  "Budgeting",
  "Delayed gratification",
  "Investing basics",
  "Giving back",
];

/* ────────────────────────────────────────────────────────── */
/*  Main component                                            */
/* ────────────────────────────────────────────────────────── */

export function ParentSection() {
  const reduce = useReducedMotion();

  return (
    <section className="scroll-mt-24" id="parent-controls">

      {/* ── Shared header ── */}
      <div className="bg-cream-deep/50">
        <div className="mx-auto max-w-[1400px] px-6 pb-14 pt-24 lg:px-10 lg:pt-32">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.6, ease: EASE_OUT_STRONG }}
            className="max-w-3xl"
          >
            <span className="inline-block rounded-full border border-forest/20 bg-card px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-forest">
              For parents
            </span>
            <h2 className="mt-5 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-forest-deep">
              You&apos;re in control. They learn the lesson.
            </h2>
            <p className="mt-5 max-w-xl font-sans text-lg leading-relaxed text-muted-foreground">
              Penny gives kids the independence to earn and manage money — inside the guardrails you design. Every dollar, every limit, every lesson is yours to set.
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Two-panel split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* ── CONTROL panel (dark) ── */}
        <div className="relative overflow-hidden bg-forest-deep px-8 py-16 lg:px-14 lg:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-[20%] -top-[10%] h-[55%] w-[70%] rounded-full opacity-20 blur-3xl"
            style={{ background: "oklch(44% 0.155 155)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[-8%] right-[-15%] h-[45%] w-[55%] rounded-full opacity-15 blur-3xl"
            style={{ background: "oklch(80% 0.17 82)" }}
          />

          {/* justify-between pins text left, notifications right */}
          <div className="relative flex h-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">

            {/* left: text */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: -24 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.65, ease: EASE_OUT_STRONG }}
              className="flex min-w-0 flex-col gap-10 lg:w-[240px] lg:shrink-0"
            >
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-cream/30">
                  For parents
                </span>
                <p
                  className="mt-3 w-full font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-cream"
                  style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
                >
                  Control.
                </p>
              </div>

              <ul className="flex flex-col gap-5">
                {PARENT_POWERS.map((line, i) => (
                  <motion.li
                    key={line}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.5, ease: EASE_OUT_STRONG, delay: 0.1 + i * 0.09 }}
                    className="flex items-start gap-3"
                  >
                    <ArrowRight weight="bold" className="mt-[3px] h-4 w-4 shrink-0 text-gold" />
                    <span className="font-sans text-base font-semibold leading-snug text-cream/75">
                      {line}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* right: iOS notifications — fixed width, flush right via justify-between */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={inView}
              transition={{ duration: 0.7, ease: EASE_OUT_STRONG, delay: 0.15 }}
              className="flex flex-col gap-2.5 lg:w-[320px] lg:shrink-0"
            >
              <div style={{ transform: "rotate(-0.8deg)" }}>
                <NotifEarned />
              </div>
              <div style={{ transform: "rotate(0.4deg)" }}>
                <NotifRequest />
              </div>
              <div style={{ transform: "rotate(-0.6deg)" }}>
                <NotifSwipe />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── LEARN panel (warm) ── */}
        <div
          className="relative overflow-hidden px-8 py-16 lg:px-14 lg:py-20"
          style={{ background: "oklch(93% 0.09 86)" }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-10%] top-[-15%] h-[55%] w-[60%] rounded-full opacity-30 blur-3xl"
            style={{ background: "oklch(80% 0.17 82)" }}
          />

          <div className="relative flex h-full flex-col gap-10 lg:flex-row lg:items-center">

            {/* left: phone */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.93 }}
              whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
              viewport={inView}
              transition={{ type: "spring", stiffness: 130, damping: 18, delay: 0.1 }}
              className="w-full max-w-[210px] shrink-0 mx-auto lg:mx-0"
            >
              <IPhone17Pro autoPlay enableBodyMotion={false} />
            </motion.div>

            {/* right: heading + chart card + topic pills */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 24 }}
              whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
              viewport={inView}
              transition={{ duration: 0.65, ease: EASE_OUT_STRONG, delay: 0.05 }}
              className="flex flex-col gap-7"
            >
              <div>
                <span className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-forest/45">
                  For kids
                </span>
                <p
                  className="mt-3 font-display font-extrabold leading-[0.92] tracking-[-0.03em] text-forest-deep"
                  style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}
                >
                  Learn.
                </p>
              </div>

              {/* Animated compound interest chart */}
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={inView}
                transition={{ duration: 0.55, ease: EASE_OUT_STRONG, delay: 0.18 }}
              >
                <CompoundChart />
              </motion.div>

              {/* Topic pills */}
              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                whileInView={reduce ? undefined : { opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.5, ease: EASE_OUT_STRONG, delay: 0.3 }}
                className="flex flex-wrap gap-2"
              >
                {LESSON_TOPICS.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-full border border-forest/15 bg-white/50 px-3 py-1 font-sans text-[11px] font-semibold text-forest-deep/60"
                  >
                    {topic}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
