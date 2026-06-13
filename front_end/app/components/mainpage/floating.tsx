'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { api } from '@/lib/api';

interface Message {
  id: number;
  text: string;
  type: string;
  time: string;
}

const FloatingElements = () => {
  const t = useTranslations('FloatingElements');
  const [isVisible, setIsVisible] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: 'agent', text: t('agentMessage'), time: '9:41 AM' }
  ]);
  const [room, setRoom] = useState<any>(null);
  const ws = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      document.body.style.overflow = 'hidden';
      initChat();
    } else {
      document.body.style.overflow = 'unset';
      if (ws.current) ws.current.close();
    }
    return () => {
      document.body.style.overflow = 'unset';
      if (ws.current) ws.current.close();
    };
  }, [isChatOpen]);

  const initChat = async () => {
    try {
      // 1. Get or Create Room
      let activeRoom: any = null;
      const existingRooms = await api.get<any[]>('/chat/rooms/');
      
      if (existingRooms.length > 0) {
        activeRoom = existingRooms[0];
      } else {
        activeRoom = await api.post<any>('/chat/rooms/', {});
      }
      
      setRoom(activeRoom);
      if (activeRoom.messages && activeRoom.messages.length > 0) {
        setMessages(activeRoom.messages);
      }

      // 2. Connect WebSocket
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const host = window.location.hostname;
      const port = '8000';
      ws.current = new WebSocket(`${protocol}//${host}:${port}/ws/chat/${activeRoom.id}/`);

      ws.current.onmessage = (event) => {
        const incoming = JSON.parse(event.data);
        setMessages((prev) => {
            if (prev.find(m => m.id === incoming.id)) return prev;
            return [...prev, incoming];
        });
      };
    } catch (error) {
      console.error('Failed to initialize chat:', error);
    }
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSendMessage = () => {
    if (!message.trim() || !ws.current || !room) return;

    const payload = {
      text: message,
      sender_type: 'user',
      user_id: 1, // Dynamic in real app
    };

    ws.current.send(JSON.stringify(payload));
    setMessage('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <>
      {/* Global Floating Background Elements for 'Life' */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[15%] left-[5%] w-72 h-72 bg-blue-400/5 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[45%] right-[5%] w-96 h-96 bg-blue-600/5 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[15%] left-[20%] w-80 h-80 bg-blue-300/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Subtle Backdrop */}
      {isChatOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-90 transition-opacity duration-500 animate-in fade-in"
          onClick={() => setIsChatOpen(false)}
        />
      )}

      <div className="fixed bottom-1 right-3 z-100 flex flex-col space-y-2 items-end">
        {/* Chat Window */}
        {isChatOpen && (
          <div className="mb-2 w-[400px] max-w-[calc(100vw-2rem)] h-[600px] bg-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col animate-in slide-in-from-bottom-8 zoom-in-95 duration-500 border border-blue-100/50">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden">
               <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse" />
               <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-slate-200 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Header - Clean & Professional */}
            <div className="px-6 py-4 border-b border-blue-100 flex items-center justify-between bg-white/80 backdrop-blur-md z-10">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center border border-primary/10">
                    <span className="text-xl">💬</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></span>
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-slate-900">{t('supportTeam')}</h3>
                  <p className="text-[11px] text-slate-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                    {t('onlineStatus')}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-all hover:rotate-90 duration-300 text-slate-400"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="px-3 py-3 bg-slate-50/50 backdrop-blur-sm border-b border-blue-100 flex gap-2 overflow-x-auto no-scrollbar z-10">
              {[t('pricingInquiry'), t('requestDemo'), t('systemStatus')].map((tag) => (
                <button 
                  key={tag} 
                  onClick={() => {setMessage(tag); setTimeout(handleSendMessage, 100);}}
                  className="px-3 py-1.5 bg-white border border-blue-200 rounded-full text-xs font-medium text-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all whitespace-nowrap shadow-sm active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Message Thread */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/40 backdrop-blur-sm z-10 custom-scrollbar"
            >
              <div className="text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Today</span>
              </div>

              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start space-x-3 ${msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shadow-sm shrink-0 ${
                    msg.type === 'agent' ? 'bg-blue-100 text-blue-600' : 'bg-slate-800 text-blue-400'
                  }`}>
                    {msg.type === 'agent' ? 'DP' : 'JD'}
                  </div>
                  <div className={`space-y-1 max-w-[80%] ${msg.type === 'user' ? 'items-end flex flex-col' : ''}`}>
                    <div className={`px-4 py-3 rounded-2xl shadow-sm ${
                      msg.type === 'agent' 
                        ? 'bg-white border border-blue-100 rounded-tl-none text-slate-700' 
                        : 'bg-slate-800 rounded-tr-none text-blue-50'
                    }`}>
                      <p className="text-sm leading-relaxed">
                        {msg.text}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 px-1">
                      <span className="text-[10px] text-slate-400">{msg.time}</span>
                      {msg.type === 'user' && <span className="text-[10px] text-green-500 font-medium">Read</span>}
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3 animate-in fade-in duration-300">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-[10px] font-bold text-blue-600 shrink-0">
                    DP
                  </div>
                  <div className="bg-white border border-blue-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Professional Input */}
            <div className="p-4 bg-white border-t border-blue-100 z-10">
              <div className="relative group">
                <textarea 
                  rows={1}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('placeholder')} 
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-sm p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none placeholder:text-slate-400"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isTyping}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-lg transition-all ${
                    message.trim() && !isTyping ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-90' : 'text-slate-300 pointer-events-none'
                  }`}
                >
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="mt-3 flex items-center justify-center space-x-4">
                <button className="text-[12px] text-blue-600 font-medium hover:text-blue-700 transition-colors flex items-center group">
                  <svg className="w-3.5 h-3.5 mr-1.5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                  {t('attach')}
                </button>
                <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t('secureConnection')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Scroll to Top */}
        <button
          onClick={scrollToTop}
          className={`w-10 h-10 bg-white border border-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 hover:bg-blue-50 hover:-translate-y-1 active:scale-95 group ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 15l7-7 7 7" />
          </svg>
        </button>

        {/* Main Toggle Button */}
        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border-2 transition-all duration-500 hover:scale-110 active:scale-90 group relative overflow-hidden ${
            isChatOpen 
              ? 'bg-white border-blue-100 text-blue-600 rotate-90' 
              : 'bg-blue-600 border-blue-500 text-white'
          }`}
        >
          {/* Subtle Shine Effect */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
          
          {isChatOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
          {!isChatOpen && (
            <>
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
              <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white px-4 py-2.5 rounded-2xl shadow-2xl border border-blue-50 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all whitespace-nowrap pointer-events-none hidden md:block">
                <p className="text-xs font-bold text-slate-900">{t('chatPrompt')}</p>
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border-r border-t border-blue-50 rotate-45"></div>
              </div>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingElements;
