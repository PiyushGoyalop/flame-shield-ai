
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HistoryIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface EmptyHistoryCardProps {
  isLoggedIn: boolean;
}

export function EmptyHistoryCard({ isLoggedIn }: EmptyHistoryCardProps) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/signin?redirect=history");
  };

  if (isLoggedIn) {
    return (
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
    );
  }

  return (
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
  );
}
