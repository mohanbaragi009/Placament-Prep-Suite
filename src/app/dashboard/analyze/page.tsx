"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, Building2, Briefcase, AlertTriangle, Zap } from "lucide-react";
import { analyzeJobDescription } from "@/ai/flows/jd-analysis-flow";
import { useToast } from "@/hooks/use-toast";
import { useFirebase, useUser } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Storage } from "@/lib/storage";

export default function AnalyzePage() {
  const router = useRouter();
  const { toast } = useToast();
  const { db } = useFirebase();
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
        skillConfidenceMap: Object.values(result.extractedSkills).flat().reduce((acc: any, skill: any) => ({
          ...acc,
          [skill]: 'practice'
        }), {}),
        finalScore: result.baseScore
      };

      // Save to Firestore if authenticated
      if (user && db) {
        const analysisRef = doc(db, "users", user.uid, "analyses", analysisId);
        setDoc(analysisRef, {
          ...finalAnalysis,
          timestamp: serverTimestamp()
        }).catch(err => {
          console.error("Error saving to Firestore:", err);
        });
      }

      // Always save to local storage for quick access/offline fallback
      Storage.saveAnalysis(finalAnalysis as any);

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
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-headline font-black tracking-tight text-slate-900">AI Strategist</h1>
        <p className="text-muted-foreground font-medium italic opacity-80">"Paste the job description, receive your personalized blueprint."</p>
      </div>

      <Card className="glass-card shadow-3xl overflow-hidden border-none p-2 hover:rotate-0">
        <CardHeader className="bg-white/20 border-b border-white/40 px-8 py-6">
          <CardTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            New Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8 space-y-10">
          {/* AI Strategy Insight Banner */}
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-4 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
              <Zap className="h-16 w-16 text-primary" />
            </div>
            <div className="p-2.5 rounded-xl bg-primary/20 text-primary shadow-inner shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">AI Strategy Insight</h4>
              <p className="text-xs text-primary/80 font-bold leading-relaxed">
                Our engine extracts 100+ technical markers to build a deterministic 7-day preparation roadmap tailored to this role.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 px-1">
                <Building2 className="h-3.5 w-3.5" /> Company Name
              </label>
              <Input 
                placeholder="e.g., Google" 
                className="bg-white/20 border-white/40 h-14 rounded-2xl px-6 font-semibold focus:ring-primary/20 transition-all placeholder:font-normal"
                value={form.company}
                onChange={e => setForm({...form, company: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2 px-1">
                <Briefcase className="h-3.5 w-3.5" /> Job Role
              </label>
              <Input 
                placeholder="e.g., Software Engineer" 
                className="bg-white/20 border-white/40 h-14 rounded-2xl px-6 font-semibold focus:ring-primary/20 transition-all placeholder:font-normal"
                value={form.role}
                onChange={e => setForm({...form, role: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-1">Job Description</label>
            <div className="relative group">
              <Textarea 
                placeholder="Paste the full job description text here..." 
                className="bg-white/20 border-white/40 min-h-[350px] rounded-3xl p-6 px-8 resize-none focus-visible:ring-primary/20 transition-all font-medium leading-relaxed"
                value={form.jd}
                onChange={e => setForm({...form, jd: e.target.value})}
              />
              <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-focus-within:border-primary/5 transition-all" />
            </div>
            {isJdShort && (
              <div className="flex items-center gap-2 text-warning text-xs font-bold animate-in fade-in slide-in-from-top-1 px-1">
                <AlertTriangle className="h-4 w-4" />
                Short descriptions yield generic strategies. Paste the full text for precision.
              </div>
            )}
          </div>

          <Button 
            className="w-full h-16 rounded-[2rem] bg-primary text-xl font-black shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 mt-4"
            disabled={loading || !form.jd}
            onClick={handleAnalyze}
          >
            {loading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Architecting Your Strategy...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Generate Strategic Blueprint
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
