import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Code, Video, BarChart3, ChevronRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10 px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code className="text-white h-5 w-5" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">Placement Prep</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-sm font-medium">Login</Button>
          </Link>
          <Link href="/dashboard">
            <Button className="glass-button rounded-full px-6">Join Now</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">New: AI Mock Interviews</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-headline font-bold mb-6 tracking-tight leading-tight">
          Ace Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Placement</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
          The all-in-one platform to practice coding, take mock assessments, and track your progress to land your dream job at top tech companies.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="h-14 px-10 rounded-full text-lg font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group">
            Get Started
            <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Practice Problems",
              description: "Master algorithms and data structures with our curated collection of 1000+ problems.",
              icon: <Code className="h-6 w-6 text-primary" />,
            },
            {
              title: "Mock Interviews",
              description: "Experience real-world interview scenarios with our video-based AI mock sessions.",
              icon: <Video className="h-6 w-6 text-primary" />,
            },
            {
              title: "Track Progress",
              description: "Monitor your improvement with detailed analytics and skill-based performance charts.",
              icon: <BarChart3 className="h-6 w-6 text-primary" />,
            },
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-white/10 group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-headline font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
              <Code className="text-primary h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">Placement Prep</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Placement Prep Platform. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}