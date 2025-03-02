
import { Leaf, Cloud } from "lucide-react";

interface MainStatsProps {
  result: {
    probability: number;
    co2Level: number;
  };
}

export function MainStats({ result }: MainStatsProps) {
  return (
    <div className="p-4 bg-white/60 rounded-lg hover:bg-white/80 transition-colors shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium flex items-center gap-1">
          <Leaf className="h-3 w-3 text-wildfire-600" /> Wildfire Probability:
        </span>
        <span className="font-bold">{result.probability}%</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium flex items-center gap-1">
          <Cloud className="h-3 w-3 text-blue-600" /> CO₂ Levels:
        </span>
        <span>{result.co2Level} MT</span>
      </div>
    </div>
  );
}
