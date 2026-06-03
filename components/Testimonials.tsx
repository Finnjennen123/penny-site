"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, X } from "@phosphor-icons/react";
import { TESTIMONIALS } from "@/lib/content";

function initials(name: string) {
  const parts = name.replace(/,.*/, "").trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[parts.length - 1][0]}`
    : parts[0][0];
}

type Review = (typeof TESTIMONIALS)[number];

function Stars({ size = "sm" }: { size?: "sm" | "md" }) {
  return (
    <span className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          weight="fill"
          className={size === "md" ? "h-4 w-4 text-gold" : "h-3 w-3 text-gold"}
        />
      ))}
    </span>
  );
}

function Avatar({ t, size = "sm" }: { t: Review; size?: "sm" | "lg" }) {
  const ini = initials(t.name);
  const dim = size === "lg" ? "h-12 w-12 text-sm" : "h-8 w-8 text-xs";
  return (
    <span
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-cream-deep font-sans font-bold text-forest ${dim}`}
    >
      {"avatar" in t && t.avatar ? (
        <Image
          src={t.avatar}
          alt={t.name}
          fill
          className="object-cover"
          sizes={size === "lg" ? "48px" : "32px"}
        />
      ) : (
        ini
      )}
    </span>
  );
}

function ReviewChip({
  t,
  onOpen,
}: {
  t: Review;
  onOpen: (r: Review) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(t)}
      className="group mx-2.5 flex shrink-0 cursor-pointer items-center gap-3.5 rounded-full border border-white/70 bg-white/80 px-5 py-3 shadow-[0_2px_12px_-4px_oklch(11.5%_0.022_255/0.08)] backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-forest/20 hover:shadow-[0_6px_20px_-4px_oklch(11.5%_0.022_255/0.14)]"
    >
      <Avatar t={t} />
      <Stars />
      <span className="max-w-[260px] truncate font-sans text-sm font-semibold text-forest-deep">
        &ldquo;{t.quote}&rdquo;
      </span>
      <span className="shrink-0 border-l border-forest/10 pl-3.5 text-left">
        <span className="block font-sans text-xs font-bold leading-tight text-forest-deep">
          {t.name.replace(/,.*/, "")}
        </span>
        <span className="mt-0.5 block font-sans text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-muted-foreground">
          {t.role}
        </span>
      </span>
    </button>
  );
}

function ReviewModal({
  review,
  onClose,
}: {
  review: Review;
  onClose: () => void;
}) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-forest-deep/40 backdrop-blur-sm" />

      {/* Card */}
      <div
        className="relative w-full max-w-md rounded-[1.5rem] border border-white/70 bg-white/95 p-8 shadow-[0_24px_80px_-12px_oklch(11.5%_0.022_255/0.25)] backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-forest/8 text-forest/60 transition-colors hover:bg-forest/15 hover:text-forest"
        >
          <X weight="bold" className="h-4 w-4" />
        </button>

        <Stars size="md" />

        <blockquote className="mt-5 font-display text-xl font-bold leading-snug text-forest-deep">
          &ldquo;{review.quote}&rdquo;
        </blockquote>

        <div className="mt-6 flex items-center gap-3 border-t border-forest/[0.07] pt-5">
          <Avatar t={review} size="lg" />
          <div>
            <p className="font-sans text-sm font-bold text-forest-deep">
              {review.name}
            </p>
            <p className="mt-0.5 font-sans text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              {review.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Split reviews into two rows
const ROW_A = [
  TESTIMONIALS[2],
  TESTIMONIALS[4],
  TESTIMONIALS[0],
  TESTIMONIALS[9],
  TESTIMONIALS[7],
  TESTIMONIALS[14],
  TESTIMONIALS[11],
  TESTIMONIALS[5],
] as const;

const ROW_B = [
  TESTIMONIALS[1],
  TESTIMONIALS[13],
  TESTIMONIALS[6],
  TESTIMONIALS[10],
  TESTIMONIALS[3],
  TESTIMONIALS[15],
  TESTIMONIALS[8],
  TESTIMONIALS[12],
] as const;

export function Testimonials() {
  const [selected, setSelected] = useState<Review | null>(null);

  return (
    <>
      <section
        id="reviews"
        className="relative scroll-mt-24 overflow-hidden bg-cream py-24 lg:py-32"
      >
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute -left-40 top-1/3 h-[800px] w-[800px] rounded-full bg-forest/[0.05] blur-[140px]" />
          <div className="absolute -right-40 bottom-1/4 h-[700px] w-[700px] rounded-full bg-gold/[0.06] blur-[120px]" />
        </div>

        {/* Heading */}
        <div className="relative mx-auto mb-6 max-w-2xl px-6 text-center">
          <span className="inline-block rounded-full border border-forest/15 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-forest/50">
            Reviews
          </span>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-[-0.02em] text-forest-deep">
            Families, educators, advisors&nbsp;&amp; entrepreneurs love{" "}
            <span
              className="text-forest"
              style={{
                fontFamily:
                  "'Rosa Bright', var(--font-display), Georgia, serif",
              }}
            >
              Penny
            </span>
            .
          </h2>
        </div>

        {/* Book attribution — clearly above the reviews */}
        <div className="relative mx-auto mb-10 max-w-2xl px-6 text-center">
          <a
            href="https://dsgkids.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-forest/12 bg-forest/[0.04] px-4 py-2 font-sans text-xs font-semibold text-forest/60 transition-colors hover:bg-forest/[0.08] hover:text-forest"
          >
            The reviews below are of the book
            <span className="font-bold text-forest">
              &ldquo;Penny and the Magical Money Tree&rdquo;
            </span>
            &rarr;
          </a>
        </div>

        {/* Both rows share .marquee-wrapper so hovering either pauses both */}
        <div className="marquee-wrapper">
          {/* Row A — scrolls left */}
          <div className="relative overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-cream to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-cream to-transparent"
            />
            <div className="marquee-track py-2">
              {[...ROW_A, ...ROW_A].map((t, i) => (
                <ReviewChip key={`a-${i}`} t={t} onOpen={setSelected} />
              ))}
            </div>
          </div>

          {/* Row B — scrolls right */}
          <div className="relative mt-3 overflow-hidden">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-cream to-transparent"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-cream to-transparent"
            />
            <div className="marquee-track-reverse py-2">
              {[...ROW_B, ...ROW_B].map((t, i) => (
                <ReviewChip key={`b-${i}`} t={t} onOpen={setSelected} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal — rendered outside the section so it sits above everything */}
      {selected && (
        <ReviewModal review={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
