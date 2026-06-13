'use client';

import React from 'react';

interface Product {
  id: number;
  name: string;
  sku: string;
  barcode: string;
  price: number;
  stock: number;
  category: string;
  location?: string;
  icon: string;
  color: string;
  image: string;
  description?: string;
}

interface ProductDetailsModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-blue-950/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex flex-col">
          {/* Header */}
          <div className="relative h-48 bg-gray-100">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-800 shadow-md transition-all"
            >
              ✕
            </button>
            <div className="absolute top-4 left-4">
               <span className="bg-blue-600 text-white text-[10px] font-black uppercase px-2 py-1 rounded-sm shadow-lg">
                 {product.category}
               </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{product.sku}</p>
              <h3 className="text-xl font-black text-blue-950 uppercase leading-tight">{product.name}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Selling Price</p>
                <p className="text-2xl font-black text-blue-900">KSh {product.price.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Availability</p>
                <div className="flex items-center justify-end space-x-2">
                   <span className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                   <p className={`text-sm font-black uppercase ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                     {product.stock} Units In Stock
                   </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] font-black text-slate-400 uppercase">Barcode Information</p>
              <div className="bg-slate-50 p-3 rounded-sm border border-slate-200 flex items-center justify-between">
                 <span className="text-sm font-mono font-bold text-slate-600">{product.barcode}</span>
                 <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-sm uppercase">Verified</span>
              </div>
            </div>

            {product.location && (
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase">Storage Location</p>
                <p className="text-sm font-bold text-slate-700">{product.location}</p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 rounded-sm border border-slate-200 text-[10px] font-black uppercase text-slate-500 hover:bg-white transition-all"
            >
              Dismiss
            </button>
            <button 
              onClick={() => {
                onAddToCart(product);
                onClose();
              }}
              disabled={product.stock <= 0}
              className={`flex-[2] py-3 rounded-sm font-black text-[10px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                product.stock <= 0 
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'
              }`}
            >
              Add to Current Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
