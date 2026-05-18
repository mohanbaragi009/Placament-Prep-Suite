import React from 'react';
import { TopBar } from "@/components/layout/TopBar";
import { ContextHeader } from "@/components/layout/ContextHeader";
import { Workspace } from "@/components/workflow/Workspace";
import { ActionPanel } from "@/components/workflow/ActionPanel";
import { ProofFooter } from "@/components/layout/ProofFooter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background pb-32">
      <TopBar />
      
      <main className="flex-1">
        <ContextHeader 
          title="Architectural Foundation" 
          subtitle="Define the core structures that will support your application's logic and user experience. This phase ensures long-term scalability and coherence."
        />
        
        <div className="px-16 flex gap-10">
          <Workspace />
          <ActionPanel />
        </div>
      </main>

      <ProofFooter />
    </div>
  );
}