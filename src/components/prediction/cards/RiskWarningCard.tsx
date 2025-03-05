
import { AlertTriangle } from "lucide-react";

interface RiskWarningCardProps {
  totalIncidents: number;
}

export function RiskWarningCard({ totalIncidents }: RiskWarningCardProps) {
  if (totalIncidents <= 15) return null;

  return (
    <div className="mt-16 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
      <div>
        <p className="text-sm font-medium text-amber-700">Elevated Historical Risk</p>
        <p className="text-xs text-amber-600 mt-1">
          This area has experienced a high number of wildfires in the past 5 years, indicating an elevated historical risk pattern.
        </p>
      </div>
    </div>
  );
}
