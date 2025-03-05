
interface VegetationRiskFactorProps {
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

export function VegetationRiskFactor({ vegetationIndex, landCover }: VegetationRiskFactorProps) {
  if (!vegetationIndex || !landCover) return null;
  
  // Helper function to determine risk factor based on vegetation and land cover
  const getVegetationRiskFactor = () => {
    const { ndvi } = vegetationIndex;
    const { forest_percent, grassland_percent } = landCover;
    
    // High NDVI with high forest/grassland indicates high fuel load
    const fuelLoad = (ndvi * 0.5) + ((forest_percent + grassland_percent) / 200);
    
    if (fuelLoad > 0.8) return "Very High";
    if (fuelLoad > 0.6) return "High";
    if (fuelLoad > 0.4) return "Moderate";
    if (fuelLoad > 0.2) return "Low";
    return "Very Low";
  };

  const vegetationRiskFactor = getVegetationRiskFactor();
  const vegetationRiskClass = 
    vegetationRiskFactor === "Very High" ? "text-red-600" :
    vegetationRiskFactor === "High" ? "text-orange-500" :
    vegetationRiskFactor === "Moderate" ? "text-amber-500" :
    vegetationRiskFactor === "Low" ? "text-green-500" :
    "text-green-600";

  return (
    <div className="mt-6 p-3 bg-white border border-gray-200 rounded-lg">
      <h4 className="text-sm font-medium mb-2">Vegetation Fire Risk Factor</h4>
      <div className="flex items-center justify-between">
        <span className="text-sm">Fuel Load Assessment:</span>
        <span className={`font-medium ${vegetationRiskClass}`}>{vegetationRiskFactor}</span>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        {vegetationRiskFactor === "Very High" && "Dense vegetation provides significant fuel for potential fires. Extreme caution advised during dry conditions."}
        {vegetationRiskFactor === "High" && "Substantial vegetation that can fuel fires. Increased vigilance recommended, especially in dry weather."}
        {vegetationRiskFactor === "Moderate" && "Moderate amount of vegetation that could support fire spread under certain conditions."}
        {vegetationRiskFactor === "Low" && "Limited vegetation means reduced fuel for potential fires. Basic precautions still recommended."}
        {vegetationRiskFactor === "Very Low" && "Minimal vegetation results in very low fuel availability for potential fires."}
      </p>
    </div>
  );
}
