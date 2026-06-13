import Navbar from "@/app/components/mainpage/navbar";
import Hero from "@/app/components/mainpage/hero";
import LogoStrip from "@/app/components/mainpage/logos";
import Business from "@/app/components/mainpage/business";
import CoreFeatures from "@/app/components/mainpage/corefeatures";
import HowItWorks from "@/app/components/mainpage/how";
import PointOfSale from "@/app/components/mainpage/pointofsale";
import Analytics from "@/app/components/mainpage/analytics";
import AccessControl from "@/app/components/mainpage/accesscontrol";
import Pricing from "@/app/components/mainpage/pricing";
import Payment from "@/app/components/mainpage/payment";
import Trust from "@/app/components/mainpage/trust";
import FAQ from "@/app/components/mainpage/faq";
import Transform from "@/app/components/mainpage/transform";
import Newsletter from "@/app/components/mainpage/newsletter";
import Footer from "@/app/components/mainpage/footer";
import FloatingElements from "@/app/components/mainpage/floating";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen relative">
      <Navbar />
      <Hero />
      
      <Business />
      <CoreFeatures />
      <PointOfSale />
      <Payment />
      <Analytics />
      <AccessControl />
      <Trust />
      <HowItWorks />
      <Pricing />
      <FAQ />
      <Transform />
      <Newsletter />
      <LogoStrip />
      <Footer />
      <FloatingElements />
    </main>
  );
}
