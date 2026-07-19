'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { Heart, Activity, Briefcase } from 'lucide-react';

interface EmployeeIntelligenceProps {
  productResearch: Record<string, ProductResearch>;
}

export default function EmployeeIntelligence({ productResearch }: EmployeeIntelligenceProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  return (
    <section id="employee-intelligence" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Employee Intelligence</h2>
        <p className="text-sm text-zinc-500">Internal culture and engineering velocity indicators.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map(product => {
          const emp = productResearch[product.id].employeeIntel;
          if (!emp) return null;

          return (
            <div key={product.id} className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm space-y-5">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
                <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <h3 className="font-bold text-zinc-900">{product.name}</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    <Activity size={12} /> Engineering Culture
                  </h4>
                  <p className="text-xs text-zinc-700 leading-relaxed">{emp.engineeringCulture}</p>
                </div>
                
                <div>
                  <h4 className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">
                    <Briefcase size={12} /> Product Culture
                  </h4>
                  <p className="text-xs text-zinc-700 leading-relaxed">{emp.productCulture}</p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100">
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <span className="block text-[10px] font-bold uppercase text-emerald-700 mb-1">Pros</span>
                    <ul className="space-y-1">
                      {emp.pros.slice(0, 2).map((p, i) => <li key={i} className="text-[10px] text-emerald-900 leading-snug">• {p}</li>)}
                    </ul>
                  </div>
                  <div className="bg-rose-50 rounded-lg p-3">
                    <span className="block text-[10px] font-bold uppercase text-rose-700 mb-1">Cons</span>
                    <ul className="space-y-1">
                      {emp.cons.slice(0, 2).map((c, i) => <li key={i} className="text-[10px] text-rose-900 leading-snug">• {c}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
