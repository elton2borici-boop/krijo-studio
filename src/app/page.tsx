import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Format } from "@/components/Format";
import { Pricing } from "@/components/Pricing";
import { WhyUs } from "@/components/WhyUs";
import { Process } from "@/components/Process";
import { Portfolio } from "@/components/Portfolio";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MotionLayer } from "@/components/MotionLayer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Order: proof (Punët) before the offer (Çmimet) — the hero promises
          "më poshtë gjen disa punë", so the work must come first. */}
      <main id="permbajtja" className="relative flex-1">
        <Hero />
        <Portfolio />
        <Pricing />
        <Services />
        <Format />
        <Process />
        <WhyUs />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MotionLayer />
    </>
  );
}
