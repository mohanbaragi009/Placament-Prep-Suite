"use client"

import React from 'react';
import { Search, Bell, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  return (
    <header className="h-20 glass border-b border-white/10 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search problems, topics..." 
            className="pl-10 glass border-white/10 rounded-xl focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="relative glass border-white/10 rounded-xl">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold">John Doe</p>
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Candidate</p>
          </div>
          <Avatar className="h-10 w-10 border-2 border-primary/20 p-0.5">
            <AvatarImage src="https://picsum.photos/seed/user1/200" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}