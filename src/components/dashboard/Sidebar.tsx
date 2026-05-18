"use client"

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Code2, 
  FileText, 
  BookOpen, 
  User, 
  Settings,
  LogOut,
  ChevronRight,
  Sparkles,
  History
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'AI Analyze', icon: Sparkles, href: '/dashboard/analyze' },
  { label: 'History', icon: History, href: '/dashboard/history' },
  { label: 'Practice', icon: Code2, href: '/dashboard/practice' },
  { label: 'Assessments', icon: FileText, href: '/dashboard/assessments' },
  { label: 'Resources', icon: BookOpen, href: '/dashboard/resources' },
  { label: 'Profile', icon: User, href: '/dashboard/profile' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 glass border-r border-white/10 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Code2 className="text-white h-6 w-6" />
          </div>
          <span className="font-headline text-xl font-bold">Placement Prep</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center justify-between group px-4 py-3 rounded-xl transition-all duration-200",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary transition-colors")} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-2">
        <Link 
          href="/dashboard/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
        >
          <Settings className="h-5 w-5" />
          <span className="font-medium text-sm">Settings</span>
        </Link>
        <Link 
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium text-sm">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
