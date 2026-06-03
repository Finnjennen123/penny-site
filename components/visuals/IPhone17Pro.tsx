"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";
import {
  MagnifyingGlass,
  CellSignalHigh,
  WifiHigh,
  BatteryHigh,
} from "@phosphor-icons/react";

/* -------------------------------------------------------------------------- */
/*  EDITABLE CONFIG                                                            */
/* -------------------------------------------------------------------------- */

// Sequence timeline. Each phase holds for `hold` ms, then advances and loops.
const SEQUENCE = [
  { phase: "home", hold: 1700 },
  { phase: "tap", hold: 820 },
  { phase: "app", hold: 5000 },
] as const;
type Phase = (typeof SEQUENCE)[number]["phase"];

// iOS-style push spring (screen slide).
const PUSH = { type: "spring", stiffness: 260, damping: 30 } as const;

type AppDef = { id: string; name: string; src?: string; penny?: boolean };

// Real iOS app icons (artwork pulled from the App Store into /public/app-icons).
// Penny is our own brand tile and is the tap target (id: "penny").
const HOME_APPS: AppDef[] = [
  { id: "penny", name: "Penny", penny: true },
  { id: "instagram", name: "Instagram", src: "/app-icons/instagram.png" },
  { id: "tiktok", name: "TikTok", src: "/app-icons/tiktok.png" },
  { id: "snapchat", name: "Snapchat", src: "/app-icons/snapchat.png" },
  { id: "youtube", name: "YouTube", src: "/app-icons/youtube.png" },
  { id: "netflix", name: "Netflix", src: "/app-icons/netflix.png" },
  { id: "photos", name: "Photos", src: "/app-icons/googlephotos.png" },
  { id: "maps", name: "Maps", src: "/app-icons/maps.png" },
  { id: "chatgpt", name: "ChatGPT", src: "/app-icons/chatgpt.png" },
  { id: "reddit", name: "Reddit", src: "/app-icons/reddit.png" },
  { id: "pinterest", name: "Pinterest", src: "/app-icons/pinterest.png" },
  { id: "duolingo", name: "Duolingo", src: "/app-icons/duolingo.png" },
  { id: "amazon", name: "Amazon", src: "/app-icons/amazon.png" },
  { id: "uber", name: "Uber", src: "/app-icons/uber.png" },
  { id: "discord", name: "Discord", src: "/app-icons/discord.png" },
  { id: "x", name: "X", src: "/app-icons/x.png" },
];

const DOCK_APPS: AppDef[] = [
  { id: "whatsapp", name: "WhatsApp", src: "/app-icons/whatsapp.png" },
  { id: "messenger", name: "Messenger", src: "/app-icons/messenger.png" },
  { id: "telegram", name: "Telegram", src: "/app-icons/telegram.png" },
  { id: "gmail", name: "Gmail", src: "/app-icons/gmail.png" },
];

// Money buckets shown on the kid dashboard. Each carries a Penny character
// illustration (artwork in /public/penny) and its share of the total balance.
const BUCKETS = [
  { label: "Save", amount: "$20.00", pct: "42% of total", img: "/penny/cheer.png", tint: "#f3ede0" },
  { label: "Spend", amount: "$12.50", pct: "26% of total", img: "/penny/coat.png", tint: "#efe6f3" },
  { label: "Invest", amount: "$10.00", pct: "21% of total", img: "/penny/grandpa.png", tint: "#e3eee6" },
  { label: "Give", amount: "$5.00", pct: "11% of total", img: "/penny/bear.png", tint: "#f6e8e2" },
];

/* -------------------------------------------------------------------------- */
/*  ICONS                                                                      */
/* -------------------------------------------------------------------------- */

// iOS superellipse-ish radius + a hairline rim so masked artwork reads crisp.
const TILE =
  "relative h-full w-full overflow-hidden rounded-[22.5%] shadow-[inset_0_0_0_0.4cqw_rgba(255,255,255,0.08)]";

function IconArt({ app }: { app: AppDef }) {
  if (app.penny) {
    return (
      <div className={TILE} style={{ background: "oklch(81% 0.16 82)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icon-512.png"
          alt="Penny"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>
    );
  }
  return (
    <div className={TILE}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={app.src} alt={app.name} className="h-full w-full object-cover" draggable={false} />
    </div>
  );
}

function AppIcon({
  app,
  pressed,
  withLabel = true,
  innerRef,
}: {
  app: AppDef;
  pressed?: boolean;
  withLabel?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="flex flex-col items-center gap-[1.3cqw]">
      <motion.div
        ref={innerRef}
        animate={pressed ? { scale: 0.84 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="aspect-square w-[16cqw] drop-shadow-[0_1.5cqw_2.4cqw_rgba(0,0,0,0.34)]"
      >
        <IconArt app={app} />
      </motion.div>
      {withLabel && (
        <span className="max-w-[19cqw] truncate font-sans text-[2.55cqw] font-medium leading-tight text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
          {app.name}
        </span>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  SCREENS                                                                    */
/* -------------------------------------------------------------------------- */

function StatusBar({ tone }: { tone: "light" | "dark" }) {
  const color = tone === "light" ? "text-white" : "text-forest";
  return (
    <div
      className={`absolute inset-x-0 top-0 z-30 flex items-center justify-between px-[7cqw] pt-[3.6cqw] ${color}`}
      style={{ transition: "color 0.4s ease" }}
    >
      <span className="font-sans text-[4cqw] font-semibold tracking-tight">9:41</span>
      <span className="flex items-center gap-[1.6cqw]">
        <CellSignalHigh weight="fill" className="h-[4cqw] w-[4cqw]" />
        <WifiHigh weight="fill" className="h-[4cqw] w-[4cqw]" />
        <BatteryHigh weight="fill" className="h-[4.6cqw] w-[4.6cqw]" />
      </span>
    </div>
  );
}

function HomeScreen({
  pressPenny,
  pennyRef,
}: {
  pressPenny: boolean;
  pennyRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* abstract wallpaper */}
      <div className="absolute inset-0 bg-[#0a1f15]" />
      <div className="absolute -left-[20%] -top-[10%] h-[70%] w-[80%] rounded-full bg-[#1f7a4d] opacity-70 blur-3xl" />
      <div className="absolute right-[-25%] top-[18%] h-[60%] w-[70%] rounded-full bg-[#caa14a] opacity-40 blur-3xl" />
      <div className="absolute bottom-[-10%] left-[10%] h-[55%] w-[75%] rounded-full bg-[#1b8a8a] opacity-35 blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

      <div className="relative flex h-full flex-col px-[5cqw] pb-[4cqw] pt-[15cqw]">
        <div className="grid grid-cols-4 gap-x-[2.2cqw] gap-y-[2.8cqw]">
          {HOME_APPS.map((app) => (
            <AppIcon
              key={app.id}
              app={app}
              pressed={app.id === "penny" && pressPenny}
              innerRef={app.id === "penny" ? pennyRef : undefined}
            />
          ))}
        </div>

        <div className="mb-[3cqw] mt-auto flex items-center justify-center">
          <div
            className="flex items-center gap-[1.6cqw] rounded-full px-[4cqw] py-[1.6cqw]"
            style={{ background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
          >
            <MagnifyingGlass weight="bold" className="h-[3.4cqw] w-[3.4cqw] text-white" />
            <span className="font-sans text-[3cqw] font-medium text-white/90">Search</span>
          </div>
        </div>

        <div
          className="flex items-center justify-around rounded-[8cqw] px-[3cqw] py-[3cqw]"
          style={{ background: "rgba(255,255,255,0.16)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
        >
          {DOCK_APPS.map((app) => (
            <div key={app.id} className="w-[17cqw]">
              <AppIcon app={app} withLabel={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  const [save, spend, invest, give] = BUCKETS;
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0a0b]">
      {/* faint warm glow at the top */}
      <div
        aria-hidden
        className="absolute -top-[16%] left-1/2 h-[42%] w-[130%] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(245,200,82,0.18), transparent 70%)" }}
      />

      <div className="relative flex h-full flex-col px-[5cqw] pt-[12.5cqw] text-white">
        {/* header */}
        <div className="flex items-start justify-between">
          <div>
            <p className="font-sans text-[2.7cqw] font-bold uppercase tracking-[0.22em] text-white/40">
              Tuesday, Jun 2
            </p>
            <p className="mt-[1cqw] font-display text-[7.6cqw] font-extrabold leading-[0.95] tracking-tight text-white">
              Hey, Mia
            </p>
            <p className="mt-[1.4cqw] font-sans text-[3cqw] font-semibold text-white/55">
              2 chores left · keep going
            </p>
          </div>
          <span className="h-[12.5cqw] w-[12.5cqw] shrink-0 overflow-hidden rounded-full bg-[#1a1a1c] ring-[0.7cqw] ring-gold">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/penny/cheer.png" alt="Mia" className="h-full w-full scale-[1.35] object-cover object-top" draggable={false} />
          </span>
        </div>

        {/* balance card */}
        <div
          className="relative mt-[5.2cqw] overflow-hidden rounded-[7cqw] shadow-[0_5cqw_13cqw_-4cqw_rgba(240,184,33,0.6)]"
          style={{ background: "linear-gradient(165deg, #FFD11E 0%, #F5C418 60%, #F2BD10 100%)" }}
        >
          {/* Penny — full height of the card, melted cleanly into the bright yellow with a left fade */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/penny/face.png"
            alt=""
            aria-hidden
            draggable={false}
            className="pointer-events-none absolute inset-y-0 right-[-3cqw] h-full w-auto select-none object-cover object-center"
            style={{
              mixBlendMode: "multiply",
              WebkitMaskImage: "linear-gradient(to right, transparent 6%, #000 50%)",
              maskImage: "linear-gradient(to right, transparent 6%, #000 50%)",
            }}
          />
          {/* everything is kept to the left ~62% so it stays clear of Penny on the right */}
          <div className="relative w-[66%] p-[6.8cqw]">
            <p className="font-sans text-[2.45cqw] font-bold uppercase tracking-[0.22em] text-black/45">
              Total balance
            </p>
            <p className="mt-[0.6cqw] whitespace-nowrap font-display text-[14.2cqw] font-extrabold leading-[0.9] tracking-tight text-[#1b1407]">
              $47.50
            </p>

            <div className="mt-[4.2cqw] flex gap-[2.8cqw]">
              {[
                { l: "Week", v: "+$5" },
                { l: "Goal", v: "$60" },
              ].map(({ l, v }) => (
                <span
                  key={l}
                  className="rounded-[3cqw] bg-white/85 px-[3.8cqw] py-[2cqw] leading-tight shadow-[0_1cqw_3cqw_-1.5cqw_rgba(0,0,0,0.3)]"
                >
                  <span className="block font-sans text-[2.05cqw] font-bold uppercase tracking-[0.14em] text-black/40">
                    {l}
                  </span>
                  <span className="mt-[0.35cqw] block font-display text-[4.1cqw] font-extrabold text-[#1b1407]">{v}</span>
                </span>
              ))}
            </div>

            <div className="mt-[4.6cqw] flex items-center justify-between">
              <span className="font-sans text-[2.45cqw] font-semibold text-black/50">Goal progress</span>
              <span className="font-display text-[3.2cqw] font-extrabold text-[#1b1407]">79%</span>
            </div>
            <div className="mt-[1.8cqw] h-[2.2cqw] w-full overflow-hidden rounded-full bg-black/15">
              <div className="h-full rounded-full bg-[#1b1407]" style={{ width: "79%" }} />
            </div>
          </div>
        </div>

        {/* Penny's card */}
        <div className="mt-[6.6cqw] flex items-center gap-[3.8cqw] rounded-[4.5cqw] bg-[#161618] p-[4cqw] ring-1 ring-white/[0.08]">
          <span className="aspect-[851/566] w-[19.6cqw] shrink-0 overflow-hidden rounded-[2.2cqw] ring-1 ring-white/15">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/penny-card.png" alt="Penny card" className="h-full w-full object-cover" draggable={false} />
          </span>
          <div className="flex-1 leading-tight">
            <p className="font-sans text-[4.1cqw] font-bold text-white">{"Penny's Card"}</p>
            <p className="mt-[0.4cqw] font-sans text-[2.7cqw] tracking-[0.14em] text-white/40">···· ···· ···· 4821</p>
          </div>
          <span
            className="rounded-full px-[3.5cqw] py-[1.6cqw] font-sans text-[2.15cqw] font-extrabold uppercase tracking-[0.12em] text-gold"
            style={{ background: "rgba(245,200,82,0.12)" }}
          >
            Coming soon
          </span>
        </div>

        {/* buckets header */}
        <div className="mt-auto pt-[4.2cqw] flex items-center justify-between">
          <h3 className="font-display text-[4.3cqw] font-extrabold text-white">My Buckets</h3>
          <span className="font-sans text-[2.7cqw] font-bold text-gold">Edit split</span>
        </div>

        <div className="flex min-h-0 flex-[1.02] flex-col pb-[4.4cqw]">
          {/* bento: tall left, two stacked right */}
          <div className="mt-[2.4cqw] grid min-h-0 flex-[1.02] grid-cols-2 grid-rows-2 gap-[2.8cqw]">
            <BucketCard bucket={save} className="row-span-2 h-full" tall />
            <BucketCard bucket={spend} className="h-full" />
            <BucketCard bucket={invest} className="h-full" />
          </div>

          {/* wide bucket */}
          <div className="mt-[1.8cqw] min-h-0 flex-[0.8]">
            <BucketCard bucket={give} wide className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

type Bucket = (typeof BUCKETS)[number];

function BucketCard({
  bucket,
  className = "",
  tall = false,
  wide = false,
}: {
  bucket: Bucket;
  className?: string;
  tall?: boolean;
  wide?: boolean;
}) {
  const { label, amount, pct, img, tint } = bucket;
  return (
    <div
      className={`relative overflow-hidden rounded-[4.5cqw] ${wide ? "p-[4.4cqw]" : "p-[3.6cqw]"} ${className}`}
      style={{ background: tint }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img}
        alt=""
        aria-hidden
        draggable={false}
        className={
          tall
            ? "pointer-events-none absolute -bottom-[3cqw] left-1/2 w-[34cqw] -translate-x-1/2 select-none object-contain"
            : wide
              ? "pointer-events-none absolute -bottom-[2.5cqw] right-[1.5cqw] w-[27cqw] select-none object-contain"
              : "pointer-events-none absolute -bottom-[2cqw] -right-[1cqw] w-[16cqw] select-none object-contain"
        }
      />
      <p
        className={`relative font-sans font-bold uppercase tracking-[0.14em] text-black/50 ${
          wide ? "text-[3cqw]" : "text-[2.3cqw]"
        }`}
      >
        {label}
      </p>
      <p
        className={`relative mt-[0.6cqw] font-display font-extrabold leading-none text-[#1b1407] ${
          wide ? "text-[7.6cqw]" : tall ? "text-[6cqw]" : "text-[5cqw]"
        }`}
      >
        {amount}
      </p>
      <p
        className={`relative font-sans font-semibold text-black/45 ${
          wide ? "mt-[1.5cqw] text-[3cqw]" : "mt-[1cqw] text-[2.4cqw]"
        }`}
      >
        {pct}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  MAIN                                                                       */
/* -------------------------------------------------------------------------- */

type IPhone17ProProps = {
  className?: string;
  autoPlay?: boolean;
  enableBodyMotion?: boolean;
};

export function IPhone17Pro({
  className = "",
  autoPlay = true,
  enableBodyMotion = true,
}: IPhone17ProProps) {
  const reduce = useReducedMotion();
  const [sequencePhase, setSequencePhase] = useState<Phase>("home");

  useEffect(() => {
    if (reduce || !autoPlay) {
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const step = SEQUENCE[i % SEQUENCE.length];
      setSequencePhase(step.phase);
      timer = setTimeout(() => {
        i += 1;
        tick();
      }, step.hold);
    };
    tick();
    return () => clearTimeout(timer);
  }, [reduce, autoPlay]);

  const phase = reduce || !autoPlay ? "app" : sequencePhase;
  const showHome = phase === "home" || phase === "tap";
  const showApp = phase === "app";

  const pennyRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.6 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [13, -13]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-10, 10]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !enableBodyMotion) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  const bodyMotion = enableBodyMotion && !reduce;

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative flex items-center justify-center [perspective:1600px] ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[88%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(81% 0.16 82 / 0.28), oklch(52% 0.09 152 / 0.18) 45%, transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[2%] left-1/2 -z-10 h-[7%] w-[62%] -translate-x-1/2 rounded-[50%] blur-2xl"
        style={{ background: "oklch(25% 0.04 152 / 0.5)" }}
      />

      <div className="relative w-full">
        <motion.div
          style={bodyMotion ? { rotateX, rotateY, transformStyle: "preserve-3d" } : undefined}
          className="relative w-full"
        >
          {/* side buttons */}
          <div className="absolute left-[-1.1%] top-[20%] h-[4.5%] w-[1.4%] rounded-l-[3px] bg-gradient-to-r from-[#9aa0a6] to-[#3a3c3f]" />
          <div className="absolute left-[-1.1%] top-[31%] h-[8%] w-[1.4%] rounded-l-[3px] bg-gradient-to-r from-[#9aa0a6] to-[#3a3c3f]" />
          <div className="absolute left-[-1.1%] top-[42%] h-[8%] w-[1.4%] rounded-l-[3px] bg-gradient-to-r from-[#9aa0a6] to-[#3a3c3f]" />
          <div className="absolute right-[-1.1%] top-[34%] h-[11%] w-[1.4%] rounded-r-[3px] bg-gradient-to-l from-[#9aa0a6] to-[#3a3c3f]" />

          {/* titanium frame */}
          <div
            className="relative aspect-[1/2.16] w-full overflow-hidden rounded-[16%/7.2%] p-[2.2%]"
            style={{
              background:
                "linear-gradient(135deg, #c2c6cb 0%, #494c51 9%, #80848a 21%, #2d2f33 45%, #5e6268 63%, #232528 80%, #9499a0 100%)",
              boxShadow:
                "0 1px 1.5px rgba(255,255,255,0.6) inset, 0 0 0 1px rgba(0,0,0,0.55), 0 55px 100px -32px oklch(28% 0.06 152 / 0.6), 0 26px 54px -26px rgba(0,0,0,0.6)",
              clipPath: "inset(0 round 16% / 7.2%)",
              WebkitClipPath: "inset(0 round 16% / 7.2%)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* thin black gasket between titanium and glass (real devices have one) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[1.9%] rounded-[14.8%/6.55%] bg-[#050608]"
            />
            {/* screen — concentric radius so the titanium band stays even on all sides.
                clip-path enforces clipping even while the body uses a 3D transform. */}
            <div
              className="relative z-10 h-full w-full overflow-hidden rounded-[14.4%/6.3%]"
              style={{
                containerType: "inline-size",
                background: "#000",
                clipPath: "inset(0 round 14.4% / 6.3%)",
                WebkitClipPath: "inset(0 round 14.4% / 6.3%)",
                backfaceVisibility: "hidden",
              }}
            >
                <StatusBar tone="light" />

                <AnimatePresence initial={false}>
                  {showHome && (
                    <motion.div
                      key="home"
                      className="absolute inset-0 will-change-transform"
                      initial={{ x: "-24%", opacity: 0.4 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "-24%", opacity: 0.4 }}
                      transition={PUSH}
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                      transformTemplate={(_, generated) => `${generated} translateZ(0)`}
                    >
                      <HomeScreen pressPenny={phase === "tap"} pennyRef={pennyRef} />
                    </motion.div>
                  )}
                  {showApp && (
                    <motion.div
                      key="app"
                      className="absolute inset-0 will-change-transform"
                      initial={{ x: "100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "100%" }}
                      transition={PUSH}
                      style={{
                        backfaceVisibility: "hidden",
                      }}
                      transformTemplate={(_, generated) => `${generated} translateZ(0)`}
                    >
                      <Dashboard />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-[2.6cqw] z-40 flex h-[7cqw] w-[27cqw] -translate-x-1/2 items-center justify-end rounded-full bg-black pr-[2.4cqw]">
                  <span className="h-[2.6cqw] w-[2.6cqw] rounded-full bg-[#0b1a2a] ring-1 ring-white/10" />
                </div>

              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
