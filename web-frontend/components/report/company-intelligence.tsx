'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { Building2, Users, Rocket, Globe } from 'lucide-react';

interface CompanyIntelligenceProps {
  productResearch: Record<string, ProductResearch>;
}

export default function CompanyIntelligence({ productResearch }: CompanyIntelligenceProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="company-intelligence" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Company Intelligence</h2>
        <p className="text-sm text-zinc-500">Corporate metrics, growth signals, and hiring trends.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => {
          const company = productResearch[product.id].companyIntel;
          if (!company) return null;

          return (
            <div key={product.id} className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="bg-zinc-50 border-b border-zinc-200 p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <h3 className="font-bold text-zinc-900">{product.companyName}</h3>
              </div>

              <div className="p-5 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      <Users size={12} /> Size
                    </span>
                    <p className="text-sm font-semibold text-zinc-800">{company.size}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      <Globe size={12} /> HQ
                    </span>
                    <p className="text-sm font-semibold text-zinc-800">{company.headquarters}</p>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    <Rocket size={12} /> Growth Signals
                  </span>
                  <ul className="space-y-1.5">
                    {company.growthSignals.length > 0 ? company.growthSignals.map((signal, idx) => (
                      <li key={idx} className="text-xs text-zinc-700 flex items-start gap-2">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{signal}</span>
                      </li>
                    )) : (
                      <li className="text-xs text-zinc-500 italic">No significant signals detected.</li>
                    )}
                  </ul>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-100">
                  <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    <Building2 size={12} /> Hiring Trends
                  </span>
                  <p className="text-xs text-zinc-700 leading-relaxed">
                    {company.hiringTrends}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
