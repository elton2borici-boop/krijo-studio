import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Format } from "@/components/Format";
import { Pricing } from "@/components/Pricing";
import { Process } from "@/components/Process";
import { Commitments } from "@/components/Commitments";
import { Faq } from "@/components/Faq";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MotionLayer } from "@/components/MotionLayer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Formatet stays ahead of Çmimet: the hero promises a page in 5–7
          days, and the visitor has to see which kind of page that is before
          the price. The pictures are models of structure, not a portfolio. */}
      <main id="permbajtja" className="relative flex-1">
        <Hero />
        <Format />
        <Pricing />
        <Services />
        <Process />
        <Commitments />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MotionLayer />
    </>
  );
}
