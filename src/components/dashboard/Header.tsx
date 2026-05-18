"use client"

import React, { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Search, 
  Bell, 
  Menu, 
  Sparkles, 
  Moon, 
  Sun, 
  Code2, 
  LayoutDashboard, 
  History, 
  Code2 as PracticeIcon, 
  FileText, 
  Calendar as CalendarIcon, 
  BookOpen, 
  User,
  X
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useUser, useFirebase, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { cn } from "@/lib/utils";

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'AI Analyze', icon: Sparkles, href: '/dashboard/analyze' },
  { label: 'History', icon: History, href: '/dashboard/history' },
  { label: 'Practice', icon: PracticeIcon, href: '/dashboard/practice' },
  { label: 'Assessments', icon: FileText, href: '/dashboard/assessments' },
  { label: 'Calendar', icon: CalendarIcon, href: '/dashboard/calendar' },
  { label: 'Resources', icon: BookOpen, href: '/dashboard/resources' },
  { label: 'Profile', icon: User, href: '/dashboard/profile' },
];

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();
  const { db } = useFirebase();
  const [isPurpleMode, setIsPurpleMode] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const isPurple = document.documentElement.classList.contains('purple-black');
    setIsPurpleMode(isPurple);
  }, []);

  const toggleTheme = (checked: boolean) => {
    setIsPurpleMode(checked);
    if (checked) {
      document.documentElement.classList.add('purple-black');
    } else {
      document.documentElement.classList.remove('purple-black');
    }
  };

  const profileRef = useMemo(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid, "profile", "main");
  }, [user, db]);

  const { data: profile } = useDoc<any>(profileRef as any);

  const displayName = profile?.displayName || user?.displayName || 'Guest Candidate';
  const photoUrl = profile?.photoData || user?.photoURL || `https://picsum.photos/seed/${user?.uid || 'guest'}/200`;

  return (
    <header className="h-20 glass-nav px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-3xl">
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        {/* Mobile Menu Trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden glass-button rounded-xl h-10 w-10">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 glass-sidebar p-0 border-none">
            <SheetHeader className="p-6 border-b border-white/10">
              <SheetTitle className="text-left">
                <div className="flex items-center gap-3 group cursor-pointer">
                  <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                    <Code2 className="text-white h-6 w-6" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline text-xl font-bold tracking-tight text-foreground leading-none">Placement Prep</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-primary mt-1 opacity-80">Dream Career</span>
                  </div>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
                      isActive 
                        ? "bg-primary text-white shadow-lg shadow-primary/20" 
                        : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-auto p-6 border-t border-white/10">
              <div className="flex items-center gap-3 p-2 rounded-2xl bg-white/5">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={photoUrl} />
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">{displayName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">{displayName}</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Candidate</p>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        
        {/* Logo Representation (Mobile & Desktop) */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Code2 className="text-white h-5 w-5 md:h-6 md:w-6" />
          </div>
        </div>

        {/* Search & Theme Toggle (Desktop Only) */}
        <div className="relative max-w-md w-full hidden sm:flex items-center gap-4 md:gap-6 ml-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search problems..." 
              className="pl-10 border-white/40 rounded-2xl focus:ring-primary/20 bg-white/20 backdrop-blur-md h-10"
            />
          </div>
          
          <div className={cn(
            "flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full transition-all duration-500",
            "bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg",
            isPurpleMode ? "border-primary/50 bg-primary/5" : "hover:bg-white/20"
          )}>
            <div className="flex items-center gap-1.5 md:gap-2">
              {isPurpleMode ? (
                <Sparkles className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary animate-pulse" />
              ) : (
                <Sun className="h-3 w-3 md:h-3.5 md:w-3.5 text-orange-400" />
              )}
              <Switch 
                id="theme-toggle"
                checked={isPurpleMode}
                onCheckedChange={toggleTheme}
                className={cn(
                  "data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-200",
                  "border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] h-4 md:h-5 w-8 md:w-10"
                )}
              />
              {isPurpleMode && <Moon className="h-3 w-3 md:h-3.5 md:w-3.5 text-primary-foreground/50" />}
            </div>
            <Label 
              htmlFor="theme-toggle" 
              className={cn(
                "text-[8px] md:text-[10px] font-black uppercase tracking-[0.15em] select-none cursor-pointer hidden lg:block",
                isPurpleMode ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isPurpleMode ? 'PurpleBlack' : 'White'}
            </Label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-6">
        {/* Theme Toggle for Mobile */}
        <div className="sm:hidden flex items-center">
           <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => toggleTheme(!isPurpleMode)}
            className="rounded-xl glass-button h-10 w-10"
          >
            {isPurpleMode ? <Moon className="h-4 w-4 text-primary" /> : <Sun className="h-4 w-4 text-orange-400" />}
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="relative border-white/40 rounded-2xl glass-button h-10 w-10 md:h-11 md:w-11">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <span className={cn(
            "absolute top-2.5 right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ring-2 ring-white/50",
            isPurpleMode ? "bg-primary animate-pulse" : "bg-red-500"
          )} />
        </Button>
        
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden lg:block">
            <p className="text-xs md:text-sm font-bold line-clamp-1 max-w-[150px] tracking-tight">{displayName}</p>
            <p className="text-[8px] md:text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-70">Candidate</p>
          </div>
          <Avatar className="h-9 w-9 md:h-11 md:w-11 border-2 border-white/50 p-0.5 shadow-md">
            <AvatarImage src={photoUrl} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
