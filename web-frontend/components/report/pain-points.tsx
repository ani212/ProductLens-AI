'use client';

import React from 'react';
import { ProductResearch } from '@/lib/types';
import { AlertCircle, AlertTriangle, AlertOctagon } from 'lucide-react';

interface PainPointsProps {
  productResearch: Record<string, ProductResearch>;
}

export default function PainPoints({ productResearch }: PainPointsProps) {
  const products = Object.values(productResearch).map(pr => pr.product);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-zinc-100 text-zinc-800 border-zinc-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'Critical': return <AlertOctagon size={12} />;
      case 'High': return <AlertTriangle size={12} />;
      default: return <AlertCircle size={12} />;
    }
  };

  return (
    <section id="pain-points" className="scroll-mt-32 space-y-8 print:break-inside-avoid">
      <div className="space-y-2">
        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Key Pain Points</h2>
        <p className="text-sm text-zinc-500">Evidence-backed issues causing friction or churn.</p>
      </div>

      <div className="space-y-8">
        {products.map(product => {
          const points = productResearch[product.id].painPoints;
          if (!points || points.length === 0) return null;

          return (
            <div key={product.id} className="space-y-4">
              
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[9px] ${product.logoBg || 'bg-zinc-900 text-white'}`}>
                  {product.logoText}
                </div>
                <h3 className="font-bold text-zinc-900">{product.name}</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {points.slice(0, 4).map((point, idx) => (
                  <div key={idx} className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm space-y-3">
                    
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-bold text-zinc-900 leading-snug">{point.title}</h4>
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border shrink-0 ${getSeverityColor(point.severity)}`}>
                        {getSeverityIcon(point.severity)}
                        {point.severity}
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 leading-relaxed">
                      {point.description}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-zinc-100">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        {point.frequency} • {point.affectedSegment}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-medium">
                        {point.evidenceCount} sources
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
