
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";
import { VegetationIndicesDisplay } from "./VegetationIndicesDisplay";
import { LandCoverChart } from "./LandCoverChart";
import { VegetationRiskFactor } from "./VegetationRiskFactor";

interface EarthEngineDataProps {
  vegetationIndex?: {
    ndvi: number;
    evi: number;
  };
  landCover?: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
}

// Memoize the component to prevent unnecessary re-renders
export const EarthEngineDataDisplay = memo(function EarthEngineDataDisplay({ 
  vegetationIndex, 
  landCover 
}: EarthEngineDataProps) {
  if (!vegetationIndex && !landCover) {
    return null;
  }

  return (
    <Card className="mt-6 border-wildfire-200 hover:border-wildfire-300 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span>Vegetation & Land Cover Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {vegetationIndex && <VegetationIndicesDisplay vegetationIndex={vegetationIndex} />}
        
        {landCover && (
          <LandCoverChart landCover={landCover} />
        )}

        <VegetationRiskFactor vegetationIndex={vegetationIndex} landCover={landCover} />
      </CardContent>
    </Card>
  );
});
