
import { Leaf, Zap } from "lucide-react";

interface VegetationIndicesProps {
  vegetationIndex: {
    ndvi: number;
    evi: number;
    data_source?: string;
    request_timestamp?: string;
  };
}

export function VegetationIndicesDisplay({ vegetationIndex }: VegetationIndicesProps) {
  if (!vegetationIndex) return null;

  // Helper function to determine vegetation health text
  const getVegetationHealthText = (ndvi: number) => {
    if (ndvi >= 0.7) return "Excellent vegetation health, lush area";
    if (ndvi >= 0.5) return "Good vegetation health, well vegetated";
    if (ndvi >= 0.3) return "Moderate vegetation, mixed coverage";
    if (ndvi >= 0.1) return "Poor vegetation health, sparse coverage";
    return "Very low vegetation, possibly barren or urban";
  };
  
  // Determine source text and style
  const isRealData = vegetationIndex.data_source === 'real_api';
  const sourceText = isRealData 
    ? "Real-time Earth Engine data" 
    : "Simulated vegetation data";
  const sourceTextClass = isRealData ? "text-green-600" : "text-amber-600";
  const sourceIcon = isRealData ? <Zap className="h-3 w-3" /> : null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="flex flex-col p-3 bg-green-50 rounded-lg">
        <span className="text-sm text-muted-foreground">NDVI (Vegetation Density)</span>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-semibold">{vegetationIndex.ndvi.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground mb-1">(0-1 scale)</span>
        </div>
        <span className="text-xs text-green-600 mt-1">
          {getVegetationHealthText(vegetationIndex.ndvi)}
        </span>
        {vegetationIndex.data_source && (
          <div className={`text-xs mt-2 ${sourceTextClass} flex items-center gap-1`}>
            {sourceIcon}
            <span>{sourceText}</span>
          </div>
        )}
      </div>
      <div className="flex flex-col p-3 bg-green-50 rounded-lg">
        <span className="text-sm text-muted-foreground">EVI (Enhanced Vegetation)</span>
        <div className="flex items-end gap-1">
          <span className="text-2xl font-semibold">{vegetationIndex.evi.toFixed(2)}</span>
          <span className="text-xs text-muted-foreground mb-1">(0-1 scale)</span>
        </div>
        <span className="text-xs text-green-600 mt-1">
          Accounts for atmospheric conditions & canopy background
        </span>
      </div>
    </div>
  );
}
