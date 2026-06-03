import { WHY, WHY_FEATURES } from "@/lib/content";
import { Reveal } from "./Reveal";

type IconProps = {
  className?: string;
};

function BankIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="bank-top" x1="14" y1="10" x2="33" y2="22" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fff3ca" />
          <stop offset="100%" stopColor="#efc45a" />
        </linearGradient>
        <linearGradient id="bank-left" x1="12" y1="16" x2="23" y2="39" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#dbab43" />
          <stop offset="100%" stopColor="#ae7113" />
        </linearGradient>
        <linearGradient id="bank-right" x1="25" y1="16" x2="38" y2="37" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#c58f2c" />
          <stop offset="100%" stopColor="#8a590f" />
        </linearGradient>
        <filter id="bank-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#08111a" floodOpacity="0.25" />
        </filter>
      </defs>
      <ellipse cx="24" cy="37.5" rx="12" ry="3.3" fill="#07111a" opacity="0.22" />
      <g filter="url(#bank-shadow)">
        <path d="M24 8 11.5 15.2 24 21.8 36.5 15.2 24 8Z" fill="url(#bank-top)" />
        <path d="M11.5 15.2V29.8L24 38.8V21.8L11.5 15.2Z" fill="url(#bank-left)" />
        <path d="M36.5 15.2V29.8L24 38.8V21.8L36.5 15.2Z" fill="url(#bank-right)" />
        <path d="M18.2 22.2h11.6v9.2H18.2z" fill="#fff7e5" fillOpacity="0.72" />
        <path d="M18.2 22.2h11.6" stroke="#fff7e5" strokeOpacity="0.35" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M20.6 26.8h1.8" stroke="#fff7e5" strokeOpacity="0.82" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M24 26.8h1.8" stroke="#fff7e5" strokeOpacity="0.82" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M27.4 26.8h1.8" stroke="#fff7e5" strokeOpacity="0.82" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M21 30.2h6" stroke="#fff7e5" strokeOpacity="0.74" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="31.8" cy="12.4" r="2.2" fill="#fff5d5" />
        <circle cx="31.8" cy="12.4" r="1" fill="#efc45a" />
      </g>
    </svg>
  );
}

function SchoolIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="school-top" x1="15" y1="8" x2="34" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e7f8ff" />
          <stop offset="100%" stopColor="#8ad7ff" />
        </linearGradient>
        <linearGradient id="school-left" x1="14" y1="15" x2="24" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6dc9ff" />
          <stop offset="100%" stopColor="#1995d3" />
        </linearGradient>
        <linearGradient id="school-right" x1="25" y1="15" x2="37" y2="37" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4eb7f3" />
          <stop offset="100%" stopColor="#0f71bc" />
        </linearGradient>
        <filter id="school-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#08111a" floodOpacity="0.24" />
        </filter>
      </defs>
      <ellipse cx="24" cy="37.8" rx="12.2" ry="3.2" fill="#07111a" opacity="0.2" />
      <g filter="url(#school-shadow)" transform="rotate(-7 24 24)">
        <path d="M24 8 12 14.4 24 20.8 36 14.4 24 8Z" fill="url(#school-top)" />
        <path d="M12 14.4V29.6L24 38.2V20.8L12 14.4Z" fill="url(#school-left)" />
        <path d="M36 14.4V29.6L24 38.2V20.8L36 14.4Z" fill="url(#school-right)" />
        <path d="M18.3 12.4 24 15.4 29.7 12.4" stroke="#f6fcff" strokeOpacity="0.82" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18.3 18.4H29.7" stroke="#f6fcff" strokeOpacity="0.72" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18.3 21.6H29.7" stroke="#f6fcff" strokeOpacity="0.56" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M18.3 24.8H27.5" stroke="#f6fcff" strokeOpacity="0.46" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M22.2 6.4h3.6v3.6l3 1.4-4.8 2.2-4.8-2.2 3-1.4V6.4Z" fill="#ffffff" fillOpacity="0.92" />
      </g>
    </svg>
  );
}

function CashIcon({ className = "" }: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="cash-top" x1="15" y1="13" x2="34" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#e4fff9" />
          <stop offset="100%" stopColor="#6ddcc9" />
        </linearGradient>
        <linearGradient id="cash-front" x1="14" y1="19" x2="29" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#43cdb8" />
          <stop offset="100%" stopColor="#0f8f82" />
        </linearGradient>
        <linearGradient id="cash-side" x1="24" y1="19" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#25bfae" />
          <stop offset="100%" stopColor="#0a7268" />
        </linearGradient>
        <filter id="cash-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.2" floodColor="#08111a" floodOpacity="0.24" />
        </filter>
      </defs>
      <ellipse cx="24" cy="38" rx="12.5" ry="3.1" fill="#07111a" opacity="0.2" />
      <g filter="url(#cash-shadow)" transform="rotate(7 24 24)">
        <path d="M17 13.5h14.2c1.4 0 2.5 1.1 2.5 2.5v10.7c0 1.4-1.1 2.5-2.5 2.5H17c-1.4 0-2.5-1.1-2.5-2.5V16c0-1.4 1.1-2.5 2.5-2.5Z" fill="url(#cash-top)" />
        <path d="M14.5 16c0 1.4 1.1 2.5 2.5 2.5h14.2c1.4 0 2.5-1.1 2.5-2.5v10.7c0 1.4-1.1 2.5-2.5 2.5H17c-1.4 0-2.5-1.1-2.5-2.5V16Z" fill="url(#cash-front)" />
        <path d="M31.7 18.5V29.2L28.6 31.7V20.9l3.1-2.4Z" fill="url(#cash-side)" />
        <path d="M17.6 21.2h8.1" stroke="#ecfffb" strokeOpacity="0.8" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M17.6 24h6.2" stroke="#ecfffb" strokeOpacity="0.62" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M17.6 26.8h4.7" stroke="#ecfffb" strokeOpacity="0.48" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="31.7" y="12.8" width="4.2" height="4.2" rx="1" fill="#ffffff" fillOpacity="0.88" />
        <path d="M36 18.6 39 21.6" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M32.1 31.4h2.4l1.5 1.5" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" strokeLinecap="round" />
        <rect x="39.1" y="17.7" width="1.9" height="1.9" rx="0.4" fill="#ffffff" fillOpacity="0.52" />
        <rect x="40.9" y="14.8" width="1.2" height="1.2" rx="0.3" fill="#ffffff" fillOpacity="0.42" />
        <rect x="42.1" y="12.6" width="0.8" height="0.8" rx="0.2" fill="#ffffff" fillOpacity="0.36" />
      </g>
    </svg>
  );
}

const ICONS = [BankIcon, SchoolIcon, CashIcon];

export function WhySection() {
  return (
    <section id="why" className="relative overflow-hidden bg-forest-deep text-cream">
      {/* Subtle grid lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(100% 0 0) 1px, transparent 1px), linear-gradient(90deg, oklch(100% 0 0) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 py-24 lg:px-10 lg:py-32">
        {/* Header */}
        <Reveal className="max-w-3xl">
          <h2 className="font-display text-[clamp(2rem,4.4vw,3.25rem)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            {WHY.heading}
          </h2>
          <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-cream/65">
            {WHY.body}
          </p>
        </Reveal>

        {/* Three problem feature tiles */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {WHY_FEATURES.map((feature, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal key={feature.title} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-5 rounded-brand-lg border border-cream/10 bg-cream/5 p-7 backdrop-blur-sm">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-[1.1rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] ${feature.chipColor}`}
                  >
                    <Icon className={`h-8 w-8 ${feature.iconColor} drop-shadow-[0_5px_10px_rgba(0,0,0,0.22)]`} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-snug tracking-tight text-cream">
                      {feature.title}
                    </h3>
                    <p className="mt-2 font-sans text-base leading-relaxed text-cream/60">
                      {feature.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-cream/10" />

        {/* Stats */}
        <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-brand-lg border border-cream/10 bg-cream/10 sm:grid-cols-3">
          {WHY.facts.map((fact, i) => (
            <Reveal key={fact.value} delay={i * 0.08} className="bg-forest-deep p-8">
              <p className="font-display text-5xl font-extrabold text-gold">{fact.value}</p>
              <p className="mt-3 font-sans text-base leading-relaxed text-cream/60">
                {fact.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
