"use client"

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const ALL_PROBLEMS = [
  { 
    id: 1, 
    title: "Longest Substring Without Repeating Characters", 
    difficulty: "Medium", 
    tags: ["String", "Sliding Window"],
    slug: "longest-substring-without-repeating-characters"
  },
  { 
    id: 2, 
    title: "Median of Two Sorted Arrays", 
    difficulty: "Hard", 
    tags: ["Array", "Binary Search"],
    slug: "median-of-two-sorted-arrays"
  },
  { 
    id: 3, 
    title: "Valid Parentheses", 
    difficulty: "Easy", 
    tags: ["Stack", "String"],
    slug: "valid-parentheses"
  },
  { 
    id: 4, 
    title: "Merge K Sorted Lists", 
    difficulty: "Hard", 
    tags: ["Linked List", "Heap"],
    slug: "merge-k-sorted-lists"
  },
  { 
    id: 5, 
    title: "Reverse Integer", 
    difficulty: "Medium", 
    tags: ["Math"],
    slug: "reverse-integer"
  },
  { 
    id: 6, 
    title: "Climbing Stairs", 
    difficulty: "Easy", 
    tags: ["DP", "Math"],
    slug: "climbing-stairs"
  },
  { 
    id: 7, 
    title: "Coin Change", 
    difficulty: "Medium", 
    tags: ["DP", "Array"],
    slug: "coin-change"
  },
  { 
    id: 8, 
    title: "Longest Palindromic Substring", 
    difficulty: "Medium", 
    tags: ["String", "DP"],
    slug: "longest-palindromic-substring"
  },
  { 
    id: 9, 
    title: "Two Sum", 
    difficulty: "Easy", 
    tags: ["Array", "Hash Table"],
    slug: "two-sum"
  },
];

const TAGS = ["All", "Easy", "Medium", "Hard", "Array", "String", "DP"];

export default function Practice() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredProblems = ALL_PROBLEMS.filter(p => {
    if (selectedTag === "All") return true;
    if (["Easy", "Medium", "Hard"].includes(selectedTag)) {
      return p.difficulty === selectedTag;
    }
    return p.tags.includes(selectedTag);
  });

  const getLeetCodeUrl = (slug: string) => `https://leetcode.com/problems/${slug}/`;

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Practice Problems</h1>
        <p className="text-muted-foreground">Solve problems to improve your coding skills and climb the leaderboard.</p>
      </div>

      <div className="flex flex-wrap gap-4">
        {TAGS.map((tag) => (
          <Button 
            key={tag} 
            variant="ghost" 
            onClick={() => setSelectedTag(tag)}
            className={cn(
              "glass border-white/10 rounded-full px-6 transition-all",
              selectedTag === tag ? "bg-primary text-white border-primary" : "hover:bg-primary/20"
            )}
          >
            {tag}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredProblems.length === 0 ? (
          <div className="text-center py-20 glass border-dashed border-white/10 rounded-xl">
            <p className="text-muted-foreground">No problems found for this category.</p>
          </div>
        ) : (
          filteredProblems.map((p) => (
            <Card key={p.id} className="glass border-white/10 hover:border-primary/50 transition-all group overflow-hidden">
              <CardContent className="p-0">
                <div className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                      <Code2 className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                      <div className="flex flex-wrap items-center gap-3">
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
                  <a 
                    href={getLeetCodeUrl(p.slug)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto"
                  >
                    <Button className="glass-button w-full sm:w-auto rounded-xl h-12 px-6 group">
                      Solve Now
                      <Play className="ml-2 h-4 w-4 fill-current group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
                <div className="h-1 w-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-primary w-[30%] opacity-0 group-hover:opacity-100 transition-all duration-500" />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
