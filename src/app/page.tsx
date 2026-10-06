import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Format } from "@/components/sections/Format";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { Faq } from "@/components/sections/Faq";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { MotionLayer } from "@/components/layout/MotionLayer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Punët and Formati were one question asked twice — "what shape of site
          do I need?" — so they are now a single section (Format.tsx, #punet)
          where picking a structure shows a worked example of it.

          It stays ahead of Çmimet: the hero promises work to look at, and
          proof has to land before the offer does. Deleting the old Punët
          section silently reversed that, which is worth guarding here. */}
      <main id="permbajtja" className="relative flex-1">
        <Hero />
        <Format />
        <Pricing />
        <Services />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <MotionLayer />
    </>
  );
}
