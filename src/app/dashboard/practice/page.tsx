import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Play } from "lucide-react";

export default function Practice() {
  const problems = [
    { id: 1, title: "Longest Substring Without Repeating Characters", difficulty: "Medium", tags: ["String", "Sliding Window"] },
    { id: 2, title: "Median of Two Sorted Arrays", difficulty: "Hard", tags: ["Array", "Binary Search"] },
    { id: 3, title: "Valid Parentheses", difficulty: "Easy", tags: ["Stack", "String"] },
    { id: 4, title: "Merge K Sorted Lists", difficulty: "Hard", tags: ["Linked List", "Heap"] },
    { id: 5, title: "Reverse Integer", difficulty: "Medium", tags: ["Math"] },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Practice Problems</h1>
        <p className="text-muted-foreground">Solve problems to improve your coding skills and climb the leaderboard.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {["All", "Easy", "Medium", "Hard", "Array", "String", "DP"].map((tag) => (
          <Button key={tag} variant="ghost" className="glass border-white/10 rounded-full px-6 hover:bg-primary hover:text-white transition-all">
            {tag}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {problems.map((p) => (
          <Card key={p.id} className="glass border-white/10 hover:border-primary/50 transition-all group overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Code2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={cn(
                        "rounded-none font-bold text-[10px] uppercase tracking-widest px-3 py-1",
                        p.difficulty === "Easy" ? "text-green-400 border-green-400/20 bg-green-400/5" :
                        p.difficulty === "Medium" ? "text-yellow-400 border-yellow-400/20 bg-yellow-400/5" :
                        "text-destructive border-destructive/20 bg-destructive/5"
                      )}>
                        {p.difficulty}
                      </Badge>
                      {p.tags.map(t => (
                        <span key={t} className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded">#{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <Button className="glass-button rounded-xl h-12 px-6 group">
                  Solve Now
                  <Play className="ml-2 h-4 w-4 fill-current group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="h-1 w-full bg-white/5 overflow-hidden">
                <div className="h-full bg-primary w-[30%] opacity-0 group-hover:opacity-100 transition-all duration-500" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}