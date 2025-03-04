
import { useEffect, useState } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, History as HistoryIcon, Clock, AlertTriangle, Check, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Prediction interface
interface Prediction {
  id: string;
  location: string;
  probability: number;
  co2_level: number;
  temperature: number;
  humidity: number;
  drought_index: number;
  created_at: string;
  current_probability?: number;
}

const History = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Fetch predictions from Supabase
  useEffect(() => {
    const fetchPredictions = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('predictions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        // Simulate current probability for demonstration purposes
        const predictionsWithCurrent = data.map(prediction => ({
          ...prediction,
          current_probability: simulateCurrentProbability(prediction.probability)
        }));
        
        setPredictions(predictionsWithCurrent);
      } catch (error: any) {
        toast({
          title: "Error loading predictions",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [user, toast]);

  // Simulate current probability for demonstration
  const simulateCurrentProbability = (originalProbability: number) => {
    const change = (Math.random() - 0.5) * 15; // Random change between -7.5% and +7.5%
    const newProbability = Math.max(0, Math.min(100, originalProbability + change));
    return Math.round(newProbability * 10) / 10;
  };

  const handleLogin = () => {
    navigate("/signin?redirect=history");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/signin");
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
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
                View your previous wildfire risk predictions
              </p>
            </div>
            
            {user ? (
              <div className="flex gap-3">
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
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-pulse text-wildfire-500">Loading history...</div>
            </div>
          ) : !user ? (
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
                  <Button variant="outline" onClick={() => navigate("/signup")}>
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
                  Make your first prediction to see it in your history.
                </p>
                <Button 
                  className="bg-wildfire-500 hover:bg-wildfire-600 text-white"
                  onClick={() => navigate("/predict")}
                >
                  Make a Prediction
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
                          <span>Predicted on {formatDate(prediction.created_at)}</span>
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
                          <p className={`text-lg font-bold ${getStatusColor(prediction.current_probability || 0)}`}>
                            {prediction.current_probability}%
                          </p>
                        </div>
                        
                        {prediction.current_probability && (
                          <div className="md:border-l md:border-gray-200 pl-6 hidden md:block">
                            <div className="flex items-center gap-1">
                              {getProbabilityChange(prediction.probability, prediction.current_probability)?.icon}
                              <span className={`text-sm ${getProbabilityChange(prediction.probability, prediction.current_probability)?.color}`}>
                                {getProbabilityChange(prediction.probability, prediction.current_probability)?.text}
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
                          onClick={() => navigate(`/predict?location=${encodeURIComponent(prediction.location)}`)}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" /> View Details
                        </Button>
                      </div>
                    </div>
                    
                    {/* For mobile: show change below other stats */}
                    {prediction.current_probability && (
                      <div className="border-t border-gray-100 pt-3 mt-3 text-center md:hidden">
                        <div className="flex items-center gap-1 justify-center">
                          {getProbabilityChange(prediction.probability, prediction.current_probability)?.icon}
                          <span className={`text-sm ${getProbabilityChange(prediction.probability, prediction.current_probability)?.color}`}>
                            {getProbabilityChange(prediction.probability, prediction.current_probability)?.text}
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
