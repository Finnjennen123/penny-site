import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhySection } from "@/components/WhySection";
import { HowItWorks } from "@/components/HowItWorks";
import { ParentSection } from "@/components/ParentSection";
import { FourPockets } from "@/components/FourPockets";
import { CardSection } from "@/components/CardSection";
import { Testimonials } from "@/components/Testimonials";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <TrustBar />
        <WhySection />
        <HowItWorks />
        <ParentSection />
        <FourPockets />
        <CardSection />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
