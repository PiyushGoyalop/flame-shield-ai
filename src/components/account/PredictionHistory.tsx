
import { Card, CardContent } from "@/components/ui/card";

interface Prediction {
  id: string;
  location: string;
  date: string;
  probability: number;
}

interface PredictionHistoryProps {
  predictions: Prediction[];
}

export function PredictionHistory({ predictions }: PredictionHistoryProps) {
  if (predictions.length === 0) {
    return (
      <p className="text-center text-muted-foreground py-8">
        No prediction history found
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {predictions.map((prediction) => (
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
      ))}
    </div>
  );
}
