'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const Newsletter = () => {
  const t = useTranslations('Newsletter');
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    try {
      const response = await fetch('http://localhost:8000/api/notifications/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage(t('success'));
        setEmail('');
        // Redirect to the success page
        router.push('/subscribed');
      } else {
        setStatus('error');
        setMessage(data.email ? data.email[0] : 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setMessage('Could not connect to the server. Please check your internet.');
    }
  };

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="bg-blue-50/60 rounded-lg p-6 md:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 border border-blue-100 relative overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -translate-y-12 translate-x-12"></div>
          
          <div className="relative z-10 max-w-xl">
            <h3 className="text-xl md:text-2xl font-black text-olive mb-2">
              {t('title')}
            </h3>
            <p className="text-gray-600 text-xs font-medium leading-relaxed">
              {t('subtitle')}
            </p>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')} 
                disabled={status === 'loading' || status === 'success'}
                className="grow bg-white border border-blue-200 rounded-sm px-6 py-4 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-olive shadow-sm disabled:opacity-50"
                required
              />
              <button 
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="bg-olive text-gray-100 px-8 py-4 rounded-sm font-black text-sm hover:bg-olive transition-all shadow-lg active:scale-95 whitespace-nowrap disabled:opacity-50"
              >
                {status === 'loading' ? t('subscribing') : t('subscribe')}
              </button>
            </form>
            {message && (
              <p className={`mt-3 text-[10px] font-black uppercase tracking-widest text-center sm:text-left ${
                status === 'success' ? 'text-blue-600' : 'text-red-500'
              }`}>
                {message}
              </p>
            )}
            <p className="mt-2 text-[10px] font-bold text-gray-400 text-center sm:text-left">
              {t('spamNote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
