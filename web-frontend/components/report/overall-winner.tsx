'use client';

import React from 'react';
import { CrossProductAnalysis, ProductInfo } from '@/lib/types';
import { Trophy, ArrowRight } from 'lucide-react';

interface OverallWinnerProps {
  crossAnalysis: CrossProductAnalysis;
  products: ProductInfo[];
}

export default function OverallWinner({ crossAnalysis, products }: OverallWinnerProps) {
  const winner = products.find(p => p.id === crossAnalysis.overallWinner.productId);
  
  if (!winner) return null;

  return (
    <section id="overall-winner" className="scroll-mt-32 space-y-6 print:break-inside-avoid">
      <div className="flex items-center gap-2 mb-2">
        <Trophy size={20} className="text-amber-500" />
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Overall Recommendation</h2>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 shadow-sm">
        <div className="absolute top-0 left-0 w-2 h-full bg-amber-400" />
        
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-2xl shrink-0 shadow-sm ${winner.logoBg || 'bg-zinc-900 text-white'}`}>
              {winner.logoText}
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-zinc-900">{winner.name}</h3>
                <div className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  Top Choice
                </div>
              </div>
              <p className="text-sm text-zinc-500 font-medium">
                Score: {crossAnalysis.overallWinner.score}/10
              </p>
            </div>
          </div>

          <div className="flex-1 max-w-lg bg-white p-4 rounded-xl border border-zinc-100 shadow-sm text-sm text-zinc-700 font-medium leading-relaxed">
            "{crossAnalysis.overallWinner.reason}"
          </div>
        </div>
      </div>
    </section>
  );
}
