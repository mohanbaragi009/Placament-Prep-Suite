import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Code, Video, BarChart3, ChevronRight, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function LandingPage() {
  const heroBg = PlaceHolderImages.find(img => img.id === 'landing-hero-bg');

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-slate-50">
      {/* Background Hero Image with Overlay */}
      {heroBg && (
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBg.imageUrl}
            alt="Hero Background"
            fill
            className="object-cover opacity-10"
            data-ai-hint={heroBg.imageHint}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/80" />
        </div>
      )}

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass-nav px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Code className="text-white h-5 w-5" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight text-slate-900">Placement Prep</span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="text-sm font-bold text-slate-600 hover:text-primary transition-colors">
            Login
          </Link>
          <Link href="/dashboard">
            <Button className="rounded-full px-8 bg-primary hover:bg-primary/90 text-white font-bold shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95">
              Join Now
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center pt-32 pb-20 px-6 text-center max-w-5xl mx-auto animate-in fade-in duration-1000">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass mb-12 shadow-sm border-white/50 animate-in slide-in-from-bottom-4 duration-700 hover:scale-110 transition-transform cursor-default">
          <Sparkles className="h-4 w-4 text-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">NEW: AI MOCK INTERVIEWS</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-headline font-black mb-8 tracking-tighter leading-[0.9] text-slate-900">
          Ace Your <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-indigo-600">Placement</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600/80 mb-12 max-w-2xl leading-relaxed font-medium">
          The all-in-one platform to practice coding, take mock assessments, and track your progress to land your dream job at top tech companies.
        </p>

        <Link href="/dashboard">
          <Button size="lg" className="h-16 px-12 rounded-full text-xl font-black bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 group transition-all hover:scale-110 active:scale-95 text-white">
            Get Started
            <ChevronRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
          </Button>
        </Link>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
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
            <div key={i} className="glass-card p-10 group border-white/60">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-12 transition-transform shadow-inner">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-headline font-black mb-4 tracking-tight text-slate-900 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed font-medium">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/40 glass mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center shadow-inner">
              <Code className="text-primary h-5 w-5" />
            </div>
            <span className="font-black tracking-tight text-slate-900 uppercase text-sm">Placement Prep</span>
          </div>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            © {new Date().getFullYear()} Placement Prep Platform. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-8">
            <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors">Twitter</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors">GitHub</Link>
            <Link href="#" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-primary transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}