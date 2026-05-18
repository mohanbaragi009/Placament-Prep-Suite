"use client"

import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Calendar, 
  Target, 
  HelpCircle, 
  ArrowLeft,
  Share2,
  FileText,
  Copy,
  Download,
  Sparkles,
  Zap
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
        // Migration: Ensure baseScore and skillConfidenceMap exist for old entries
        if (result.baseScore === undefined) result.baseScore = result.readinessScore;
        if (result.skillConfidenceMap === undefined) {
          result.skillConfidenceMap = {};
          Object.values(result.extractedSkills).flat().forEach(s => {
            result.skillConfidenceMap[s] = 'practice';
          });
        }
        setData(result);
      }
    } else {
      const history = Storage.getHistory();
      if (history.length > 0) setData(history[0]);
    }
  }, [id]);

  const toggleSkillConfidence = useCallback((skill: string) => {
    if (!data) return;

    const currentStatus = data.skillConfidenceMap[skill] || 'practice';
    const newStatus = currentStatus === 'know' ? 'practice' : 'know';

    const updatedConfidenceMap = {
      ...data.skillConfidenceMap,
      [skill]: newStatus
    };

    const newScore = calculateLiveScore(data.baseScore, updatedConfidenceMap);

    const updatedData = {
      ...data,
      skillConfidenceMap: updatedConfidenceMap,
      readinessScore: newScore
    };

    setData(updatedData);
    Storage.updateAnalysis(updatedData);
  }, [data]);

  const copySection = (title: string, content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: `${title} has been copied.`
    });
  };

  const downloadTxt = () => {
    if (!data) return;

    const content = `
ANALYSIS REPORT: ${data.role} @ ${data.company}
Date: ${new Date(data.createdAt).toLocaleDateString()}
Readiness Score: ${data.readinessScore}%

7-DAY INTENSIVE PLAN:
${data.plan.map(p => `${p.day}: ${p.task}`).join('\n')}

ROUND-WISE CHECKLIST:
${data.checklist.map(c => `[${c.round}]\n${c.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}

TOP 10 POTENTIAL QUESTIONS:
${data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `.trim();

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Analysis_${data.company}_${data.role}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "File Downloaded",
      description: "Your preparation strategy is ready."
    });
  };

  if (!data) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-10">
        <FileText className="h-16 w-16 text-muted-foreground mb-4 opacity-20" />
        <h2 className="text-2xl font-headline font-bold mb-2">No Analysis Found</h2>
        <p className="text-muted-foreground mb-6">Start a new analysis to see your preparation strategy.</p>
        <Link href="/dashboard/analyze">
          <Button className="rounded-xl">Go to AI Analyze</Button>
        </Link>
      </div>
    );
  }

  const weakSkills = Object.keys(data.skillConfidenceMap).filter(s => data.skillConfidenceMap[s] === 'practice').slice(0, 3);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/history" className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
            <ArrowLeft className="h-3 w-3" /> BACK TO HISTORY
          </Link>
          <h1 className="text-4xl font-headline font-bold mb-1">{data.role} @ {data.company}</h1>
          <p className="text-muted-foreground text-sm">Analyzed on {new Date(data.createdAt).toLocaleDateString()}</p>
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
        {/* Left Column - Readiness & Skills */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="glass border-primary/20 bg-primary/5 sticky top-24">
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Live Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                  <circle 
                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                    strokeDasharray={440} strokeDashoffset={440 - (data.readinessScore / 100) * 440}
                    className="text-primary transition-all duration-500 ease-out" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{data.readinessScore}%</span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground max-w-[200px]">
                {data.readinessScore > 80 ? "You're battle-ready!" : "Practice more skills to increase score."}
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Skill Assessment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                <div key={cat}>
                  <h4 className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">{cat}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(s => {
                      const isKnown = data.skillConfidenceMap[s] === 'know';
                      return (
                        <button 
                          key={s} 
                          onClick={() => toggleSkillConfidence(s)}
                          className={cn(
                            "text-xs px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2",
                            isKnown 
                              ? "bg-primary/20 border-primary text-primary" 
                              : "bg-white/5 border-white/10 text-muted-foreground hover:border-white/20"
                          )}
                        >
                          {isKnown ? <CheckCircle2 className="h-3 w-3" /> : <Zap className="h-3 w-3" />}
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preparation Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* 7 Day Plan */}
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                7-Day Intensive Plan
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => copySection("7-Day Plan", data.plan.map(p => `${p.day}: ${p.task}`).join('\n'))}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.plan.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl glass border-white/5">
                  <div className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-lg shrink-0">
                    {p.day}
                  </div>
                  <p className="text-sm font-medium">{p.task}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Preparation Checklist */}
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Round-wise Preparation
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => copySection("Checklist", data.checklist.map(c => `${c.round}\n${c.items.join(', ')}`).join('\n'))}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.checklist.map((round, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="font-bold text-primary border-b border-primary/10 pb-2">{round.round}</h4>
                  <ul className="space-y-3">
                    {round.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm group">
                        <div className="w-5 h-5 rounded-md border border-white/10 flex items-center justify-center group-hover:border-primary transition-colors">
                          <CheckCircle2 className="h-3 w-3 opacity-0 group-hover:opacity-100 text-primary" />
                        </div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Likely Questions */}
          <Card className="glass border-white/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Top 10 Potential Questions
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-muted-foreground"
                onClick={() => copySection("Questions", data.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'))}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.questions.map((q, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-all group">
                  <span className="text-primary font-bold group-hover:scale-110 transition-transform">{idx + 1}.</span>
                  <p className="text-sm font-medium">{q}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Action Next Box */}
          <Card className="glass border-primary/40 bg-primary/10 border-dashed">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-xl font-headline font-bold mb-2">Ready to start?</h3>
                  {weakSkills.length > 0 ? (
                    <p className="text-muted-foreground text-sm mb-4">
                      Focus on mastering <span className="text-primary font-bold">{weakSkills.join(', ')}</span> first.
                    </p>
                  ) : (
                    <p className="text-muted-foreground text-sm mb-4">You've mastered all identified skills! Time to shine.</p>
                  )}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <Button className="rounded-xl font-bold px-8">Start Day 1 Plan</Button>
                    <Link href="/dashboard/practice">
                      <Button variant="outline" className="glass border-white/10 rounded-xl">Visit Practice Lab</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
