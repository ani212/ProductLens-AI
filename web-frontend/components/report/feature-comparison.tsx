'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Layers, Check, X, Minus, Sparkles } from 'lucide-react';

interface FeatureComparisonProps {
  report: TeardownReport;
}

export default function FeatureComparison({ report }: FeatureComparisonProps) {
  const { features, products } = report;
  if (!features || features.length === 0) return null;

  return (
    <section id="features" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
          05
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Feature Matrix & Capability Gaps</h2>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200 text-xs font-bold uppercase tracking-wider text-zinc-500">
                <th className="p-4 w-2/5">Capability & Description</th>
                {products.map(p => (
                  <th key={p.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <div className={`w-5 h-5 rounded flex items-center justify-center text-[10px] ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                        {p.logoText}
                      </div>
                      <span className="text-zinc-900 font-bold">{p.name}</span>
                    </div>
                  </th>
                ))}
                <th className="p-4 text-center w-28">Opportunity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-xs font-medium">
              {features.map((row, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50 transition">
                  
                  {/* Capability & Description */}
                  <td className="p-4 space-y-0.5">
                    <div className="font-bold text-zinc-900 text-sm">{row.capability}</div>
                    <p className="text-zinc-500 text-[11px] font-normal leading-relaxed">{row.description}</p>
                  </td>

                  {/* Per-product feature maturity */}
                  {products.map(p => {
                    const status = row.status?.[p.id] || 'No';
                    let icon = null;
                    let style = 'bg-zinc-100 text-zinc-500';

                    if (status.includes('Full') || status.includes('Advanced')) {
                      icon = <Check size={14} strokeWidth={3} />;
                      style = 'bg-emerald-50 text-emerald-600 border border-emerald-200';
                    } else if (status.includes('Partial') || status.includes('Basic')) {
                      icon = <Minus size={14} strokeWidth={3} />;
                      style = 'bg-amber-50 text-amber-600 border border-amber-200';
                    } else {
                      icon = <X size={14} strokeWidth={3} />;
                      style = 'bg-rose-50 text-rose-500 border border-rose-150';
                    }

                    return (
                      <td key={p.id} className="p-4 text-center">
                        <div className="flex flex-col items-center gap-1">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${style}`}>
                            {icon}
                          </div>
                          <span className="text-[10px] font-semibold text-zinc-500">{status}</span>
                        </div>
                      </td>
                    );
                  })}

                  {/* Opportunity Score */}
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.opportunityScore === 'High' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                      row.opportunityScore === 'Medium' ? 'bg-zinc-100 text-zinc-700 border border-zinc-200' :
                      'bg-zinc-50 text-zinc-400'
                    }`}>
                      {row.opportunityScore === 'High' && <Sparkles size={10} />}
                      {row.opportunityScore || 'Medium'}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
