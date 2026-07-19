'use client';

import React from 'react';
import { ProductInfo } from '@/lib/mock-data';
import { Check, ArrowLeft, Globe } from 'lucide-react';

interface ProductResolverProps {
  products: ProductInfo[];
  onConfirm: () => void;
  onCancel: () => void;
  isLoading: boolean;
}

export default function ProductResolver({ products, onConfirm, onCancel, isLoading }: ProductResolverProps) {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full space-y-8 z-10 text-center">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">
            Confirm Product Profiles
          </h2>
          <p className="text-zinc-555 max-w-xl mx-auto text-xs font-normal leading-relaxed">
            Verify the resolved entities and domains below are the intended products before starting the AI competitive research scans.
          </p>
        </div>

        {/* Resolved product cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 text-left">
          {isLoading ? (
            // Skeleton Loader
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-light p-5 rounded-2xl animate-pulse space-y-4 border border-zinc-200/50 bg-white/60">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-zinc-200 rounded w-2/3"></div>
                    <div className="h-2.5 bg-zinc-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="h-2.5 bg-zinc-200 rounded"></div>
                  <div className="h-2.5 bg-zinc-200 rounded w-5/6"></div>
                </div>
              </div>
            ))
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="glass-light p-5 rounded-2xl relative border border-zinc-200/60 bg-white/80 hover:border-zinc-400 transition group flex flex-col justify-between"
              >
                <div>
                  {/* Top segment */}
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 shadow-sm ${product.logoBg || 'bg-zinc-800 text-white'}`}>
                      {product.logoText}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-zinc-900 truncate">{product.name}</h3>
                      <p className="text-xs text-purple-650 font-bold uppercase tracking-wider mt-0.5 truncate">{product.category}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-zinc-500 font-normal mt-4 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Bottom link metadata */}
                <div className="mt-4 pt-3 border-t border-zinc-100 flex flex-col gap-1 text-xs text-zinc-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <Globe size={11} className="text-zinc-500 shrink-0" />
                    <a
                      href={product.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline hover:text-purple-600 truncate font-normal"
                    >
                      {product.website.replace('https://', '')}
                    </a>
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-zinc-500">Org:</span> {product.companyName}
                  </div>
                </div>

                {/* Verification indicator check */}
                <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Check size={9} strokeWidth={3} />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 rounded-xl border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center justify-center gap-1.5"
          >
            <ArrowLeft size={13} />
            <span>Edit Input</span>
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading || products.length === 0}
            className="px-8 py-3 rounded-xl bg-zinc-950 hover:bg-zinc-850 text-white font-semibold text-xs uppercase tracking-wider transition shadow-sm flex items-center justify-center gap-1.5 active:scale-98"
          >
            <Check size={13} />
            <span>Confirm & Start Research</span>
          </button>
        </div>
      </div>
    </div>
  );
}
