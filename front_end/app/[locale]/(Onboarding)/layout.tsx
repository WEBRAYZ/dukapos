"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { OnboardingProvider, useOnboarding } from "./OnboardingContext";

const OnboardingLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { currentStep } = useOnboarding();

  const steps = [
    { id: 1, title: "Store Information", desc: "Name, logo, contact, address" },
    { id: 2, title: "Subscription Plan", desc: "Choose your plan & billing" },
    { id: 3, title: "Invite Your Team", desc: "Add staff & assign roles" },
    { id: 4, title: "Product Catalogue", desc: "Import or add products" },
    { id: 5, title: "Payment Methods", desc: "M-Pesa, cash, card setup" },
    { id: 6, title: "Receipt Template", desc: "Customise your receipts" },
    { id: 7, title: "You're Ready!", desc: "Review & launch" },
  ];

  return (
    <div className="min-h-screen flex bg-blue-50">
      {/* Sidebar */}
      <div className="hidden lg:flex w-80 bg-linear-to-l from-blue-950 to-blue-950 flex-col justify-between text-white p-4 sticky top-0 h-screen">
        <div>
           <div className="shrink-0 flex items-center mb-5">
            <Link href="/" className="group flex items-center">
              <Image
                src="/logo.jpeg"
                alt="DUKAPOS Logo"
                width={150}
                height={50}
                className="h-12 w-auto object-contain"
              />
              <div className="ml-5">
                <h2 className="text-2xl font-black text-blue-200">
                  DUKAPOS
                </h2>
                <p className="text-slate-50 text-xs font-bold">
                  Inventory Management System
                </p>
              </div>
            </Link>
          </div>

          <p className="text-[10px] font-black uppercase text-gray-500 mb-4">Setup Progress</p>

          <nav className="space-y-6">
            {steps.map((step) => (
              <div key={step.id} className="flex items-start group">
                <div className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                  step.id === currentStep 
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" 
                    : step.id < currentStep 
                      ? "bg-blue-500 text-white" 
                      : "bg-blue-50 text-black border border-blue-50"
                }`}>
                  {step.id < currentStep ? "✓" : step.id}
                </div>
                <div className="ml-2">
                  <p className={`text-xs font-black mb-1 ${step.id === currentStep ? "text-white" : "text-white"}`}>
                    {step.title}
                  </p>
                  <p className="text-[10px] font-bold text-olive-400">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="bg-blue-900/40 p-4 rounded-lg border border-blue-900">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">💬</span>
            <div>
              <p className="text-xs font-black text-white leading-none mb-1">Need help?</p>
              <p className="text-[10px] font-bold text-slate-600">Chat with our onboarding team</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-blue-800 rounded-sm text-[10px] font-black uppercase transition-colors">
            Start Chat
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <OnboardingProvider>
      <OnboardingLayoutContent>{children}</OnboardingLayoutContent>
    </OnboardingProvider>
  );
};

export default OnboardingLayout;
