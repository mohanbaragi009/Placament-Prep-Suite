"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Building2, Briefcase, AlertTriangle } from "lucide-react";
import { analyzeJobDescription } from "@/ai/flows/jd-analysis-flow";
import { useToast } from "@/hooks/use-toast";
import { useFirestore, useUser } from "@/firebase";
import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";

export default function AnalyzePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { db } = useFirestore();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ company: '', role: '', jd: '' });

  const isJdShort = form.jd.length > 0 && form.jd.length < 200;

  const handleAnalyze = async () => {
    if (!form.jd || form.jd.length < 10) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide a valid Job Description.",
      });
      return;
    }

    setLoading(true);
    
    try {
      const result = await analyzeJobDescription({
        company: form.company,
        role: form.role,
        jdText: form.jd
      });

      const analysisId = crypto.randomUUID();
      const userId = user?.uid || "anonymous";

      const finalAnalysis = {
        ...result,
        id: analysisId,
        userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: form.company || "",
        role: form.role || "",
        jdText: form.jd,
        skillConfidenceMap: Object.values(result.extractedSkills).flat().reduce((acc, skill) => ({
          ...acc,
          [skill]: 'practice'
        }), {}),
        finalScore: result.baseScore
      };

      // Save to Cloud if authenticated, otherwise fallback to local for now
      if (user) {
        const analysisRef = doc(db, "users", user.uid, "analyses", analysisId);
        setDoc(analysisRef, {
          ...finalAnalysis,
          timestamp: serverTimestamp()
        });
      }

      // Always save to localStorage for immediate history access (hybrid approach)
      const existing = JSON.parse(localStorage.getItem('placement_prep_history') || '[]');
      localStorage.setItem('placement_prep_history', JSON.stringify([finalAnalysis, ...existing]));

      router.push(`/dashboard/results?id=${analysisId}`);
    } catch (error) {
      setLoading(false);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "The AI was unable to process this job description. Please try again.",
      });
    }
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
          {!user && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Sign in to sync your analyses across all your devices.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Building2 className="h-3 w-3" /> Company Name (Optional)
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
                <Briefcase className="h-3 w-3" /> Job Role (Optional)
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
            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Job Description (Required)</label>
            <Textarea 
              placeholder="Paste the full job description here..." 
              className="glass border-white/10 min-h-[300px] rounded-xl p-4 resize-none focus-visible:ring-primary/20"
              value={form.jd}
              onChange={e => setForm({...form, jd: e.target.value})}
            />
            {isJdShort && (
              <div className="flex items-center gap-2 text-warning text-xs font-medium animate-in fade-in slide-in-from-top-1">
                <AlertTriangle className="h-3 w-3" />
                This JD is too short to analyze deeply. Paste full JD for better output.
              </div>
            )}
          </div>

          <Button 
            className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-lg shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-50"
            disabled={loading || !form.jd}
            onClick={handleAnalyze}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Architecting Strategy...
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
