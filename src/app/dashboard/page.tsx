
"use client"

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar 
} from "recharts";
import { Play, Calendar, CheckCircle2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const radarData = [
  { subject: 'DSA', A: 75, fullMark: 100 },
  { subject: 'System Design', A: 60, fullMark: 100 },
  { subject: 'Communication', A: 80, fullMark: 100 },
  { subject: 'Resume', A: 85, fullMark: 100 },
  { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const upcomingAssessments = [
  { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", icon: "📝" },
  { title: "System Design Review", time: "Wed, 2:00 PM", icon: "🏗️" },
  { title: "HR Interview Prep", time: "Friday, 11:00 AM", icon: "🤝" },
];

export default function Dashboard() {
  const readinessValue = 72;
  const circumference = 2 * Math.PI * 45;
  const offset = circumference - (readinessValue / 100) * circumference;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Candidate Overview</h1>
        <p className="text-muted-foreground italic">"Success is where preparation and opportunity meet."</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Overall Readiness */}
        <Card className="glass border-white/10 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Overall Readiness</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-10">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-white/5"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="45"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={circumference}
                  style={{ strokeDashoffset: offset }}
                  className="text-primary transition-all duration-1000 ease-out"
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

        {/* Skill Breakdown */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Skill Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
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
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Continue Practice & Weekly Goals */}
        <div className="space-y-8">
          <Card className="glass border-white/10 group overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Continue Practice</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold mb-1">Dynamic Programming</h3>
                  <p className="text-xs text-muted-foreground">Module 4: Optimization Problems</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
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
              <Button className="w-full mt-6 glass-button rounded-xl h-11 font-bold text-xs uppercase tracking-widest">
                Resume Session
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
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
                      i < 5 ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white/5 text-muted-foreground"
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

        {/* Upcoming Assessments */}
        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Upcoming Assessments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssessments.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl glass border-white/5 hover:bg-white/10 transition-all cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="text-2xl w-10 h-10 flex items-center justify-center bg-white/5 rounded-lg group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm group-hover:text-primary transition-colors">{item.title}</h4>
                    <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-wider">
                      <Calendar className="h-3 w-3" />
                      {item.time}
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            ))}
            <Button variant="ghost" className="w-full text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary">
              View All Schedule
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
