"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from "recharts";
import { Play, Calendar, CheckCircle2, ChevronRight, ExternalLink, Sparkles, Rocket, Cpu, Compass } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useUser, useFirebase, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

const radarData = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const upcomingAssessments = [
  { 
    title: "DSA Mock Test", 
    time: "LIVE NOW", 
    icon: "📝", 
    url: "https://leetcode.com/contest/",
    isLive: true 
  },
  { 
    title: "System Design Review", 
    time: "Wed, 2:00 PM", 
    icon: "🏗️", 
    url: "https://takeuforward.org/system-design-blueprint-roadmap-for-interviews/",
    isLive: false 
  },
  { 
    title: "HR Interview Prep", 
    time: "Friday, 11:00 AM", 
    icon: "🤝", 
    url: "https://takeuforward.org/interviews/behavioral-interview-questions-most-asked/",
    isLive: false 
  },
];

const comingSoonFeatures = [
  {
    title: "AI Career Navigator",
    description: "Advanced career path mapping and real-time guidance to navigate your professional journey.",
    icon: <Compass className="h-5 w-5 text-emerald-500" />,
    date: "Q3 2026"
  },
  {
    title: "AI Interview Simulator",
    description: "Real-time voice and video mock interviews with instant feedback.",
    icon: <Cpu className="h-5 w-5 text-primary" />,
    date: "Q4 2026"
  },
  {
    title: "Resume Optimizer",
    description: "ATS-compliant resume tailoring based on specific job descriptions.",
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    date: "Q1 2027"
  }
];

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const { user } = useUser();
  const { db } = useFirebase();
  const readinessValue = 72;
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  
  const [offset, setOffset] = useState(circumference);

  const profileRef = React.useMemo(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid, "profile", "main");
  }, [user, db]);

  const { data: profile } = useDoc<any>(profileRef as any);
  const displayName = profile?.displayName || user?.displayName || 'Candidate';

  const heroImage = PlaceHolderImages.find(img => img.id === 'dashboard-hero');

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setOffset(circumference - (readinessValue / 100) * circumference);
    }, 100);
    return () => clearTimeout(timer);
  }, [circumference, readinessValue]);

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Hero Welcome Section */}
      <section className="relative h-64 md:h-80 w-full rounded-[2.5rem] overflow-hidden shadow-2xl group border-4 border-white/30">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/60 via-slate-900/20 to-transparent flex flex-col justify-center p-8 md:p-16 backdrop-blur-[2px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/30 backdrop-blur-xl border border-white/20 w-fit mb-6">
            <Sparkles className="h-4 w-4 text-white" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Placement Readiness</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-white mb-3 tracking-tight">
            Welcome back, {displayName}
          </h1>
          <p className="text-slate-100 text-sm md:text-xl italic max-w-xl mb-8 leading-relaxed opacity-90">
            "Your path to a dream placement is 72% complete. Stay consistent."
          </p>
          <div className="flex gap-4">
            <Button className="rounded-2xl h-12 px-10 font-bold bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/10 transition-all hover:scale-105">
              Resume Plan
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <Card className="glass-card flex flex-col justify-center border-none overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90 filter drop-shadow-md">
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  className="text-white/20"
                />
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="10"
                  fill="transparent"
                  strokeDasharray={circumference}
                  style={{ 
                    strokeDashoffset: offset,
                    transition: 'stroke-dashoffset 2s cubic-bezier(0.2, 0.8, 0.2, 1)'
                  }}
                  className="text-primary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-6xl font-black tracking-tighter text-slate-800">{readinessValue}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Score</span>
              </div>
            </div>
            <p className="mt-10 text-sm text-center text-muted-foreground max-w-[280px] leading-relaxed">
              You're in the top <span className="text-primary font-bold">15%</span> of applicants for Software Engineering roles.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card border-none overflow-hidden">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] w-full p-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.05)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11, fontWeight: '700', opacity: 0.8 }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="glass-card group border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Continue Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-black mb-1 tracking-tight">Dynamic Programming</h3>
                  <p className="text-xs text-muted-foreground font-medium">Module 4: Optimization Problems</p>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-premium hover:scale-110">
                  <Play className="h-6 w-6 fill-current" />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span>3 / 10 Modules Done</span>
                  <span>30%</span>
                </div>
                <Progress value={30} className="h-2 bg-white/40" />
              </div>
              <Button className="w-full mt-8 glass-button text-primary font-bold text-[10px] uppercase tracking-[0.2em] h-12 rounded-2xl">
                Continue Session
              </Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between items-end mb-3">
                  <h3 className="text-xl font-bold tracking-tight">Problems Solved</h3>
                  <span className="text-xs font-bold text-muted-foreground">12/20 this week</span>
                </div>
                <Progress value={60} className="h-2 bg-white/40" />
              </div>
              <div className="flex justify-between">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center text-[11px] font-bold transition-all border border-white/40",
                      i < 5 ? "bg-primary text-white shadow-lg shadow-primary/20 scale-110" : "bg-white/30 text-muted-foreground"
                    )}>
                      {i < 5 ? <CheckCircle2 className="h-5 w-5" /> : day}
                    </div>
                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-70">Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssessments.map((item, i) => (
              <a 
                key={i} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-5 rounded-3xl bg-white/30 border border-white/40 hover:bg-white/50 transition-all cursor-pointer group shadow-sm backdrop-blur-sm"
              >
                <div className="flex items-center gap-5">
                  <div className="text-3xl w-12 h-12 flex items-center justify-center bg-white/40 rounded-2xl group-hover:scale-110 transition-transform shadow-inner">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4 className="font-bold text-base group-hover:text-primary transition-colors tracking-tight">{item.title}</h4>
                      {item.isLive && (
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse ring-2 ring-red-100" />
                      )}
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest",
                      item.isLive ? "text-red-500" : "text-muted-foreground opacity-70"
                    )}>
                      <Calendar className="h-3.5 w-3.5" />
                      {item.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                    Join Live
                  </span>
                  <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
            <Button variant="ghost" className="w-full text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors h-10 mt-2">
              View All Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Section */}
      <section className="mt-16 pt-10 border-t border-white/40">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Rocket className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-headline font-bold tracking-tight">Platform Roadmap</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20">Roadmap 2026-27</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {comingSoonFeatures.map((feature, i) => (
            <Card key={i} className="glass-card border-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-2xl bg-white/40 border border-white/50 flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner">
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="text-[10px] font-black tracking-widest uppercase border-primary/20 bg-primary/5 text-primary px-3 py-1">
                    {feature.date}
                  </Badge>
                </div>
                <h3 className="text-2xl font-black mb-3 group-hover:text-primary transition-colors tracking-tight">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                  {feature.description}
                </p>
                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/70">
                  <span>Development Phase</span>
                  <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
              <div className="h-1.5 w-full bg-white/20 overflow-hidden">
                <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-in-out" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
