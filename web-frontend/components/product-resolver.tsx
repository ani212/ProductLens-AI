'use client';

import React from 'react';
import { ProductInfo } from '@/lib/types';
import { Check, ArrowLeft, Globe, Play } from 'lucide-react';

interface ProductResolverProps {
  products: ProductInfo[];
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function ProductResolver({ products, onConfirm, onCancel, isLoading }: ProductResolverProps) {
  // Determine grid columns based on count
  const gridCols = products.length === 1 ? 'max-w-md mx-auto grid-cols-1' : 
                   products.length === 2 ? 'max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2' : 
                   'max-w-5xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full space-y-10 z-10 text-center">
        
        <div className="space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Confirm Product Profiles
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto text-sm font-normal leading-relaxed">
            Verify the resolved entities and domains below are the intended products before starting the AI competitive research pipeline.
          </p>
        </div>

        {/* Resolved product cards grid */}
        <div className={`grid gap-6 text-left ${gridCols}`}>
          {isLoading ? (
            // Skeleton Loader
            Array.from({ length: Math.max(3, products.length) }).map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl animate-pulse space-y-4 border border-zinc-200 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-200"></div>
                  <div className="flex-1 space-y-2.5">
                    <div className="h-4 bg-zinc-200 rounded w-2/3"></div>
                    <div className="h-3 bg-zinc-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2.5 pt-4">
                  <div className="h-3 bg-zinc-200 rounded"></div>
                  <div className="h-3 bg-zinc-200 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-6 rounded-2xl relative border border-zinc-200 hover:border-indigo-300 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 shadow-sm ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                      {product.logoText}
                    </div>
                    <div className="min-w-0 flex-1 pr-4">
                      <h3 className="text-base font-bold text-zinc-900 truncate">{product.name}</h3>
                      <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-wider mt-1 truncate">{product.category}</p>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 font-normal mt-5 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col gap-2 text-xs text-zinc-500">
                  <div className="flex items-center gap-2 truncate">
                    <Globe size={13} className="text-zinc-400 shrink-0" />
                    <a
                      href={product.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-indigo-600 truncate font-medium text-zinc-700"
                    >
                      {product.website.replace('https://', '').replace('http://', '')}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-zinc-400 shrink-0 uppercase tracking-wider font-bold text-[9px]">ORG</span>
                    <span className="truncate font-medium text-zinc-700">{product.companyName}</span>
                  </div>
                </div>

                {/* Verification check */}
                <div className="absolute top-4 right-4 w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                  <Check size={12} strokeWidth={3} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-zinc-600 bg-white border border-zinc-200 hover:bg-zinc-50 transition shadow-sm disabled:opacity-50"
          >
            <ArrowLeft size={16} />
            Modify Selection
          </button>
          
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 px-8 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-sm font-semibold transition shadow-md disabled:opacity-50"
          >
            <Play size={15} className="fill-current" />
            {isLoading ? 'Resolving...' : 'Begin Research Pipeline'}
          </button>
        </div>

      </div>
    </div>
  );
}
