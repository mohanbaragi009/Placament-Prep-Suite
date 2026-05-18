import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function TopBar() {
  const currentStep = 2;
  const totalSteps = 8;
  const progressValue = (currentStep / totalSteps) * 100;

  return (
    <header className="h-16 border-b border-border flex items-center px-6 justify-between bg-background sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <span className="font-headline text-lg font-semibold uppercase tracking-widest text-primary">KodNest Premium</span>
        <div className="h-4 w-px bg-border mx-2" />
        <span className="text-sm font-medium text-muted-foreground uppercase tracking-tighter">Project Alpha Build</span>
      </div>

      <div className="flex flex-col items-center gap-1 w-64">
        <div className="flex justify-between w-full text-[10px] uppercase font-semibold tracking-widest text-muted-foreground">
          <span>Step {currentStep}</span>
          <span>{totalSteps} Total</span>
        </div>
        <Progress value={progressValue} className="h-1.5" />
      </div>

      <div className="flex items-center gap-4">
        <Badge variant="outline" className="rounded-none border-success/30 text-success bg-success/5 font-semibold tracking-wide uppercase px-3 py-1 text-[10px]">
          In Progress
        </Badge>
        <div className="h-8 w-8 rounded-full border border-border flex items-center justify-center bg-card text-[10px] font-bold">
          JD
        </div>
      </div>
    </header>
  );
}