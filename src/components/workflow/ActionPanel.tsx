"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Sparkles, Send, AlertCircle, Image as ImageIcon } from "lucide-react";
import { intelligentPromptGeneration } from "@/ai/flows/intelligent-prompt-generation";
import { useToast } from "@/hooks/use-toast";

export function ActionPanel() {
  const { toast } = useToast();
  const [instructions, setInstructions] = useState("");
  const [refinedPrompt, setRefinedPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefine = async () => {
    if (!instructions.trim()) return;
    setIsLoading(true);
    try {
      const result = await intelligentPromptGeneration({ highLevelInstructions: instructions });
      setRefinedPrompt(result.refinedPrompt);
    } catch (error) {
      toast({ title: "Generation Error", description: "Failed to refine the prompt." });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(refinedPrompt);
    toast({ title: "Copied", description: "Prompt added to clipboard." });
  };

  return (
    <aside className="w-[30%] flex flex-col gap-6">
      <Card className="rounded-none border border-border bg-card shadow-none sticky top-24">
        <CardContent className="p-8 space-y-8">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Step Objective</h3>
            <p className="text-sm leading-relaxed text-foreground font-medium">
              Initialize the core application architecture and define the primary data flow models for the user authentication system.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">Prompt Architect</h3>
            <Textarea 
              placeholder="Describe your build objective..."
              className="rounded-none border-border bg-background resize-none h-24 focus-visible:ring-primary/20 text-sm"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <Button 
              onClick={handleRefine} 
              disabled={isLoading || !instructions}
              className="w-full rounded-none bg-primary text-primary-foreground font-semibold text-[10px] uppercase tracking-widest h-11 transition-premium"
            >
              {isLoading ? "Architecting..." : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Refine Instructions
                </>
              )}
            </Button>
          </section>

          {refinedPrompt && (
            <section className="space-y-3 pt-4 border-t border-border animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Refined Prompt</h3>
                <Button variant="ghost" size="icon" onClick={copyToClipboard} className="h-6 w-6 rounded-none">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <div className="bg-muted p-4 text-[11px] leading-relaxed font-mono border border-border text-foreground">
                {refinedPrompt}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="rounded-none border-border font-bold text-[9px] uppercase tracking-widest h-9">
                  Build in Lovable
                </Button>
                <Button variant="outline" className="rounded-none border-border font-bold text-[9px] uppercase tracking-widest h-9">
                  Update Logic
                </Button>
              </div>
            </section>
          )}

          <section className="pt-6 border-t border-border flex flex-col gap-3">
             <Button variant="outline" className="w-full rounded-none border-border text-success font-bold text-[10px] uppercase tracking-widest h-11 hover:bg-success/5">
               It Worked
             </Button>
             <div className="grid grid-cols-2 gap-3">
               <Button variant="outline" className="rounded-none border-border text-destructive font-bold text-[10px] uppercase tracking-widest h-11 hover:bg-destructive/5">
                 Error
               </Button>
               <Button variant="outline" className="rounded-none border-border text-warning font-bold text-[10px] uppercase tracking-widest h-11 hover:bg-warning/5">
                 Rebuild
               </Button>
             </div>
          </section>
        </CardContent>
      </Card>
    </aside>
  );
}