"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { STATS, TRUST_LOGOS } from "@/lib/content";
import { EASE_OUT_STRONG } from "@/lib/easing";

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const text = useTransform(count, (v) => Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (reduce) {
      count.set(value);
      return;
    }
    if (!seen) return;
    const controls = animate(count, value, { duration: 1.4, ease: EASE_OUT_STRONG });
    return () => controls.stop();
  }, [seen, value, reduce, count]);

  return (
    <span ref={ref} className="font-display text-4xl font-extrabold text-forest sm:text-5xl">
      <motion.span>{reduce ? value.toLocaleString("en-US") : text}</motion.span>
      {suffix}
    </span>
  );
}

export function TrustBar() {
  return (
    <section aria-label="Trusted by" className="border-y border-line bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-14 lg:px-10">
        {/* Logos row — leads with credibility */}
        <div className="flex flex-col items-center gap-4">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Trusted by families, schools, and financial advisors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14">
            {TRUST_LOGOS.map((logo) => (
              <Image
                key={logo.name}
                src={logo.src}
                alt={logo.name}
                width={logo.width}
                height={logo.height}
                className="h-7 w-auto object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-80 hover:grayscale-0 sm:h-8"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Book source bridge — context for the stats below */}
        <div className="mt-10 flex items-center gap-4 rounded-xl border border-forest/8 bg-forest-deep/[0.035] px-5 py-3.5">
          {/* Book cover */}
          <div
            className="relative shrink-0"
            style={{ filter: "drop-shadow(0 4px 12px oklch(0% 0 0 / 0.18))" }}
          >
            <Image
              src="/book-cover.png"
              alt="Penny and the Magical Money Tree"
              width={40}
              height={40}
              className="h-10 w-auto rounded-[3px] object-cover"
              style={{ rotate: "-2deg" }}
            />
          </div>

          {/* Label */}
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-forest/35">
              The app is based on the book
            </p>
            <p className="mt-0.5 truncate font-sans text-sm font-semibold text-forest-deep/80">
              <em className="not-italic">Penny and the Magical Money Tree</em>
              <span className="text-forest/35"> · Miller Norris</span>
            </p>
          </div>

          {/* CTA */}
          <a
            href="https://dsgkids.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group ml-auto shrink-0 inline-flex items-center gap-1.5 rounded-full border border-forest/15 bg-transparent px-4 py-2 font-sans text-xs font-bold text-forest/60 transition-all duration-200 hover:border-forest/30 hover:bg-forest/5 hover:text-forest-deep"
          >
            Get the book
            <ArrowUpRight
              weight="bold"
              className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Stats strip */}
        <div className="mt-4 grid grid-cols-2 gap-px overflow-hidden rounded-brand-lg border border-line sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 bg-cream-deep/60 px-6 py-6 text-center">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
