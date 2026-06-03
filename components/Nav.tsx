"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { NAV_LINKS } from "@/lib/content";
import { EASE_OUT_STRONG } from "@/lib/easing";

const overlayList: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.08 } },
};
const overlayItem: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT_STRONG } },
};

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="mx-auto flex h-14 max-w-[1100px] items-center justify-between rounded-full border border-forest/10 bg-cream/80 px-4 pl-5 backdrop-blur-md sm:h-16 sm:pl-6">
        <a href="#top" className="flex items-center gap-2.5">
          <img
            src="/Penny-logo.svg"
            alt="Penny"
            className="h-9 w-auto sm:h-10"
          />
          <span
            className="text-[1.7rem] font-bold leading-none text-forest sm:text-[1.95rem]"
            style={{ fontFamily: "'Rosa Bright', var(--font-display), Georgia, serif" }}
          >
            PENNI&apos;S
          </span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-sm font-semibold text-forest/75 transition-colors hover:text-forest"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="#waitlist"
            className="hidden no-underline rounded-full bg-gold px-5 py-2 font-sans text-sm font-bold text-forest transition-transform hover:scale-[1.03] sm:inline-block"
          >
            Join the waitlist
          </a>
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-forest md:hidden"
          >
            <List weight="bold" className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex flex-col bg-cream px-6 pt-6 md:hidden"
          >
            <div className="flex h-14 items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img src="/Penny-logo.svg" alt="Penny" className="h-10 w-auto" />
                <span
                  className="text-[1.95rem] font-bold leading-none text-forest"
                  style={{ fontFamily: "'Rosa Bright', var(--font-display), Georgia, serif" }}
                >
                  PENNI&apos;S
                </span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-forest"
              >
                <X weight="bold" className="h-6 w-6" />
              </button>
            </div>

            <motion.ul
              variants={reduce ? undefined : overlayList}
              initial={reduce ? false : "hidden"}
              animate={reduce ? false : "show"}
              className="mt-10 flex flex-col gap-2"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={overlayItem}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-bold tracking-tight text-forest"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>

            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className="mt-auto mb-8 no-underline rounded-full bg-gold px-6 py-4 text-center font-sans text-base font-bold text-forest"
            >
              Join the waitlist
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
