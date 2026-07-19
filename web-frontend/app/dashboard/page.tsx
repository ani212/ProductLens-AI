'use client';

import React, { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResearchLoader from '@/components/research-loader';
import TeardownDashboard from '@/components/teardown-dashboard';
import { V2Report, PipelineProgress } from '@/lib/types';
import { getTeardownData } from '@/lib/mock-data';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const products = searchParams.get('products') || '';
  const persona = searchParams.get('persona') || 'Product Managers';
  const industry = searchParams.get('industry') || 'Software';
  const objective = searchParams.get('objective') || '';

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<any>(null);
  const [isMock, setIsMock] = useState(false);
  const [error, setError] = useState<string>('');
  
  // Pipeline streaming state
  const [globalStage, setGlobalStage] = useState('Initializing...');
  const [progressUpdates, setProgressUpdates] = useState<Record<string, PipelineProgress>>({});
  
  // Ref to track if we've already started the request
  const hasStartedRef = useRef(false);

  const saveToLocalStorage = (reportData: any) => {
    try {
      const saved = localStorage.getItem('productlens_saved_reports') || '[]';
      const list = JSON.parse(saved);
      const reportKey = reportData.products.map((p: any) => p.name).join(',');
      if (!list.some((r: any) => r.timestamp === reportData.timestamp && r.products.map((p: any) => p.name).join(',') === reportKey)) {
        list.push(reportData);
        localStorage.setItem('productlens_saved_reports', JSON.stringify(list));
      }
    } catch (e) {
      console.error('Failed to save to local cache:', e);
    }
  };

  useEffect(() => {
    if (!products) {
      router.push('/');
      return;
    }

    if (hasStartedRef.current) return;
    hasStartedRef.current = true;
    
    // We'll define a fallback mechanism just in case the real pipeline fails
    const runFallback = () => {
      console.warn('Falling back to mock V2 report generation.');
      const localReport = getTeardownData(products, objective, persona);
      setReport(localReport);
      setIsMock(true);
      saveToLocalStorage(localReport);
      setLoading(false);
    };

    // Construct request payload
    const payload = {
      products: products.split(',').map(p => ({ 
        id: p.trim().toLowerCase().replace(/[^a-z0-9]/g, ''), 
        name: p.trim(),
        website: `https://${p.trim().toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
        logoText: p.trim().charAt(0).toUpperCase(),
        logoBg: 'bg-zinc-900 text-white',
        companyName: `${p.trim()} Inc.`,
        category: industry,
        description: `Entity being researched.`
      })),
      persona,
      industry,
      objective
    };

    const startStreaming = async () => {
      setLoading(true);
      setError('');
      
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
        
        // Use Fetch with ReadableStream for SSE
        const response = await fetch(`${backendUrl}/api/research`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`API failed with status ${response.status}`);
        }

        if (!response.body) {
          throw new Error('ReadableStream not supported by the browser.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n\n');
          
          // Process all complete events
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            if (!line.trim()) continue;

            // Simple SSE parser
            const eventMatch = line.match(/event:\s*(.+)/);
            const dataMatch = line.match(/data:\s*(.+)/);
            
            if (eventMatch && dataMatch) {
              const eventType = eventMatch[1].trim();
              
              try {
                const data = JSON.parse(dataMatch[1]);
                
                if (eventType === 'progress') {
                  const prog: PipelineProgress = data;
                  setGlobalStage(prog.stage);
                  setProgressUpdates(prev => ({
                    ...prev,
                    [prog.productId]: prog
                  }));
                } 
                else if (eventType === 'complete') {
                  if (data.report) {
                    setReport(data.report);
                    setIsMock(false); // Real pipeline succeeded
                    saveToLocalStorage(data.report);
                  }
                  setLoading(false);
                }
                else if (eventType === 'error') {
                  throw new Error(data.message || 'Pipeline emitted an error event.');
                }
              } catch (parseErr) {
                console.error('Error parsing SSE data:', parseErr, dataMatch[1]);
              }
            }
          }
          
          // Keep the incomplete event in the buffer
          buffer = lines[lines.length - 1];
        }

      } catch (err: any) {
        console.error('SSE connection failed:', err);
        setError(err.message || 'Failed to connect to research pipeline.');
        
        // After 3 seconds, fallback to mock so the user isn't stuck
        setTimeout(() => {
          runFallback();
        }, 3000);
      }
    };

    startStreaming();

    return () => {
      // Cleanup if needed
    };
  }, [products, persona, industry, objective, router]);

  if (loading) {
    return (
      <ResearchLoader 
        products={products} 
        progressUpdates={progressUpdates}
        globalStage={globalStage}
        error={error}
      />
    );
  }

  if (!report) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-[70vh]">
        <div className="bg-white border border-zinc-200 p-6 rounded-2xl max-w-sm text-center space-y-4">
          <p className="text-zinc-600 text-xs">An unexpected error occurred while preparing your teardown report.</p>
          <button
            onClick={() => router.push('/')}
            className="w-full py-2 bg-zinc-950 text-white rounded-xl text-xs font-semibold hover:bg-zinc-800 transition"
          >
            Return to Generator
          </button>
        </div>
      </div>
    );
  }

  const handleChangePersona = (newPersona: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('persona', newPersona);
    router.push(`/dashboard?${params.toString()}`);
  };

  return (
    <TeardownDashboard
      report={report}
      isMock={isMock}
      onBack={() => router.push('/')}
      onChangePersona={handleChangePersona}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#fafafa]">
        <div className="w-6 h-6 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
