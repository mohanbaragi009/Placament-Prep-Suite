"use client"

import React, { useEffect, useState } from 'react';
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
  FileText
} from "lucide-react";
import Link from 'next/link';
import { Storage } from "@/lib/storage";
import { AnalysisResult } from "@/lib/analysis-engine";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [data, setData] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    if (id) {
      const result = Storage.getById(id);
      if (result) setData(result);
    } else {
      const history = Storage.getHistory();
      if (history.length > 0) setData(history[0]);
    }
  }, [id]);

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

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/history" className="text-xs font-bold text-muted-foreground hover:text-primary flex items-center gap-1 mb-4">
            <ArrowLeft className="h-3 w-3" /> BACK TO HISTORY
          </Link>
          <h1 className="text-4xl font-headline font-bold mb-1">{data.role} @ {data.company}</h1>
          <p className="text-muted-foreground text-sm">Analyzed on {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="glass border-white/10 rounded-xl h-12">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
          <Link href="/dashboard/analyze">
            <Button className="rounded-xl h-12 font-bold px-6">New Analysis</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Readiness & Skills */}
        <div className="lg:col-span-1 space-y-8">
          <Card className="glass border-primary/20 bg-primary/5">
            <CardHeader className="text-center">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Readiness Score</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center py-6">
              <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-white/5" />
                  <circle 
                    cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                    strokeDasharray={440} strokeDashoffset={440 - (data.readinessScore / 100) * 440}
                    className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{data.readinessScore}%</span>
                </div>
              </div>
              <p className="text-xs text-center text-muted-foreground max-w-[200px]">
                {data.readinessScore > 80 ? "Excellent profile match!" : "Keep practicing to boost your match."}
              </p>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Extracted Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(data.extractedSkills).map(([cat, skills]) => (
                <div key={cat}>
                  <h4 className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">{cat}</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(s => (
                      <Badge key={s} variant="outline" className="glass border-white/10 py-1">{s}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Preparation Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Preparation Checklist */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Round-wise Preparation
              </CardTitle>
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

          {/* 7 Day Plan */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                7-Day Intensive Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.plan.map((p, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl glass border-white/5">
                  <div className="bg-primary/10 text-primary font-bold text-xs px-3 py-1 rounded-lg">
                    {p.day}
                  </div>
                  <p className="text-sm font-medium">{p.task}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Likely Questions */}
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Top 10 Potential Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.questions.map((q, idx) => (
                <div key={idx} className="flex gap-4 p-4 rounded-xl border border-white/5 hover:border-primary/20 transition-all">
                  <span className="text-primary font-bold">{idx + 1}.</span>
                  <p className="text-sm font-medium">{q}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
