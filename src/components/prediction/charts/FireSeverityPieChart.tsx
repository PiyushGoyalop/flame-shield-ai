
import { PieChartIcon } from "lucide-react";

interface FireSeverityData {
  low: number;
  medium: number;
  high: number;
  extreme: number;
}

interface FireSeverityPieChartProps {
  data?: FireSeverityData;
}

export function FireSeverityPieChart({ data }: FireSeverityPieChartProps) {
  if (!data) return null;

  const severityData = [
    { name: 'Low (<100 acres)', value: data.low, color: '#34d399' },
    { name: 'Medium (100-1k acres)', value: data.medium, color: '#fbbf24' },
    { name: 'High (1k-10k acres)', value: data.high, color: '#f97316' },
    { name: 'Extreme (>10k acres)', value: data.extreme, color: '#ef4444' }
  ].filter(item => item.value > 0);

  if (severityData.length === 0) return null;

  // Calculate total for percentages
  const total = severityData.reduce((acc, item) => acc + item.value, 0);

  return (
    <div className="pt-4 pb-6">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-1">
        <PieChartIcon className="w-4 h-4" />
        <span>Fire Severity</span>
      </h4>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
        {severityData.map((item, index) => (
          <div 
            key={`box-${index}`} 
            className="p-3 rounded-lg border hover:shadow-sm transition-all"
            style={{ borderColor: item.color, backgroundColor: `${item.color}15` }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-sm mb-1">{item.name}</span>
              <span className="text-lg font-semibold">{((item.value / total) * 100).toFixed(0)}%</span>
              <span className="text-xs text-muted-foreground mt-1">({item.value} fires)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
