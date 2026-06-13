'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface SmartImageUploadProps {
  onImageChange: (imageData: string | null) => void;
  currentImage?: string | null;
  label?: string;
  className?: string;
}

const SmartImageUpload: React.FC<SmartImageUploadProps> = ({ 
  onImageChange, 
  currentImage, 
  label = "Product Photo",
  className = "" 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    setIsModalOpen(false);
  };

  const handleTrigger = () => {
    if (isMobile) {
      setIsModalOpen(true);
    } else {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="text-[10px] font-black text-slate-700 uppercase ml-1">{label}</label>
      
      {/* Hidden Inputs */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />
      <input 
        type="file" 
        ref={cameraInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        capture="environment" 
        className="hidden" 
      />

      <div 
        onClick={handleTrigger}
        className="aspect-square border-2 border-dashed border-blue-200 rounded-sm flex flex-col items-center justify-center bg-slate-50 hover:bg-white hover:border-blue-500 transition-all cursor-pointer group relative overflow-hidden"
      >
        {currentImage ? (
          <>
            <Image src={currentImage} alt="Preview" fill className="object-cover" />
            <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">Change</span>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <span className="text-3xl mb-2 block group-hover:scale-110 transition-transform">📸</span>
            <p className="text-[10px] font-black text-blue-950 uppercase">{label}</p>
            <p className="text-[8px] font-bold text-slate-500 mt-1 uppercase">
              {isMobile ? "Tap to take photo or upload" : "Click to upload"}
            </p>
          </div>
        )}
      </div>

      {/* Mobile Selection Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          />
          <div className="relative w-full sm:max-w-xs bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-full sm:zoom-in-95 duration-300 border border-blue-100">
            <div className="p-6 space-y-4">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">Select Image Source</p>
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">📁</div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-800 uppercase">Photo Library</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Select existing file</p>
                  </div>
                </button>
                <button 
                  onClick={() => cameraInputRef.current?.click()}
                  className="w-full flex items-center space-x-4 p-4 bg-slate-50 rounded-xl hover:bg-blue-50 transition-all border border-gray-100 group"
                >
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-xl shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">📷</div>
                  <div className="text-left">
                    <p className="text-xs font-black text-gray-800 uppercase">Take Photo</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase">Use device camera</p>
                  </div>
                </button>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors pt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartImageUpload;
