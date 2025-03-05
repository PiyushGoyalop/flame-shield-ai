
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
        <CircleDashed className="w-4 h-4 text-stone-400 mb-1" />
        <span className="text-xs text-center">Barren</span>
        <span className="text-sm font-semibold">{landCover.barren_percent}%</span>
      </div>
    </div>
  );
}
