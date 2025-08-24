"use client"

import React, { useState, useEffect, useRef } from "react"
import { useAuth } from "@/components/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { Camera, Save, Loader2, Plus, X, Github, Linkedin, Twitter, User } from "lucide-react"

export function SettingsForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    jobTitle: "",
    bio: "",
    avatar: "",
    skills: [] as string[],
    social: {
      github: "",
      linkedin: "",
      twitter: ""
    }
  })
  
  const [newSkill, setNewSkill] = useState("")
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  })
  const [showPasswordForm, setShowPasswordForm] = useState(false)

  // Load profile data
  useEffect(() => {
    async function loadProfile() {
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          setIsLoading(false)
          return
        }

        const response = await fetch('/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const data = await response.json()
          setFormData({
            name: data.user.name || "",
            email: data.user.email || "",
            jobTitle: data.user.jobTitle || "",
            bio: data.user.bio || "",
            avatar: data.user.avatar || "",
            skills: data.user.skills || [],
            social: {
              github: data.user.social?.github || "",
              linkedin: data.user.social?.linkedin || "",
              twitter: data.user.social?.twitter || ""
            }
          })
        }
      } catch (error) {
        console.error('Error loading profile:', error)
        toast({
          title: "Error",
          description: "Failed to load profile data",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadProfile()
  }, [toast])

  // Handle form submission
  const handleSubmit = async () => {
    setIsSaving(true)

    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSuccess(true)
        toast({
          title: "Success",
          description: "Profile updated successfully",
        })
        
        setTimeout(() => setSuccess(false), 3000)
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Update failed')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle password change
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)
    try {
      const token = localStorage.getItem('token')
      
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: "Password updated successfully",
        })
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        })
        setShowPasswordForm(false)
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Password update failed')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  // Handle avatar upload
  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formDataUpload = new FormData()
      formDataUpload.append('avatar', file)

      const token = localStorage.getItem('token')
      const response = await fetch('/api/upload/avatar', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataUpload
      })

      if (response.ok) {
        const data = await response.json()
        setFormData(prev => ({ ...prev, avatar: data.avatarUrl }))
        toast({
          title: "Success",
          description: "Avatar uploaded successfully",
        })
      } else {
        const error = await response.json()
        throw new Error(error.error || 'Upload failed')
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload avatar",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  // Skills management
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <div className="flex items-center justify-center py-16">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        <div className="text-center py-16 px-8">
          <div className="relative mb-8">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center mx-auto animate-scale-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
                <User className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl animate-pulse"></div>
          </div>
          <h2 className="text-3xl font-serif font-bold mb-3 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Profile Updated Successfully! 🎉
          </h2>
          <p className="text-muted-foreground mb-8 text-lg">
            Your profile changes have been saved.
          </p>
          <Button 
            onClick={() => setSuccess(false)}
            className="mt-4"
          >
            Continue Editing
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="pb-6 border-b border-border/50">
        <h2 className="text-4xl font-serif font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Account Settings
        </h2>
        <p className="text-muted-foreground text-lg mt-2">
          Manage your profile information and account preferences
        </p>
      </div>

      <div className="space-y-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Profile Information */}
          <Card className="animate-slide-in-left border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-serif">Profile Information</CardTitle>
              <CardDescription>Update your personal details and bio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={formData.avatar} alt={formData.name} />
                  <AvatarFallback className="text-lg">
                    {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="h-10 border-border/50 hover:bg-accent/50"
                  >
                    {isUploading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Camera className="h-4 w-4 mr-2" />
                    )}
                    {isUploading ? 'Uploading...' : 'Change Avatar'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleAvatarUpload}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    JPEG, PNG, WebP. Max 5MB.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-semibold">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="h-12 border-border/50 focus:border-primary/50 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-semibold">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="h-12 border-border/50 focus:border-primary/50 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="jobTitle" className="text-sm font-semibold">
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="e.g. Full Stack Developer"
                  value={formData.jobTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, jobTitle: e.target.value }))}
                  className="h-12 border-border/50 focus:border-primary/50 bg-background/50"
                />
              </div>

              <div className="space-y-3">
                <Label htmlFor="bio" className="text-sm font-semibold">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself..."
                  className="min-h-[100px] border-border/50 focus:border-primary/50 bg-background/50 resize-none"
                  value={formData.bio}
                  onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Skills & Social */}
          <Card className="animate-slide-in-right animation-delay-200 border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-serif">Skills & Social</CardTitle>
              <CardDescription>Add your technical skills and social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Skills */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold">Skills</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="text-sm">
                      {skill}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-2 hover:bg-transparent"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a skill..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="h-10 border-border/50 focus:border-primary/50 bg-background/50"
                  />
                  <Button
                    type="button"
                    onClick={addSkill}
                    size="sm"
                    className="h-10 px-4"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <Label className="text-sm font-semibold">Social Media</Label>
                
                <div className="space-y-3">
                  <div className="relative">
                    <Github className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="https://github.com/username"
                      className="pl-12 h-10 border-border/50 focus:border-primary/50 bg-background/50"
                      value={formData.social.github}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, github: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="https://linkedin.com/in/username"
                      className="pl-12 h-10 border-border/50 focus:border-primary/50 bg-background/50"
                      value={formData.social.linkedin}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, linkedin: e.target.value }
                      }))}
                    />
                  </div>
                  
                  <div className="relative">
                    <Twitter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="https://twitter.com/username"
                      className="pl-12 h-10 border-border/50 focus:border-primary/50 bg-background/50"
                      value={formData.social.twitter}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        social: { ...prev.social, twitter: e.target.value }
                      }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Password Change */}
        <Card className="animate-slide-in-up animation-delay-400 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-serif">Change Password</CardTitle>
            <CardDescription>Update your account password for security</CardDescription>
          </CardHeader>
          <CardContent>
            {!showPasswordForm ? (
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPasswordForm(true)}
                className="border-border/50 hover:bg-accent/50"
              >
                Change Password
              </Button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword" className="text-sm font-semibold">
                      Current Password
                    </Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      required
                      className="h-10 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-sm font-semibold">
                      New Password
                    </Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      required
                      className="h-10 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-semibold">
                      Confirm Password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                      className="h-10 border-border/50 focus:border-primary/50 bg-background/50"
                    />
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="bg-primary/90 hover:bg-primary"
                  >
                    {isSaving ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {isSaving ? 'Updating...' : 'Update Password'}
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => {
                      setShowPasswordForm(false)
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: ""
                      })
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Save Profile Changes */}
        <Card className="animate-slide-in-up animation-delay-500 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-serif">Save Profile Changes</CardTitle>
            <CardDescription>Save all your profile updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Button
                type="button"
                onClick={handleSubmit}
                className="bg-primary/90 hover:bg-primary"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={() => window.location.reload()}
                className="border-border/50 hover:bg-accent/50"
              >
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
