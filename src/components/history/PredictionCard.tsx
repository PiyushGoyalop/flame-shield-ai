
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, AlertTriangle, Check, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PredictionCardProps {
  prediction: {
    id: string;
    location: string;
    probability: number;
    created_at: string;
    current_probability?: number;
  };
}

export function PredictionCard({ prediction }: PredictionCardProps) {
  const navigate = useNavigate();

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
  );
}
