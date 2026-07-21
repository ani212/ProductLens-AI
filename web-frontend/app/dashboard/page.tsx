'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import TeardownDashboard from '@/components/teardown-dashboard';
import { getTeardownData, TeardownReport } from '@/lib/mock-data';

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const productsParam = searchParams.get('products') || 'Notion, ClickUp';
  const personaParam = searchParams.get('persona') || 'Product Managers';
  const objectiveParam = searchParams.get('objective') || 'Competitive teardown';

  const [report, setReport] = useState<TeardownReport | null>(null);

  useEffect(() => {
    const data = getTeardownData(productsParam, objectiveParam, personaParam);
    setReport(data);
  }, [productsParam, personaParam, objectiveParam]);

  if (!report) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-xs text-zinc-500 font-medium">
        Loading dashboard...
      </div>
    );
  }

  return (
    <TeardownDashboard
      report={report}
      onBack={() => router.push('/')}
      onChangePersona={(newPersona) => {
        const query = new URLSearchParams({
          products: productsParam,
          persona: newPersona,
          objective: objectiveParam
        }).toString();
        router.push(`/dashboard?${query}`);
      }}
    />
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-zinc-500">Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
