
"use client"

import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, FileText } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PrpState, PRP_STEPS } from "@/lib/prp-state";

export function ProofFooter() {
  const pathname = usePathname();
  const [stepData, setStepData] = useState<boolean[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setStepData(PrpState.getSteps());
    setMounted(true);
  }, [pathname]);

  if (!mounted) return null;

  const completed = stepData.filter(s => s === true).length;
  const isFinalPhase = pathname.includes('/prp/07') || pathname.includes('/prp/08') || pathname.includes('/proof');

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-border bg-background z-50 px-16 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Build Progress</span>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <CheckCircle2 className={`h-4 w-4 ${completed === PRP_STEPS.length ? 'text-primary' : 'text-muted-foreground'}`} />
            <span className="text-xs font-bold">{completed}/{PRP_STEPS.length} Steps</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <Link href="/prp/07-test" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
            QA Checklist
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/prp/proof">
          <Button variant="outline" className="rounded-none border-border font-semibold text-[10px] uppercase tracking-widest px-6 hover:bg-muted transition-all">
            <FileText className="mr-2 h-4 w-4" />
            Manage Proof
          </Button>
        </Link>
        <Link href={isFinalPhase ? "/prp/proof" : "/prp/07-test"}>
          <Button className="rounded-none bg-primary text-primary-foreground font-semibold text-[10px] uppercase tracking-widest px-8 hover:opacity-90 transition-all">
            {isFinalPhase ? "Final Submission" : "Complete Steps"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </footer>
  );
}
