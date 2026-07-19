'use client';

import React from 'react';
import { CrossProductAnalysis, ProductInfo } from '@/lib/types';
import { Check, X, Minus } from 'lucide-react';

interface FeatureComparisonProps {
  crossAnalysis: CrossProductAnalysis;
  products: ProductInfo[];
}

export default function FeatureComparison({ crossAnalysis, products }: FeatureComparisonProps) {
  if (!crossAnalysis.featureMatrix || crossAnalysis.featureMatrix.length === 0) return null;

  return (
    <section id="feature-comparison" className="scroll-mt-32 space-y-6 print:break-inside-avoid">
      <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Feature Matrix</h2>
      
      <div className="border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr>
                <th className="bg-zinc-50 p-4 border-b border-zinc-200 font-semibold text-xs uppercase tracking-wider text-zinc-500 w-1/3">
                  Capability
                </th>
                {products.map(p => (
                  <th key={p.id} className="bg-zinc-50 p-4 border-b border-zinc-200 text-center font-bold text-sm text-zinc-900">
                    <div className="flex flex-col items-center gap-1.5">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-[10px] ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                        {p.logoText}
                      </div>
                      {p.name}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {crossAnalysis.featureMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="p-4 text-sm font-medium text-zinc-800">
                    {row.capability}
                    {row.isCommon && (
                      <span className="ml-2 inline-block px-1.5 py-0.5 bg-zinc-100 text-zinc-500 rounded text-[10px] uppercase tracking-wide font-bold">
                        Standard
                      </span>
                    )}
                  </td>
                  
                  {products.map(p => {
                    const status = row.status[p.id];
                    let icon = null;
                    let colorClass = "text-zinc-500";
                    
                    if (status && status.toLowerCase().includes('full')) {
                      icon = <Check size={16} strokeWidth={3} />;
                      colorClass = "text-emerald-500 bg-emerald-50";
                    } else if (status && status.toLowerCase().includes('partial')) {
                      icon = <Minus size={16} strokeWidth={3} />;
                      colorClass = "text-amber-500 bg-amber-50";
                    } else if (!status || status.toLowerCase().includes('none')) {
                      icon = <X size={16} strokeWidth={3} />;
                      colorClass = "text-rose-400 bg-rose-50";
                    } else {
                      // Text fallback
                      icon = <span className="text-xs font-semibold">{status}</span>;
                      colorClass = "text-zinc-700 bg-zinc-100";
                    }

                    return (
                      <td key={p.id} className="p-4 text-center">
                        <div className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${colorClass}`}>
                          {icon}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center"><Check size={10} strokeWidth={3}/></div> Fully Supported</div>
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center"><Minus size={10} strokeWidth={3}/></div> Partially Supported</div>
        <div className="flex items-center gap-1.5"><div className="w-4 h-4 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center"><X size={10} strokeWidth={3}/></div> Not Supported</div>
      </div>
    </section>
  );
}
