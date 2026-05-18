
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Mail, Edit2, Loader2, Sparkles, Plus, X, Camera } from "lucide-react";
import { useUser, useFirebase, useDoc } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  displayName?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  github?: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  photoData?: string;
}

export default function Profile() {
  const { user, loading: authLoading } = useUser();
  const { db } = useFirebase();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const profileRef = useMemo(() => {
    if (!user || !db) return null;
    return doc(db, "users", user.uid, "profile", "main");
  }, [user, db]);

  const { data: cloudProfile, loading: profileLoading } = useDoc<ProfileData>(profileRef as any);

  const [formData, setFormData] = useState<ProfileData>({
    displayName: '',
    title: '',
    bio: '',
    skills: [],
    github: '',
    linkedin: '',
    twitter: '',
    email: '',
    photoData: ''
  });

  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    if (cloudProfile) {
      setFormData(cloudProfile);
    } else if (user) {
      setFormData(prev => ({
        ...prev,
        displayName: user.displayName || '',
        email: user.email || ''
      }));
    }
  }, [cloudProfile, user]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: "Please choose an image smaller than 1MB.",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photoData: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user || !db) return;
    setSaving(true);
    try {
      const ref = doc(db, "users", user.uid, "profile", "main");
      await setDoc(ref, {
        ...formData,
        updatedAt: new Date().toISOString()
      }, { merge: true });
      
      toast({
        title: "Profile Updated",
        description: "Your profile changes have been saved and are now visible.",
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not update profile. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...(formData.skills || []), newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills?.filter(s => s !== skillToRemove) || []
    });
  };

  if (authLoading || profileLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  const profile = formData;

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500">
      <Card className="glass border-white/10 overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/30" />
        <CardContent className="p-10 -mt-20">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
            <Avatar className="h-40 w-40 border-8 border-background p-1 bg-white/5 glass">
              <AvatarImage src={profile.photoData || user?.photoURL || `https://picsum.photos/seed/${user?.uid || 'user'}/400`} />
              <AvatarFallback>{profile.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-headline font-bold">{profile.displayName || 'Unnamed Candidate'}</h1>
                {profileLoading && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                {profile.title || 'Add a professional title'}
              </p>
            </div>
            
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button className="glass-button rounded-xl px-6 mb-4">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl glass border-white/10 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    Edit Professional Profile
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2"><Camera className="h-4 w-4" /> Profile Image</Label>
                    <div className="flex items-center gap-6">
                      <Avatar className="h-20 w-20 border-2 border-primary/20">
                        <AvatarImage src={formData.photoData || user?.photoURL || `https://picsum.photos/seed/p/200`} />
                      </Avatar>
                      <div className="flex-1">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="cursor-pointer h-10"
                        />
                        <p className="text-[10px] text-muted-foreground mt-1.5 italic">Recommended: Square image, max 1MB.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input 
                        value={formData.displayName} 
                        onChange={e => setFormData({...formData, displayName: e.target.value})}
                        placeholder="e.g., John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Professional Title</Label>
                      <Input 
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., Aspiring Software Engineer"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea 
                      value={formData.bio} 
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell us about your background and goals..."
                      className="min-h-[100px] resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Skills</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={newSkill} 
                        onChange={e => setNewSkill(e.target.value)}
                        placeholder="Add a skill..."
                        onKeyDown={e => e.key === 'Enter' && addSkill()}
                      />
                      <Button type="button" onClick={addSkill} variant="secondary">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills?.map(s => (
                        <Badge key={s} variant="secondary" className="flex items-center gap-1 pr-1">
                          {s}
                          <button onClick={() => removeSkill(s)} className="hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>GitHub URL</Label>
                      <Input 
                        value={formData.github} 
                        onChange={e => setFormData({...formData, github: e.target.value})}
                        placeholder="github.com/..."
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <Input 
                        value={formData.linkedin} 
                        onChange={e => setFormData({...formData, linkedin: e.target.value})}
                        placeholder="linkedin.com/in/..."
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90">
                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="space-y-6">
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Connect</h3>
                <div className="flex flex-col gap-3">
                  {profile.github && (
                    <a href={profile.github.startsWith('http') ? profile.github : `https://${profile.github}`} target="_blank" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                      <Github className="h-4 w-4" /> {profile.github.replace('https://', '')}
                    </a>
                  )}
                  {profile.linkedin && (
                    <a href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`} target="_blank" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                      <Linkedin className="h-4 w-4" /> {profile.linkedin.replace('https://', '')}
                    </a>
                  )}
                  {profile.twitter && (
                    <a href={profile.twitter.startsWith('http') ? profile.twitter : `https://${profile.twitter}`} target="_blank" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                      <Twitter className="h-4 w-4" /> {profile.twitter.replace('https://', '')}
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" /> {profile.email || user?.email || 'No email shared'}
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Top Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills && profile.skills.length > 0 ? (
                    profile.skills.map(s => (
                      <Badge key={s} variant="outline" className="glass border-white/10">{s}</Badge>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">No skills listed yet.</p>
                  )}
                </div>
              </section>
            </div>

            <div className="md:col-span-2 space-y-8">
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Bio</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {profile.bio || "Write a short bio to introduce yourself to potential employers and colleagues."}
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
