'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LandingPage from '@/components/landing-page';
import ProductResolver from '@/components/product-resolver';
import { ProductInfo } from '@/lib/mock-data';
import { useAuth } from '@/context/auth-context';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const [showResolver, setShowResolver] = useState(false);
  const [productsInput, setProductsInput] = useState('');
  const [persona, setPersona] = useState('Startup Product Teams');
  const [objective, setObjective] = useState('');
  const [depth, setDepth] = useState<'quick' | 'deep'>('deep');
  
  const [resolvedProducts, setResolvedProducts] = useState<ProductInfo[]>([]);
  const [resolutionLoading, setResolutionLoading] = useState(false);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-purple-550 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Landing page form submission
  const handleStartAnalysis = async (config: {
    productsInput: string;
    persona: string;
    objective: string;
    depth: 'quick' | 'deep';
  }) => {
    setProductsInput(config.productsInput);
    setPersona(config.persona);
    setObjective(config.objective);
    setDepth(config.depth);
    setShowResolver(true);
    setResolutionLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || '';
      const res = await fetch(`${backendUrl}/api/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productsInput: config.productsInput })
      });
      const data = await res.json();
      if (data.products) {
        setResolvedProducts(data.products);
      } else {
        throw new Error(data.error || 'Failed to resolve products');
      }
    } catch (err) {
      console.error('Failed to resolve products:', err);
      // Fallback client-side resolver if API fails
      const fallbackProducts = config.productsInput.split(',').map((p) => ({
        id: p.trim().toLowerCase().replace(/[^a-z0-9]/g, ''),
        name: p.trim(),
        website: `https://${p.trim().toLowerCase()}.com`,
        logoText: p.trim().charAt(0).toUpperCase(),
        logoBg: 'bg-zinc-800 text-white',
        companyName: `${p.trim()} Inc.`,
        category: 'SaaS Software',
        description: `Competitive digital product in the ${p.trim()} ecosystem.`
      }));
      setResolvedProducts(fallbackProducts);
    } finally {
      setResolutionLoading(false);
    }
  };

  // Redirect to dashboard with query params once confirmed
  const handleConfirmAnalysis = () => {
    const query = new URLSearchParams({
      products: productsInput,
      persona,
      objective,
      depth
    }).toString();
    
    router.push(`/dashboard?${query}`);
  };

  const handleViewSample = () => {
    // Redirect directly to dashboard loaded with the pre-baked Notion, ClickUp, Asana comparison
    router.push('/dashboard?products=Notion,ClickUp,Asana&persona=Startup%20Product%20Teams&objective=Startup%20work%20coordination%25%20assessment&depth=deep');
  };

  return (
    <div className="flex-1 flex flex-col justify-center">
      {!showResolver ? (
        <LandingPage
          onStartAnalysis={handleStartAnalysis}
          onViewSample={handleViewSample}
        />
      ) : (
        <ProductResolver
          products={resolvedProducts}
          isLoading={resolutionLoading}
          onConfirm={handleConfirmAnalysis}
          onCancel={() => setShowResolver(false)}
        />
      )}
    </div>
  );
}
