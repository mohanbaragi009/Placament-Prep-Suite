"use client"

import React, { useMemo, useState } from 'react';
import { Search, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useUser, useFirebase, useDoc } from "@/firebase";
import { doc } from "firebase/firestore";

export function Header() {
  const { user } = userUser();
  const { db } = useFirebase();
  const [isPinkMode, setIsPinkMode] = useState(false);

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
        <div className="relative max-w-md w-full hidden sm:flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search problems, topics..." 
              className="pl-10 border-white/40 rounded-2xl focus:ring-primary/20 bg-white/20 backdrop-blur-md h-11"
            />
          </div>
          
          {/* Custom Dark Pink & White Toggle */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-2xl bg-white/10 border border-white/20">
            <Switch 
              id="header-toggle"
              checked={isPinkMode}
              onCheckedChange={setIsPinkMode}
              className="data-[state=checked]:bg-[#DB2777] data-[state=unchecked]:bg-white border-white/40 shadow-sm"
            />
            <Label 
              htmlFor="header-toggle" 
              className="text-[10px] font-black uppercase tracking-[0.15em] text-muted-foreground select-none cursor-pointer hidden lg:block"
            >
              {isPinkMode ? 'Pink' : 'White'}
            </Label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative border-white/40 rounded-2xl glass-button h-11 w-11">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#DB2777] rounded-full ring-2 ring-white/50" />
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

function userUser() {
  const { user, loading } = useUser();
  return { user, loading };
}
