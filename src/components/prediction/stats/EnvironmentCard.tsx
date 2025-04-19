
import { Leaf, Cloud } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface EnvironmentCardProps {
  co2Level: number;
  droughtIndex: number;
}

export function EnvironmentCard({ co2Level, droughtIndex }: EnvironmentCardProps) {
  return (
    <Card className="border-wildfire-100">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-sm font-medium flex items-center gap-2 mb-2">
          <Leaf className="h-4 w-4 text-green-600" />
          <span>Environment</span>
        </h3>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <Cloud className="h-4 w-4 text-orange-600" /> 
            <span>CO₂ Levels</span>
          </span>
          <span className="font-semibold">
            {co2Level} MT 
            <span className="text-xs text-gray-500 ml-1">(Metric Tons)</span>
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-2 text-sm">
            <Cloud className="h-4 w-4 text-orange-600" /> 
            <span>Drought Index</span>
          </span>
          <span className="font-semibold">{droughtIndex.toFixed(1)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
