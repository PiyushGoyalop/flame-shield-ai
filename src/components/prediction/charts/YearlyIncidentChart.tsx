
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";

interface YearlyIncident {
  year: number;
  incidents: number;
}

interface YearlyIncidentChartProps {
  data: YearlyIncident[];
}

export function YearlyIncidentChart({ data }: YearlyIncidentChartProps) {
  if (!data || data.length === 0) return null;
  
  const formattedChartData = data.slice().sort((a, b) => a.year - b.year);

  return (
    <div className="mt-4 mb-8">
      <h4 className="text-sm font-medium mb-4 flex items-center gap-1">
        <TrendingUp className="w-4 h-4" />
        <span>Yearly Incident Trend</span>
      </h4>
      <div className="h-60 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={formattedChartData}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="incidents" name="Incidents" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
