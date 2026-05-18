
"use client"

import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PrpState, PRP_STEPS } from "@/lib/prp-state";
import { usePathname } from 'next/navigation';

export function TopBar() {
  const pathname = usePathname();
  const [completedCount, setCompletedCount] = useState(0);
  const [isShipped, setIsShipped] = useState(false);
  const totalSteps = PRP_STEPS.length;

  useEffect(() => {
    const steps = PrpState.getSteps();
    setCompletedCount(steps.filter(s => s === true).length);
    setIsShipped(PrpState.isShipped());
  }, [pathname]);

  const progressValue = (completedCount / totalSteps) * 100;

  return (
    <header className="h-16 border-b border-border flex items-center px-6 justify-between bg-background sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="font-headline text-lg font-semibold uppercase tracking-widest text-primary">Placement Readiness</span>
        <div className="h-4 w-px bg-border mx-2" />
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-tighter">PRP Build</span>
      </div>

      <div className="flex flex-col items-center gap-1 w-64">
        <div className="flex justify-between w-full text-[10px] uppercase font-semibold tracking-widest text-muted-foreground">
          <span>{completedCount} Steps Done</span>
          <span>{totalSteps} Total</span>
        </div>
        <Progress value={progressValue} className="h-1.5" />
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className={`rounded-none font-semibold tracking-wide uppercase px-3 py-1 text-[10px] ${isShipped ? 'border-success/30 text-success bg-success/5' : 'border-warning/30 text-warning bg-warning/5'}`}>
          {isShipped ? 'Shipped' : 'In Progress'}
        </Badge>
        <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center bg-card text-[10px] font-bold">
          JD
        </div>
      </div>
    </header>
  );
}
