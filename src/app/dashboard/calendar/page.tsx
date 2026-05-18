
"use client"

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus, Clock, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [reminders, setReminders] = useState([
    { id: 1, title: "Mock Interview Prep", time: "10:00 AM", status: "pending" },
    { id: 2, title: "DSA Problem Solving", time: "2:00 PM", status: "pending" },
    { id: 3, title: "System Design Revision", time: "5:00 PM", status: "completed" },
  ]);
  const [newReminder, setNewReminder] = useState("");

  const addReminder = () => {
    if (!newReminder) return;
    const item = {
      id: Date.now(),
      title: newReminder,
      time: "9:00 AM",
      status: "pending"
    };
    setReminders([item, ...reminders]);
    setNewReminder("");
    toast({
      title: "Reminder Set",
      description: `A reminder for "${newReminder}" has been added for ${date?.toLocaleDateString()}.`,
    });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-headline font-bold mb-2 tracking-tight">Calendar & Reminders</h1>
        <p className="text-muted-foreground">Manage your study schedule and set reminders for pending work.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 glass border-white/10 overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-white/10">
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Clock className="h-4 w-4" /> Pick a Date
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-xl border border-white/10 mx-auto"
            />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 glass border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
              <Bell className="h-4 w-4 text-primary" /> Pending Work & Reminders
            </CardTitle>
            <Badge variant="outline" className="bg-primary/5 text-primary">
              {reminders.filter(r => r.status === 'pending').length} Active
            </Badge>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-2">
              <Input 
                placeholder="What needs to be done?" 
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                className="rounded-xl bg-white/50"
              />
              <Button onClick={addReminder} className="rounded-xl px-6">
                <Plus className="h-4 w-4 mr-2" /> Add
              </Button>
            </div>

            <div className="space-y-3">
              {reminders.map((reminder) => (
                <div 
                  key={reminder.id} 
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    reminder.status === 'completed' 
                    ? 'bg-slate-50 border-transparent opacity-50' 
                    : 'bg-white border-slate-100 hover:border-primary/20 shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${reminder.status === 'completed' ? 'bg-green-100' : 'bg-primary/10'}`}>
                      {reminder.status === 'completed' ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <Bell className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${reminder.status === 'completed' ? 'line-through' : ''}`}>
                        {reminder.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                        {reminder.time}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-muted-foreground">
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
