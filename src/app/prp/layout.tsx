
import React from 'react';
import { TopBar } from "@/components/layout/TopBar";
import { ProofFooter } from "@/components/layout/ProofFooter";

export default function PRPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <TopBar />
      <main className="flex-1 pb-24">
        {children}
      </main>
      <ProofFooter />
    </div>
  );
}
