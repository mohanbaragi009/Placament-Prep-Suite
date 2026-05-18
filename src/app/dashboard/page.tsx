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
import { Play, Calendar, CheckCircle2, ChevronRight, ExternalLink, Sparkles, Rocket, Cpu, Users } from "lucide-react";
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
    title: "AI Interview Simulator",
    description: "Real-time voice and video mock interviews with instant feedback.",
    icon: <Cpu className="h-5 w-5 text-primary" />,
    date: "Q4 2024"
  },
  {
    title: "Resume Optimizer",
    description: "ATS-compliant resume tailoring based on specific job descriptions.",
    icon: <Sparkles className="h-5 w-5 text-purple-500" />,
    date: "Q1 2025"
  },
  {
    title: "Referral Network",
    description: "Connect with mentors at top companies for direct referrals.",
    icon: <Users className="h-5 w-5 text-blue-500" />,
    date: "Q2 2025"
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
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      {/* Hero Welcome Section */}
      <section className="relative h-64 md:h-80 w-full rounded-3xl overflow-hidden shadow-2xl group">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/40 to-transparent flex flex-col justify-center p-8 md:p-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 w-fit mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white">Placement Readiness</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-headline font-bold text-white mb-2 tracking-tight">
            Welcome back, {displayName}
          </h1>
          <p className="text-slate-200 text-sm md:text-lg italic max-w-lg mb-6">
            "Your path to a dream placement is 72% complete. Stay consistent."
          </p>
          <div className="flex gap-4">
            <Button className="rounded-xl h-11 px-8 font-bold shadow-lg shadow-primary/20">
              Resume Plan
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
        <Card className="glass overflow-hidden flex flex-col justify-center border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-100"
                />
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  style={{ 
                    strokeDashoffset: offset,
                    transition: 'stroke-dashoffset 1.5s ease-out'
                  }}
                  className="text-primary"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold">{readinessValue}</span>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Readiness Score</span>
              </div>
            </div>
            <p className="mt-8 text-sm text-center text-muted-foreground max-w-[280px]">
              You're in the top <span className="text-primary font-bold">15%</span> of applicants for Software Engineering roles.
            </p>
          </CardContent>
        </Card>

        <Card className="glass border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(0,0,0,0.05)" />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10, fontWeight: 'bold' }} 
                />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="glass group overflow-hidden border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Continue Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Dynamic Programming</h3>
                  <p className="text-xs text-muted-foreground">Module 4: Optimization Problems</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Play className="h-5 w-5 fill-current" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
                  <span>3 / 10 Completed</span>
                  <span className="text-primary">30%</span>
                </div>
                <Progress value={30} className="h-1.5" />
              </div>
              <Button className="w-full mt-6 bg-primary/5 hover:bg-primary/10 text-primary border-none rounded-xl h-11 font-bold text-xs uppercase tracking-widest transition-all">
                Continue Session
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-none shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Weekly Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-lg font-bold">Problems Solved</h3>
                  <span className="text-xs font-bold text-muted-foreground">12/20 this week</span>
                </div>
                <Progress value={60} className="h-1.5" />
              </div>
              <div className="flex justify-between">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all",
                      i < 5 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-muted-foreground"
                    )}>
                      {i < 5 ? <CheckCircle2 className="h-4 w-4" /> : day}
                    </div>
                    <span className="text-[8px] font-bold text-muted-foreground uppercase">{day}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="glass border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssessments.map((item, i) => (
              <a 
                key={i} 
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl bg-white/50 border border-slate-100 hover:bg-white hover:border-primary/20 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="text-2xl w-10 h-10 flex items-center justify-center bg-slate-50 rounded-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                      {item.isLive && (
                        <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </div>
                    <div className={cn(
                      "flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider",
                      item.isLive ? "text-red-500" : "text-muted-foreground"
                    )}>
                      <Calendar className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Join Live
                  </span>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </a>
            ))}
            <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
              View All Schedule
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Coming Soon Section */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-8">
          <Rocket className="h-6 w-6 text-primary" />
          <h2 className="text-3xl font-headline font-bold tracking-tight">Coming Soon</h2>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">Roadmap 2024-25</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comingSoonFeatures.map((feature, i) => (
            <Card key={i} className="glass border-white/10 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <Badge variant="outline" className="text-[9px] font-bold border-slate-200">
                    {feature.date}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div className="mt-4 flex items-center gap-1 text-[10px] font-bold uppercase text-primary/60">
                  <span>Stay Tuned</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </CardContent>
              <div className="h-1 w-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-primary w-0 group-hover:w-full transition-all duration-700" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
