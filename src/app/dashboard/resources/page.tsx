import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ExternalLink, Download } from "lucide-react";

export default function Resources() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Resources</h1>
        <p className="text-muted-foreground">Curated study materials, cheat sheets, and interview guides.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "Data Structures Mastery", cat: "Algorithms", items: 12 },
          { title: "Modern System Design", cat: "Architecture", items: 8 },
          { title: "Interview Cheat Sheets", cat: "Preparation", items: 5 },
          { title: "JavaScript ES6+ Deep Dive", cat: "Language", items: 15 },
          { title: "Cracking the SQL Interview", cat: "Databases", items: 10 },
          { title: "Behavioral Prep Guide", cat: "Soft Skills", items: 4 },
        ].map((res, i) => (
          <Card key={i} className="glass-card border-white/10 group cursor-pointer overflow-hidden">
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-primary h-6 w-6" />
              </div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{res.cat}</p>
              <h3 className="text-2xl font-headline font-bold mb-4">{res.title}</h3>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-sm">{res.items} Modules</span>
                <div className="flex gap-3">
                  <Download className="h-4 w-4 hover:text-primary" />
                  <ExternalLink className="h-4 w-4 hover:text-primary" />
                </div>
              </div>
            </CardContent>
            <div className="h-1 bg-gradient-to-r from-primary to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Card>
        ))}
      </div>
    </div>
  );
}