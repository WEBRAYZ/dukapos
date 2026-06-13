'use client';

import React from 'react';

const HowItWorksWhatDone = () => {
  const metrics = [
    {
      value: '87%',
      label: 'Faster reconciliation',
      description: 'Avg. end-of-day time reduced dramatically',
    },
    {
      value: '4×',
      label: 'Tools consolidated',
      description: 'One platform replacing fragmented stacks',
    },
    {
      value: '$0',
      label: 'Migration cost',
      description: 'Free white-glove onboarding included',
    },
  ];

  return (
    <section className="bg-white text-slate-900 py-6 lg:py-8 border-t border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
          
          {/* Testimonial Side */}
          <div className="lg:col-span-7 space-y-3">
            <div className="relative">
              <p className="text-md lg:text-lg font-black text-blue-800 relative z-10">
                Nexus replaced four separate tools we were running. Onboarding took three days. 
                Our end-of-day reconciliation went from 90 minutes to under five.
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="w-10 h-10 bg-olive rounded-sm flex items-center justify-center text-lg font-black text-white shadow-lg shadow-blue-900/20">
                LV
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black uppercase text-slate-900">Lucia Vargas</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Head of Operations, Meridian Retail Group
                </p>
              </div>
            </div>
          </div>

          {/* Metrics Side */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-4">
            {metrics.map((metric, i) => (
              <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-sm group hover:border-olive/30 hover:bg-white hover:shadow-xl hover:shadow-olive/5 transition-all duration-500">
                <div className="flex items-end justify-between mb-1">
                  <span className="text-2xl font-black text-blue-500 group-hover:scale-110 transition-transform origin-left">
                    {metric.value}
                  </span>
                </div>
                <div className="space-y-1">
                  <h5 className="text-xs font-black uppercase text-slate-800">
                    {metric.label}
                  </h5>
                  <p className="text-[9px] font-bold text-slate-400 uppercase">
                    {metric.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorksWhatDone;
