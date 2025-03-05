
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileInfoProps {
  userData: {
    name: string;
    email: string;
    mobile: string;
  };
  onRefresh: () => void;
}

export function ProfileInfo({ userData, onRefresh }: ProfileInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userData.name);
  const [mobile, setMobile] = useState(userData.mobile || "");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Handle mobile number input validation
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow digits and limit to 10 characters
    const onlyDigits = value.replace(/\D/g, "").slice(0, 10);
    setMobile(onlyDigits);
  };

  const handleSave = async () => {
    if (!user) return;
    
    // Validate mobile number is 10 digits or empty
    if (mobile && mobile.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit Indian mobile number",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name,
          mobile: mobile || null
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved."
      });
      
      setIsEditing(false);
      onRefresh();
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    setName(userData.name);
    setMobile(userData.mobile || "");
    setIsEditing(false);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Profile Information</CardTitle>
        {!isEditing ? (
          <Button 
            variant="outline" 
            onClick={() => setIsEditing(true)}
            className="text-wildfire-600 border-wildfire-200"
          >
            Edit
          </Button>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={userData.email}
                disabled
                className="bg-gray-50"
              />
              <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                value={mobile}
                onChange={handleMobileChange}
                placeholder="10-digit mobile number"
                disabled={isLoading}
                maxLength={10}
                inputMode="numeric"
              />
              <p className="text-xs text-muted-foreground mt-1">Enter 10-digit number without country code</p>
            </div>
            <div className="flex gap-2 pt-4">
              <Button 
                variant="default" 
                onClick={handleSave}
                className="bg-wildfire-600 hover:bg-wildfire-700"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleCancel}
                disabled={isLoading}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p className="mt-1">{userData.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p className="mt-1">{userData.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Mobile Number</label>
              <p className="mt-1">{userData.mobile || "Not provided"}</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
