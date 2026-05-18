import React from 'react';
import { Card, CardContent } from "@/components/ui/card";

export function Workspace() {
  return (
    <div className="w-[70%] flex flex-col gap-6">
      <Card className="rounded-none border border-border bg-card shadow-none">
        <CardContent className="p-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-headline text-foreground">Interactive Environment</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-[4/3] bg-background border border-border flex items-center justify-center text-muted-foreground text-sm font-medium uppercase tracking-widest">
                Component View
              </div>
              <div className="aspect-[4/3] bg-background border border-border flex items-center justify-center text-muted-foreground text-sm font-medium uppercase tracking-widest">
                Logic Graph
              </div>
            </div>
            
            <div className="space-y-4 max-w-[720px]">
              <p className="text-muted-foreground leading-relaxed">
                This primary workspace is designed for focused interaction. Every element adheres to the strict 8pt grid, ensuring visual stability and intent.
              </p>
              <div className="h-px bg-border w-full" />
              <div className="flex items-center gap-4">
                <div className="h-10 w-full border border-input px-4 flex items-center text-sm text-muted-foreground bg-background">
                  Search requirements...
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="rounded-none border border-border bg-card shadow-none hover:border-primary transition-premium cursor-pointer group">
            <CardContent className="p-6">
              <h3 className="text-lg font-headline text-foreground mb-2">Module 0{i}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Ready for configuration</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}