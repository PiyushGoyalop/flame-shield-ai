
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, History as HistoryIcon, Clock, AlertTriangle, Check, ExternalLink, Search, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LocationSelector } from "@/components/prediction/LocationSelector";
import { useNavigate } from "react-router-dom";

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
  const [searchMode, setSearchMode] = useState<boolean>(false);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [searchIsLoading, setSearchIsLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  // Check login status and load user-specific predictions
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    if (loggedIn) {
      const email = localStorage.getItem("userEmail") || "";
      setUserEmail(email);
      
      // Load user-specific predictions
      const historyKey = `predictions_${email}`;
      const savedPredictions = localStorage.getItem(historyKey);
      
      if (savedPredictions) {
        setPredictions(JSON.parse(savedPredictions));
      }
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
      // Redirect to sign in if not logged in
      navigate("/signin?redirect=history");
    }
  }, [navigate]);

  const handleLogin = () => {
    navigate("/signin?redirect=history");
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    setPredictions([]);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    
    // Redirect to sign in
    navigate("/signin");
  };

  const handleLocationSelect = (location: string) => {
    setSearchLocation(location);
  };

  const handleSearchSubmit = () => {
    if (!searchLocation) {
      toast({
        title: "Location required",
        description: "Please select a location to search",
        variant: "destructive",
      });
      return;
    }

    setSearchIsLoading(true);
    
    // Simulate API call to get prediction
    setTimeout(() => {
      // Generate random prediction data
      const probability = Math.round((Math.random() * 70 + 10) * 100) / 100;
      const co2Level = Math.round((Math.random() * 30 + 15) * 10) / 10;
      const temperature = Math.round((Math.random() * 25 + 10) * 10) / 10;
      const currentProbability = Math.round((probability + (Math.random() * 20 - 10)) * 100) / 100;
      
      // Create a new prediction
      const newPrediction: HistoricalPrediction = {
        id: `p${Date.now()}`,
        location: searchLocation,
        date: new Date().toISOString().split('T')[0],
        probability,
        co2Level,
        temperature,
        currentProbability: currentProbability < 0 ? 0 : currentProbability > 100 ? 100 : currentProbability
      };
      
      // Add to predictions list
      const updatedPredictions = [newPrediction, ...predictions];
      setPredictions(updatedPredictions);
      
      // Save to user-specific localStorage
      const historyKey = `predictions_${userEmail}`;
      localStorage.setItem(historyKey, JSON.stringify(updatedPredictions));
      
      // Reset search and show success message
      setSearchLocation("");
      setSearchMode(false);
      setSearchIsLoading(false);
      
      toast({
        title: "Location added to history",
        description: `Prediction for ${searchLocation} has been saved to your history.`,
      });
    }, 1500);
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
                Search and add locations to track wildfire risk over time
              </p>
            </div>
            
            {isLoggedIn ? (
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="border-wildfire-200 text-wildfire-700 hover:bg-wildfire-50"
                  onClick={() => setSearchMode(!searchMode)}
                >
                  {searchMode ? (
                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" /> Cancel
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Plus className="h-4 w-4" /> Add Location
                    </span>
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-wildfire-200 text-wildfire-700 hover:bg-wildfire-50"
                  onClick={handleLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : null}
          </div>

          {/* Search Form */}
          {isLoggedIn && searchMode && (
            <Card className="mb-8 border-wildfire-100">
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Search className="h-4 w-4" /> 
                  Add Location to History
                </h3>
                <div className="space-y-4">
                  <LocationSelector 
                    onLocationSelect={handleLocationSelect} 
                    isLoading={searchIsLoading} 
                  />
                  <Button 
                    onClick={handleSearchSubmit} 
                    className="w-full bg-wildfire-600 hover:bg-wildfire-700" 
                    disabled={searchIsLoading || !searchLocation}
                  >
                    {searchIsLoading ? "Searching..." : "Add to History"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          
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
                  Sign in to search for locations and track wildfire risk changes over time for your saved areas.
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
                <h2 className="text-xl font-bold mb-3">No Locations Saved Yet</h2>
                <p className="text-muted-foreground mb-6">
                  Use the "Add Location" button to search for areas and save them to your history.
                </p>
                <Button 
                  className="bg-wildfire-500 hover:bg-wildfire-600 text-white"
                  onClick={() => setSearchMode(true)}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Your First Location
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
