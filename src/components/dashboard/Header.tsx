"use client"

import React, { useMemo, useState, useEffect } from 'react';
import { Search, Bell, Menu, Sparkles, Moon, Sun, Code2 } from "lucide-react";
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
    <header className="h-20 glass-nav px-4 md:px-8 flex items-center justify-between sticky top-0 z-40 backdrop-blur-3xl">
      <div className="flex items-center gap-3 md:gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden glass-button rounded-xl h-10 w-10">
          <Menu className="h-5 w-5" />
        </Button>
        
        {/* Mobile Logo Representation */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Code2 className="text-white h-5 w-5" />
          </div>
        </div>

        <div className="relative max-w-md w-full hidden sm:flex items-center gap-4 md:gap-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search problems..." 
              className="pl-10 border-white/40 rounded-2xl focus:ring-primary/20 bg-white/20 backdrop-blur-md h-10"
            />
          </div>
          
          {/* Enhanced Glass Theme Toggle */}
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
        <Button variant="ghost" size="icon" className="relative border-white/40 rounded-2xl glass-button h-10 w-10 md:h-11 md:w-11">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          <span className={cn(
            "absolute top-2.5 right-2.5 w-2 h-2 md:w-2.5 md:h-2.5 rounded-full ring-2 ring-white/50",
            isPurpleMode ? "bg-primary animate-pulse" : "bg-red-500"
          )} />
        </Button>
        
        <div className="flex items-center gap-2 md:gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-bold line-clamp-1 max-w-[100px] md:max-w-[150px] tracking-tight">{displayName}</p>
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
