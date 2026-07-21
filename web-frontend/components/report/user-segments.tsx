'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Users, DollarSign, Check, X } from 'lucide-react';

interface UserSegmentsProps {
  report: TeardownReport;
}

export default function UserSegments({ report }: UserSegmentsProps) {
  const { segments, products } = report;
  if (!segments || segments.length === 0) return null;

  return (
    <section id="user-segments" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
          03
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Target User Segments & Product Fit</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {segments.map((seg, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-bold text-zinc-950">{seg.name}</h3>
                {seg.willingnessToPay && (
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    seg.willingnessToPay === 'High' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    seg.willingnessToPay === 'Medium' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-zinc-100 text-zinc-600'
                  }`}>
                    WTP: {seg.willingnessToPay}
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 font-medium leading-relaxed bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                <strong className="text-zinc-800">Primary Need:</strong> {seg.mainNeed}
              </p>
            </div>

            {/* Product Fit Scores */}
            <div className="space-y-2 pt-3 border-t border-zinc-100">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Product Fit Score (/10)</span>
              <div className="space-y-2">
                {products.map(p => {
                  const score = seg.productFit?.[p.id] || 7;
                  const percent = Math.min(100, Math.max(10, score * 10));

                  return (
                    <div key={p.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-zinc-800 flex items-center gap-1.5">
                          <span className={`w-2 h-2 rounded-full ${p.logoBg || 'bg-zinc-900'}`} />
                          {p.name}
                        </span>
                        <span className="text-indigo-600 font-bold">{score}/10</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
