'use client';

import React, { useState } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import {
  FileText,
  TrendingUp,
  AlertCircle,
  Link2,
  DollarSign,
  Compass,
  ArrowLeft,
  Download,
  Share2,
  Bookmark,
  CheckCircle,
  AlertTriangle,
  MinusCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

interface TeardownDashboardProps {
  report: TeardownReport;
  isMock: boolean;
  onBack: () => void;
  onChangePersona: (persona: string) => void;
}

type TabType = 'overview' | 'features' | 'journey' | 'pain-points' | 'opportunities' | 'sources';

export default function TeardownDashboard({ report, isMock, onBack, onChangePersona }: TeardownDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedProductSwot, setSelectedProductSwot] = useState<string>(report.products[0]?.id || '');
  const [isSaved, setIsSaved] = useState(false);
  const [weights, setWeights] = useState({
    userValue: 20,
    easeOfUse: 15,
    onboarding: 15,
    featureCompleteness: 15,
    differentiation: 15,
    sentiment: 10,
    pricing: 10
  });

  const getBaseScore = (productId: string, dimension: string): number => {
    const prefix = productId.toLowerCase();
    
    if (prefix.includes('notion')) {
      if (dimension === 'User Value') return 8.8;
      if (dimension === 'Ease of Use') return 8.0;
      if (dimension === 'Onboarding') return 7.8;
      if (dimension === 'Feature Completeness') return 8.5;
      if (dimension === 'Differentiation') return 9.0;
      if (dimension === 'Sentiment') return 8.2;
      return 8.2;
    }
    if (prefix.includes('clickup')) {
      if (dimension === 'User Value') return 8.0;
      if (dimension === 'Ease of Use') return 5.5;
      if (dimension === 'Onboarding') return 6.2;
      if (dimension === 'Feature Completeness') return 9.6;
      if (dimension === 'Differentiation') return 7.5;
      if (dimension === 'Sentiment') return 7.0;
      return 9.1;
    }
    if (prefix.includes('asana')) {
      if (dimension === 'User Value') return 8.2;
      if (dimension === 'Ease of Use') return 9.0;
      if (dimension === 'Onboarding') return 8.8;
      if (dimension === 'Feature Completeness') return 7.8;
      if (dimension === 'Differentiation') return 8.0;
      if (dimension === 'Sentiment') return 8.5;
      return 6.0;
    }
    if (prefix.includes('spotify')) {
      if (dimension === 'User Value') return 9.0;
      if (dimension === 'Ease of Use') return 9.2;
      if (dimension === 'Onboarding') return 9.0;
      if (dimension === 'Feature Completeness') return 8.8;
      if (dimension === 'Differentiation') return 9.5;
      if (dimension === 'Sentiment') return 9.0;
      return 8.0;
    }
    if (prefix.includes('apple')) {
      if (dimension === 'User Value') return 8.5;
      if (dimension === 'Ease of Use') return 7.8;
      if (dimension === 'Onboarding') return 7.0;
      if (dimension === 'Feature Completeness') return 8.5;
      if (dimension === 'Differentiation') return 8.0;
      if (dimension === 'Sentiment') return 8.2;
      return 8.2;
    }
    if (prefix.includes('youtube')) {
      if (dimension === 'User Value') return 8.2;
      if (dimension === 'Ease of Use') return 8.0;
      if (dimension === 'Onboarding') return 9.0;
      if (dimension === 'Feature Completeness') return 8.0;
      if (dimension === 'Differentiation') return 8.2;
      if (dimension === 'Sentiment') return 8.0;
      return 8.5;
    }
    if (prefix.includes('linear')) {
      if (dimension === 'User Value') return 9.5;
      if (dimension === 'Ease of Use') return 9.5;
      if (dimension === 'Onboarding') return 9.2;
      if (dimension === 'Feature Completeness') return 8.5;
      if (dimension === 'Differentiation') return 9.0;
      if (dimension === 'Sentiment') return 9.3;
      return 8.5;
    }
    if (prefix.includes('jira')) {
      if (dimension === 'User Value') return 8.0;
      if (dimension === 'Ease of Use') return 4.5;
      if (dimension === 'Onboarding') return 5.5;
      if (dimension === 'Feature Completeness') return 9.5;
      if (dimension === 'Differentiation') return 7.0;
      if (dimension === 'Sentiment') return 6.5;
      return 7.5;
    }

    let hash = 0;
    for (let i = 0; i < prefix.length; i++) {
      hash += prefix.charCodeAt(i);
    }
    const base = 6.5 + (hash % 25) / 10;
    if (dimension === 'User Value') return base;
    if (dimension === 'Ease of Use') return base - 0.5;
    if (dimension === 'Onboarding') return base + 0.2;
    if (dimension === 'Feature Completeness') return base - 0.3;
    if (dimension === 'Differentiation') return base + 0.4;
    if (dimension === 'Sentiment') return base - 0.1;
    return base - 0.4;
  };

  const calculateScore = (productId: string) => {
    const scoreMap = [
      { name: 'User Value', weight: weights.userValue },
      { name: 'Ease of Use', weight: weights.easeOfUse },
      { name: 'Onboarding', weight: weights.onboarding },
      { name: 'Feature Completeness', weight: weights.featureCompleteness },
      { name: 'Differentiation', weight: weights.differentiation },
      { name: 'Sentiment', weight: weights.sentiment },
      { name: 'Pricing', weight: weights.pricing }
    ];

    let totalWeight = scoreMap.reduce((sum, item) => sum + item.weight, 0);
    if (totalWeight === 0) return 0;

    let weightedSum = scoreMap.reduce((sum, item) => {
      const baseGrade = getBaseScore(productId, item.name);
      return sum + (baseGrade * item.weight);
    }, 0);

    return parseFloat((weightedSum / totalWeight).toFixed(1));
  };

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    try {
      const saved = localStorage.getItem('productlens_saved_reports');
      const list = saved ? JSON.parse(saved) : [];
      
      if (!list.some((r: any) => r.timestamp === report.timestamp && r.products.map((p: any) => p.name).join() === report.products.map((p: any) => p.name).join())) {
        list.push(report);
        localStorage.setItem('productlens_saved_reports', JSON.stringify(list));
      }
      setIsSaved(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportMarkdown = () => {
    const markdownContent = `
# ProductLens AI - Teardown Report
**Products Compared**: ${report.products.map(p => p.name).join(' vs ')}
**Target Persona**: ${report.persona}
**Objective**: ${report.objective}
**Date**: ${report.timestamp}

## Executive Summary
${report.executiveSummary.overview}

## Key Value Propositions
${report.products.map(p => `### ${p.name}\n- **Advantage**: ${report.executiveSummary.strongestAdvantage[p.id]}\n- **Weakness**: ${report.executiveSummary.biggestWeakness[p.id]}`).join('\n\n')}

## Actionable Recommendations
${report.recommendations.map((r, i) => `### ${i+1}. ${r.title}\n- **Problem**: ${r.problem}\n- **Solution**: ${r.proposedSolution}\n- **Expected Outcome**: ${r.expectedOutcome}\n- **Metric**: ${r.successMetric}\n- **Confidence**: ${r.confidence}%`).join('\n\n')}
    `;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `teardown_${report.products.map(p => p.id).join('_')}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Advanced':
        return <span className="px-2 py-0.5 rounded-lg bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold">Advanced</span>;
      case 'Full':
        return <span className="px-2 py-0.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold">Full</span>;
      case 'Partial':
        return <span className="px-2 py-0.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold">Partial</span>;
      case 'Basic':
        return <span className="px-2 py-0.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold">Basic</span>;
      case 'No':
      default:
        return <span className="px-2 py-0.5 rounded-lg bg-zinc-100 text-zinc-400 text-[10px] font-medium">No</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-200/60 pb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition shadow-sm"
          >
            <ArrowLeft size={15} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-950">
                {report.products.map(p => p.name).join(' vs ')}
              </h1>
              {isMock && (
                <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-[9px] font-bold uppercase tracking-wider">
                  Sandbox Fallback
                </span>
              )}
            </div>
            <p className="text-[10px] text-zinc-400 mt-0.5 font-light">
              Scanned on {report.timestamp} • Target: {report.persona}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleSave}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider border transition shadow-sm ${
              isSaved
                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
            }`}
          >
            <Bookmark size={13} />
            <span>{isSaved ? 'Saved' : 'Save'}</span>
          </button>
          
          <button
            onClick={handleExportMarkdown}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 transition shadow-sm"
          >
            <Download size={13} />
            <span>Export MD</span>
          </button>
          
          <button
            onClick={() => window.print()}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider bg-zinc-950 hover:bg-zinc-850 text-white transition shadow-sm active:scale-98"
          >
            <Share2 size={13} />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-light p-4 rounded-xl border border-zinc-200/60 shadow-sm space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Analysis Goal</span>
          <p className="text-xs text-zinc-800 font-semibold truncate">{report.objective || 'General Teardown & Capability Scan'}</p>
        </div>
        <div className="glass-light p-4 rounded-xl border border-zinc-200/60 shadow-sm space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Target Segment</span>
          <select
            value={report.persona}
            onChange={(e) => onChangePersona(e.target.value)}
            className="block w-full bg-transparent text-xs font-semibold text-zinc-800 focus:outline-none cursor-pointer border-none p-0 focus:ring-0"
          >
            <option value="Startup Product Teams">Startup Product Teams</option>
            <option value="Enterprise PMs & Execs">Enterprise PMs & Execs</option>
            <option value="Designers & UX Researchers">Designers & UX Researchers</option>
            <option value="Marketing & Positioning Leads">Marketing & Positioning Leads</option>
            <option value="Product Portfolio Candidates">PM Interview Candidates</option>
          </select>
        </div>
        <div className="glass-light p-4 rounded-xl border border-zinc-200/60 shadow-sm space-y-1">
          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400">Grounding Grade</span>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
            <ShieldCheck size={13} />
            <span>Grounded ({report.sources?.length || 0} Citations)</span>
          </div>
        </div>
      </div>

      {/* Tabs list */}
      <div className="flex items-center bg-zinc-100/80 border border-zinc-200/60 p-1 rounded-xl overflow-x-auto scrollbar">
        {[
          { id: 'overview', label: 'Executive Summary', icon: <FileText size={13} /> },
          { id: 'features', label: 'Feature Matrix', icon: <Compass size={13} /> },
          { id: 'journey', label: 'User Journeys', icon: <TrendingUp size={13} /> },
          { id: 'pain-points', label: 'Pain Points', icon: <AlertCircle size={13} /> },
          { id: 'opportunities', label: 'Opportunity Map', icon: <DollarSign size={13} /> },
          { id: 'sources', label: 'Evidence Sources', icon: <Link2 size={13} /> },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as TabType)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/30'
                : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TABS CONTAINER */}
      <div className="min-h-[45vh]">
        
        {/* T1: EXECUTIVE SUMMARY */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Summary */}
              <div className="md:col-span-2 glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-zinc-950 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
                  <FileText size={16} className="text-purple-650" />
                  Product Teardown Summary
                </h2>
                <p className="text-zinc-600 text-xs leading-relaxed font-light">
                  {report.executiveSummary.overview}
                </p>
                <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-750 font-light leading-relaxed">
                  <span className="font-bold text-purple-900 block mb-0.5">Core Strategic Recommendation:</span> 
                  {report.executiveSummary.topOpportunity}
                </div>
              </div>

              {/* Competitive positioning */}
              <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4">
                <h2 className="text-base font-bold text-zinc-950 flex items-center gap-1.5 border-b border-zinc-100 pb-2">
                  <TrendingUp size={16} className="text-indigo-650" />
                  Positioning Analysis
                </h2>
                <p className="text-zinc-500 text-[11px] leading-relaxed font-light">
                  {report.executiveSummary.competitivePosition}
                </p>
                
                <div className="space-y-2 pt-2 text-xs">
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Key Advantages</span>
                  {report.products.map(p => (
                    <div key={p.id} className="text-[11px]">
                      <span className="font-semibold text-zinc-800">{p.name}:</span>
                      <p className="text-zinc-500 mt-0.5 pl-2 border-l border-zinc-200 font-light leading-relaxed">{report.executiveSummary.strongestAdvantage[p.id]}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Jobs to be Done (JTBD) */}
            <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Jobs to Be Done (JTBD) Matrix</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {report.jtbd?.map((jobItem, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-zinc-50/50 border border-zinc-200/40 space-y-3">
                    <div className="space-y-0.5">
                      <span className="text-[9px] text-purple-650 font-bold uppercase tracking-wider">Job Segment #{idx+1}</span>
                      <h4 className="text-xs font-bold text-zinc-900 leading-normal">&ldquo;{jobItem.job}&rdquo;</h4>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-[10px] pt-1">
                      <div>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase block mb-1">Functional</span>
                        <ul className="space-y-1 list-disc list-inside text-zinc-500 font-light">
                          {jobItem.functional.map((f, i) => <li key={i} className="truncate">{f}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase block mb-1">Emotional</span>
                        <ul className="space-y-1 list-disc list-inside text-zinc-500 font-light">
                          {jobItem.emotional.map((e, i) => <li key={i} className="truncate">{e}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[9px] text-zinc-400 font-bold uppercase block mb-1">Alternatives</span>
                        <ul className="space-y-1 list-disc list-inside text-zinc-500 font-light">
                          {jobItem.alternatives.map((a, i) => <li key={i} className="truncate">{a}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>            {/* SWOT & Scoring Weighting Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* SWOT panels */}
              <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b border-zinc-150 pb-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">SWOT Profiles</h3>
                  <div className="flex gap-0.5 bg-zinc-100 p-0.5 rounded-lg border border-zinc-200/40">
                    {report.products.map(p => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProductSwot(p.id)}
                        className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider transition ${
                          selectedProductSwot === p.id
                            ? 'bg-white text-zinc-950 shadow-sm border border-zinc-200/25'
                            : 'text-zinc-500 hover:text-zinc-800'
                        }`}
                      >
                        {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                {report.swot[selectedProductSwot] && (
                  <div className="grid grid-cols-2 gap-4 text-[10px]">
                    {/* Strengths */}
                    <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
                      <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle size={10} />
                        Strengths
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-zinc-600 font-light leading-relaxed">
                        {report.swot[selectedProductSwot].strengths.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                    </div>

                    {/* Weaknesses */}
                    <div className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1.5">
                      <span className="text-[9px] font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1">
                        <AlertTriangle size={10} />
                        Weaknesses
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-zinc-600 font-light leading-relaxed">
                        {report.swot[selectedProductSwot].weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                      </ul>
                    </div>

                    {/* Opportunities */}
                    <div className="p-3.5 rounded-xl bg-cyan-50/50 border border-cyan-100 space-y-1.5">
                      <span className="text-[9px] font-bold text-cyan-700 uppercase tracking-wider flex items-center gap-1">
                        <TrendingUp size={10} />
                        Opportunities
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-zinc-600 font-light leading-relaxed">
                        {report.swot[selectedProductSwot].opportunities.map((o, i) => <li key={i}>{o}</li>)}
                      </ul>
                    </div>

                    {/* Threats */}
                    <div className="p-3.5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-1.5">
                      <span className="text-[9px] font-bold text-amber-700 uppercase tracking-wider flex items-center gap-1">
                        <MinusCircle size={10} />
                        Threats
                      </span>
                      <ul className="space-y-1 list-disc list-inside text-zinc-600 font-light leading-relaxed">
                        {report.swot[selectedProductSwot].threats.map((t, i) => <li key={i}>{t}</li>)}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Scoring weight framework */}
              <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4">
                <div className="border-b border-zinc-150 pb-2">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Weighted Product Experience Score</h3>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">Customize score weightings dynamically to match your product priorities.</p>
                </div>

                {/* Score visualization bars */}
                <div className="space-y-3 pt-2">
                  {report.products.map(p => {
                    const finalScore = calculateScore(p.id);
                    return (
                      <div key={p.id} className="space-y-1">
                        <div className="flex justify-between items-center text-xs">
                          <div className="flex items-center gap-2">
                            <span className={`w-2.5 h-2.5 rounded shadow-sm ${p.logoBg}`}></span>
                            <span className="font-semibold text-zinc-900">{p.name}</span>
                          </div>
                          <span className="font-bold text-purple-650">{finalScore} / 10</span>
                        </div>
                        <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-purple-605 h-full transition-all duration-300" style={{ width: `${finalScore * 10}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sliders for weights */}
                <div className="border-t border-zinc-100 pt-4 space-y-3">
                  <span className="text-[9px] font-bold text-zinc-450 uppercase tracking-wider block">Adjust Parameter Weights</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[10px]">
                    {[
                      { key: 'userValue', label: 'User Value', val: weights.userValue },
                      { key: 'easeOfUse', label: 'Ease of Use', val: weights.easeOfUse },
                      { key: 'onboarding', label: 'Onboarding Flow', val: weights.onboarding },
                      { key: 'featureCompleteness', label: 'Feature Depth', val: weights.featureCompleteness },
                      { key: 'differentiation', label: 'Differentiation', val: weights.differentiation },
                      { key: 'sentiment', label: 'Customer Sentiment', val: weights.sentiment },
                      { key: 'pricing', label: 'Pricing Value', val: weights.pricing }
                    ].map(wItem => (
                      <div key={wItem.key} className="space-y-1">
                        <div className="flex justify-between text-zinc-600 font-semibold">
                          <span>{wItem.label}</span>
                          <span>{wItem.val}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="50"
                          value={wItem.val}
                          onChange={(e) => handleWeightChange(wItem.key as any, parseInt(e.target.value))}
                          className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-purple-600 focus:outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* User segments & product fit */}
            <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">User segments & product fit</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-200/80 text-zinc-400">
                      <th className="pb-3 font-bold uppercase tracking-wider text-[9px]">Segment</th>
                      <th className="pb-3 font-bold uppercase tracking-wider text-[9px]">Core Need</th>
                      {report.products.map(p => (
                        <th key={p.id} className="pb-3 font-bold uppercase tracking-wider text-[9px] text-center">{p.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {report.segments?.map((seg, idx) => (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="py-3 font-semibold text-zinc-900">{seg.name}</td>
                        <td className="py-3 text-zinc-500 pr-4 font-light leading-normal">{seg.mainNeed}</td>
                        {report.products.map(p => {
                          const fitVal = seg.productFit[p.id] || 0;
                          let fitColor = 'text-zinc-550';
                          if (fitVal >= 8) fitColor = 'text-emerald-700 font-bold bg-emerald-50 border border-emerald-100';
                          else if (fitVal >= 5) fitColor = 'text-yellow-700 font-semibold bg-yellow-50 border border-yellow-100';
                          else fitColor = 'text-rose-700 bg-rose-50 border border-rose-100';

                          return (
                            <td key={p.id} className="py-3 text-center">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] ${fitColor}`}>
                                {fitVal}/10
                              </span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* T2: FEATURE MATRIX */}
        {activeTab === 'features' && (
          <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-6">
            <div className="space-y-1 pb-2 border-b border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 flex items-center gap-1.5">
                <Compass size={16} className="text-purple-650" />
                Feature Completeness Matrix
              </h2>
              <p className="text-[10px] text-zinc-450 font-light">
                Lists normalized capabilities across products with associated PM opportunity gap indicators.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 bg-zinc-50/30">
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px] rounded-tl-xl">Capability</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px]">Functional Intent</th>
                    {report.products.map(p => (
                      <th key={p.id} className="p-4 font-bold uppercase tracking-wider text-[9px] text-center">{p.name}</th>
                    ))}
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px] text-center rounded-tr-xl">Opp Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150">
                  {report.features?.map((feat, idx) => (
                    <tr key={idx} className="hover:bg-zinc-50/50">
                      <td className="p-4 font-semibold text-zinc-900 whitespace-nowrap">{feat.capability}</td>
                      <td className="p-4 text-zinc-500 font-light leading-normal max-w-sm">{feat.description}</td>
                      {report.products.map(p => (
                        <td key={p.id} className="p-4 text-center">
                          {getStatusIcon(feat.status[p.id])}
                        </td>
                      ))}
                      <td className="p-4 text-center">
                        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-bold ${
                          feat.opportunityScore === 'High'
                            ? 'bg-purple-50 text-purple-750 border border-purple-200'
                            : feat.opportunityScore === 'Medium'
                            ? 'bg-blue-50 text-blue-750 border border-blue-200'
                            : 'bg-zinc-100 text-zinc-400'
                        }`}>
                          {feat.opportunityScore}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Heuristics evaluation */}
            <div className="border-t border-zinc-150 pt-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-400">UX Heuristic Evaluations</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {report.heuristics?.map((h, i) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-50/40 border border-zinc-200/50 space-y-3">
                    <span className="font-semibold text-zinc-800 text-xs">{h.dimension}</span>
                    
                    <div className="space-y-1.5">
                      {report.products.map(p => {
                        const val = h.scores[p.id] || 0;
                        return (
                          <div key={p.id} className="flex justify-between items-center text-[10px]">
                            <span className="text-zinc-500 font-light">{p.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-zinc-200/60 h-1 rounded-full overflow-hidden">
                                <div className="bg-purple-600 h-full" style={{ width: `${val * 10}%` }}></div>
                              </div>
                              <span className="font-bold text-zinc-800">{val}/10</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-relaxed font-light">{h.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* T3: USER JOURNEYS */}
        {activeTab === 'journey' && (
          <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-6">
            <div className="space-y-1 pb-2 border-b border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 flex items-center gap-1.5">
                <TrendingUp size={16} className="text-purple-650" />
                Comparative User Journeys
              </h2>
              <p className="text-[10px] text-zinc-450 font-light">
                Tracks action steps, structural boundaries, and drop-offs during product flows.
              </p>
            </div>

            <div className="space-y-8">
              {report.userJourney?.map((stage, idx) => (
                <div key={idx} className="relative pl-6 border-l border-zinc-200 space-y-3 pb-2">
                  <div className="absolute -left-1.5 top-0.5 w-3 h-3 rounded-full bg-white border-2 border-purple-600 flex items-center justify-center shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-purple-500"></span>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <h3 className="font-bold text-purple-750 uppercase tracking-wider">{stage.stage}</h3>
                    <span className="text-[10px] text-zinc-400 font-light">Goal: {stage.userGoal}</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report.products.map(p => (
                      <div key={p.id} className="p-3.5 rounded-xl bg-zinc-50/40 border border-zinc-200/50 text-[11px] space-y-2">
                        <div className="flex items-center gap-2 border-b border-zinc-100 pb-1.5">
                          <span className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold shadow-sm ${p.logoBg}`}>{p.logoText}</span>
                          <span className="font-semibold text-zinc-800">{p.name} Path</span>
                        </div>
                        <div className="space-y-1 font-light text-zinc-600 leading-relaxed">
                          <div><strong className="text-[9px] text-zinc-400 block uppercase font-mono">Action:</strong> {stage.actions[p.id]}</div>
                          <div className="mt-1"><strong className="text-[9px] text-zinc-400 block uppercase font-mono">Friction:</strong> {stage.friction[p.id]}</div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {stage.opportunities?.length > 0 && (
                    <div className="p-3 bg-purple-50 border border-purple-100 rounded-xl text-[10px] text-purple-750 flex items-center gap-2">
                      <span className="font-bold text-purple-800 uppercase tracking-wider text-[8px] px-1.5 py-0.5 bg-purple-100 rounded">Opportunities</span>
                      <p className="font-light">{stage.opportunities.join(', ')}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* T4: PAIN POINTS */}
        {activeTab === 'pain-points' && (
          <div className="space-y-6">
            
            {/* Voices of customer summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {report.voc?.map((voice, idx) => {
                const product = report.products.find(p => p.id === voice.productId);
                if (!product) return null;
                return (
                  <div key={idx} className="glass-light p-5 rounded-2xl border border-zinc-200/60 shadow-sm space-y-4 bg-white/70">
                    <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shadow-sm ${product.logoBg}`}>{product.logoText}</span>
                      <div>
                        <h3 className="text-xs font-bold text-zinc-900">{product.name} Feedback Summary</h3>
                        <p className="text-[9px] text-purple-650 uppercase tracking-widest font-bold">Voice-of-Customer</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-[10px] font-light">
                      <div>
                        <span className="text-[9px] text-emerald-700 font-bold block uppercase tracking-wider mb-1">Most Praised Features</span>
                        <ul className="space-y-1 list-disc list-inside text-zinc-650">
                          {voice.praised.map((p, i) => <li key={i} className="truncate">{p}</li>)}
                        </ul>
                      </div>
                      <div>
                        <span className="text-[9px] text-rose-700 font-bold block uppercase tracking-wider mb-1">Frustrations</span>
                        <ul className="space-y-1 list-disc list-inside text-zinc-650">
                          {voice.frustrated.map((f, i) => <li key={i} className="truncate">{f}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50 border border-zinc-150 rounded-xl text-[10px]">
                      <span className="font-bold text-zinc-400 block uppercase tracking-wider text-[8px] mb-1">Switching Trigger</span>
                      <p className="text-zinc-600 italic font-light leading-relaxed">&ldquo;{voice.switchingReasons}&rdquo;</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pain points cards grid */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Structured Customer Pain Points</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {report.painPoints?.map((pp, idx) => {
                  const product = report.products.find(p => p.id === pp.productId);
                  if (!product) return null;

                  return (
                    <div
                      key={idx}
                      className="glass-light p-5 rounded-2xl border border-zinc-200/60 bg-white/70 shadow-sm flex flex-col justify-between h-[300px] hover:border-zinc-350 transition group"
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className={`w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] shadow-sm ${product.logoBg}`}>{product.logoText}</span>
                          <div className="flex gap-1.5">
                            <span className={`px-2 py-0.5 rounded-lg text-[8px] font-bold ${
                              pp.severity === 'High'
                                ? 'bg-rose-50 border border-rose-100 text-rose-750'
                                : 'bg-amber-50 border border-amber-100 text-amber-750'
                            }`}>
                              {pp.severity} Severity
                            </span>
                            <span className="px-2 py-0.5 rounded-lg text-[8px] bg-zinc-100 border border-zinc-150 text-zinc-500 font-bold">
                              {pp.frequency}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-3">
                          <h4 className="text-xs font-bold text-zinc-900 group-hover:text-purple-650 transition">{pp.title}</h4>
                          <p className="text-[9px] text-zinc-400 font-light">Journey Stage: <span className="text-zinc-600 font-medium">{pp.stage}</span></p>
                          <blockquote className="text-[10px] text-zinc-500 leading-relaxed font-light pl-2 border-l border-zinc-250 py-0.5 italic line-clamp-2">
                            &ldquo;{pp.quote}&rdquo;
                          </blockquote>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-zinc-100 space-y-2 text-[10px] leading-relaxed">
                        <div>
                          <span className="font-bold text-zinc-400 block uppercase text-[8px] tracking-wider">Competitor comparison</span>
                          <p className="text-zinc-500 font-light mt-0.5 line-clamp-1">{pp.competitorComparison}</p>
                        </div>
                        <div className="p-2 bg-purple-50 border border-purple-100 rounded-lg text-[10px]">
                          <span className="font-bold text-purple-750 block uppercase text-[8px] tracking-wider">Solution</span>
                          <p className="text-purple-900 font-light mt-0.5 line-clamp-1">{pp.solution}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[8px] text-zinc-400 pt-2 border-t border-zinc-50 font-light">
                        <span>Confidence: <strong className="text-zinc-650 font-semibold">{pp.confidence}%</strong></span>
                        <span>Evidence: <strong className="text-zinc-650 font-semibold">{pp.evidenceCount} mentions</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* T5: OPPORTUNITY MAP & RECOMMENDATIONS */}
        {activeTab === 'opportunities' && (
          <div className="space-y-6">
            
            {/* Map Quadrant grid */}
            <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-6">
              <div className="space-y-1 pb-2 border-b border-zinc-100">
                <h3 className="text-base font-bold text-zinc-950">Opportunity Matrix Schematic</h3>
                <p className="text-[10px] text-zinc-450 font-light">
                  Plots feature recommendations along Value Impact vs complexity (Effort) scales.
                </p>
              </div>

              {/* Blueprint Grid layout */}
              <div className="max-w-md mx-auto border border-zinc-200 p-4 bg-zinc-50/50 rounded-2xl shadow-inner relative">
                <div className="relative aspect-square w-full grid grid-cols-2 grid-rows-2 border-2 border-zinc-300">
                  
                  {/* Grid Zones */}
                  <div className="bg-emerald-500/[0.015] hover:bg-emerald-500/[0.04] transition flex flex-col justify-between p-3 border-r border-b border-zinc-250">
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded w-max">Quick Wins</span>
                    <span className="text-[8px] text-zinc-400 font-light">High Value, Low Effort</span>
                  </div>
                  <div className="bg-blue-500/[0.015] hover:bg-blue-500/[0.04] transition flex flex-col justify-between p-3 border-b border-zinc-250">
                    <span className="text-[9px] font-bold text-blue-700 uppercase tracking-widest bg-blue-55 border border-blue-100 px-1.5 py-0.5 rounded w-max">Strategic Bets</span>
                    <span className="text-[8px] text-zinc-400 font-light">High Value, High Effort</span>
                  </div>
                  <div className="bg-zinc-500/[0.015] hover:bg-zinc-500/[0.04] transition flex flex-col justify-between p-3 border-r border-zinc-250">
                    <span className="text-[8px] text-zinc-400 font-light">Low Value, Low Effort</span>
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest bg-zinc-100 border border-zinc-200 px-1.5 py-0.5 rounded w-max">Table Stakes</span>
                  </div>
                  <div className="bg-rose-500/[0.015] hover:bg-rose-500/[0.04] transition flex flex-col justify-between p-3">
                    <span className="text-[8px] text-zinc-400 font-light">Low Value, High Effort</span>
                    <span className="text-[9px] font-bold text-rose-700 uppercase tracking-widest bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded w-max">Avoid</span>
                  </div>

                  {/* Absolute Plotted Nodes */}
                  {report.opportunityMap?.map((item) => {
                    const left = `${(item.effort / 10) * 100}%`;
                    const bottom = `${(item.impact / 10) * 100}%`;

                    let dotColor = 'bg-zinc-400';
                    if (item.type === 'Quick Win') dotColor = 'bg-emerald-500 shadow-emerald-500/20';
                    else if (item.type === 'Strategic Bet') dotColor = 'bg-blue-500 shadow-blue-500/20';
                    else if (item.type === 'Avoid for Now') dotColor = 'bg-rose-500';

                    return (
                      <div
                        key={item.id}
                        className="absolute w-3.5 h-3.5 -ml-1.5 -mb-1.5 rounded-full border-2 border-white cursor-pointer shadow flex items-center justify-center group/node z-10"
                        style={{ left, bottom }}
                      >
                        <span className={`w-2 h-2 rounded-full ${dotColor} group-hover/node:scale-125 transition`}></span>
                        
                        {/* Tooltip Card */}
                        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-44 p-2 bg-zinc-900 text-[9px] leading-tight text-white rounded-lg hidden group-hover/node:block z-30 shadow-xl border border-zinc-800">
                          <span className="font-semibold text-purple-400 block mb-0.5 uppercase tracking-wider text-[7px]">{item.type}</span>
                          <strong className="block text-zinc-100 mb-0.5">{item.title}</strong>
                          <div className="flex justify-between text-zinc-500 pt-1 mt-1 border-t border-zinc-800 font-mono">
                            <span>Val: {item.impact}/10</span>
                            <span>Eff: {item.effort}/10</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* X Axis Legend */}
                <div className="flex justify-between items-center text-[9px] text-zinc-400 font-mono mt-2.5">
                  <span>← Low Effort</span>
                  <span>Effort Complexity</span>
                  <span>High Effort →</span>
                </div>
              </div>
            </div>

            {/* Recommendations stack */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">PM Roadmap Recommendations</h3>
              <div className="space-y-4">
                {report.recommendations?.map((rec, i) => (
                  <div
                    key={i}
                    className="glass-light p-6 rounded-2xl border border-zinc-200/60 bg-white/80 shadow-sm hover:border-zinc-300 transition space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-zinc-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center justify-center w-5.5 h-5.5 rounded-lg bg-purple-50 border border-purple-200 text-xs font-bold text-purple-700">
                          {i+1}
                        </span>
                        <h4 className="text-sm font-bold text-zinc-950">{rec.title}</h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-1.5 text-[9px]">
                        <span className="px-2 py-0.5 rounded-lg bg-purple-50 border border-purple-150 text-purple-700 font-bold uppercase tracking-wider">
                          Confidence: {rec.confidence}%
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-500 font-semibold">
                          Effort: {rec.effort}
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-500 font-semibold">
                          Risk: {rec.risk}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] leading-relaxed font-light">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">User Problem & Target</span>
                        <p className="text-zinc-650">{rec.problem}</p>
                        <p className="text-[9px] text-zinc-400 font-semibold pt-1">Segment: <span className="text-zinc-650 font-normal">{rec.targetSegment}</span></p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-purple-650 uppercase tracking-wider block">Proposed Solution</span>
                        <p className="text-zinc-800 bg-purple-50/30 border border-purple-100 p-2.5 rounded-xl font-light">{rec.proposedSolution}</p>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">Outcome & Metrics</span>
                        <p className="text-zinc-650">{rec.expectedOutcome}</p>
                        <div className="pt-1">
                          <span className="text-[8px] text-zinc-400 block uppercase font-mono tracking-wider">Metric:</span>
                          <span className="font-mono text-cyan-700 text-[10px] font-semibold">{rec.successMetric}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-zinc-450 font-light italic pt-1 border-t border-zinc-50">
                      <strong className="text-zinc-500 font-bold not-italic">Supporting evidence:</strong> &ldquo;{rec.evidence}&rdquo;
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* T6: EVIDENCE SOURCES */}
        {activeTab === 'sources' && (
          <div className="glass-light p-6 rounded-2xl border border-zinc-200/60 shadow-sm space-y-6">
            <div className="space-y-1 pb-2 border-b border-zinc-100">
              <h2 className="text-base font-bold text-zinc-950 flex items-center gap-1.5">
                <Link2 size={16} className="text-purple-655" />
                Evidence & Grounding Sources
              </h2>
              <p className="text-[10px] text-zinc-450 font-light">
                Direct citations confirming pricing, capabilities, and customer complaints extracted by the agents.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 text-zinc-400 bg-zinc-50/30">
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px] rounded-tl-xl">Source Channel</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px]">Classification</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px]">Evidence Snippet</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px] text-center">Confidence</th>
                    <th className="p-4 font-bold uppercase tracking-wider text-[9px] text-right rounded-tr-xl">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-150">
                  {report.sources?.map((src, idx) => {
                    let classificationColor = 'text-zinc-650';
                    if (src.classification === 'Verified Fact') classificationColor = 'text-emerald-700 bg-emerald-50 border border-emerald-100';
                    else if (src.classification === 'User Finding') classificationColor = 'text-purple-700 bg-purple-50 border border-purple-100';
                    else if (src.classification === 'AI Observation') classificationColor = 'text-blue-700 bg-blue-55 border border-blue-100';
                    else classificationColor = 'text-amber-700 bg-amber-55 border border-amber-100';

                    return (
                      <tr key={idx} className="hover:bg-zinc-50/50">
                        <td className="p-4">
                          <div className="font-semibold text-zinc-900">{src.title}</div>
                          <span className="text-[9px] text-zinc-400 block font-light mt-0.5">Checked {new Date(src.retrievedAt).toLocaleDateString()}</span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className={`inline-block px-2 py-0.5 rounded-lg text-[9px] font-bold ${classificationColor}`}>
                            {src.classification}
                          </span>
                        </td>
                        <td className="p-4 text-zinc-600 font-light leading-relaxed max-w-md italic">&ldquo;{src.snippet}&rdquo;</td>
                        <td className="p-4 text-center whitespace-nowrap">
                          <span className={`font-bold text-[11px] ${
                            src.confidence === 'High' ? 'text-emerald-600' : src.confidence === 'Medium' ? 'text-yellow-600' : 'text-zinc-450'
                          }`}>
                            {src.confidence}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <a
                            href={src.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-50 text-zinc-600 hover:text-purple-650 transition border border-zinc-200 shadow-sm"
                          >
                            <span className="text-[9px] font-semibold uppercase tracking-wider">Verify Link</span>
                            <ExternalLink size={9} />
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
