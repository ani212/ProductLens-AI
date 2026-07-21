'use client';

import React, { useState } from 'react';
import LandingPage from '@/components/landing-page';
import ProductResolver from '@/components/product-resolver';
import ResearchLoader from '@/components/research-loader';
import TeardownDashboard from '@/components/teardown-dashboard';
import { ProductInfo, PipelineProgress, AnalysisMode } from '@/lib/types';
import { TeardownReport, getTeardownData, resolveProducts } from '@/lib/mock-data';

export default function Page() {
  const [step, setStep] = useState<'input' | 'resolve' | 'loading' | 'dashboard'>('input');
  
  const [productsInput, setProductsInput] = useState('');
  const [persona, setPersona] = useState('Product Managers');
  const [objective, setObjective] = useState('');
  const [mode, setMode] = useState<AnalysisMode>('Compare Products');

  const [resolvedProducts, setResolvedProducts] = useState<ProductInfo[]>([]);
  const [isResolving, setIsResolving] = useState(false);
  const [progressUpdates, setProgressUpdates] = useState<Record<string, PipelineProgress>>({});
  const [globalStage, setGlobalStage] = useState('Initializing research...');
  const [report, setReport] = useState<TeardownReport | null>(null);
  const [pipelineError, setPipelineError] = useState<string | undefined>(undefined);

  // Step 1 -> Step 2: Resolve product entities
  const handleStartAnalysis = async (config: {
    productsInput: string;
    persona: string;
    objective: string;
    mode: AnalysisMode;
  }) => {
    setProductsInput(config.productsInput);
    setPersona(config.persona);
    setObjective(config.objective);
    setMode(config.mode);

    setStep('resolve');
    setIsResolving(true);

    try {
      const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productsInput: config.productsInput }),
      });

      if (res.ok) {
        const data = await res.json();
        setResolvedProducts(data.products || resolveProducts(config.productsInput));
      } else {
        setResolvedProducts(resolveProducts(config.productsInput));
      }
    } catch (err) {
      setResolvedProducts(resolveProducts(config.productsInput));
    } finally {
      setIsResolving(false);
    }
  };

  // View Sample button on Landing Page
  const handleViewSample = () => {
    const sample = getTeardownData('Notion, ClickUp, Asana', 'Workflow comparison', 'Startup Product Teams');
    setReport(sample);
    setStep('dashboard');
  };

  // Step 2 -> Step 3: Run Research Pipeline
  const handleConfirmProducts = () => {
    setStep('loading');
    setProgressUpdates({});
    setPipelineError(undefined);
    setGlobalStage('Starting evidence collection...');

    runPipelineStream();
  };

  const runPipelineStream = async () => {
    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          products: resolvedProducts,
          persona,
          objective,
          mode
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error(`Pipeline API request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line.trim()) continue;

          const eventMatch = line.match(/^event:\s*(.+)$/m);
          const dataMatch = line.match(/^data:\s*(.+)$/m);

          if (eventMatch && dataMatch) {
            const eventType = eventMatch[1].trim();
            const data = JSON.parse(dataMatch[1].trim());

            if (eventType === 'progress') {
              const prog = data as PipelineProgress;
              setGlobalStage(prog.stage);
              setProgressUpdates(prev => ({
                ...prev,
                [prog.productId]: prog
              }));
            } else if (eventType === 'complete') {
              setReport(data.report);
              setStep('dashboard');
            } else if (eventType === 'error') {
              throw new Error(data.message || 'Pipeline failed');
            }
          }
        }
      }
    } catch (err: any) {
      console.warn('[client] SSE pipeline failed, using fallback report:', err);
      // Fallback to offline report generator so user is never stuck
      const fallbackReport = getTeardownData(productsInput, objective, persona);
      setReport(fallbackReport);
      setStep('dashboard');
    }
  };

  return (
    <>
      {step === 'input' && (
        <LandingPage
          onStartAnalysis={handleStartAnalysis}
          onViewSample={handleViewSample}
        />
      )}

      {step === 'resolve' && (
        <ProductResolver
          products={resolvedProducts}
          onConfirm={handleConfirmProducts}
          onCancel={() => setStep('input')}
          isLoading={isResolving}
        />
      )}

      {step === 'loading' && (
        <ResearchLoader
          products={productsInput}
          progressUpdates={progressUpdates}
          globalStage={globalStage}
          error={pipelineError}
        />
      )}

      {step === 'dashboard' && report && (
        <TeardownDashboard
          report={report}
          onBack={() => setStep('input')}
          onChangePersona={(newPersona) => setPersona(newPersona)}
        />
      )}
    </>
  );
}
