
"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, ArrowRight, Loader2, ShieldCheck, Trophy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function RegisterAssessment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const handleRegister = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
      toast({
        title: "Registration Successful",
        description: "You have been registered for the Monthly Global Coding Challenge.",
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-headline font-bold mb-2">Registration Phase</h1>
        <p className="text-muted-foreground italic">"One step closer to your dream placement."</p>
      </header>

      {step === 1 ? (
        <Card className="glass border-primary/20 shadow-2xl overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10 p-8">
            <CardTitle className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-primary" />
              Global Coding Challenge
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="experience">Current Experience Level</Label>
                <select id="experience" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>Beginner (0-1 Years)</option>
                  <option>Intermediate (1-3 Years)</option>
                  <option>Advanced (3+ Years)</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="pref">Preferred Language</Label>
                <div className="flex gap-4">
                  {['Java', 'C++', 'Python', 'JS'].map((lang) => (
                    <div key={lang} className="flex items-center space-x-2">
                      <Checkbox id={lang} />
                      <label htmlFor={lang} className="text-sm font-medium leading-none">{lang}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
                <div className="flex items-start gap-3">
                  <Checkbox id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-xs text-muted-foreground leading-relaxed">
                    I agree to the challenge rules, code of conduct, and understand that plagiarism will result in immediate disqualification.
                  </label>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleRegister}
              disabled={loading}
              className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Confirm Registration
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="glass border-green-500/20 bg-green-500/5 p-12 text-center animate-in zoom-in-95 duration-500">
          <CardContent className="space-y-6">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-headline font-bold">Successfully Registered!</h2>
            <p className="text-muted-foreground">
              Your registration is complete. We've sent the challenge guidelines to your registered email.
            </p>
            <div className="pt-6">
              <Button onClick={() => router.push('/dashboard/assessments')} className="rounded-xl px-10 h-12">
                Back to Assessments
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
