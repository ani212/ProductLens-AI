'use client';

import React, { useState } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import { Sliders, Award, Info } from 'lucide-react';

interface HeuristicsEvalProps {
  report: TeardownReport;
}

const DEFAULT_WEIGHTS = {
  userValue: 20,
  easeOfUse: 15,
  onboarding: 15,
  featureCompleteness: 15,
  differentiation: 15,
  sentiment: 10,
  pricing: 10,
};

export default function HeuristicsEval({ report }: HeuristicsEvalProps) {
  const { heuristics, products } = report;
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);

  if (!heuristics || heuristics.length === 0) return null;

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({ ...prev, [key]: value }));
  };

  // Calculate weighted overall score per product
  const calculateOverallScore = (productId: string) => {
    let totalWeight = 0;
    let weightedSum = 0;

    heuristics.forEach(h => {
      let weight = 10;
      const dim = h.dimension.toLowerCase();
      if (dim.includes('value')) weight = weights.userValue;
      else if (dim.includes('ease')) weight = weights.easeOfUse;
      else if (dim.includes('onboarding')) weight = weights.onboarding;
      else if (dim.includes('feature')) weight = weights.featureCompleteness;
      else if (dim.includes('differentiation')) weight = weights.differentiation;
      else if (dim.includes('sentiment')) weight = weights.sentiment;
      else if (dim.includes('pricing')) weight = weights.pricing;

      const score = h.scores?.[productId] || 7.5;
      weightedSum += score * weight;
      totalWeight += weight;
    });

    return totalWeight > 0 ? (weightedSum / totalWeight).toFixed(1) : '7.5';
  };

  return (
    <section id="heuristics" className="scroll-mt-32 space-y-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center font-bold text-xs">
          07
        </div>
        <h2 className="text-xl font-extrabold text-zinc-950 tracking-tight">UX Heuristic Evaluation & Custom Weight Scoring</h2>
      </div>

      <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {/* Top summary card: Overall Weighted Scores */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-500">Calculated Weighted Experience Score</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(p => {
              const score = calculateOverallScore(p.id);

              return (
                <div key={p.id} className="bg-zinc-50 p-4 rounded-2xl border border-zinc-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${p.logoBg || 'bg-zinc-900 text-white'}`}>
                      {p.logoText}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-950">{p.name}</h4>
                      <span className="text-[10px] text-zinc-400 font-medium">Weighted Score</span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-indigo-600">{score}<span className="text-xs text-zinc-400 font-normal">/10</span></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Weight Slider Controls */}
        <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-950">
              <Sliders size={14} className="text-indigo-600" />
              <span>Customize Scoring Weights</span>
            </div>
            <button
              onClick={() => setWeights(DEFAULT_WEIGHTS)}
              className="text-[11px] text-indigo-600 font-semibold hover:underline"
            >
              Reset Defaults
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-zinc-700 mb-1">
                <span>User Value</span>
                <span className="text-indigo-600 font-bold">{weights.userValue}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={weights.userValue}
                onChange={(e) => handleWeightChange('userValue', parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-zinc-700 mb-1">
                <span>Ease of Use</span>
                <span className="text-indigo-600 font-bold">{weights.easeOfUse}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={weights.easeOfUse}
                onChange={(e) => handleWeightChange('easeOfUse', parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-zinc-700 mb-1">
                <span>Onboarding</span>
                <span className="text-indigo-600 font-bold">{weights.onboarding}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={weights.onboarding}
                onChange={(e) => handleWeightChange('onboarding', parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] font-semibold text-zinc-700 mb-1">
                <span>Feature Completeness</span>
                <span className="text-indigo-600 font-bold">{weights.featureCompleteness}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={weights.featureCompleteness}
                onChange={(e) => handleWeightChange('featureCompleteness', parseInt(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Detailed Heuristics Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs min-w-[600px]">
            <thead>
              <tr className="border-b border-zinc-200 text-zinc-500 bg-zinc-50/50 font-bold uppercase tracking-wider text-[11px]">
                <th className="p-3 w-1/3">Heuristic Dimension</th>
                {products.map(p => (
                  <th key={p.id} className="p-3 text-center">{p.name} Score</th>
                ))}
                <th className="p-3">Analysis Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 font-medium text-zinc-700">
              {heuristics.map((h, idx) => (
                <tr key={idx} className="hover:bg-zinc-50/50">
                  <td className="p-3 font-bold text-zinc-900">{h.dimension}</td>
                  {products.map(p => {
                    const score = h.scores?.[p.id] || 7.5;
                    return (
                      <td key={p.id} className="p-3 text-center font-bold text-indigo-600 text-sm">
                        {score}
                      </td>
                    );
                  })}
                  <td className="p-3 text-zinc-500 font-normal leading-relaxed">{h.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
