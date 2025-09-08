"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Star, GitBranch } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={user?.avatar_url} />
                  <AvatarFallback>
                    {user?.login?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{user?.name || user?.login || 'User'}</h3>
                  <p className="text-muted-foreground">{user?.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">
                      <Star className="w-3 h-3 mr-1" />
                      {user?.public_repos || 0} repos
                    </Badge>
                    <Badge variant="secondary">
                      <GitBranch className="w-3 h-3 mr-1" />
                      {user?.followers || 0} followers
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Manage your profile settings and preferences.
              </p>
              <Button>Edit Profile</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 