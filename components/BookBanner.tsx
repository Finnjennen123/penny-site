"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { EASE_OUT_STRONG, inView } from "@/lib/easing";

export function BookBanner() {
  const reduce = useReducedMotion();

  return (
    <section aria-label="The book behind the app" className="relative overflow-hidden bg-forest-deep">
      {/* Subtle green-gold radial wash, left-anchored behind the book */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-full w-[40%] opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 120% at 10% 50%, oklch(80% 0.17 82 / 0.35), transparent 70%)",
        }}
      />

      <div className="relative mx-auto flex max-w-[1400px] items-center gap-8 px-6 py-7 sm:gap-10 lg:px-10 lg:py-8">

        {/* Book cover */}
        <motion.div
          initial={reduce ? false : { opacity: 0, x: -14, rotate: -4 }}
          whileInView={reduce ? undefined : { opacity: 1, x: 0, rotate: -2 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: EASE_OUT_STRONG }}
          className="relative shrink-0 self-end"
          style={{ filter: "drop-shadow(0 16px 40px oklch(0% 0 0 / 0.55))" }}
        >
          <Image
            src="/book-cover.png"
            alt="Penny and the Magical Money Tree — the children's book by Miller Norris"
            width={88}
            height={88}
            className="h-[88px] w-auto rounded-[4px] object-cover sm:h-[100px]"
            priority={false}
          />
          {/* tiny page-edge illusion */}
          <div
            aria-hidden
            className="absolute -right-[3px] inset-y-0 w-[6px] rounded-r-[4px]"
            style={{ background: "linear-gradient(to right, #c8b87a, #a8965a)" }}
          />
        </motion.div>

        {/* Copy + CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.6, delay: 0.08, ease: EASE_OUT_STRONG }}
          className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <div className="min-w-0">
            {/* eyebrow */}
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold/70">
              Where it all started
            </p>
            <p className="mt-1 font-display text-base font-extrabold leading-tight tracking-[-0.015em] text-cream sm:text-lg">
              The numbers above are from the book,{" "}
              <em className="not-italic text-gold">Penny and the Magical Money Tree.</em>
            </p>
            <p className="mt-1 font-sans text-sm leading-snug text-cream/50">
              The app is the next chapter — built on the same four-pocket philosophy.
            </p>
          </div>

          {/* CTA link */}
          <a
            href="https://dsgkids.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex shrink-0 items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-5 py-2.5 font-sans text-sm font-bold text-gold transition-all duration-200 hover:border-gold/60 hover:bg-gold/20 sm:mt-0"
          >
            Get the book
            <ArrowUpRight
              weight="bold"
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </motion.div>

      </div>
    </section>
  );
}
