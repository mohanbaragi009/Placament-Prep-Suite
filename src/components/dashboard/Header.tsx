"use client"

import React, { useMemo, useState, useEffect } from 'react';
import { Search, Bell, Menu, Sparkles, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUser, useFirebase, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";
import { cn } from "@/lib/utils";

export function Header() {
  const { user } = useUser();
  const { db } = useFirebase();
  const [isPurpleMode, setIsPurpleMode] = useState(false);

  // Initialize theme from document class
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
    <header className="h-20 glass-nav px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-3xl">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden glass-button rounded-xl">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="relative max-w-md w-full hidden sm:flex items-center gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search problems, topics..." 
              className="pl-10 border-white/40 rounded-2xl focus:ring-primary/20 bg-white/20 backdrop-blur-md h-11"
            />
          </div>
          
          {/* Enhanced Glass Theme Toggle */}
          <div className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-500",
            "bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg",
            isPurpleMode ? "border-primary/50 bg-primary/5" : "hover:bg-white/20"
          )}>
            <div className="flex items-center gap-2">
              {isPurpleMode ? (
                <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
              ) : (
                <Sun className="h-3.5 w-3.5 text-orange-400" />
              )}
              <Switch 
                id="theme-toggle"
                checked={isPurpleMode}
                onCheckedChange={toggleTheme}
                className={cn(
                  "data-[state=checked]:bg-primary data-[state=unchecked]:bg-slate-200",
                  "border-white/20 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] h-5 w-10"
                )}
              />
              {isPurpleMode && <Moon className="h-3.5 w-3.5 text-primary-foreground/50" />}
            </div>
            <Label 
              htmlFor="theme-toggle" 
              className={cn(
                "text-[10px] font-black uppercase tracking-[0.15em] select-none cursor-pointer hidden lg:block",
                isPurpleMode ? "text-primary" : "text-muted-foreground"
              )}
            >
              {isPurpleMode ? 'PurpleBlack' : 'White'}
            </Label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative border-white/40 rounded-2xl glass-button h-11 w-11">
          <Bell className="h-5 w-5" />
          <span className={cn(
            "absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full ring-2 ring-white/50",
            isPurpleMode ? "bg-primary animate-pulse" : "bg-red-500"
          )} />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold line-clamp-1 max-w-[150px] tracking-tight">{displayName}</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest opacity-70">Candidate</p>
          </div>
          <Avatar className="h-11 w-11 border-2 border-white/50 p-0.5 shadow-md">
            <AvatarImage src={photoUrl} />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">{displayName.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
