import Image from "next/image";

type PennyCardProps = {
  className?: string;
  // Kept for API compatibility with existing callers; the artwork is baked
  // into the card image, so no cardholder name is rendered.
  name?: string;
};

// The physical Penny debit card. The PNG has a transparent, pre-rounded edge
// (outer white flood-filled away), so the drop-shadow hugs the real card shape
// and no white border shows on any background.
export function PennyCard({ className = "" }: PennyCardProps) {
  return (
    <div className={`relative aspect-[2187/1453] w-full ${className}`}>
      <Image
        src="/Penny-card.png"
        alt="Penny debit card"
        width={2187}
        height={1453}
        priority
        quality={85}
        sizes="(min-width: 1024px) 560px, (min-width: 640px) 55vw, 85vw"
        className="h-full w-full object-contain"
        style={{
          filter:
            "drop-shadow(0 18px 36px rgba(20,30,30,0.40)) drop-shadow(0 4px 10px rgba(20,30,30,0.22))",
          willChange: "transform",
        }}
      />
    </div>
  );
}

// Two cards stacked: card 2 starts at the horizontal centre of card 1.
// Both cards are 68% of the container width so they're physically identical.
// Card 1: 0→68%   Card 2: 34→102% (small right-bleed is intentional).
export function PennyCardStack({ className = "" }: PennyCardProps) {
  const shadow =
    "drop-shadow(0 22px 40px rgba(20,30,30,0.44)) drop-shadow(0 6px 14px rgba(20,30,30,0.24))";

  // Shared card shape: 2187×1453 landscape, 5.5% border-radius, overflow-hidden
  // so any white/light edges in the source artwork are hard-clipped.
  const cardWrapClass =
    "relative w-full overflow-hidden";
  const cardWrapStyle: React.CSSProperties = {
    aspectRatio: "2187 / 1453",
    borderRadius: "5.5%",
  };

  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: "3 / 2" }}
    >
      {/* Card 1 — back/left */}
      <div
        className="absolute left-0 top-1/2 z-0 w-[68%] -translate-y-1/2 -rotate-[4deg]"
        style={{ filter: shadow }}
      >
        <div className={cardWrapClass} style={cardWrapStyle}>
          <Image
            src="/card-with-dude.svg"
            alt="Penny debit card back"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 48vw, 72vw"
          />
        </div>
      </div>

      {/* Card 2 — front, starts at centre of card 1 */}
      <div
        className="absolute left-[34%] top-1/2 z-10 w-[68%] -translate-y-1/2 rotate-[5deg]"
        style={{ filter: shadow }}
      >
        <Image
          src="/Penny-card.png"
          alt="Penny debit card"
          width={2187}
          height={1453}
          priority
          quality={85}
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 48vw, 72vw"
          className="block w-full h-auto"
        />
      </div>
    </div>
  );
}
