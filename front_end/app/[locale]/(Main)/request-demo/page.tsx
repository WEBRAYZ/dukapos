"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";


const RequestDemoPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [requestRef] = useState(() => Math.floor(1000 + Math.random() * 9000));

  const [formData, setFormData] = useState({
    // Step 1: Contact
    firstName: "",
    lastName: "",
    workEmail: "",
    phone: "",
    jobTitle: "",
    company: "",
    // Step 2: Business
    industry: "",
    locations: "1 location",
    revenue: "Under $500K",
    currentPOS: "",
    challenges: "",
    // Step 3: Preferences
    interests: [] as string[],
    demoFormat: "Individual Walkthrough",
    preferredDate: "",
    preferredTime: "Morning (9–12)",
  });

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSubmitted(true);
      console.log("Form Submitted:", formData);
    }
  };

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const trustBadges = [
    { label: "SOC 2 Type II", icon: "✓" },
    { label: "GDPR Compliant", icon: "✓" },
    { label: "99.98% Uptime", icon: "✓" },
    { label: "PCI DSS Level 1", icon: "✓" },
  ];

  const avatars = [
    { name: "MR", color: "bg-blue-800" },
    { name: "JK", color: "bg-blue-800" },
    { name: "LV", color: "bg-blue-800" },
  ];

  return (
    <div className="min-h-screen bg-blue-950 text-white flex flex-col lg:flex-row">
      {/* Left Column: Value Proposition */}
      <div className="lg:w-1/2 p-4 lg:p-6 flex flex-col justify-center space-y-7 bg-blue-950 border-r border-blue-100">
        <div className="space-y-6">
          
          <div className="inline-block px-4 py-1 bg-blue-50 border border-blue-100 rounded-full">
            <span className="text-xs font-black uppercase text-blue-800">
              Schedule a Demo
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-slate-200">
            See the platform <br />
            <span className="text-blue-500">built for serious retail.</span>
           
          </h1>
          <p className="text-sm text-slate-400 font-medium max-w-lg">
            Nexus POS powers over 2,400 retail operations worldwide. In a
            30-minute demo, our team will tailor the walkthrough to your exact
            workflow and answer every question live.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-4 mt-4 max-w-md">
          {trustBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center space-x-3 p-4 bg-blue-900/30 rounded-sm border border-blue-900 group hover:border-blue-900 hover:shadow-lg hover:shadow-blue-900/5 transition-all"
            >
              <span className="w-6 h-6 rounded-full bg-blue-900 text-white flex items-center justify-center text-xs font-bold border border-blue-900">
                {badge.icon}
              </span>
              <span className="text-[11px] font-black uppercase text-slate-300 group-hover:text-slate-600">
                {badge.label}
              </span>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="space-y-3 pt-6 border-t border-blue-200">
          <div className="flex items-center -space-x-3">
            {avatars.map((avatar) => (
              <div
                key={avatar.name}
                className={`w-12 h-12 rounded-full border-4 border-blue-900 ${avatar.color} text-white flex items-center justify-center font-black text-xs shadow-xl`}
              >
                {avatar.name}
              </div>
            ))}
            <div className="w-12 h-12 rounded-full border-4 border-blue-900 bg-blue-900 flex items-center justify-center font-black text-xs text-slate-300 shadow-x">
              +
            </div>
          </div>
          <div className="pt-6 flex flex-row items-center jusstify-center gap-8">
            <p className="text-xs font-black text-slate-300">
              2,400+ businesses trust Nexus POS.
            </p>
            <p className="text-xs font-bold text-slate-400 uppercase mt-1">
              Avg. demo-to-launch time: 4 days.
            </p>
          </div>
        </div>
      </div>

      {/* Right Column: Form Wizard */}
      <div className="lg:w-1/2 p-4 lg:p-4 flex flex-col justify-center bg-white">
        <div className="max-w-xl mx-auto w-full space-y-12">
          {isSubmitted ? (
            <div className="space-y-3 animate-in zoom-in fade-in duration-700 py-3">
              <div className="space-y-3">
                <div className="text-3xl text-blue-700">✦</div>
                <h2 className="text-3xl font-black uppercase text-slate-900">
                  You&apos;re on <br />
                  the list.
                </h2>
                <p className="text-sm text-slate-600 font-medium max-w-md">
                  A DukaPos specialist will reach out within one business day to
                  confirm your demo and answer any questions in the meantime.
                </p>
              </div>

              <div className="p-3 bg-slate-100 border border-blue-100 rounded-sm space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase text-slate-400">
                    Request Reference
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]" />
                </div>
                <div className="text-2xl font-black text-slate-900">
                  REQ-2026-{requestRef}
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase pt-2 border-t border-blue-100">
                  Check your inbox for a confirmation email.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={() => router.push("/overview")}
                  className="flex-1 py-3 bg-linear-to-l from-blue-800 to-blue-950 hover:bg-blue-700 text-white rounded-sn text-xs font-black uppercase transition-all shadow-xl shadow-blue-900/10"
                >
                  Go to Dashboard
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-sm text-xs font-black uppercase transition-all border border-blue-200"
                >
                  New Request
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                <h2 className="text-2xl font-black uppercase text-slate-900">
                  Book your demo
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-black uppercase text-slate-600">
                    3 quick steps · No commitment required
                  </span>
                </div>
              </div>

              {/* Stepper Indicator */}
              <div className="flex items-center justify-between p-1 -mt-3 bg-slate-100 rounded-sm border border-blue-100">
                {[
                  { id: 1, label: "Contact", icon: "①" },
                  { id: 2, label: "Business", icon: "②" },
                  { id: 3, label: "Preferences", icon: "③" },
                ].map((s) => (
                  <div
                    key={s.id}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-sm transition-all ${
                      step === s.id
                        ? "bg-linear-to-l from-blue-700 to-blue-950 text-white shadow-lg"
                        : "text-slate-400"
                    }`}
                  >
                    <span className="text-sm font-black">{s.icon}</span>
                    <span className="text-[10px] font-black uppercase">
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Forms */}
              <form
                onSubmit={handleNext}
                className="space-y-5 animate-in -mt-4 fade-in slide-in-from-right duration-700"
              >
                {step === 1 && (
                  <div className="space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-700 ml-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="Maya"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              firstName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-3 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Reyes"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              lastName: e.target.value,
                            })
                          }
                          className="w-full px-3 py-3 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"/>   
                        </div>                 
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase  text-slate-600 ml-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        placeholder="maya@company.com"
                        required
                        value={formData.workEmail}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            workEmail: e.target.value,
                          })
                        }
                        className="w-full px-3 py-3 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 py-3 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
                          Job Title
                        </label>
                        <input
                          type="text"
                          placeholder="Head of Operations"
                          required
                          value={formData.jobTitle}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              jobTitle: e.target.value,
                            })
                          }
                          className="w-full px-3 py-3 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-600 ml-1">
                          Company
                        </label>
                        <input
                          type="text"
                          placeholder="Meridian Retail Group"
                          required
                          value={formData.company}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-3 py-3 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                        Industry
                      </label>
                      <select
                        required
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData({ ...formData, industry: e.target.value })
                        }
                        className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select industry…</option>
                        <option value="fashion">Fashion & Apparel</option>
                        <option value="electronics">Electronics</option>
                        <option value="grocery">Grocery & FMCG</option>
                        <option value="pharmacy">Pharmacy</option>
                        <option value="beauty">Beauty & Cosmetics</option>
                        <option value="other">Other Retail</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                          Number of Locations
                        </label>
                        <select
                          value={formData.locations}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              locations: e.target.value,
                            })
                          }
                          className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="1 location">1 location</option>
                          <option value="2-5 locations">2-5 locations</option>
                          <option value="6-20 locations">6-20 locations</option>
                          <option value="21+ locations">21+ locations</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                          Annual Revenue
                        </label>
                        <select
                          value={formData.revenue}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              revenue: e.target.value,
                            })
                          }
                          className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Under $500K">Under $500K</option>
                          <option value="$500K - $2M">$500K - $2M</option>
                          <option value="$2M - $10M">$2M - $10M</option>
                          <option value="$10M+">$10M+</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                        Current POS System
                      </label>
                      <input
                        type="text"
                        placeholder="Square, Shopify, none…"
                        value={formData.currentPOS}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            currentPOS: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                        Key Business Challenges
                      </label>
                      <textarea
                        placeholder="Tell us what's not working with your current setup…"
                        rows={4}
                        value={formData.challenges}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            challenges: e.target.value,
                          })
                        }
                        className="w-full px-6 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all placeholder:text-slate-300 resize-none"
                      />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 animate-in fade-in slide-in-from-right duration-500">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                        Areas of Interest
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          "Inventory Management",
                          "Advanced Analytics",
                          "Cloud Sync",
                          "POS Hardware",
                          "Customer Loyalty",
                          "eTIMS Tax Compliance",
                        ].map((interest) => (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`p-4 rounded-sm border text-[10px] font-black uppercase transition-all text-left ${
                              formData.interests.includes(interest)
                                ? "bg-linear-to-l from-blue-800 to-blue-950 border-olive text-white shadow-lg"
                                : "bg-slate-200 border-blue-200 text-slate-500 hover:border-slate-300"
                            }`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                        Preferred Demo Format
                      </label>
                      <select
                        value={formData.demoFormat}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            demoFormat: e.target.value,
                          })
                        }
                        className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                      >
                        <option value="Individual Walkthrough">
                          Individual Walkthrough
                        </option>
                        <option value="Group Workshop">Group Workshop</option>
                        <option value="Technical Deep Dive">
                          Technical Deep Dive
                        </option>
                        <option value="Executive Overview">
                          Executive Overview
                        </option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          required
                          value={formData.preferredDate}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredDate: e.target.value,
                            })
                          }
                          className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all scheme:light"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase text-slate-600 ml-1">
                          Preferred Time
                        </label>
                        <select
                          value={formData.preferredTime}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              preferredTime: e.target.value,
                            })
                          }
                          className="w-full px-4 py-4 bg-slate-100 border border-blue-200 rounded-sm font-black text-slate-900 focus:border-olive focus:bg-white focus:outline-none transition-all appearance-none cursor-pointer"
                        >
                          <option value="Morning (9–12)">Morning (9–12)</option>
                          <option value="Afternoon (1–4)">
                            Afternoon (1–4)
                          </option>
                          <option value="Evening (4+)">Evening (4+)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 py-5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-sm text-xs font-black uppercase transition-all border border-blue-200"
                    >
                      ← Back
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-2 py-5 bg-linear-to-l from-blue-700 to-blue-950 hover:bg-blue-700 text-white rounded-sm text-xs font-black uppercase transition-all shadow-xl shadow-green-900/10 group"
                  >
                    {step === 3 ? "Request Demo ✦" : "Continue"}{" "}
                    <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">
                      →
                    </span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDemoPage;
