import type { Metadata } from "next";
import Header from "@/components/header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ProductLens AI - Competitive Product Intelligence",
  description: "Name any product or URL to get structured product teardowns, pain points, feature gaps, and roadmap recommendations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[#fafafa] bg-blueprint bg-mesh-light text-zinc-900">
        <Header />
        <main className="flex-1 flex flex-col">{children}</main>
        <footer className="border-t border-slate-100 bg-white py-8 text-center text-[10px] text-zinc-400">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p>© 2026 ProductLens AI. All rights reserved. Designed for Product Managers and Strategy Leaders.</p>
            <p className="font-light">
              Empowered by Gemini AI model capabilities, indexing open documentation matrices, G2 community ratings & search verification.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
