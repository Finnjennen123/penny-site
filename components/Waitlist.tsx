"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import { CheckCircle, SpinnerGap, ArrowRight } from "@phosphor-icons/react";
import { WAITLIST } from "@/lib/content";
import { EASE_OUT_STRONG } from "@/lib/easing";

type Status = "idle" | "loading" | "success" | "error";

export function Waitlist() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setError("Enter a valid email address.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <section id="waitlist" className="scroll-mt-24 overflow-hidden">
      {/* Dark gradient background */}
      <div
        className="relative px-6 py-24 lg:px-10 lg:py-32"
        style={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 50%, oklch(44% 0.155 155 / 0.3), transparent 60%)",
            "radial-gradient(ellipse 60% 80% at 80% 30%, oklch(60% 0.21 285 / 0.12), transparent 55%)",
            "oklch(11.5% 0.022 255)",
          ].join(", "),
        }}
      >
        {/* Subtle dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle, oklch(100% 0 0) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream/15 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.18em] text-cream/60">
              <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              Early access
            </span>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-cream">
              {WAITLIST.heading}
            </h2>
            <p className="mx-auto mt-5 max-w-lg font-sans text-lg leading-relaxed text-cream/60">
              {WAITLIST.body}
            </p>

            <div className="mx-auto mt-10 max-w-md">
              <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: EASE_OUT_STRONG }}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-cream/10 bg-cream/8 px-6 py-8 backdrop-blur-sm"
                  >
                    <CheckCircle weight="fill" className="h-12 w-12 text-gold" />
                    <p className="font-sans text-base font-semibold text-cream">
                      {WAITLIST.success}
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={onSubmit}
                    initial={false}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                    className="flex flex-col gap-3 sm:flex-row"
                  >
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder={WAITLIST.placeholder}
                      className="h-14 w-full rounded-full border border-cream/15 bg-cream/8 px-5 py-3.5 font-sans text-base text-cream outline-none placeholder:text-cream/35 backdrop-blur-sm focus:border-cream/35 focus:ring-2 focus:ring-cream/10"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 font-sans text-base font-bold text-forest-deep shadow-[0_8px_30px_-8px_oklch(80%_0.17_82_/_0.6)] transition-transform hover:scale-[1.02] active:scale-[0.97] disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <SpinnerGap weight="bold" className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          {WAITLIST.cta}
                          <ArrowRight
                            weight="bold"
                            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                          />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {status === "error" && (
                <p className="mt-3 font-sans text-sm font-medium text-coral">{error}</p>
              )}
              {status !== "success" && (
                <p className="mt-4 font-sans text-sm text-cream/40">{WAITLIST.finePrint}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
