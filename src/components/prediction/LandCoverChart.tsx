
import { PieChartIcon } from "lucide-react";

interface LandCoverChartProps {
  landCover: {
    forest_percent: number;
    grassland_percent: number;
    urban_percent: number;
    water_percent: number;
    barren_percent: number;
  };
}

export function LandCoverChart({ landCover }: LandCoverChartProps) {
  if (!landCover) return null;

  // Prepare land cover data
  const landCoverData = [
    { name: 'Forest', value: landCover.forest_percent, color: '#22c55e' },
    { name: 'Grassland', value: landCover.grassland_percent, color: '#84cc16' },
    { name: 'Urban', value: landCover.urban_percent, color: '#94a3b8' },
    { name: 'Water', value: landCover.water_percent, color: '#38bdf8' },
    { name: 'Barren', value: landCover.barren_percent, color: '#d4d4d4' }
  ].filter(item => item.value > 0);

  if (landCoverData.length === 0) return null;

  return (
    <div className="mt-8 w-full">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-1">
        <PieChartIcon className="w-4 h-4" />
        <span>Land Cover Distribution</span>
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3 mb-8">
        {landCoverData.map((item, index) => (
          <div 
            key={`box-${index}`} 
            className="p-3 rounded-lg border hover:shadow-sm transition-all"
            style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-sm mb-1">{item.name}</span>
              <span className="text-lg font-semibold">{item.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
