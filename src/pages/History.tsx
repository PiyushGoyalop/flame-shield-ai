
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, History as HistoryIcon, Clock, AlertTriangle, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample historical prediction data
interface HistoricalPrediction {
  id: string;
  location: string;
  date: string;
  probability: number;
  co2Level: number;
  temperature: number;
  currentProbability?: number;
}

const History = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<HistoricalPrediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  // Check login status (simulated)
  useEffect(() => {
    // Get login status from localStorage (this is just for demo)
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // If logged in, load predictions
    if (loggedIn) {
      // Simulated API call to get user's prediction history
      setTimeout(() => {
        // Sample data
        const samplePredictions: HistoricalPrediction[] = [
          {
            id: "p1",
            location: "Los Angeles, California",
            date: "2023-09-15",
            probability: 78.5,
            co2Level: 42.3,
            temperature: 32.6,
            currentProbability: 72.1
          },
          {
            id: "p2",
            location: "Denver, Colorado",
            date: "2023-08-28",
            probability: 45.2,
            co2Level: 28.7,
            temperature: 24.8,
            currentProbability: 53.4
          },
          {
            id: "p3",
            location: "Portland, Oregon",
            date: "2023-10-05",
            probability: 62.7,
            co2Level: 35.1,
            temperature: 27.3,
            currentProbability: 56.9
          },
          {
            id: "p4",
            location: "Phoenix, Arizona",
            date: "2023-11-12",
            probability: 81.9,
            co2Level: 48.5,
            temperature: 29.7,
            currentProbability: 84.2
          }
        ];
        
        setPredictions(samplePredictions);
        setIsLoading(false);
      }, 1500);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = () => {
    // Simulate login for demo
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    
    toast({
      title: "Logged in successfully",
      description: "Now you can view your prediction history.",
    });
    
    // Reload the page to fetch data
    window.location.reload();
  };

  const handleLogout = () => {
    // Clear login state
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setPredictions([]);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  // Function to determine status color
  const getStatusColor = (probability: number) => {
    if (probability < 33) return "text-green-600";
    if (probability < 66) return "text-amber-600";
    return "text-red-600";
  };

  // Function to determine change icon and text
  const getProbabilityChange = (old: number, current?: number) => {
    if (!current) return null;
    
    const diff = current - old;
    const diffRounded = Math.round(diff * 10) / 10;
    
    if (Math.abs(diffRounded) < 2) {
      return {
        text: "No significant change",
        color: "text-gray-500",
        icon: <Clock className="h-4 w-4" />
      };
    }
    
    if (diffRounded > 0) {
      return {
        text: `Increased by ${diffRounded}%`,
        color: "text-red-600",
        icon: <AlertTriangle className="h-4 w-4" />
      };
    }
    
    return {
      text: `Decreased by ${Math.abs(diffRounded)}%`,
      color: "text-green-600",
      icon: <Check className="h-4 w-4" />
    };
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      
      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold mb-2">Prediction History</h1>
              <p className="text-muted-foreground">
                View and track your previous wildfire risk predictions
              </p>
            </div>
            
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                className="border-wildfire-200 text-wildfire-700 hover:bg-wildfire-50"
                onClick={handleLogout}
              >
                Sign Out
              </Button>
            ) : null}
          </div>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-wildfire-500">Loading history...</div>
            </div>
          ) : !isLoggedIn ? (
            <Card className="bg-white shadow-sm border-wildfire-100">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6">
                  <div className="bg-wildfire-100 rounded-full p-4">
                    <HistoryIcon className="h-12 w-12 text-wildfire-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-3">Sign In to View History</h2>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Sign in to access your prediction history and track wildfire risk changes over time for your saved locations.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button 
                    className="bg-wildfire-500 hover:bg-wildfire-600 text-white" 
                    onClick={handleLogin}
                  >
                    Sign In
                  </Button>
                  <Button variant="outline">
                    Create an Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : predictions.length === 0 ? (
            <Card className="bg-white shadow-sm border-wildfire-100">
              <CardContent className="p-8 text-center">
                <h2 className="text-xl font-bold mb-3">No Predictions Yet</h2>
                <p className="text-muted-foreground mb-6">
                  You haven't made any predictions yet. Start by making a prediction to track wildfire risks.
                </p>
                <Button 
                  className="bg-wildfire-500 hover:bg-wildfire-600 text-white"
                  onClick={() => window.location.href = "/predict"}
                >
                  Make Your First Prediction
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {predictions.map((prediction) => (
                <Card key={prediction.id} className="border-wildfire-100 hover:border-wildfire-200 transition-all">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-wildfire-500" />
                          <h3 className="font-medium text-lg">{prediction.location}</h3>
                        </div>
                        <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                          <Clock className="h-3 w-3" />
                          <span>Predicted on {prediction.date}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Original Risk</p>
                          <p className={`text-lg font-bold ${getStatusColor(prediction.probability)}`}>
                            {prediction.probability}%
                          </p>
                        </div>
                        
                        <div className="text-center min-w-[110px]">
                          <p className="text-sm text-muted-foreground mb-1">Current Risk</p>
                          <p className={`text-lg font-bold ${getStatusColor(prediction.currentProbability || 0)}`}>
                            {prediction.currentProbability}%
                          </p>
                        </div>
                        
                        {prediction.currentProbability && (
                          <div className="md:border-l md:border-gray-200 pl-6 hidden md:block">
                            <div className="flex items-center gap-1">
                              {getProbabilityChange(prediction.probability, prediction.currentProbability)?.icon}
                              <span className={`text-sm ${getProbabilityChange(prediction.probability, prediction.currentProbability)?.color}`}>
                                {getProbabilityChange(prediction.probability, prediction.currentProbability)?.text}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="border-wildfire-200 hover:bg-wildfire-50"
                          onClick={() => window.location.href = `/predict?location=${encodeURIComponent(prediction.location)}`}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </div>
                    </div>
                    
                    {/* For mobile: show change below other stats */}
                    {prediction.currentProbability && (
                      <div className="border-t border-gray-100 pt-3 mt-3 text-center md:hidden">
                        <div className="flex items-center gap-1 justify-center">
                          {getProbabilityChange(prediction.probability, prediction.currentProbability)?.icon}
                          <span className={`text-sm ${getProbabilityChange(prediction.probability, prediction.currentProbability)?.color}`}>
                            {getProbabilityChange(prediction.probability, prediction.currentProbability)?.text}
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default History;
