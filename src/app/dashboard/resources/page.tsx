"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, ExternalLink, Download, Loader2, Sparkles, X, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { fetchTopicDetails, FetchTopicDetailsOutput } from "@/ai/flows/fetch-topic-details";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const RESOURCES_LIST = [
  { title: "Data Structures Mastery", cat: "Algorithms", items: 12 },
  { title: "Modern System Design", cat: "Architecture", items: 8 },
  { title: "Interview Cheat Sheets", cat: "Preparation", items: 5 },
  { title: "JavaScript ES6+ Deep Dive", cat: "Language", items: 15 },
  { title: "Cracking the SQL Interview", cat: "Databases", items: 10 },
  { title: "Behavioral Prep Guide", cat: "Soft Skills", items: 4 },
];

export default function Resources() {
  const { toast } = useToast();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [details, setDetails] = useState<FetchTopicDetailsOutput | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTopicClick = async (topic: string) => {
    setSelectedTopic(topic);
    setLoading(true);
    setDetails(null);
    
    try {
      const result = await fetchTopicDetails({ topic });
      setDetails(result);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fetch Failed",
        description: "Could not retrieve topic details. Please try again.",
      });
      setSelectedTopic(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Resources</h1>
        <p className="text-muted-foreground italic">"Quality knowledge is the foundation of success."</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RESOURCES_LIST.map((res, i) => (
          <Card 
            key={i} 
            className="glass-card border-white/10 group cursor-pointer overflow-hidden relative"
            onClick={() => handleTopicClick(res.title)}
          >
            <CardContent className="p-8">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <BookOpen className="text-primary h-6 w-6" />
              </div>
              <p className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mb-2">{res.cat}</p>
              <h3 className="text-2xl font-headline font-bold mb-4">{res.title}</h3>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-sm">{res.items} Modules</span>
                <div className="flex gap-3">
                  <Download className="h-4 w-4 hover:text-primary transition-colors" />
                  <ExternalLink className="h-4 w-4 hover:text-primary transition-colors" />
                </div>
              </div>
            </CardContent>
            <div className="h-1 bg-gradient-to-r from-primary to-purple-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            
            {loading && selectedTopic === res.title && (
              <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex items-center justify-center z-10">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
          </Card>
        ))}
      </div>

      <Dialog open={!!details} onOpenChange={(open) => !open && setDetails(null)}>
        <DialogContent className="max-w-3xl glass border-white/10 shadow-2xl p-0 overflow-hidden max-h-[90vh]">
          {details && (
            <div className="flex flex-col h-full">
              <div className="p-8 bg-gradient-to-br from-primary/20 to-purple-500/10 border-b border-white/10 relative">
                <button 
                  onClick={() => setDetails(null)}
                  className="absolute right-4 top-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-4">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">AI Insights</span>
                </div>
                <h2 className="text-4xl font-headline font-bold mb-2 tracking-tight">{details.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{details.summary}</p>
              </div>

              <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6 flex items-center gap-2">
                    <ChevronRight className="h-3 w-3 text-primary" /> Core Mastery Concepts
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {details.coreConcepts.map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl glass border-white/5 bg-white/5 hover:border-primary/30 transition-all">
                        <h4 className="font-bold mb-1 text-primary">{item.concept}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Interview Strategy</h3>
                    <ul className="space-y-4">
                      {details.interviewTips.map((tip, idx) => (
                        <li key={idx} className="flex gap-3 items-start text-sm">
                          <div className="h-5 w-5 rounded bg-primary/20 flex items-center justify-center shrink-0 text-primary text-[10px] font-bold">
                            {idx + 1}
                          </div>
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">Learning Path</h3>
                    <div className="space-y-3">
                      {details.recommendedResources.map((res, idx) => (
                        <a 
                          key={idx} 
                          href="#" 
                          className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group"
                        >
                          <span className="text-sm font-medium">{res.title}</span>
                          <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </a>
                      ))}
                    </div>
                  </section>
                </div>
              </div>

              <div className="p-6 border-t border-white/10 bg-background/50 flex justify-end gap-3">
                <Button variant="ghost" onClick={() => setDetails(null)} className="rounded-xl">Close</Button>
                <Button className="rounded-xl px-8 font-bold shadow-lg shadow-primary/20">Add to Plan</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
