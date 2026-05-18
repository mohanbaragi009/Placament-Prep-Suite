import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Mail, Edit2 } from "lucide-react";

export default function Profile() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <Card className="glass border-white/10 overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/30" />
        <CardContent className="p-10 -mt-20">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
            <Avatar className="h-40 w-40 border-8 border-background p-1 bg-white/5 glass">
              <AvatarImage src="https://picsum.photos/seed/user1/400" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-headline font-bold">John Doe</h1>
                <Badge className="bg-primary/20 text-primary hover:bg-primary/30">Lvl 42</Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                Aspiring Software Engineer @ University of Technology
              </p>
            </div>
            <Button className="glass-button rounded-xl px-6 mb-4">
              <Edit2 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Connect</h3>
                <div className="flex flex-col gap-3">
                  <a href="#" className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><Github className="h-4 w-4" /> github.com/johndoe</a>
                  <a href="#" className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><Linkedin className="h-4 w-4" /> linkedin.com/in/johndoe</a>
                  <a href="#" className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><Twitter className="h-4 w-4" /> twitter.com/johndoe</a>
                  <a href="#" className="flex items-center gap-3 text-sm hover:text-primary transition-colors"><Mail className="h-4 w-4" /> john@example.com</a>
                </div>
              </section>
              
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {["React", "TypeScript", "Node.js", "Python", "C++", "Docker"].map(s => (
                    <Badge key={s} variant="outline" className="glass border-white/10">{s}</Badge>
                  ))}
                </div>
              </section>
            </div>

            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Bio</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Passionate about building scalable web applications and solving complex algorithmic challenges. Currently focusing on mastering system design and advanced data structures for upcoming technical interviews.
                </p>
              </section>

              <Card className="glass border-white/5 bg-white/5">
                <CardHeader>
                  <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Recent Accomplishments</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">🏆</div>
                    <p className="text-sm font-semibold">Ranked Top 5% in Weekly Mock Interview #12</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400">🔥</div>
                    <p className="text-sm font-semibold">Achieved a 30-day coding streak</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}