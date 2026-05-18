
"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Rocket, ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from 'next/link';

export default function ShipPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('prp_test_checklist');
    if (saved) {
      try {
        const checklist = JSON.parse(saved);
        const passedCount = Object.values(checklist).filter(v => v === true).length;
        if (passedCount === 10) {
          setIsLocked(false);
        }
      } catch (e) {
        console.error("Failed to parse checklist", e);
      }
    }
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (isLocked) {
    return (
      <div className="h-[80vh] flex flex-col items-center justify-center p-10 animate-in fade-in zoom-in-95 duration-500">
        <div className="w-24 h-24 rounded-full bg-destructive/10 flex items-center justify-center mb-8 border border-destructive/20 shadow-2xl shadow-destructive/10">
          <Lock className="h-10 w-10 text-destructive animate-pulse" />
        </div>
        <h1 className="text-4xl font-headline font-bold mb-4 text-center">Shipping Gate Locked</h1>
        <p className="text-muted-foreground text-center max-w-md mb-8 leading-relaxed">
          The production deployment gateway is restricted. You must complete all 10 Quality Assurance tests before this phase can be initiated.
        </p>
        <Link href="/prp/07-test">
          <Button className="rounded-xl h-14 px-10 font-bold text-lg group">
            <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            Return to Testing
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 space-y-12 animate-in slide-in-from-bottom-10 duration-700">
      <div className="text-center space-y-4">
        <Badge className="bg-green-500/20 text-green-500 border-green-500/30 font-bold px-4 py-1 mb-4">
          <ShieldCheck className="h-3 w-3 mr-2" /> QA VERIFIED
        </Badge>
        <h1 className="text-6xl font-headline font-bold tracking-tight">Ready for Deployment</h1>
        <p className="text-xl text-muted-foreground italic">"Your vision is now ready for the world."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="glass border-green-500/20 bg-green-500/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              Build Success
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            <p>All 10 stability tests passed successfully.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500" /> Validation Logic Verified</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500" /> Analysis Engine Stress-Tested</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500" /> Storage Persistence Confirmed</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 flex flex-col justify-center items-center p-8 text-center">
          <Rocket className="h-16 w-16 text-primary mb-6 animate-bounce" />
          <h3 className="text-2xl font-bold mb-2">Final Step</h3>
          <p className="text-sm text-muted-foreground mb-8 italic">Review all configuration one last time before pushing to production.</p>
          <Button className="w-full h-14 rounded-2xl bg-primary text-xl font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all">
            Initiate Deploy
          </Button>
        </Card>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-start gap-4 max-w-2xl mx-auto">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Deploying will make this version of the <span className="font-bold text-foreground">Placement Readiness Platform</span> live to all users. Ensure you have backed up any critical local test data before continuing.
        </p>
      </div>
    </div>
  );
}
