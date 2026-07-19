'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { DollarSign, Check } from 'lucide-react';

interface PricingComparisonProps {
  productResearch: Record<string, ProductResearch>;
}

export default function PricingComparison({ productResearch }: PricingComparisonProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="pricing-comparison" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Pricing & Tiers</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {products.map(product => {
          const pricing = productResearch[product.id].pricing;
          if (!pricing || !pricing.plans || pricing.plans.length === 0) return null;

          return (
            <div key={product.id} className="border border-zinc-200 bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
              
              {/* Header */}
              <div className="bg-zinc-50 border-b border-zinc-200 p-4 flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 leading-none">{product.name}</h3>
                  <p className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider mt-1">Pricing Model</p>
                </div>
                {pricing.freeTrialAvailable && (
                  <div className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700">
                    Free Trial
                  </div>
                )}
              </div>

              {/* Plans */}
              <div className="p-4 flex-1 flex flex-col gap-4">
                {pricing.plans.map((plan, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-start gap-4 p-4 rounded-xl border border-zinc-100 bg-zinc-50/50">
                    <div className="sm:w-1/3 shrink-0">
                      <h4 className="font-bold text-zinc-900">{plan.name}</h4>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-xl font-extrabold text-indigo-600">{plan.price}</span>
                      </div>
                      {plan.limits && (
                        <p className="text-xs text-zinc-500 mt-2 leading-relaxed">
                          {plan.limits}
                        </p>
                      )}
                    </div>
                    
                    <div className="sm:w-2/3 border-t sm:border-t-0 sm:border-l border-zinc-200 pt-4 sm:pt-0 sm:pl-4">
                      <ul className="space-y-2">
                        {plan.features.slice(0, 4).map((f, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-zinc-700">
                            <Check size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Enterprise Note */}
              {pricing.enterprisePricing && (
                <div className="bg-zinc-900 text-zinc-300 text-xs p-4 text-center">
                  <span className="font-semibold text-white">Enterprise:</span> {pricing.enterprisePricing}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
