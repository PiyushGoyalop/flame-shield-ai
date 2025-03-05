
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Prediction {
  id: string;
  location: string;
  probability: number;
  created_at: string;
  co2_level?: number;
  temperature?: number;
  humidity?: number;
  drought_index?: number;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
  isLoading: boolean;
}

export function PredictionHistory({ predictions, isLoading }: PredictionHistoryProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </div>
              <div className="grid grid-cols-3 gap-2 p-3 border-t border-gray-100">
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
                <Skeleton className="h-10 rounded-md" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (predictions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No prediction history found
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          Make your first prediction to see it here
        </p>
      </div>
    );
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Function to determine status color
  const getStatusColor = (probability: number) => {
    if (probability < 33) return "text-green-600";
    if (probability < 66) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => (
        <Card key={prediction.id} className="hover:border-wildfire-200 transition-all">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-wildfire-500" />
                  <h3 className="font-medium">{prediction.location}</h3>
                </div>
                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(prediction.created_at)}
                </p>
              </div>
              <div>
                <div className="text-lg font-medium text-right">
                  <span className={getStatusColor(prediction.probability)}>
                    {prediction.probability}%
                  </span>
                </div>
                <div className="text-sm text-muted-foreground text-right">
                  Risk Level
                </div>
              </div>
            </div>
            
            {(prediction.temperature || prediction.humidity || prediction.co2_level) && (
              <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-gray-100">
                {prediction.temperature && (
                  <div className="text-center">
                    <div className="text-sm font-medium">{prediction.temperature}°C</div>
                    <div className="text-xs text-muted-foreground">Temperature</div>
                  </div>
                )}
                {prediction.humidity && (
                  <div className="text-center">
                    <div className="text-sm font-medium">{prediction.humidity}%</div>
                    <div className="text-xs text-muted-foreground">Humidity</div>
                  </div>
                )}
                {prediction.co2_level && (
                  <div className="text-center">
                    <div className="text-sm font-medium">{prediction.co2_level}</div>
                    <div className="text-xs text-muted-foreground">CO2 Level</div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
