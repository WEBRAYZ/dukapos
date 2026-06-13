'use client';
import { useState } from 'react';

const HowItWorksHero = () => {
  const [showVideo, setShowVideo] = useState(false);

  const metrics = [
    { value: '5', label: 'Core Modules', icon: '▦' },
    { value: '< 4d', label: 'Avg. Onboarding', icon: '⚡' },
    { value: '2,400+', label: 'Businesses', icon: '🏢' },
    { value: '99.98%', label: 'Uptime SLA', icon: '📶' },
  ];

  return (
    <section className="relative bg-linear-to-l from-blue-50 to-blue-50 text-slate-900 min-h-[80vh] overflow-hidden py-6 lg:py-0 flex items-center">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none opacity-40">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 blur-[120px] rounded-full" />
      </div>

      <div className="relative container mx-auto px-4 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          
          {/* Left Column: Text Content & Metrics */}
          <div className="space-y-12">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="py-1 px-3 rounded-full bg-blue-100 border border-blue-300 uppercase text-[10px] font-bold tracking-wider text-blue-600">How It Works</span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-black uppercase text-blue-950">
                Retail, running <br />
                <span className="text-blue-500">exactly right.</span>
              </h1>
              
              <p className="text-base text-slate-700 font-medium">
                From the moment you add a product to the second a customer walks out the door — 
                DukaPOS handles every step with precision, speed, and total visibility.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 bg-linear-to-l from-blue-700 to-blue-950 hover:from-blue-800 hover:to-black text-white rounded-sm text-xs font-black uppercase transition-all shadow-xl shadow-blue-900/20 group">
                  Explore Modules <span className="inline-block group-hover:translate-x-1 transition-transform ml-2">→</span>
                </button>
                <button 
                  onClick={() => setShowVideo(true)}
                  className="px-8 py-4 bg-white hover:bg-slate-50 text-blue-900 rounded-sm text-xs font-black uppercase transition-all border border-slate-200 shadow-sm"
                >
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Metrics Grid moved here */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-blue-100">
              {metrics.map((metric, i) => (
                <div 
                  key={metric.label}
                  className="flex flex-col space-y-2 group transition-all duration-300"
                >
                  <div className="text-2xl font-black text-blue-900 group-hover:text-blue-500 transition-colors">
                    {metric.value}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Video Display */}
          <div className="relative lg:h-[60vh] flex items-center justify-center">
            <div 
              onClick={() => setShowVideo(true)}
              className="relative w-full h-[300px] lg:h-[68vh] aspect-video max-w-2xl rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-400 bg-slate-900 group cursor-pointer"
            >
              {/* Video Placeholder Background */}
              <div className="absolute inset-0 bg-blue-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950 via-transparent to-transparent" />
                
                {/* Play Button Icon */}
                <div className="relative z-10 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center shadow-2xl group-hover:bg-blue-400 group-hover:scale-110 transition-all duration-300">
                  <div className="w-0 h-0 border-t-12 border-t-transparent border-l-12 border-l-white border-b-12 border-b-transparent ml-1" />
                </div>
              </div>

              {/* Video Label Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl">
                  <p className="text-white text-xs font-bold uppercase tracking-widest mb-1">Preview Video</p>
                  <p className="text-white/80 text-[10px]">See DukaPOS in action at a busy retail environment.</p>
                </div>
              </div>
            </div>

            {/* Decorative dots/elements */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl -z-10" />
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-blue-200/50 rounded-full blur-2xl -z-10" />
          </div>

        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/90 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setShowVideo(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
            <div className="w-full h-full flex items-center justify-center">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
                title="DukaPOS Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div 
            className="absolute inset-0 -z-10" 
            onClick={() => setShowVideo(false)}
          />
        </div>
      )}
    </section>
  );
};

export default HowItWorksHero;
