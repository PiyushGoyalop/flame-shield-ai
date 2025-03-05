
import { Flame } from "lucide-react";

interface HistoricStatsCardsProps {
  totalIncidents: number;
  largestFireAcres: number;
  averageFireSizeAcres: number;
}

export function HistoricStatsCards({ 
  totalIncidents, 
  largestFireAcres, 
  averageFireSizeAcres 
}: HistoricStatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="flex flex-col p-3 bg-wildfire-50 rounded-lg">
        <span className="text-sm text-muted-foreground">Total Incidents (5yr)</span>
        <span className="text-2xl font-semibold">{totalIncidents}</span>
      </div>
      <div className="flex flex-col p-3 bg-wildfire-50 rounded-lg">
        <span className="text-sm text-muted-foreground">Largest Fire</span>
        <span className="text-2xl font-semibold">{largestFireAcres.toLocaleString()} acres</span>
      </div>
      <div className="flex flex-col p-3 bg-wildfire-50 rounded-lg">
        <span className="text-sm text-muted-foreground">Average Fire Size</span>
        <span className="text-2xl font-semibold">{averageFireSizeAcres.toLocaleString()} acres</span>
      </div>
    </div>
  );
}
