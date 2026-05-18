
"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, Info, RotateCcw, ArrowRight } from "lucide-react";
import Link from 'next/link';

const TEST_ITEMS = [
  { id: 'jd-validation', label: 'JD required validation works', hint: 'Try to analyze with an empty JD field.' },
  { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Paste a very short sentence in the JD field.' },
  { id: 'extraction', label: 'Skills extraction groups correctly', hint: 'Paste a JD with various tech stacks and check categories.' },
  { id: 'mapping', label: 'Round mapping changes based on company + skills', hint: 'Change company name and see if results reflect it.' },
  { id: 'deterministic', label: 'Score calculation is deterministic', hint: 'Same JD should result in the same base score.' },
  { id: 'live-score', label: 'Skill toggles update score live', hint: 'Toggle "I know this" on the results page.' },
  { id: 'persistence', label: 'Changes persist after refresh', hint: 'Modify a result, refresh, and check if toggles stayed.' },
  { id: 'history', label: 'History saves and loads correctly', hint: 'Check the History page after an analysis.' },
  { id: 'export', label: 'Export buttons copy the correct content', hint: 'Test "Copy 7-day plan" and "Download TXT".' },
  { id: 'no-errors', label: 'No console errors on core pages', hint: 'Open DevTools and browse Analyze, History, and Results.' },
];

export default function TestChecklistPage() {
  const [checklist, setChecklist] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('prp_test_checklist');
    if (saved) {
      try {
        setChecklist(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load checklist", e);
      }
    }
    setMounted(true);
  }, []);

  const toggleItem = (id: string) => {
    const updated = { ...checklist, [id]: !checklist[id] };
    setChecklist(updated);
    localStorage.setItem('prp_test_checklist', JSON.stringify(updated));
  };

  const resetChecklist = () => {
    if (confirm("Reset all test progress?")) {
      setChecklist({});
      localStorage.removeItem('prp_test_checklist');
    }
  };

  const passedCount = TEST_ITEMS.filter(item => checklist[item.id]).length;
  const allPassed = passedCount === TEST_ITEMS.length;

  if (!mounted) return null;

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-headline font-bold mb-2">Quality Assurance</h1>
          <p className="text-muted-foreground italic">"Trust, but verify. Ship with confidence."</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={resetChecklist} className="text-muted-foreground hover:text-primary">
            <RotateCcw className="h-4 w-4 mr-2" /> Reset
          </Button>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</p>
            <Badge className={allPassed ? "bg-green-500" : "bg-yellow-500"}>
              {allPassed ? "READY TO SHIP" : "TESTING IN PROGRESS"}
            </Badge>
          </div>
        </div>
      </header>

      <Card className="glass border-primary/20 bg-primary/5">
        <CardContent className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="relative w-20 h-20 flex items-center justify-center">
               <svg className="w-full h-full -rotate-90">
                <circle cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                <circle 
                  cx="40" cy="40" r="35" stroke="currentColor" strokeWidth="6" fill="transparent" 
                  strokeDasharray={220} strokeDashoffset={220 - (passedCount / 10) * 220}
                  className="text-primary transition-all duration-500" strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-xl font-bold">{passedCount}/10</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Tests Passed</h2>
              <p className="text-muted-foreground text-sm">
                {allPassed ? "All criteria met. Shipping gate unlocked." : "Complete all tests to unlock the shipping phase."}
              </p>
            </div>
          </div>
          {allPassed && (
            <Link href="/prp/08-ship">
              <Button className="rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20 group">
                Proceed to Ship
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>

      {!allPassed && (
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center gap-3 text-yellow-500 text-sm font-medium">
          <AlertCircle className="h-4 w-4" />
          Fix issues before shipping. {10 - passedCount} tests remaining.
        </div>
      )}

      <div className="grid gap-4">
        {TEST_ITEMS.map((test) => (
          <Card key={test.id} className={`glass border-white/10 transition-all ${checklist[test.id] ? 'opacity-60 bg-white/5' : ''}`}>
            <CardContent className="p-6 flex items-start gap-4">
              <Checkbox 
                id={test.id} 
                checked={checklist[test.id]} 
                onCheckedChange={() => toggleItem(test.id)}
                className="mt-1 h-6 w-6 rounded-lg border-primary"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor={test.id} className={`font-bold text-lg cursor-pointer ${checklist[test.id] ? 'line-through text-muted-foreground' : ''}`}>
                    {test.label}
                  </label>
                  {checklist[test.id] && <CheckCircle2 className="h-5 w-5 text-green-500" />}
                </div>
                <div className="flex items-start gap-2 text-xs text-muted-foreground group">
                  <Info className="h-3 w-3 mt-0.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" />
                  <p className="italic">{test.hint}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
