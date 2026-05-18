"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Building2, Briefcase } from "lucide-react";
import { analyzeJD } from "@/lib/analysis-engine";
import { Storage } from "@/lib/storage";

export default function AnalyzePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', jd: '' });

  const handleAnalyze = () => {
    if (!form.jd) return;
    setLoading(true);
    
    // Simulate thinking
    setTimeout(() => {
      const result = analyzeJD(form.company, form.role, form.jd);
      Storage.saveAnalysis(result);
      setLoading(false);
      router.push(`/dashboard/results?id=${result.id}`);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">AI Analyze</h1>
        <p className="text-muted-foreground italic">"Give us the job description, we'll give you the strategy."</p>
      </div>

      <Card className="glass border-white/10 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-headline flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            New Job Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Building2 className="h-3 w-3" /> Company Name
              </label>
              <Input 
                placeholder="e.g., Google" 
                className="glass border-white/10 h-12 rounded-xl"
                value={form.company}
                onChange={e => setForm({...form, company: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Briefcase className="h-3 w-3" /> Job Role
              </label>
              <Input 
                placeholder="e.g., Frontend Engineer" 
                className="glass border-white/10 h-12 rounded-xl"
                value={form.role}
                onChange={e => setForm({...form, role: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Job Description</label>
            <Textarea 
              placeholder="Paste the full job description here..." 
              className="glass border-white/10 min-h-[300px] rounded-xl p-4 resize-none focus-visible:ring-primary/20"
              value={form.jd}
              onChange={e => setForm({...form, jd: e.target.value})}
            />
          </div>

          <Button 
            className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            disabled={loading || !form.jd}
            onClick={handleAnalyze}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Requirements...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Analyze & Build Strategy
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
