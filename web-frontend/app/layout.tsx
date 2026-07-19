import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProductLens AI - Competitive Intelligence Platform",
  description: "Compare any products with evidence-backed competitive intelligence. Powered by multi-source research and AI analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#fafafa] text-zinc-900">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-slate-100 bg-white py-8 text-center text-[10px] text-zinc-400">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p>© 2026 ProductLens AI. All rights reserved. Designed for Product Managers and Strategy Leaders.</p>
            <p className="font-light">
              Evidence-backed competitive intelligence powered by multi-source research and AI analysis.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
