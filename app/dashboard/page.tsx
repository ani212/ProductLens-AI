'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ResearchLoader from '@/components/research-loader';
import TeardownDashboard from '@/components/teardown-dashboard';
import { TeardownReport, getTeardownData } from '@/lib/mock-data';

import { useAuth } from '@/context/auth-context';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, loading: authLoading, sheetsConnected } = useAuth();

  const products = searchParams.get('products') || '';
  const persona = searchParams.get('persona') || 'Startup Product Teams';
  const objective = searchParams.get('objective') || '';
  const depth = (searchParams.get('depth') as 'quick' | 'deep') || 'deep';

  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState<TeardownReport | null>(null);
  const [isMock, setIsMock] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const logSearchHistory = async (reportData: TeardownReport) => {
    if (!user) return;
    const productsStr = reportData.products.map(p => p.name).join(', ');
    
    try {
      const saved = localStorage.getItem('productlens_saved_reports') || '[]';
      const list = JSON.parse(saved);
      if (!list.some((r: any) => r.timestamp === reportData.timestamp && r.products.map((p: any) => p.name).join() === reportData.products.map((p: any) => p.name).join())) {
        list.push(reportData);
        localStorage.setItem('productlens_saved_reports', JSON.stringify(list));
      }
    } catch (e) {
      console.error('Failed to save to local cache:', e);
    }

    if (sheetsConnected) {
      try {
        await fetch('/api/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'addHistory',
            userId: user.userId,
            products: productsStr,
            persona: reportData.persona,
            objective: reportData.objective
          })
        });
      } catch (err) {
        console.error('Failed to sync search history to Sheets:', err);
      }
    }
  };

  useEffect(() => {
    if (!products) {
      router.push('/');
      return;
    }

    let isSubscribed = true;

    async function generateTeardown() {
      setLoading(true);
      try {
        const res = await fetch('/api/teardown', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            productsInput: products,
            persona,
            objective,
            depth
          })
        });
        const data = await res.json();
        
        if (isSubscribed) {
          if (data.report) {
            setReport(data.report);
            setIsMock(data.isMock);
            logSearchHistory(data.report);
          } else {
            throw new Error(data.error || 'Failed to fetch report');
          }
          setLoading(false);
        }
      } catch (err) {
        console.warn('API fetch failed, falling back to local client-side generator. Error:', err);
        if (isSubscribed) {
          setTimeout(() => {
            if (isSubscribed) {
              const localReport = getTeardownData(products, objective, persona);
              setReport(localReport);
              setIsMock(true);
              logSearchHistory(localReport);
              setLoading(false);
            }
          }, 7200);
        }
      }
    }

    generateTeardown();

    return () => {
      isSubscribed = false;
    };
  }, [products, persona, objective, depth, router]);

  if (loading) {
    return <ResearchLoader products={products} />;
  }

  if (!report) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-mesh-light min-h-[70vh]">
        <div className="glass-light p-6 rounded-2xl max-w-sm text-center space-y-4">
          <p className="text-zinc-650 text-xs font-light">An unexpected error occurred while preparing your teardown report.</p>
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
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
