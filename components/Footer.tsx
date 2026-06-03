import {
  ArrowRight,
  BookOpenText,
  CheckCircle,
  Plant,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import { NAV_LINKS } from "@/lib/content";

const footerProof = [
  { icon: BookOpenText, label: "5,000+ copies sold" },
  { icon: ShieldCheck, label: "Parent guided" },
  { icon: CheckCircle, label: "Advisor endorsed" },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-cream">
      <div className="mx-auto max-w-[1400px] px-6 pt-10 lg:px-10 lg:pt-14">
        <div className="grid gap-8 border-b border-cream/10 pb-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:pb-16">
          <div>
            <h2 className="max-w-3xl font-display text-[clamp(2.25rem,5vw,4.5rem)] font-extrabold leading-[1] tracking-[-0.02em] text-cream">
              Start the money conversation before the world does.
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-sans text-base font-semibold leading-relaxed text-cream/68">
              Join the waitlist and get the book discount while Penny gets ready for
              early access.
            </p>
            <a
              href="#waitlist"
              className="group inline-flex h-13 w-fit items-center justify-center gap-2 rounded-full bg-gold px-6 font-sans text-base font-extrabold text-forest transition-transform hover:scale-[1.02] active:scale-[0.97]"
            >
              Join the waitlist
              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-12 md:grid-cols-[minmax(0,1fr)_minmax(16rem,0.75fr)] lg:py-16">
          <div className="max-w-md">
            <a href="#top" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-brand bg-gold">
                <Plant weight="fill" className="h-4.5 w-4.5 text-forest" />
              </span>
              <span className="font-display text-2xl font-extrabold tracking-tight">
                Penny
              </span>
            </a>
            <p className="mt-5 font-sans text-base leading-relaxed text-cream/64">
              A money app that grows money-smart kids. Built on the book that started
              it all, Penny and the Magical Money Tree.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 md:max-w-2xl">
              {footerProof.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 rounded-brand border border-cream/10 bg-cream/5 px-3 py-3"
                >
                  <Icon weight="fill" className="h-4 w-4 shrink-0 text-gold" />
                  <span className="font-sans text-xs font-bold uppercase tracking-[0.08em] text-cream/76">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-[1fr_1fr]">
            <nav aria-label="Footer navigation">
              <p className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-gold-soft">
                Explore
              </p>
              <div className="mt-4 flex flex-col items-start gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-sans text-sm font-bold text-cream/68 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </nav>

            <nav aria-label="Get started">
              <p className="font-sans text-xs font-extrabold uppercase tracking-[0.18em] text-gold-soft">
                Get Started
              </p>
              <div className="mt-4 flex flex-col items-start gap-3">
                <a
                  href="#waitlist"
                  className="font-sans text-sm font-bold text-cream/68 transition-colors hover:text-cream"
                >
                  Join the waitlist
                </a>
                <a
                  href="#reviews"
                  className="font-sans text-sm font-bold text-cream/68 transition-colors hover:text-cream"
                >
                  Read reviews
                </a>
                <a
                  href="#top"
                  className="font-sans text-sm font-bold text-cream/68 transition-colors hover:text-cream"
                >
                  Back to top
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p className="font-sans text-sm font-semibold text-cream/48">
            Made with care for little learners. DSG Kids.
          </p>
          <p className="font-sans text-sm font-semibold text-cream/40">
            Penny and the Magical Money Tree.
          </p>
        </div>
      </div>
    </footer>
  );
}
