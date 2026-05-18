
"use client"

import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Rocket, ShieldCheck, ArrowLeft, CheckCircle2, AlertTriangle, Sparkles } from "lucide-react";
import Link from 'next/link';
import { PrpState } from "@/lib/prp-state";

export default function ShipPage() {
  const [isLocked, setIsLocked] = useState(true);
  const [isShipped, setIsShipped] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsLocked(!PrpState.getChecklistPassed());
    setIsShipped(PrpState.isShipped());
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
            <p>All quality and logic parameters met.</p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500" /> 10/10 Stability Tests Passed</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500" /> Proof Artifacts Registered</li>
              <li className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-green-500" /> Shipped Status Validated</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="glass border-white/10 flex flex-col justify-center items-center p-8 text-center">
          {isShipped ? (
             <div className="space-y-6">
                <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                   <Sparkles className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Project Shipped</h3>
                <p className="text-sm text-muted-foreground italic">You built a real product. This is your proof of work.</p>
                <Link href="/prp/proof">
                  <Button className="w-full rounded-xl">View Submission</Button>
                </Link>
             </div>
          ) : (
            <>
              <Rocket className="h-16 w-16 text-primary mb-6 animate-bounce" />
              <h3 className="text-2xl font-bold mb-2">Final Step</h3>
              <p className="text-sm text-muted-foreground mb-8 italic">Register your build proofs to unlock the final status.</p>
              <Link href="/prp/proof" className="w-full">
                <Button className="w-full h-14 rounded-2xl bg-primary text-xl font-bold shadow-2xl shadow-primary/30 hover:scale-[1.02] transition-all">
                  Register Proof
                </Button>
              </Link>
            </>
          )}
        </Card>
      </div>

      <div className="p-6 rounded-2xl border border-white/5 bg-white/5 flex items-start gap-4 max-w-2xl mx-auto">
        <AlertTriangle className="h-5 w-5 text-yellow-500 mt-1 shrink-0" />
        <p className="text-xs text-muted-foreground leading-relaxed">
          Once your project is marked as <span className="font-bold text-foreground">Shipped</span>, ensure you copy your Final Submission from the Proof page for record keeping.
        </p>
      </div>
    </div>
  );
}
