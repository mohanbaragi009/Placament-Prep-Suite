import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Timer, AlertCircle, CheckCircle2 } from "lucide-react";

export default function Assessments() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Assessments</h1>
        <p className="text-muted-foreground">Test your knowledge with timed mock exams and technical assessments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="glass border-primary/20 bg-primary/5">
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Badge className="bg-primary text-white">UPCOMING</Badge>
              <div className="flex items-center gap-2 text-primary">
                <span className="text-sm font-bold flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  Starts in 2h 45m
                </span>
              </div>
            </div>
            <CardTitle className="text-3xl font-headline">Monthly Global Coding Challenge</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">Compete with 5,000+ developers worldwide. 3 Algorithmic problems, 90 minutes. Top performers get priority access to hiring partners.</p>
            <div className="flex gap-4">
              <Button className="flex-1 h-12 rounded-xl bg-primary text-white font-bold">Register Now</Button>
              <Button variant="outline" className="glass border-white/10 rounded-xl h-12">Set Reminder</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-white/10">
          <CardHeader>
            <CardTitle className="font-headline">Recent Assessment Reports</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Weekly Mock #14", score: "88/100", status: "Completed", date: "Oct 24" },
              { title: "React Fundamentals", score: "92/100", status: "Completed", date: "Oct 21" },
              { title: "SQL & Databases", score: "74/100", status: "Improvement Needed", date: "Oct 18" },
            ].map((report, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl glass border-white/5">
                <div className="flex items-center gap-4">
                  {parseInt(report.score) > 80 ? <CheckCircle2 className="text-green-400" /> : <AlertCircle className="text-yellow-400" />}
                  <div>
                    <h4 className="font-bold">{report.title}</h4>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">{report.score}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${report.status === 'Completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {report.status}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}