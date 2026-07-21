'use client';

import React, { useState } from 'react';
import { TeardownReport } from '@/lib/mock-data';
import ExportMenu from '@/components/export-menu';
import ExecutiveSummary from '@/components/report/executive-summary';
import JTBDSection from '@/components/report/jtbd-section';
import UserSegments from '@/components/report/user-segments';
import PositioningSection from '@/components/report/positioning-section';
import FeatureComparison from '@/components/report/feature-comparison';
import UserJourney from '@/components/report/user-journey';
import HeuristicsEval from '@/components/report/heuristics-eval';
import PricingComparison from '@/components/report/pricing-comparison';
import VoiceOfCustomer from '@/components/report/voice-of-customer';
import PainPoints from '@/components/report/pain-points';
import SWOTAnalysis from '@/components/report/swot-analysis';
import OpportunityMap from '@/components/report/opportunity-map';
import PMRecommendations from '@/components/report/pm-recommendations';
import EvidenceSources from '@/components/report/evidence-sources';
import { ArrowLeft, Bookmark, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

interface TeardownDashboardProps {
  report: TeardownReport;
  onBack: () => void;
  onChangePersona: (persona: string) => void;
}

type TabType = 
  | 'overview' 
  | 'jtbd' 
  | 'segments' 
  | 'positioning' 
  | 'features' 
  | 'journey' 
  | 'heuristics' 
  | 'pricing' 
  | 'voc' 
  | 'pain-points' 
  | 'swot' 
  | 'opportunities' 
  | 'recommendations' 
  | 'sources';

export default function TeardownDashboard({ report, onBack, onChangePersona }: TeardownDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isSaved, setIsSaved] = useState(false);

  const productNames = report.products.map(p => p.name).join(' vs ');

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

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      alert('Report URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      
      {/* Top sticky header bar */}
      <div className="bg-white border-b border-zinc-200 sticky top-16 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 transition"
              title="Back to search"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-extrabold text-zinc-950">{productNames}</h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-150">
                  {report.persona || 'PM Teardown'}
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-normal">
                Generated on {new Date(report.timestamp).toLocaleDateString()} • {report.sources?.length || 15} verified sources
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 text-xs font-semibold shadow-sm transition"
            >
              <Share2 size={13} />
              Share
            </button>

            <button
              onClick={handleSave}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold shadow-sm transition ${
                isSaved
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                  : 'bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700'
              }`}
            >
              {isSaved ? <CheckCircle2 size={13} /> : <Bookmark size={13} />}
              {isSaved ? 'Saved' : 'Save'}
            </button>

            <ExportMenu report={report} />
          </div>

        </div>

        {/* Tab Sub-Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto border-t border-zinc-100 scrollbar-none">
          <div className="flex items-center gap-1 py-1.5 text-xs font-bold text-zinc-600 min-w-max">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'overview' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('jtbd')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'jtbd' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              JTBD
            </button>
            <button
              onClick={() => setActiveTab('segments')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'segments' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              User Segments
            </button>
            <button
              onClick={() => setActiveTab('positioning')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'positioning' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Positioning
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'features' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Feature Matrix
            </button>
            <button
              onClick={() => setActiveTab('journey')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'journey' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              User Journey
            </button>
            <button
              onClick={() => setActiveTab('heuristics')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'heuristics' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              UX Heuristics
            </button>
            <button
              onClick={() => setActiveTab('pricing')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'pricing' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Pricing
            </button>
            <button
              onClick={() => setActiveTab('voc')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'voc' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Voice of Customer
            </button>
            <button
              onClick={() => setActiveTab('pain-points')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'pain-points' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Pain Points
            </button>
            <button
              onClick={() => setActiveTab('swot')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'swot' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              SWOT
            </button>
            <button
              onClick={() => setActiveTab('opportunities')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'opportunities' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Opportunity Map
            </button>
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'recommendations' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Recommendations
            </button>
            <button
              onClick={() => setActiveTab('sources')}
              className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'sources' ? 'bg-zinc-950 text-white' : 'hover:bg-zinc-100'}`}
            >
              Sources
            </button>
          </div>
        </div>
      </div>

      {/* Main Content View Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12">
        
        {/* Render selected active tab content or all sections when overview selected */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            <ExecutiveSummary report={report} />
            <JTBDSection report={report} />
            <UserSegments report={report} />
            <PositioningSection report={report} />
            <FeatureComparison report={report} />
            <UserJourney report={report} />
            <HeuristicsEval report={report} />
            <PricingComparison report={report} />
            <VoiceOfCustomer report={report} />
            <PainPoints report={report} />
            <SWOTAnalysis report={report} />
            <OpportunityMap report={report} />
            <PMRecommendations report={report} />
            <EvidenceSources report={report} />
          </div>
        )}

        {activeTab === 'jtbd' && <JTBDSection report={report} />}
        {activeTab === 'segments' && <UserSegments report={report} />}
        {activeTab === 'positioning' && <PositioningSection report={report} />}
        {activeTab === 'features' && <FeatureComparison report={report} />}
        {activeTab === 'journey' && <UserJourney report={report} />}
        {activeTab === 'heuristics' && <HeuristicsEval report={report} />}
        {activeTab === 'pricing' && <PricingComparison report={report} />}
        {activeTab === 'voc' && <VoiceOfCustomer report={report} />}
        {activeTab === 'pain-points' && <PainPoints report={report} />}
        {activeTab === 'swot' && <SWOTAnalysis report={report} />}
        {activeTab === 'opportunities' && <OpportunityMap report={report} />}
        {activeTab === 'recommendations' && <PMRecommendations report={report} />}
        {activeTab === 'sources' && <EvidenceSources report={report} />}

      </div>

    </div>
  );
}
