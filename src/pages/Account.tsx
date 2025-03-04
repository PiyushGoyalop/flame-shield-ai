
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCircle, History } from "lucide-react";
import { ProfileInfo } from "@/components/account/ProfileInfo";
import { PredictionHistory } from "@/components/account/PredictionHistory";

const Account = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
  });
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    // Get user data from localStorage
    const userEmail = localStorage.getItem("userEmail");
    const userName = localStorage.getItem("userName");
    
    // Get predictions for this user
    const historyKey = `predictions_${userEmail}`;
    const userPredictions = JSON.parse(localStorage.getItem(historyKey) || "[]");
    
    setUserData({
      name: userName || "",
      email: userEmail || "",
      mobile: "", // This would be populated if we had mobile numbers stored
    });
    
    setPredictions(userPredictions);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl font-display font-bold mb-8 text-wildfire-800">Account</h1>
          
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
              <ProfileInfo userData={userData} />
            </TabsContent>
            
            <TabsContent value="history">
              <PredictionHistory predictions={predictions} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
