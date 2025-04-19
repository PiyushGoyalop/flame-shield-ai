
import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, AlertCircle, Clock } from "lucide-react";
import { VegetationIndicesDisplay } from "./VegetationIndicesDisplay";
import { LandCoverChart } from "./LandCoverChart";
import { VegetationRiskFactor } from "./VegetationRiskFactor";

interface EarthEngineDataProps {
  vegetationIndex?: {
    ndvi: number;
    evi: number;
    data_source?: string;
    request_timestamp?: string;
  };
  landCover?: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
  dataSource?: string;
  requestTimestamp?: string;
}

// Memoize the component to prevent unnecessary re-renders
export const EarthEngineDataDisplay = memo(function EarthEngineDataDisplay({ 
  vegetationIndex, 
  landCover,
  dataSource,
  requestTimestamp
}: EarthEngineDataProps) {
  if (!vegetationIndex && !landCover) {
    return null;
  }

  // Format timestamp for display
  const formattedTimestamp = requestTimestamp 
    ? new Date(requestTimestamp).toLocaleString() 
    : 'Unknown';

  return (
    <Card className="mt-6 border-wildfire-200 hover:border-wildfire-300 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span>Vegetation & Land Cover Analysis</span>
        </CardTitle>
        {dataSource && (
          <div className="flex items-center text-xs text-muted-foreground justify-between">
            <div className="flex items-center space-x-1">
              <span>Source:</span>
              <span className={dataSource === 'real_api' ? 'text-green-600' : 'text-amber-600'}>
                {dataSource === 'real_api' ? 'Google Earth Engine API' : 'Simulated Data'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{formattedTimestamp}</span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {vegetationIndex && <VegetationIndicesDisplay vegetationIndex={vegetationIndex} />}
        
        {landCover && (
          <LandCoverChart landCover={landCover} />
        )}

        <VegetationRiskFactor vegetationIndex={vegetationIndex} landCover={landCover} />
        
        {dataSource === 'mock_fallback' && (
          <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-xs flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-yellow-600" />
            <span className="text-yellow-700">
              Note: Using simulated vegetation data. Google Earth Engine API connection may need attention.
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
});
