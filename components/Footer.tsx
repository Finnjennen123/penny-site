"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  Plant,
  SpinnerGap,
} from "@phosphor-icons/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Status = "idle" | "loading" | "success" | "error";

/* ─── Manifesto lines — true zigzag ────────────────────────────────
   L R L R L  alternation, sizes escalate and de-escalate for rhythm.
   Dimmed lines ("start the", "conversation") act as visual breaths
   between the weighted beats. ─────────────────────────────────── */
const LINES = [
  {
    text: "start the",
    align: "self-start",
    size: "text-[clamp(1.5rem,3.8vw,4.25rem)]",
    weight: "font-bold",
    color: "text-cream/40",
    pt: "",
  },
  {
    text: "money",
    align: "self-end",
    size: "text-[clamp(4rem,16.5vw,19rem)]",
    weight: "font-extrabold",
    color: "text-cream",
    pt: "mt-[-0.5rem] sm:mt-[-2rem]",
  },
  {
    text: "conversation",
    align: "self-start",
    size: "text-[clamp(1.5rem,4.5vw,5.25rem)]",
    weight: "font-bold",
    color: "text-cream/40",
    pt: "pt-1",
  },
  {
    text: "before the",
    align: "self-end",
    size: "text-[clamp(2rem,7.8vw,9rem)]",
    weight: "font-extrabold",
    color: "text-cream",
    pt: "pt-2",
  },
  {
    text: "world does.",
    align: "self-start",
    size: "text-[clamp(2rem,7.8vw,9rem)]",
    weight: "font-extrabold",
    color: "text-gold",
    pt: "",
  },
] as const;

export function Footer() {
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
    <footer className="relative overflow-hidden bg-forest-deep">
      {/* Ambient green glow — left anchor */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-0 top-[15%] h-[55%] w-[40%]"
        style={{
          background:
            "radial-gradient(ellipse at 0% 50%, oklch(44% 0.155 155 / 0.14), transparent 65%)",
        }}
      />
      {/* Ambient gold glow — halo for "world does." */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[20%] right-0 h-[50%] w-[45%]"
        style={{
          background:
            "radial-gradient(ellipse at 100% 100%, oklch(80% 0.17 82 / 0.08), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ── Manifesto — L R L R L zigzag ────────────────────── */}
        <div className="flex flex-col pt-20 pb-10 lg:pt-28 lg:pb-14">
          {LINES.map((line, i) => (
            <motion.span
              key={line.text}
              initial={reduce ? false : { opacity: 0, y: i % 2 === 0 ? 28 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: i === 1 ? 0.95 : 0.78, delay: i * 0.08, ease: EASE }}
              className={[
                line.align,
                line.pt,
                line.size,
                line.weight,
                line.color,
                i === 1
                  ? "font-display leading-none tracking-[-0.04em]"
                  : "font-display leading-[0.9] tracking-[-0.03em]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {line.text}
            </motion.span>
          ))}
        </div>

        {/* ── Email capture ────────────────────────────────────── */}
        <div className="border-t border-cream/10 pt-10 pb-16 lg:pt-12 lg:pb-20">
          <p className="mb-5 font-display text-[clamp(1.1rem,2vw,1.4rem)] font-bold text-cream/70">
            Get notified when Penny launches.
          </p>
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.div
                key="success"
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex items-center gap-3"
              >
                <CheckCircle weight="fill" className="h-6 w-6 shrink-0 text-gold" />
                <p className="font-sans text-base font-semibold text-cream">
                  You're on the list. We'll be in touch.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                initial={false}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
                className="flex flex-col gap-3 sm:flex-row sm:max-w-lg"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your email address"
                  className="h-14 flex-1 rounded-full border border-cream/22 bg-cream/8 px-5 font-sans text-base text-cream outline-none placeholder:text-cream/40 backdrop-blur-sm focus:border-cream/40 focus:ring-2 focus:ring-cream/10"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-7 font-sans text-base font-bold text-forest-deep shadow-[0_8px_30px_-8px_oklch(80%_0.17_82_/_0.5)] transition-transform hover:scale-[1.02] active:scale-[0.97] disabled:opacity-70"
                >
                  {status === "loading" ? (
                    <SpinnerGap weight="bold" className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Get early access
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
            <p className="mt-3 font-sans text-xs text-cream/30">
              No spam. Early access only.
            </p>
          )}
        </div>

        {/* ── Bottom bar ───────────────────────────────────────── */}
        <div className="flex items-center justify-between border-t border-cream/10 py-6">
          <a href="#top" className="inline-flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-brand bg-gold">
              <Plant weight="fill" className="h-4 w-4 text-forest-deep" />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-cream">
              Penny
            </span>
          </a>
          <p className="font-sans text-sm font-medium text-cream/35">
            © 2026 DSG Kids
          </p>
        </div>
      </div>
    </footer>
  );
}
