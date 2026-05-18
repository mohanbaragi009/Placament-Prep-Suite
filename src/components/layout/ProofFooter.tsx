"use client"

import React, { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle2 } from "lucide-react";

const requirements = [
  { id: 'ui', label: 'UI Built' },
  { id: 'logic', label: 'Logic Working' },
  { id: 'test', label: 'Test Passed' },
  { id: 'deploy', label: 'Deployed' },
];

export function ProofFooter() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-20 border-t border-border bg-background z-50 px-16 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-muted-foreground">Proof Gates</span>
        <div className="flex items-center gap-8">
          {requirements.map((req) => (
            <div key={req.id} className="flex items-center gap-3">
              <Checkbox 
                id={req.id} 
                checked={checked[req.id]} 
                onCheckedChange={() => toggleCheck(req.id)}
                className="h-5 w-5 rounded-none border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
              />
              <label 
                htmlFor={req.id} 
                className={`text-sm font-medium tracking-tight uppercase cursor-pointer ${checked[req.id] ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {req.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="rounded-none border-border font-semibold text-[10px] uppercase tracking-widest px-6 hover:bg-muted transition-premium">
          <Upload className="mr-2 h-4 w-4" />
          Attach Proof
        </Button>
        <Button className="rounded-none bg-primary text-primary-foreground font-semibold text-[10px] uppercase tracking-widest px-8 hover:opacity-90 transition-premium">
          Submit Step
        </Button>
      </div>
    </footer>
  );
}