'use client';

import React from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { DollarSign, CheckCircle2, Zap, AlertCircle } from 'lucide-react';

interface PricingComparisonProps {
  report: TeardownReport;
}

export default function PricingComparison({ report }: PricingComparisonProps) {
  const { pricing, products } = report;
  if (!pricing || pricing.length === 0) return null;

  return (
    <section id="pricing" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
          08
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">Pricing Strategy & Tier Breakdown</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pricing.map((tier, idx) => (
          <div key={idx} className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-5 flex flex-col justify-between">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
                <h3 className="text-sm font-bold text-zinc-950">{tier.planName}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Plan Tier
                </span>
              </div>

              {/* Price comparison per product */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Pricing Comparison</span>
                <div className="space-y-1.5">
                  {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                      <span className="font-semibold text-zinc-800 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${p.logoBg || 'bg-zinc-900'}`} />
                        {p.name}
                      </span>
                      <span className="font-bold text-emerald-600">{tier.price?.[p.id] || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Restrictions */}
              {tier.restrictions && Object.keys(tier.restrictions).length > 0 && (
                <div className="space-y-1.5 text-xs pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">Feature Limits / Restrictions</span>
                  <div className="space-y-1 text-zinc-600">
                    {products.map(p => {
                      const rest = tier.restrictions?.[p.id];
                      if (!rest) return null;
                      return (
                        <div key={p.id} className="text-[11px]">
                          <strong className="text-zinc-800">{p.name}:</strong> {rest}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Upgrade Triggers */}
            {tier.upgradeTriggers && tier.upgradeTriggers.length > 0 && (
              <div className="pt-3 border-t border-zinc-100 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1">
                  <Zap size={11} /> Upgrade Triggers
                </span>
                <p className="text-zinc-600 text-[11px] font-medium leading-relaxed">
                  {tier.upgradeTriggers.join(', ')}
                </p>
              </div>
            )}

          </div>
        ))}
      </div>
    </section>
  );
}
