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
  History,
  LogIn,
  Calendar as CalendarIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUser, useAuth } from "@/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'AI Analyze', icon: Sparkles, href: '/dashboard/analyze' },
  { label: 'History', icon: History, href: '/dashboard/history' },
  { label: 'Practice', icon: Code2, href: '/dashboard/practice' },
  { label: 'Assessments', icon: FileText, href: '/dashboard/assessments' },
  { label: 'Calendar', icon: CalendarIcon, href: '/dashboard/calendar' },
  { label: 'Resources', icon: BookOpen, href: '/dashboard/resources' },
  { label: 'Profile', icon: User, href: '/dashboard/profile' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user } = useUser();
  const auth = useAuth();

  const handleLogin = async () => {
    if (!auth) {
      toast({
        variant: "destructive",
        title: "Configuration Missing",
        description: "Firebase is not configured. Please check your .env file.",
      });
      return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message,
      });
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    await signOut(auth);
  };

  return (
    <aside className="w-64 glass-sidebar hidden md:flex flex-col h-screen sticky top-0 z-50">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Code2 className="text-white h-6 w-6" />
          </div>
          <span className="font-headline text-xl font-bold tracking-tight">Placement Prep</span>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center justify-between group px-4 py-3 rounded-2xl transition-all duration-300",
                  isActive 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground group-hover:text-primary transition-colors")} />
                  <span className="font-semibold text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4" />}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        {!user ? (
          <Button 
            onClick={handleLogin}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all border border-primary/20 backdrop-blur-md"
          >
            <LogIn className="h-5 w-5" />
            <span className="font-bold text-sm">Sign In</span>
          </Button>
        ) : (
          <div className="space-y-2">
            <Link 
              href="/dashboard/settings"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-muted-foreground hover:bg-white/50 hover:text-foreground transition-all"
            >
              <Settings className="h-5 w-5" />
              <span className="font-semibold text-sm">Settings</span>
            </Link>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-destructive hover:bg-destructive/10 transition-all text-left"
            >
              <LogOut className="h-5 w-5" />
              <span className="font-semibold text-sm">Logout</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
