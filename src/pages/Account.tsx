
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, History, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProfileInfo } from "@/components/account/ProfileInfo";
import { PredictionHistory } from "@/components/account/PredictionHistory";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Account = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [predictions, setPredictions] = useState([]);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(true);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!user && !isLoadingProfile) {
      navigate('/signin?redirect=/account');
    }
  }, [user, isLoadingProfile, navigate]);

  // Fetch user profile data
  const fetchUserData = async () => {
    if (!user) return;
    
    try {
      setIsLoadingProfile(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('name, email, mobile')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      setUserData({
        name: data.name || '',
        email: data.email || '',
        mobile: data.mobile || '',
      });
    } catch (error: any) {
      toast({
        title: "Error loading profile",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoadingProfile(false);
    }
  };

  // Fetch user predictions
  const fetchPredictions = async () => {
    if (!user) return;
    
    try {
      setIsLoadingPredictions(true);
      const { data, error } = await supabase
        .from('predictions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setPredictions(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading predictions",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsLoadingPredictions(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData();
      fetchPredictions();
    }
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user && !isLoadingProfile) {
    return null; // Will redirect via the useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-display font-bold text-wildfire-800">Account</h1>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Button>
          </div>
          
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <History className="h-4 w-4" /> Prediction History
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              {isLoadingProfile ? (
                <div className="animate-pulse p-8 text-center">Loading profile information...</div>
              ) : (
                <ProfileInfo userData={userData} onRefresh={fetchUserData} />
              )}
            </TabsContent>
            
            <TabsContent value="history">
              <PredictionHistory 
                predictions={predictions} 
                isLoading={isLoadingPredictions} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
