
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Clock, CheckCircle2, Trash2, CalendarDays } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Reminder {
  id: number;
  title: string;
  time: string;
  date: Date;
  status: 'pending' | 'completed';
}

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState<Reminder[]>([
    { id: 1, title: "Mock Interview Prep", time: "10:00 AM", date: new Date(), status: "pending" },
    { id: 2, title: "DSA Problem Solving", time: "02:00 PM", date: new Date(), status: "pending" },
    { id: 3, title: "System Design Revision", time: "05:00 PM", date: new Date(), status: "completed" },
  ]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (!newReminder.trim()) {
      toast({
        variant: "destructive",
        title: "Empty Task",
        description: "Please enter a title for your reminder.",
      });
      return;
    }

    const item: Reminder = {
      id: Date.now(),
      title: newReminder,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: date || new Date(),
      status: "pending"
    };

    setReminders([item, ...reminders]);
    setNewReminder("");
    toast({
      title: "Reminder Set",
      description: `"${newReminder}" added for ${item.date.toLocaleDateString()}.`,
    });
  };

  const toggleStatus = (id: number) => {
    setReminders(reminders.map(r => 
      r.id === id ? { ...r, status: r.status === 'pending' ? 'completed' : 'pending' } : r
    ));
  };

  const deleteReminder = (id: number) => {
    setReminders(reminders.filter(r => r.id !== id));
    toast({
      title: "Deleted",
      description: "Reminder removed successfully.",
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Study Schedule</h1>
        <p className="text-muted-foreground italic">"Plan your work, then work your plan."</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 glass border-white/10 overflow-hidden shadow-2xl">
          <CardHeader className="bg-primary/5 border-b border-white/10">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-primary" /> Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border border-slate-100 mx-auto"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 glass border-white/10 shadow-2xl">
          <CardHeader className="flex flex-row items-center justify-between border-b border-white/10 pb-4">
            <CardTitle className="text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Active Tasks
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {reminders.filter(r => r.status === 'pending').length} Pending
              </Badge>
              <Badge variant="outline" className="bg-green-500/5 text-green-600 border-green-500/20">
                {reminders.filter(r => r.status === 'completed').length} Done
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input 
                  placeholder="e.g., Revise Dynamic Programming..." 
                  value={newReminder}
                  onChange={(e) => setNewReminder(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addReminder()}
                  className="rounded-xl bg-white/50 border-slate-200 h-12 pl-4 focus-visible:ring-primary/20"
                />
              </div>
              <Button onClick={addReminder} className="rounded-xl h-12 px-8 font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">
                <Plus className="h-5 w-5 mr-2" /> Add Task
              </Button>
            </div>

            <div className="space-y-4">
              {reminders.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-3xl">
                  <p className="text-muted-foreground text-sm italic">No tasks scheduled. Time to plan!</p>
                </div>
              ) : (
                reminders.map((reminder) => (
                  <div 
                    key={reminder.id} 
                    className={cn(
                      "flex items-center justify-between p-5 rounded-2xl border transition-all duration-300 group",
                      reminder.status === 'completed' 
                        ? 'bg-slate-50 border-transparent opacity-60' 
                        : 'bg-white border-slate-100 hover:border-primary/30 hover:shadow-md'
                    )}
                  >
                    <div className="flex items-center gap-5">
                      <button 
                        onClick={() => toggleStatus(reminder.id)}
                        className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                          reminder.status === 'completed' 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-slate-300 hover:border-primary'
                        )}
                      >
                        {reminder.status === 'completed' && <CheckCircle2 className="h-4 w-4" />}
                      </button>
                      <div>
                        <p className={cn(
                          "font-bold text-base transition-all",
                          reminder.status === 'completed' ? 'line-through text-muted-foreground' : 'text-slate-800'
                        )}>
                          {reminder.title}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {reminder.time}
                          </span>
                          <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">
                            • {reminder.date.toLocaleDateString([], { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteReminder(reminder.id)}
                        className="text-destructive hover:bg-destructive/10 rounded-full h-10 w-10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
