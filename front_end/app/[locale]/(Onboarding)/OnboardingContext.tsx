"use client";

import React, { createContext, useContext, useState } from "react";

type OnboardingData = {
  businessName: string;
  businessType: string;
  county: string;
  phone: string;
  email: string;
  address: string;
  kraPin: string;
  registrationNo: string;
  brandColor: string;
  billingCycle: "monthly" | "annual";
  selectedPlan: string;
  importMethod: "bulk" | "manual" | "skip";
  selectedCategories: string[];
  selectedPayments: string[];
  receiptConfig: {
    header: string;
    tagline: string;
    footer: string;
    showVat: boolean;
    deliveryMethods: string[];
  };
};

type OnboardingContextType = {
  currentStep: number;
  setStep: (step: number) => void;
  data: OnboardingData;
  updateData: (newData: Partial<OnboardingData>) => void;
};

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentStep, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    businessName: "MediCare Pharmacy",
    businessType: "pharmacy",
    county: "nairobi",
    phone: "+254 700 000 000",
    email: "info@medicare.co.ke",
    address: "Nairobi CBD, Kenya",
    kraPin: "A001234567B",
    registrationNo: "BN/2026/001234",
    brandColor: "#556B2F",
    billingCycle: "monthly",
    selectedPlan: "growth",
    importMethod: "bulk",
    selectedCategories: ["pharmacy", "personal_care"],
    selectedPayments: ["mpesa", "cash"],
    receiptConfig: {
      header: "MEDICARE PHARMACY",
      tagline: "Your Health, Our Priority",
      footer: "Goods once sold are not returnable",
      showVat: true,
      deliveryMethods: ["thermal", "email"],
    },
  });

  const updateData = (newData: Partial<OnboardingData>) => {
    setData((prev) => {
      const updated = { ...prev, ...newData };
      if (typeof window !== "undefined") {
        localStorage.setItem("onboarding_data", JSON.stringify(updated));
      }
      return updated;
    });
  };

  const saveData = async () => {
    if (typeof window === "undefined") return;
    
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch("http://localhost:8000/api/auth/business-profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          business_name: data.businessName,
          business_type: data.businessType,
          county: data.county,
          phone: data.phone,
          email: data.email,
          address: data.address,
          kra_pin: data.kraPin,
          registration_no: data.registrationNo,
          brand_color: data.brandColor,
          billing_cycle: data.billingCycle,
          selected_plan: data.selectedPlan,
          receipt_header: data.receiptConfig.header,
          receipt_tagline: data.receiptConfig.tagline,
          receipt_footer: data.receiptConfig.footer,
          show_vat: data.receiptConfig.showVat,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save to backend");
      }
      console.log("Onboarding data synced with backend");
    } catch (error) {
      console.error("Backend sync failed, saved to local storage only:", error);
    }
  };

  return (
    <OnboardingContext.Provider value={{ currentStep, setStep, data, updateData, saveData }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
};
