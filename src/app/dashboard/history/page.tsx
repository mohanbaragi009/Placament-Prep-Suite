"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { History as HistoryIcon, Search, ChevronRight, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Storage } from "@/lib/storage";
import { AnalysisResult } from "@/lib/analysis-engine";

export default function HistoryPage() {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setHistory(Storage.getHistory());
  }, []);

  const filteredHistory = history.filter(h => 
    h.company.toLowerCase().includes(search.toLowerCase()) || 
    h.role.toLowerCase().includes(search.toLowerCase())
  );

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      Storage.clearHistory();
      setHistory([]);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-headline font-bold mb-2">History</h1>
          <p className="text-muted-foreground">Manage and revisit your past job analyses.</p>
        </div>
        {history.length > 0 && (
          <Button variant="ghost" onClick={clearHistory} className="text-destructive hover:bg-destructive/10">
            <Trash2 className="h-4 w-4 mr-2" /> Clear All
          </Button>
        )}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search by company or role..." 
          className="pl-10 glass border-white/10 rounded-xl"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filteredHistory.length === 0 ? (
        <Card className="glass border-dashed border-white/10 py-20 text-center">
          <CardContent>
            <HistoryIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground mb-6">No history items found.</p>
            <Link href="/dashboard/analyze">
              <Button className="rounded-xl px-8 font-bold">New Analysis</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((item) => (
            <Link key={item.id} href={`/dashboard/results?id=${item.id}`}>
              <Card className="glass border-white/10 hover:border-primary/50 transition-all group">
                <CardContent className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex flex-col items-center justify-center">
                      <span className="text-primary font-bold text-lg">{item.readinessScore}</span>
                      <span className="text-[8px] font-bold text-primary uppercase">Score</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.company}</h3>
                      <p className="text-sm text-muted-foreground font-medium">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">Date</p>
                      <p className="text-sm font-medium">{new Date(item.createdAt).toLocaleDateString()}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
