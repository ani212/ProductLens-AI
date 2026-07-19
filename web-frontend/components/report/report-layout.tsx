'use client';

import React, { useState, useEffect } from 'react';
import { V2Report } from '@/lib/types';
import { ArrowLeft } from 'lucide-react';
import ExportMenu from '../export-menu';

interface ReportLayoutProps {
  report: V2Report;
  onBack: () => void;
  children: React.ReactNode;
}

const SECTIONS = [
  { id: 'executive-summary', label: 'Executive Summary' },
  { id: 'overall-winner', label: 'Overall Winner' },
  { id: 'feature-comparison', label: 'Features Matrix' },
  { id: 'pricing-comparison', label: 'Pricing & Tiers' },
  { id: 'voice-of-customer', label: 'Voice of Customer' },
  { id: 'pain-points', label: 'Key Pain Points' },
  { id: 'customer-reviews', label: 'Customer Reviews' },
  { id: 'swot-analysis', label: 'SWOT Analysis' },
  { id: 'opportunity-map', label: 'Opportunity Map' },
  { id: 'company-intelligence', label: 'Company Intel' },
  { id: 'evidence-sources', label: 'Evidence Sources' },
];

export default function ReportLayout({ report, onBack, children }: ReportLayoutProps) {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);

  // Intersection Observer for scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries.filter((entry) => entry.isIntersecting);
        if (visibleSections.length > 0) {
          // Sort by visibility ratio or top position
          const topVisible = visibleSections.reduce((prev, curr) => 
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setActiveSection(topVisible.target.id);
        }
      },
      { rootMargin: '-10% 0px -80% 0px', threshold: [0, 0.5, 1] }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const productNames = report.products.map(p => p.name).join(' vs ');

  return (
    <div className="bg-[#fafafa] min-h-screen text-zinc-900 pb-24">
      {/* Sticky Header */}
      <div className="sticky top-14 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-200 shadow-sm print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 rounded-lg text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-base font-bold text-zinc-900 truncate max-w-sm sm:max-w-xl">
                {productNames}
              </h1>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <span className="font-semibold text-indigo-600">{report.industry}</span>
                <span>•</span>
                <span>{report.persona}</span>
                <span>•</span>
                <span>{new Date(report.timestamp).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <ExportMenu report={report} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-start gap-12">
        
        {/* Left Sidebar Nav (Desktop only) */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-36 print:hidden">
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-3 px-3">Sections</h3>
            <nav className="flex flex-col gap-0.5 border-l border-zinc-200 ml-3">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-left px-4 py-1.5 text-xs font-medium transition-all relative ${
                    activeSection === section.id
                      ? 'text-indigo-600'
                      : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                >
                  {/* Active Indicator Line */}
                  {activeSection === section.id && (
                    <div className="absolute left-[-1px] top-0 bottom-0 w-0.5 bg-indigo-600 rounded-r-full" />
                  )}
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 sm:p-12 print:border-none print:shadow-none print:p-0">
          <div className="max-w-4xl mx-auto space-y-24">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
