
"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Calendar, 
  HelpCircle, 
  ArrowLeft,
  Download,
  Sparkles,
  Zap,
  Info
} from "lucide-react";
import Link from 'next/link';
import { Storage } from "@/lib/storage";
import { AnalysisResult, calculateLiveScore } from "@/lib/analysis-engine";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const id = searchParams.get('id');
  const [data, setData] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (id) {
      const result = Storage.getById(id);
      if (result) {
        setData(result);
      }
    }
  }, [id]);

  const toggleSkillConfidence = useCallback((skill: string) => {
    if (!data) return;

    const currentStatus = data.skillConfidenceMap?.[skill] || 'practice';
    const newStatus = currentStatus === 'know' ? 'practice' : 'know';

    const updatedConfidenceMap = {
      ...(data.skillConfidenceMap || {}),
      [skill]: newStatus
    };

    const newScore = calculateLiveScore(data.baseScore, updatedConfidenceMap);

    const updatedData = {
      ...data,
      skillConfidenceMap: updatedConfidenceMap,
      finalScore: newScore,
      updatedAt: new Date().toISOString()
    };

    setData(updatedData);
    Storage.updateAnalysis(updatedData);
  }, [data]);

  const downloadTxt = () => {
    if (!data) return;

    const content = `
ANALYSIS REPORT: ${data.role || 'N/A'} @ ${data.company || 'N/A'}
Date: ${new Date(data.createdAt).toLocaleDateString()}
Final Readiness Score: ${data.finalScore}%

7-DAY INTENSIVE PLAN:
${(data.plan7Days || []).map(p => `${p.day} (${p.focus}): ${p.tasks.join(', ')}`).join('\n')}

ROUND-WISE CHECKLIST:
${(data.checklist || []).map(c => `[${c.roundTitle}]\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

TOP 10 POTENTIAL QUESTIONS:
${(data.questions || []).map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Analysis_${data.company || 'Job'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data) return (
    <div className="h-screen flex flex-col items-center justify-center p-10 animate-in fade-in">
      <Info className="h-12 w-12 text-muted-foreground opacity-20 mb-4" />
      <h2 className="text-xl font-bold">Analysis Not Found</h2>
      <Link href="/dashboard/analyze" className="mt-4"><Button>New Analysis</Button></Link>
    </div>
  );

  const weakSkills = Object.keys(data.skillConfidenceMap || {}).filter(s => data.skillConfidenceMap[s] === 'practice').slice(0, 3);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/history" className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
            <ArrowLeft className="h-3 w-3" /> BACK TO HISTORY
          </Link>
          <h1 className="text-4xl font-headline font-bold mb-1">{data.role || 'Job'} @ {data.company || 'Target'}</h1>
          <p className="text-muted-foreground text-sm">Last updated: {new Date(data.updatedAt).toLocaleString()}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={downloadTxt} className="glass border-white/10 rounded-xl h-12">
            <Download className="h-4 w-4 mr-2" /> Download TXT
          </Button>
          <Link href="/dashboard/analyze">
            <Button className="rounded-xl h-12 font-bold px-6">New Analysis</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-8">
          <Card className="glass border-primary/20 bg-primary/5 sticky top-24">
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                  <circle 
                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                    strokeDasharray={440} strokeDashoffset={440 - (data.finalScore / 100) * 440}
                    className="text-primary transition-all duration-500 ease-out" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{data.finalScore}%</span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground">Base: {data.baseScore}% | Adjustment: {data.finalScore - data.baseScore}%</p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader><CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Extracted Skills</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(data.extractedSkills || {}).map(([cat, skills]) => (
                Array.isArray(skills) && skills.length > 0 && (
                  <div key={cat}>
                    <h4 className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">{cat}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(s => {
                        const isKnown = data.skillConfidenceMap?.[s] === 'know';
                        return (
                          <button key={s} onClick={() => toggleSkillConfidence(s)} className={cn("text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2", isKnown ? "bg-primary/20 border-primary text-primary" : "bg-white/5 border-white/10 text-muted-foreground")}>
                            {isKnown ? <CheckCircle2 className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                            {s}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-xl"><Calendar className="h-5 w-5 text-primary" /> 7-Day Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(data.plan7Days || []).map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl glass border-white/5">
                  <div className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-lg shrink-0">{p.day}</div>
                  <div>
                    <p className="text-sm font-bold text-primary/80 mb-1">{p.focus}</p>
                    <p className="text-sm">{p.tasks.join(', ')}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><CheckCircle2 className="h-5 w-5 text-primary" /> Round-wise Action</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {(data.checklist || []).map((round, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="font-bold text-primary border-b border-primary/10 pb-2">{round.roundTitle}</h4>
                  <ul className="space-y-2">
                    {round.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground"><div className="w-1.5 h-1.5 rounded-full bg-primary/40" /> {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader><CardTitle className="flex items-center gap-2 text-xl"><HelpCircle className="h-5 w-5 text-primary" /> Predicted Questions</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {(data.questions || []).map((q, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-all">
                  <span className="text-primary font-bold">{idx + 1}.</span>
                  <p className="text-sm font-medium">{q}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="glass border-primary/40 bg-primary/10 border-dashed">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <Sparkles className="h-10 w-10 text-primary" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Next Step Recommendation</h3>
                  {weakSkills.length > 0 ? (
                    <p className="text-muted-foreground text-sm mb-4">Focus on <span className="text-primary font-bold">{weakSkills.join(', ')}</span> first.</p>
                  ) : (
                    <p className="text-muted-foreground text-sm mb-4">You're fully prepared for the detected skills!</p>
                  )}
                  <Button className="rounded-xl px-8">Start Intensive Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
