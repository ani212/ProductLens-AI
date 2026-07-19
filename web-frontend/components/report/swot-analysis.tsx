'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { ShieldCheck, AlertTriangle, TrendingUp, Zap } from 'lucide-react';

interface SwotAnalysisProps {
  productResearch: Record<string, ProductResearch>;
}

export default function SwotAnalysis({ productResearch }: SwotAnalysisProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="swot-analysis" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">SWOT Analysis</h2>
        <p className="text-sm text-zinc-500">Strengths, Weaknesses, Opportunities, and Threats mapped for each product.</p>
      </div>

      <div className="space-y-12">
        {products.map(product => {
          const swot = productResearch[product.id].swot;
          if (!swot) return null;

          return (
            <div key={product.id} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <h3 className="text-xl font-bold text-zinc-900">{product.name}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="bg-white border border-emerald-100 rounded-xl p-5 shadow-sm space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                    <ShieldCheck size={14} /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {swot.strengths.slice(0,3).map((item, idx) => (
                      <li key={idx} className="text-sm text-zinc-700">
                        <span className="font-semibold text-zinc-900">{item.point}</span>
                        <span className="text-zinc-500 block text-xs mt-0.5">{item.evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="bg-white border border-rose-100 rounded-xl p-5 shadow-sm space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-700">
                    <AlertTriangle size={14} /> Weaknesses
                  </h4>
                  <ul className="space-y-2">
                    {swot.weaknesses.slice(0,3).map((item, idx) => (
                      <li key={idx} className="text-sm text-zinc-700">
                        <span className="font-semibold text-zinc-900">{item.point}</span>
                        <span className="text-zinc-500 block text-xs mt-0.5">{item.evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Opportunities */}
                <div className="bg-white border border-indigo-100 rounded-xl p-5 shadow-sm space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700">
                    <TrendingUp size={14} /> Opportunities
                  </h4>
                  <ul className="space-y-2">
                    {swot.opportunities.slice(0,3).map((item, idx) => (
                      <li key={idx} className="text-sm text-zinc-700">
                        <span className="font-semibold text-zinc-900">{item.point}</span>
                        <span className="text-zinc-500 block text-xs mt-0.5">{item.evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Threats */}
                <div className="bg-white border border-amber-100 rounded-xl p-5 shadow-sm space-y-3">
                  <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
                    <Zap size={14} /> Threats
                  </h4>
                  <ul className="space-y-2">
                    {swot.threats.slice(0,3).map((item, idx) => (
                      <li key={idx} className="text-sm text-zinc-700">
                        <span className="font-semibold text-zinc-900">{item.point}</span>
                        <span className="text-zinc-500 block text-xs mt-0.5">{item.evidence}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
