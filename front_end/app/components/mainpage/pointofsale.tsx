'use client';

import { useTranslations } from 'next-intl';

const PointOfSale = () => {
  const t = useTranslations('PointOfSale');
  const posFeatures = [
    { title: t('feature1') },
    { title: t('feature2') },
    { title: t('feature3') },
    { title: t('feature4') },
    { title: t('feature5') },
    { title: t('feature6') }
  ];

  return (
    <section className="py-6 bg-white overflow-hidden">
      <div className="px-3 sm:px-4 lg:px-6">
        <div className="grid lg:grid-cols-2 gap-1 items-center">
          
          {/* Left Column: Text Content */}
          <div className="flex flex-col space-y-3">
            <div className="mb-7">
              <h2 className="text-blue-600 font-black text-xs uppercase tracking-widest mb-3">{t('sectionHeader')}</h2>
              <h3 className="text-2xl lg:text-3xl font-extrabold text-olive leading-tight mb-4">
                {t('titlePrefix')}<br />
                <span className="text-blue-500 text-2xl lg:text-3xl italic">{t('titleSuffix')}</span>
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </div>

            <div className="grid sm:grid-cols-1 gap-4">
              {posFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-4 group">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-olive group-hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-olive group-hover:text-blue-600 transition-colors">{feature.title}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: POS Mockup */}
          <div className="relative">
            <div className="bg-gray-900 rounded-3xl p-3 shadow-xl border border-blue-950">
              <div className="bg-gray-100 rounded-2xl overflow-hidden">
                {/* POS Header */}
                <div className="bg-linear-to-l from-blue-800 to-blue-950 px-6 py-3 flex justify-between items-center text-gray-900">
                  <span className="font-bold text-blue-100 text-sm">{t('posMockupTitle')}</span>
                  <div className="text-xs text-blue-200 font-medium opacity-80">{t('terminalInfo')}</div>
                </div>

                <div className="p-3 grid grid-cols-1 md:grid-cols-12 gap-3">
                  {/* Left: Product Selection */}
                  <div className="md:col-span-6 space-y-3">
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">🔍</span>
                      <input 
                        type="text" 
                        placeholder={t('searchPlaceholder')}
                        className="w-full bg-white border border-gray-200 rounded-md py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100"
                      />
                    </div>

                    <div className="flex space-x-1 overflow-x-auto pb-2 scrollbar-hide">
                      {[
                        { key: 'catAll', label: t('catAll') },
                        { key: 'catOralCare', label: t('catOralCare') },
                        { key: 'catDetergents', label: t('catDetergents') },
                        { key: 'catVouchers', label: t('catVouchers') },
                        { key: 'catFood', label: t('catFood') }
                      ].map((cat, i) => (
                        <button key={cat.key} className={`px-4 py-1.5 rounded-full text-[9px] font-bold whitespace-nowrap ${i === 0 ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 border border-gray-200'}`}>
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 gap-2 h-[380px] overflow-y-auto pr-1">
                      {[
                        { name: 'Colgate Total Toothpaste 150g', sku: 'ORAL-001', aisle: 'Aisle 3', price: '285', added: true },
                        { name: 'Safaricom Airtime 100', sku: 'AIR-100', aisle: 'Vouchers', price: '100', added: true },
                        { name: 'Ariel Washing Powder 500g', sku: 'WASH-033', aisle: 'Detergents', price: '320', added: true },
                        { name: 'Panadol Extra 20s', sku: 'MED-009', aisle: 'Pharmacy', price: '180' },
                        { name: 'Coca Cola 500ml', sku: 'BEV-044', aisle: 'Drinks', price: '70' },
                      ].map((prod) => (
                        <div key={prod.sku} className={`bg-white p-2 rounded-lg border transition-all cursor-pointer hover:shadow-md ${prod.added ? 'border-blue-200 bg-orange-50/30' : 'border-gray-100'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <h5 className="text-[11px] font-black text-olive">{prod.name}</h5>
                            {prod.added && <span className="text-blue-500 text-[10px] font-black">✓ {t('inCart')}</span>}
                          </div>
                          <p className="text-[9px] text-gray-500 font-bold mb-1">SKU: {prod.sku} · {prod.aisle}</p>
                          <div className="flex justify-between items-center">
                            <p className="text-sm font-black text-gray-800">KSh {prod.price}</p>
                            <div className="w-7 h-7 bg-olive rounded-sm flex items-center justify-center text-gray-100 text-lg font-bold shadow-sm">+</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Cart & Checkout */}
                  <div className="md:col-span-6 flex flex-col h-full bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                    <div className="p-3 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                      <h4 className="text-xs font-black text-gray-800 uppercase tracking-tight">{t('currentCart')}</h4>
                      <span className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-[10px] font-bold">{t('itemsCount', {count: 3})}</span>
                    </div>
                    
                    <div className="grow p-3 space-y-3 overflow-y-auto h-[220px]">
                      {[
                        { n: 'Colgate Total Toothpaste 150g', q: 2, p: 285, t: 570 },
                        { n: 'Safaricom Airtime 100', q: 1, p: 100, t: 100 },
                        { n: 'Ariel Washing Powder 500g', q: 1, p: 320, t: 320 },
                      ].map((item) => (
                        <div key={item.n} className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0">
                          <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-gray-800 max-w-[140px] leading-tight mb-1">{item.n}</span>
                            <span className="text-[10px] font-bold text-gray-400">× {item.q} units @ KSh {item.p}</span>
                          </div>
                          <span className="text-[11px] font-black text-olive">KSh {item.t}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-blue-50/50 border-t border-blue-100 space-y-2">
                      <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>{t('subtotal')}</span>
                        <span>KSh 990</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-blue-600">
                        <span>{t('discount')} (5%)</span>
                        <span>−KSh 49.50</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-gray-500">
                        <span>{t('tax')}</span>
                        <span>KSh 150.48</span>
                      </div>
                      <div className="flex justify-between items-center pt-1 border-t border-blue-200">
                        <span className="text-[10px] font-black text-gray-800">{t('total')}</span>
                        <span className="text-md font-black text-olive">KSh 1,090.98</span>
                      </div>
                      
                      <div className="pt-2 grid grid-cols-2 gap-2">
                        <button className="bg-blue-600 text-white py-2 rounded-sm text-[10px] font-black hover:bg-blue-700 transition-all flex items-center justify-center shadow-sm">
                          📱 {t('mpesa')}
                        </button>
                        <button className="bg-slate-800 text-white py-2 rounded-sm text-[10px] font-black hover:bg-slate-700 transition-all flex items-center justify-center shadow-sm">
                          💵 {t('cash')}
                        </button>
                        <button className="bg-blue-600 text-white py-2 rounded-sm text-[10px] font-black hover:bg-blue-700 transition-all flex items-center justify-center shadow-sm">
                          💳 {t('card')}
                        </button>
                        <button className="bg-blue-800 text-white py-2 rounded-sm text-[10px] font-black hover:bg-blue-900 transition-all flex items-center justify-center shadow-sm">
                          🏦 {t('bankTransfer')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Element: Speed Badge */}
            <div className="absolute -top-6 -right-6 bg-white p-3 rounded-lg shadow-sm border border-blue-100 animate-bounce duration-5000">
              <div className="text-center">
                <p className="text-[10px] font-black text-blue-500 uppercase tracking-tighter">{t('scanToReceipt')}</p>
                <p className="text-[17px] font-black text-olive">&lt; 2s</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PointOfSale;
