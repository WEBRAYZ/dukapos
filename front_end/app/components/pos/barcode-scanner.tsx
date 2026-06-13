'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';

interface BarcodeScannerProps {
  onScan: (decodedText: string) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, onClose }) => {
  const [cameras, setCameras] = useState<any[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [isScanning, setIsScanning] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [scanFlash, setScanFlash] = useState(false);
  const [lastScannedText, setLastScannedText] = useState<string | null>(null);
  
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const lastScannedRef = useRef<string | null>(null);
  const onScanRef = useRef(onScan);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    Html5Qrcode.getCameras().then(devices => {
      if (devices && devices.length) {
        setCameras(devices);
        const backCamera = devices.find(d => d.label.toLowerCase().includes('back')) || devices[0];
        setSelectedCamera(backCamera.id);
      }
    }).catch(err => console.error("Error getting cameras", err));
  }, []);

  useEffect(() => {
    if (isScanning && selectedCamera) {
      const html5QrCode = new Html5Qrcode("reader-pos");
      scannerRef.current = html5QrCode;
      
      html5QrCode.start(
        selectedCamera,
        {
          fps: 20,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0
        },
        (decodedText) => {
          if (decodedText === lastScannedRef.current) return;
          
          setScanFlash(true);
          setTimeout(() => setScanFlash(false), 200);

          lastScannedRef.current = decodedText;
          setLastScannedText(decodedText);
          onScanRef.current(decodedText);

          setTimeout(() => {
            lastScannedRef.current = null;
            setLastScannedText(null);
          }, 1500);
        },
        () => {}
      ).catch(err => console.error("Unable to start scanning", err));
    }

    return () => {
      if (scannerRef.current) {
        if (scannerRef.current.isScanning) {
          scannerRef.current.stop().catch(err => console.error("Error stopping scanner", err));
        }
      }
    };
  }, [isScanning, selectedCamera]);

  return (
    <div className="w-full h-full flex flex-col p-2 md:p-4 space-y-4 overflow-hidden relative bg-slate-100 rounded-sm border border-blue-100 shadow-sm">
      <div className="absolute top-4 left-4 z-20 flex flex-col space-y-2">
        <div className="flex items-center space-x-2 bg-blue-50/80 backdrop-blur-md px-3 py-1.5 rounded-sm border border-blue-200 shadow-lg">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase text-slate-600">Scanner Active</span>
        </div>
        {lastScannedText && (
          <div className="bg-blue-600 text-white px-4 py-2 rounded-sm text-[11px] font-black uppercase animate-in slide-in-from-left duration-300 shadow-xl border border-blue-400">
            Detected: {lastScannedText}
          </div>
        )}
      </div>

      <div className="absolute top-4 right-4 z-20">
        <button 
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all active:scale-95 border border-blue-200 text-slate-600 shadow-lg font-bold"
        >
          ✕
        </button>
      </div>

      <div className="flex-1 bg-slate-900 border-[0.5rem] md:border-[1rem] rounded-xl border-blue-950 shadow-inner overflow-hidden relative group">
        <div id="reader-pos" className="w-full h-full object-cover"></div>
        
        {scanFlash && (
          <div className="absolute inset-0 bg-white/40 z-30 animate-pulse pointer-events-none" />
        )}
        
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="w-40 h-40 md:w-60 md:h-60 border-2 border-blue-500/40 rounded-sm relative">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 shadow-sm" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 shadow-sm" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 shadow-sm" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 shadow-sm" />
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-blue-400/50 animate-scan" />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 bg-white/95 backdrop-blur-xl p-2 rounded-sm border border-slate-200 shadow-2xl z-20 w-[95%] sm:w-auto">
          <div className="flex flex-col space-y-1 w-full sm:w-auto">
            <label className="text-[8px] font-black text-slate-400 uppercase">Camera</label>
            <select 
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              className="bg-white border border-blue-200 text-[9px] font-black uppercase px-2 py-1 rounded-sm outline-none focus:border-blue-500 transition-colors w-full min-w-[120px]"
            >
              {cameras.map(cam => <option key={cam.id} value={cam.id}>{cam.label}</option>)}
            </select>
          </div>
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-center">
            <button 
              onClick={() => setFlashOn(!flashOn)}
              className={`w-8 h-8 rounded flex items-center justify-center border transition-all ${flashOn ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
            >
              🔦
            </button>
            <button 
              onClick={() => setIsScanning(!isScanning)}
              className="flex-1 sm:flex-none px-3 py-1.5 bg-blue-900 text-white text-[9px] font-black uppercase tracking-widest rounded-sm hover:bg-blue-800 transition-all shadow-xl active:scale-95 whitespace-nowrap"
            >
              {isScanning ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BarcodeScanner;
