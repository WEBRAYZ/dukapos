'use client';

import { useTranslations } from 'next-intl';

const Payment = () => {
  const t = useTranslations('Payment');
  const steps = [
    {
      number: '1',
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: '📱'
    },
    {
      number: '2',
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: '⚡'
    },
    {
      number: '3',
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: '🔄'
    }
  ];

  return (
    <section className="py-16 bg-blue-50/70 overflow-hidden">
      <div className="px-4 sm:px-4 lg:px-13">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          
          {/* Left Column: Content */}
          <div className="space-y-6 animate-in fade-in slide-in-from-left duration-1000">
            <div className="mb-7">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-blue-700 font-black text-[10px] uppercase tracking-widest">{t('integratedBadge')}</span>
              </div>
              
              <h3 className="text-4xl lg:text-4xl font-extrabold text-olive leading-tight mb-6">
                {t('titlePrefix')}<br />
                <span className="text-blue-500 italic">{t('titleSuffix')}</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid gap-4">
              {steps.map((step) => (
                <div key={step.number} className="group flex items-start space-x-6 p-4 rounded-xl bg-white border border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-olive flex items-center justify-center font-black text-lg group-hover:bg-olive group-hover:text-gray-900 transition-all duration-300 shadow-sm">
                    {step.number}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-black text-olive flex items-center space-x-2">
                      <span>{step.title}</span>
                      <span className="text-sm opacity-0 group-hover:opacity-100 transition-opacity">{step.icon}</span>
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed max-w-md">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mobile Mockup */}
          <div className="relative flex justify-center lg:justify-end animate-in fade-in zoom-in duration-1000 delay-200">
            {/* Phone Frame */}
            <div className="w-[380px] h-[640px] bg-gray-900 rounded-3xl p-2 shadow-2xl border border-blue-950 relative ring-white/10">
              {/* Dynamic Island */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-1 bg-gray-900 rounded-2xl z-20 flex items-center justify-end px-3">
                <div className="w-2 rounded-full bg-yellow-500/20"></div>
              </div>
              
              <div className="bg-white h-full rounded-2xl overflow-hidden flex flex-col font-sans relative group/phone">
                {/* Status Bar */}
                <div className="px-8 pt-6 pb-4 flex justify-between items-center text-[12px] font-bold text-gray-700">
                  <span>9:41</span>
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A1.414 1.414 0 015.707 7.293L10 11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                  </div>
                </div>

                {/* M-Pesa App Branding */}
                <div className="px-8 py-3 flex items-center justify-between border-b border-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-200">M</div>
                    <div>
                      <span className="block text-blue-800 font-black text-sm uppercase tracking-tighter leading-none">{t('mpesaAppTitle')}</span>
                      <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Safaricom</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-0.5"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-0.5"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-500 mx-0.5"></div>
                  </div>
                </div>

                {/* Payment Content */}
                <div className="grow flex flex-col items-center px-8 pt-5">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🛒</span>
                  </div>
                  
                  <h4 className="text-xl font-black text-gray-800 mb-1">Lipa Na M-Pesa</h4>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t('checkoutRequest')}</p>
                  
                  <div className="text-2xl font-black text-olive mb-4 flex items-baseline">
                    <span className="text-sm mr-1 opacity-50">Ksh</span>
                    887.00
                  </div>

                  <div className="w-full space-y-4 mb-2">
                    <div className="flex justify-between items-center group cursor-pointer">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{t('merchant')}</span>
                      <span className="text-xs font-black text-gray-800 border-b-2 border-blue-100 pb-0.5">DUKAPOS Pharmacy</span>
                    </div>
                    <div className="flex justify-between items-center group cursor-pointer">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{t('reference')}</span>
                      <span className="text-xs font-black text-gray-800">INV-2026-04821</span>
                    </div>
                    <div className="flex justify-between items-center group cursor-pointer">
                      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">{t('account')}</span>
                      <span className="text-xs font-black text-gray-800">254700***123</span>
                    </div>
                  </div>

                  <div className="w-full space-y-8">
                    <div className="text-center">
                      <p className="text-[12px] font-bold text-gray-500 mb-5 italic">{t('pinAuthorize')}</p>
                      <div className="flex justify-center space-x-5">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className={`w-2 h-2 rounded-full transition-all duration-500 ${i <= 3 ? 'bg-blue-500 scale-110 shadow-lg shadow-blue-100' : 'bg-gray-200'}`}></div>
                        ))}
                      </div>
                    </div>
                    
                    <button className="group relative w-full bg-linear-to-l from-blue-800 to-blue-950 text-white py-3 rounded-lg font-black text-sm shadow-sm shadow-blue-100 hover:bg-blue-600 transition-all uppercase tracking-widest active:scale-95 overflow-hidden">
                      <span className="relative z-10">{t('payButton')}</span>
                      <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                    
                    <p className="text-center text-[10px] font-bold text-gray-700 flex items-center justify-center space-x-2">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                      <span>{t('securedBy')}</span>
                    </p>
                  </div>
                </div>

                {/* Success Overlay (Triggers on phone hover) */}
                <div className="absolute inset-0 bg-blue-700 z-50 flex flex-col items-center justify-center text-white p-8 translate-y-full group-hover/phone:translate-y-0 transition-transform duration-700 cursor-pointer">
                   <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-8 animate-bounce">
                      <svg className="w-10 h-10 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" />
                      </svg>
                   </div>
                   <h5 className="text-2xl font-black mb-2">{t('paymentVerified')}</h5>
                   <p className="text-center text-sm font-bold opacity-80 mb-10">{t('successDesc')}</p>
                   <div className="w-full bg-white/10 p-4 rounded-xl border border-gray-100 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-1">{t('receiptNumber')}</p>
                      <p className="text-lg font-black text-gray-900">RCP-9928172</p>
                   </div>
                   <p className="mt-auto text-[10px] font-bold opacity-50">{t('tapToGoBack')}</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-10 -right-10 bg-white p-3 rounded-2xl shadow-xl border border-blue-100 flex items-center space-x-4 animate-bounce duration-[4000ms]">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">{t('merchant')}</p>
                <p className="text-sm font-black text-olive">{t('verifiedStatus')}</p>
              </div>
            </div>

            <div className="absolute bottom-20 -left-3 bg-white p-3 rounded-xl shadow-xl border border-blue-100 flex items-center space-x-4 animate-pulse">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <span className="text-xl">⚡</span>
              </div>
              <div>
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-tighter leading-none mb-1">Speed</p>
                <p className="text-xs font-black text-blue-600">{t('stkPushSpeed')}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Payment;
