
"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Link as LinkIcon, Github, Globe, CheckCircle2, Copy, Sparkles, ShieldCheck } from "lucide-react";
import { PRP_STEPS, PrpState, FinalSubmission } from "@/lib/prp-state";
import { useToast } from "@/hooks/use-toast";

export default function ProofPage() {
  const { toast } = useToast();
  const [steps, setSteps] = useState<boolean[]>([]);
  const [submission, setSubmission] = useState<FinalSubmission>({ lovable: '', github: '', deployment: '' });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSteps(PrpState.getSteps());
    setSubmission(PrpState.getSubmission());
    setMounted(true);
  }, []);

  const toggleStep = (idx: number) => {
    const newSteps = [...steps];
    newSteps[idx] = !newSteps[idx];
    setSteps(newSteps);
    PrpState.saveSteps(newSteps);
  };

  const handleLinkChange = (key: keyof FinalSubmission, value: string) => {
    const newSub = { ...submission, [key]: value };
    setSubmission(newSub);
    PrpState.saveSubmission(newSub);
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const copyFinalSubmission = () => {
    const { lovable, github, deployment } = submission;
    if (!lovable || !github || !deployment) {
      toast({ variant: "destructive", title: "Incomplete", description: "All links are required for submission." });
      return;
    }

    const text = `
------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${lovable}
GitHub Repository: ${github}
Live Deployment: ${deployment}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------
    `.trim();

    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "Final submission text added to clipboard." });
  };

  if (!mounted) return null;

  const isShipped = PrpState.isShipped();

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-10 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold mb-2">Build Proof</h1>
          <p className="text-muted-foreground italic">"Evidence of a real product built with intent."</p>
        </div>
        <Badge className={isShipped ? "bg-green-500 text-white" : "bg-yellow-500 text-white"}>
          {isShipped ? "STATUS: SHIPPED" : "STATUS: IN PROGRESS"}
        </Badge>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
              Step Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {PRP_STEPS.map((step, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <Checkbox 
                  id={`step-${i}`} 
                  checked={steps[i]} 
                  onCheckedChange={() => toggleStep(i)}
                  className="h-5 w-5 rounded border-primary"
                />
                <Label htmlFor={`step-${i}`} className={`text-sm cursor-pointer ${steps[i] ? 'text-muted-foreground line-through' : ''}`}>
                  {i + 1}. {step}
                </Label>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Artifact Inputs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <LinkIcon className="h-3 w-3" /> Lovable Project Link
                </Label>
                <Input 
                  placeholder="https://lovable.dev/projects/..."
                  className="glass border-white/10 h-11"
                  value={submission.lovable}
                  onChange={(e) => handleLinkChange('lovable', e.target.value)}
                />
                {submission.lovable && !validateUrl(submission.lovable) && (
                  <p className="text-[10px] text-destructive font-bold">Invalid URL</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Github className="h-3 w-3" /> GitHub Repository Link
                </Label>
                <Input 
                  placeholder="https://github.com/..."
                  className="glass border-white/10 h-11"
                  value={submission.github}
                  onChange={(e) => handleLinkChange('github', e.target.value)}
                />
                {submission.github && !validateUrl(submission.github) && (
                  <p className="text-[10px] text-destructive font-bold">Invalid URL</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Globe className="h-3 w-3" /> Deployed URL
                </Label>
                <Input 
                  placeholder="https://..."
                  className="glass border-white/10 h-11"
                  value={submission.deployment}
                  onChange={(e) => handleLinkChange('deployment', e.target.value)}
                />
                {submission.deployment && !validateUrl(submission.deployment) && (
                  <p className="text-[10px] text-destructive font-bold">Invalid URL</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Button 
            onClick={copyFinalSubmission}
            className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all"
            disabled={!submission.lovable || !submission.github || !submission.deployment}
          >
            <Copy className="mr-2 h-5 w-5" />
            Copy Final Submission
          </Button>
        </div>
      </div>

      {isShipped && (
        <Card className="glass border-green-500/40 bg-green-500/10 animate-in zoom-in-95 duration-500">
          <CardContent className="p-8 text-center space-y-4">
            <ShieldCheck className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-3xl font-headline font-bold">You built a real product.</h2>
            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Not a tutorial. Not a clone. A structured tool that solves a real problem.
              <br /><br />
              <span className="text-foreground font-bold italic">This is your proof of work.</span>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
