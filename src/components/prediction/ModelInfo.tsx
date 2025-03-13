
import { Card, CardContent } from "@/components/ui/card";
import { Brain, BarChart4 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ModelInfoProps {
  modelType: string;
  featureImportance?: Record<string, number>;
}

export function ModelInfo({ modelType, featureImportance }: ModelInfoProps) {
  const isRandomForest = modelType === "random_forest";
  
  // Format the model type for display
  const formattedModelType = isRandomForest ? "Random Forest" : "Formula-based";
  
  // Helper function to format feature names
  const formatFeatureName = (name: string): string => {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <Card className="border-wildfire-200 shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-600" />
          <h3 className="text-lg font-medium">Model: {formattedModelType}</h3>
        </div>
        
        <p className="text-sm text-muted-foreground">
          {isRandomForest 
            ? "Using a Random Forest machine learning model for more accurate predictions based on complex patterns in environmental data."
            : "Using a formula-based calculation that weighs environmental factors based on scientific research."}
        </p>
        
        {isRandomForest && featureImportance && Object.keys(featureImportance).length > 0 && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2">
              <BarChart4 className="h-4 w-4 text-blue-600" />
              <h4 className="text-sm font-medium">Feature Importance</h4>
            </div>
            
            <div className="space-y-2">
              {Object.entries(featureImportance)
                .sort((a, b) => b[1] - a[1])
                .map(([feature, importance]) => (
                  <div key={feature} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>{formatFeatureName(feature)}</span>
                      <span className="text-muted-foreground">{Math.round(importance * 100)}%</span>
                    </div>
                    <Progress value={importance * 100} className="h-1.5" />
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
