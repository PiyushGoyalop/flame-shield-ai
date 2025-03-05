
import { Mountain, Building, Leaf, Droplets, CircleDashed } from "lucide-react";

interface LandCoverStatsProps {
  landCover: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
}

export function LandCoverStats({ landCover }: LandCoverStatsProps) {
  if (!landCover) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 w-full">
      <div className="flex flex-col items-center p-3 rounded-lg border hover:bg-wildfire-50 transition-colors">
        <Mountain className="w-5 h-5 text-green-700 mb-1" />
        <span className="text-xs text-center">Forest</span>
        <span className="text-sm font-semibold">{landCover.forest_percent}%</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-lg border hover:bg-wildfire-50 transition-colors">
        <Leaf className="w-5 h-5 text-lime-600 mb-1" />
        <span className="text-xs text-center">Grassland</span>
        <span className="text-sm font-semibold">{landCover.grassland_percent}%</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-lg border hover:bg-wildfire-50 transition-colors">
        <Building className="w-5 h-5 text-slate-600 mb-1" />
        <span className="text-xs text-center">Urban</span>
        <span className="text-sm font-semibold">{landCover.urban_percent}%</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-lg border hover:bg-wildfire-50 transition-colors">
        <Droplets className="w-5 h-5 text-blue-500 mb-1" />
        <span className="text-xs text-center">Water</span>
        <span className="text-sm font-semibold">{landCover.water_percent}%</span>
      </div>
      <div className="flex flex-col items-center p-3 rounded-lg border hover:bg-wildfire-50 transition-colors">
        <CircleDashed className="w-5 h-5 text-stone-400 mb-1" />
        <span className="text-xs text-center">Barren</span>
        <span className="text-sm font-semibold">{landCover.barren_percent}%</span>
      </div>
    </div>
  );
}
