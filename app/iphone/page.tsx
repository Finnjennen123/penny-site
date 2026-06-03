import { IPhone17Pro } from "@/components/visuals/IPhone17Pro";

// Standalone preview for the iPhone 17 Pro sequence mockup.
export default function IPhonePreviewPage() {
  return (
    <main className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-cream px-6 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 0%, oklch(88% 0.1 86 / 0.5), transparent 55%)",
        }}
      />
      <IPhone17Pro className="w-[clamp(17rem,32vw,22rem)]" />
    </main>
  );
}
