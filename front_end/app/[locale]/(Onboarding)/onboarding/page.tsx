"use client";

import React from "react";
import Link from "next/link";
import { useOnboarding } from "../OnboardingContext";
import { api } from "@/lib/api";

// Import step components
import StoreInfo from "./steps/StoreInfo";
import Subscription from "./steps/Subscription";
import InviteTeam from "./steps/InviteTeam";
import ProductCatalogue from "./steps/ProductCatalogue";
import PaymentMethods from "./steps/PaymentMethods";
import ReceiptTemplate from "./steps/ReceiptTemplate";
import Ready from "./steps/Ready";

const OnboardingPage = () => {
  const { currentStep, setStep, data } = useOnboarding();
  const [isSaving, setIsSaving] = React.useState(false);

  const totalSteps = 7;
  const progressMap: { [key: number]: number } = {
    1: 14,
    2: 29,
    3: 43,
    4: 57,
    5: 71,
    6: 86,
    7: 100,
  };
  const progress = progressMap[currentStep] || 0;

  const handleContinue = async () => {
    setIsSaving(true);
    try {
      if (currentStep === 1) {
        await api.patch('/auth/business-profile/', {
          business_name: data.storeName,
          business_type: data.businessType,
          county: data.location,
          phone: data.phone,
          email: data.email,
          address: data.address
        });
      } else if (currentStep === 2) {
        await api.patch('/auth/business-profile/', {
          selected_plan: data.selectedPlan,
          billing_cycle: data.billingCycle
        });
      } else if (currentStep === 6) {
        await api.patch('/auth/business-profile/', {
          receipt_header: data.receiptHeader,
          receipt_tagline: data.receiptTagline,
          receipt_footer: data.receiptFooter,
          show_vat: data.showVat
        });
      }

      if (currentStep < totalSteps) {
        setStep(currentStep + 1);
      } else {
        const locale = window.location.pathname.split('/')[1] || 'en';
        window.location.href = `/${locale}/dashboard`;
      }
    } catch (err) {
      console.error("Failed to save onboarding data:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setStep(currentStep - 1);
    }
  };

  const getStepTitle = (step: number) => {
    switch (step) {
      case 1: return "Store Information";
      case 2: return "Subscription Plan";
      case 3: return "Invite Your Team";
      case 4: return "Product Catalogue";
      case 5: return "Payment Methods";
      case 6: return "Receipt Template";
      case 7: return "You're Ready!";
      default: return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StoreInfo />;
      case 2: return <Subscription />;
      case 3: return <InviteTeam />;
      case 4: return <ProductCatalogue />;
      case 5: return <PaymentMethods />;
      case 6: return <ReceiptTemplate />;
      case 7: return <Ready />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-blue-50">
      {/* Header Navigation */}
      <header className="bg-blue-100 border-b border-slate-100 px-4 py-4 sticky top-0 z-20 flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="space-y-1">
             <p className="text-[10px] font-black uppercase text-slate-600">
               Step {currentStep} of {totalSteps} · <span className="text-blue-600">{getStepTitle(currentStep)}</span>
             </p>
             <div className="flex items-center space-x-3 w-64">
               <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
               </div>
               <span className="text-[10px] font-black text-slate-500">{progress}% complete</span>
             </div>
          </div>
        </div>

        <Link 
          href="/dashboard"
          className="text-[10px] font-black uppercase text-gray-700 hover:text-olive transition-colors"
        >
          Skip for now →
        </Link>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 p-1 lg:p-1 max-w-6xl mx-auto w-full">
        {renderStep()}
      </main>

      {/* Sticky Footer */}
      <footer className="bg-white border-t border-blue-100 p-4 sticky bottom-0 z-20 flex justify-between items-center">
        {currentStep > 1 && currentStep < 7 ? (
          <button 
            onClick={handleBack}
            className="flex items-center text-xs font-black text-slate-700 hover:text-olive transition-colors uppercase group"
          >
            <span className="text-lg mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Back
          </button>
        ) : (
          <div className="w-20" /> // Spacer
        )}

        <div className="flex items-center space-x-4">
           {currentStep === 2 && !data.selectedPlan && (
             <p className="text-[10px] font-black text-blue-600 uppercase">Choose a plan to proceed</p>
           )}
           {currentStep === 5 && data.selectedPayments.length === 0 && (
             <p className="text-[10px] font-black text-blue-600 uppercase">Enable at least one payment method</p>
           )}
           <button 
             onClick={handleContinue}
             disabled={isSaving || (currentStep === 2 && !data.selectedPlan) || (currentStep === 5 && data.selectedPayments.length === 0)}
             className="bg-linear-to-l from-blue-800 to-blue-950 text-white px-5 py-4 rounded-sm font-black text-xs uppercase hover:bg-olive transition-all shadow-xl shadow-green-900/10 active:scale-[0.98] flex items-center justify-center space-x-4 group disabled:opacity-50 disabled:cursor-not-allowed"
           >
              <span>{isSaving ? "Saving..." : currentStep === 7 ? "🚀 Launch Dashboard" : "Save & Continue"}</span>
              {!isSaving && currentStep < 7 && <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>}
           </button>
        </div>
      </footer>
    </div>
  );
};

export default OnboardingPage;
