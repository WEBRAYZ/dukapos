'use client';

import React from 'react';
import HowItWorksHero from "@/app/components/how-works/hero";
import HowItWorksWorkflow from "@/app/components/how-works/workflow";
import HowItWorksBeforeAfter from "@/app/components/how-works/before-after";
import HowItWorksWhatDone from "@/app/components/how-works/what-done";
import Footer from "@/app/components/mainpage/footer";

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      <HowItWorksHero />
      <HowItWorksWorkflow />
      <HowItWorksBeforeAfter />
      <HowItWorksWhatDone />
      <Footer />
    </main>
  );
}
