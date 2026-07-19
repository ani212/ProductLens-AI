'use client';

import React from 'react';
import { V2Report } from '@/lib/types';

import ReportLayout from './report/report-layout';
import ExecutiveSummary from './report/executive-summary';
import OverallWinner from './report/overall-winner';
import FeatureComparison from './report/feature-comparison';
import PricingComparison from './report/pricing-comparison';
import VoiceOfCustomer from './report/voice-of-customer';
import PainPoints from './report/pain-points';
import CustomerReviews from './report/customer-reviews';
import SwotAnalysis from './report/swot-analysis';
import OpportunityMap from './report/opportunity-map';
import CompanyIntelligence from './report/company-intelligence';
import EmployeeIntelligence from './report/employee-intelligence';
import EvidenceSources from './report/evidence-sources';

interface TeardownDashboardProps {
  report: V2Report;
  isMock: boolean;
  onBack: () => void;
  onChangePersona: (persona: string) => void;
}

export default function TeardownDashboard({ report, isMock, onBack }: TeardownDashboardProps) {
  return (
    <ReportLayout report={report} onBack={onBack}>
      
      {isMock && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm font-medium print:hidden">
          Running in offline/sandbox mode. Displaying mock data for demonstration purposes.
        </div>
      )}

      {/* Cross-Product Analysis Sections */}
      <ExecutiveSummary crossAnalysis={report.crossAnalysis} objective={report.objective} />
      
      <OverallWinner crossAnalysis={report.crossAnalysis} products={report.products} />
      
      <FeatureComparison crossAnalysis={report.crossAnalysis} products={report.products} />
      
      {/* Individual Product Research Aggregations */}
      <PricingComparison productResearch={report.productResearch} />
      
      <VoiceOfCustomer productResearch={report.productResearch} />
      
      <PainPoints productResearch={report.productResearch} />
      
      <CustomerReviews productResearch={report.productResearch} />
      
      <SwotAnalysis productResearch={report.productResearch} />
      
      <OpportunityMap crossAnalysis={report.crossAnalysis} />
      
      <CompanyIntelligence productResearch={report.productResearch} />
      
      <EmployeeIntelligence productResearch={report.productResearch} />
      
      <EvidenceSources productResearch={report.productResearch} />

    </ReportLayout>
  );
}
