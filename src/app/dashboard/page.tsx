import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Trophy, Clock, Star } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Welcome back, John!</h1>
        <p className="text-muted-foreground">You're on a 5-day practice streak. Keep it up!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Problems Solved", value: "128", icon: Code2, color: "text-blue-400" },
          { label: "Points Earned", value: "2,450", icon: Trophy, color: "text-yellow-400" },
          { label: "Hours Practiced", value: "42", icon: Clock, color: "text-green-400" },
          { label: "Mock Score", value: "84%", icon: Star, color: "text-purple-400" },
        ].map((stat, i) => (
          <Card key={i} className="glass-card border-white/10">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-white/5`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">+12% this week</span>
              </div>
              <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 glass border-white/10">
          <CardHeader>
            <CardTitle className="font-headline">Recommended Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Dynamic Programming Challenge", desc: "Medium difficulty • 45 mins", type: "Practice" },
              { title: "Behavioral Mock Interview", desc: "Leadership principles focus", type: "Mock" },
              { title: "System Design Basics", desc: "Read 3 core modules", type: "Resources" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 border border-white/5 transition-colors group cursor-pointer">
                <div>
                  <h4 className="font-bold mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-primary/10 text-[10px] font-bold text-primary uppercase tracking-widest">
                  {item.type}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { activity: "Solved 'Two Sum'", time: "2 hours ago" },
                { activity: "Completed Mock Interview", time: "Yesterday" },
                { activity: "Shared Resource: Graph Theory", time: "2 days ago" },
              ].map((log, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-1 h-12 bg-primary/20 rounded-full relative">
                    <div className="absolute top-0 left-0 w-1 h-4 bg-primary rounded-full" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{log.activity}</p>
                    <p className="text-xs text-muted-foreground">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}