
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, History } from "lucide-react";

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
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="history">
              <div className="space-y-4">
                {predictions.length > 0 ? (
                  predictions.map((prediction: any) => (
                    <Card key={prediction.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{prediction.location}</h3>
                            <p className="text-sm text-muted-foreground">{prediction.date}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-medium">{prediction.probability}%</div>
                            <div className="text-sm text-muted-foreground">Risk Level</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">
                    No prediction history found
                  </p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Account;
