"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Twitter, Mail, Edit2, Loader2, Sparkles, Plus, X, Camera } from "lucide-react";
import { useUser, useFirebase, useDoc } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
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

  // Sync form data with cloud profile when it loads or dialog opens
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
  }, [cloudProfile, user, isEditing]);

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

  const handleSave = () => {
    if (!user || !db) return;
    setSaving(true);
    
    const ref = doc(db, "users", user.uid, "profile", "main");
    const updatePayload = {
      ...formData,
      updatedAt: serverTimestamp()
    };

    setDoc(ref, updatePayload, { merge: true })
      .then(() => {
        setSaving(false);
        setIsEditing(false);
        toast({
          title: "Profile Updated",
          description: "Your changes have been saved and are now visible.",
        });
      })
      .catch(async (error) => {
        setSaving(false);
        const permissionError = new FirestorePermissionError({
          path: ref.path,
          operation: 'write',
          requestResourceData: updatePayload,
        });
        errorEmitter.emit('permission-error', permissionError);
      });
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

  if (authLoading || (profileLoading && !cloudProfile)) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center p-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        <p className="mt-4 text-muted-foreground animate-pulse">Loading Profile...</p>
      </div>
    );
  }

  // Display data preference: Cloud > Auth > Local Form (Fallback)
  const displayProfile = cloudProfile || {
    displayName: user?.displayName || 'Unnamed Candidate',
    email: user?.email || '',
    photoData: user?.photoURL || ''
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <Card className="glass border-white/10 overflow-hidden relative shadow-2xl">
        <div className="h-40 bg-gradient-to-r from-primary/30 via-purple-500/20 to-primary/30" />
        <CardContent className="p-10 -mt-20">
          <div className="flex flex-col md:flex-row items-end gap-6 mb-10">
            <Avatar className="h-40 w-40 border-8 border-background p-1 bg-white glass shadow-xl">
              <AvatarImage src={displayProfile.photoData || `https://picsum.photos/seed/${user?.uid || 'user'}/400`} />
              <AvatarFallback>{displayProfile.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-headline font-bold tracking-tight">{displayProfile.displayName}</h1>
              </div>
              <p className="text-muted-foreground font-medium flex items-center gap-2">
                {displayProfile.title || 'Add a professional title'}
              </p>
            </div>
            
            <Dialog open={isEditing} onOpenChange={setIsEditing}>
              <DialogTrigger asChild>
                <Button className="glass-button rounded-xl px-6 mb-4 shadow-lg">
                  <Edit2 className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl glass border-white/10 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Edit Professional Profile
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="space-y-4">
                    <Label className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px]"><Camera className="h-3.3 w-3" /> Profile Image</Label>
                    <div className="flex items-center gap-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
                      <Avatar className="h-20 w-20 border-2 border-primary/20 bg-white">
                        <AvatarImage src={formData.photoData || user?.photoURL} />
                      </Avatar>
                      <div className="flex-1">
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="cursor-pointer h-10 bg-white"
                        />
                        <p className="text-[10px] text-muted-foreground mt-2 italic">Max file size: 1MB. Square images recommended.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px]">Full Name</Label>
                      <Input 
                        value={formData.displayName} 
                        onChange={e => setFormData({...formData, displayName: e.target.value})}
                        placeholder="e.g., John Doe"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px]">Professional Title</Label>
                      <Input 
                        value={formData.title} 
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        placeholder="e.g., Aspiring Software Engineer"
                        className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-bold uppercase tracking-widest text-[10px]">Professional Bio</Label>
                    <Textarea 
                      value={formData.bio} 
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      placeholder="Tell us about your background and career goals..."
                      className="min-h-[120px] resize-none bg-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="font-bold uppercase tracking-widest text-[10px]">Technical Skills</Label>
                    <div className="flex gap-2">
                      <Input 
                        value={newSkill} 
                        onChange={e => setNewSkill(e.target.value)}
                        placeholder="Add skill (e.g., React, Python)..."
                        onKeyDown={e => e.key === 'Enter' && addSkill()}
                        className="bg-white"
                      />
                      <Button type="button" onClick={addSkill} variant="secondary" className="px-4">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.skills?.map(s => (
                        <Badge key={s} variant="secondary" className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border-primary/20">
                          {s}
                          <button onClick={() => removeSkill(s)} className="hover:text-destructive transition-colors">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px]">GitHub Profile</Label>
                      <Input 
                        value={formData.github} 
                        onChange={e => setFormData({...formData, github: e.target.value})}
                        placeholder="github.com/yourusername"
                        className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-bold uppercase tracking-widest text-[10px]">LinkedIn Profile</Label>
                      <Input 
                        value={formData.linkedin} 
                        onChange={e => setFormData({...formData, linkedin: e.target.value})}
                        placeholder="linkedin.com/in/yourprofile"
                        className="bg-white"
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter className="gap-3">
                  <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl">Cancel</Button>
                  <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 rounded-xl px-8 shadow-lg shadow-primary/20">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Save Changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Social Presence</h3>
                <div className="flex flex-col gap-4">
                  {displayProfile.github && (
                    <a href={displayProfile.github.startsWith('http') ? displayProfile.github : `https://${displayProfile.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                      <Github className="h-4 w-4 text-muted-foreground group-hover:text-primary" /> {displayProfile.github.replace('https://', '').replace('http://', '')}
                    </a>
                  )}
                  {displayProfile.linkedin && (
                    <a href={displayProfile.linkedin.startsWith('http') ? displayProfile.linkedin : `https://${displayProfile.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors group">
                      <Linkedin className="h-4 w-4 text-muted-foreground group-hover:text-primary" /> {displayProfile.linkedin.replace('https://', '').replace('http://', '')}
                    </a>
                  )}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" /> {displayProfile.email || user?.email}
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Core Competencies</h3>
                <div className="flex flex-wrap gap-2">
                  {displayProfile.skills && displayProfile.skills.length > 0 ? (
                    displayProfile.skills.map(s => (
                      <Badge key={s} variant="outline" className="bg-white border-slate-200 px-3 py-1 shadow-sm">{s}</Badge>
                    ))
                  ) : (
                    <p className="text-xs text-muted-foreground italic">Add your skills to stand out.</p>
                  )}
                </div>
              </section>
            </div>

            <div className="md:col-span-2 space-y-10">
              <section>
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Candidate Story</h3>
                <p className="text-foreground leading-relaxed text-lg whitespace-pre-wrap">
                  {displayProfile.bio || "Craft a compelling bio to describe your technical journey and professional aspirations."}
                </p>
              </section>

              <Card className="glass border-primary/10 bg-primary/5 rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-xs font-bold uppercase tracking-widest text-primary/60">Milestones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/50 border border-white">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">🎯</div>
                    <div>
                      <p className="text-sm font-bold">Profile Verified</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Preparation Journey Started</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-white/50 border border-white">
                    <div className="w-10 h-10 rounded-full bg-yellow-400/10 flex items-center justify-center text-yellow-600 font-bold">⚡</div>
                    <div>
                      <p className="text-sm font-bold">High Skill Density</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Top 10% Competency Rank</p>
                    </div>
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
