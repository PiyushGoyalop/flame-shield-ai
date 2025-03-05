
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Leaf, PieChart as PieChartIcon, Mountain, Building, Droplets, Sand } from "lucide-react";

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

export function EarthEngineDataDisplay({ vegetationIndex, landCover }: EarthEngineDataProps) {
  if (!vegetationIndex && !landCover) {
    return null;
  }

  // Prepare land cover data for pie chart if available
  const landCoverData = landCover ? [
    { name: 'Forest', value: landCover.forest_percent, color: '#22c55e' },
    { name: 'Grassland', value: landCover.grassland_percent, color: '#84cc16' },
    { name: 'Urban', value: landCover.urban_percent, color: '#94a3b8' },
    { name: 'Water', value: landCover.water_percent, color: '#38bdf8' },
    { name: 'Barren', value: landCover.barren_percent, color: '#d4d4d4' }
  ].filter(item => item.value > 0) : [];

  // Helper function to determine vegetation health text
  const getVegetationHealthText = (ndvi: number) => {
    if (ndvi >= 0.7) return "Excellent vegetation health, lush area";
    if (ndvi >= 0.5) return "Good vegetation health, well vegetated";
    if (ndvi >= 0.3) return "Moderate vegetation, mixed coverage";
    if (ndvi >= 0.1) return "Poor vegetation health, sparse coverage";
    return "Very low vegetation, possibly barren or urban";
  };

  // Helper function to determine risk factor based on vegetation and land cover
  const getVegetationRiskFactor = () => {
    if (!vegetationIndex || !landCover) return null;
    
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
    <Card className="mt-6 border-wildfire-200 hover:border-wildfire-300 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          <span>Vegetation & Land Cover Analysis</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {vegetationIndex && (
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
        )}

        {landCoverData.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-3 flex items-center gap-1">
              <PieChartIcon className="w-4 h-4" />
              <span>Land Cover Distribution</span>
            </h4>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={landCoverData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {landCoverData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Coverage']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {landCover && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-4">
            <div className="flex flex-col items-center p-2 rounded-lg border">
              <Mountain className="w-4 h-4 text-green-700 mb-1" />
              <span className="text-xs text-center">Forest</span>
              <span className="text-sm font-semibold">{landCover.forest_percent}%</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg border">
              <Leaf className="w-4 h-4 text-lime-600 mb-1" />
              <span className="text-xs text-center">Grassland</span>
              <span className="text-sm font-semibold">{landCover.grassland_percent}%</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg border">
              <Building className="w-4 h-4 text-slate-600 mb-1" />
              <span className="text-xs text-center">Urban</span>
              <span className="text-sm font-semibold">{landCover.urban_percent}%</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg border">
              <Droplets className="w-4 h-4 text-blue-500 mb-1" />
              <span className="text-xs text-center">Water</span>
              <span className="text-sm font-semibold">{landCover.water_percent}%</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-lg border">
              <Sand className="w-4 h-4 text-stone-400 mb-1" />
              <span className="text-xs text-center">Barren</span>
              <span className="text-sm font-semibold">{landCover.barren_percent}%</span>
            </div>
          </div>
        )}

        {vegetationRiskFactor && (
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
        )}
      </CardContent>
    </Card>
  );
}
