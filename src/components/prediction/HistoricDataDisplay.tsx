
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";
import { HistoricStatsCards } from "./cards/HistoricStatsCards";
import { YearlyIncidentChart } from "./charts/YearlyIncidentChart";
import { FireCausesPieChart } from "./charts/FireCausesPieChart";
import { FireSeverityPieChart } from "./charts/FireSeverityPieChart";
import { RiskWarningCard } from "./cards/RiskWarningCard";

interface HistoricData {
  total_incidents: number;
  largest_fire_acres: number;
  average_fire_size_acres: number;
  yearly_incidents: {
    year: number;
    incidents: number;
    severity?: {
      low: number;
      medium: number;
      high: number;
      extreme: number;
    };
    causes?: {
      lightning: number;
      human: number;
      unknown: number;
    };
  }[];
  severity_distribution?: {
    low: number;
    medium: number;
    high: number;
    extreme: number;
  };
  causes?: {
    lightning: number;
    human: number;
    unknown: number;
  };
}

interface HistoricDataDisplayProps {
  data?: HistoricData;
}

export function HistoricDataDisplay({ data }: HistoricDataDisplayProps) {
  if (!data) {
    return null;
  }

  const hasData = data.total_incidents > 0;

  return (
    <Card className="mt-6 border-wildfire-200 hover:border-wildfire-300 transition-all duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Flame className="w-5 h-5 text-wildfire-600" />
          <span>Historical Wildfire Data</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <>
            <HistoricStatsCards 
              totalIncidents={data.total_incidents}
              largestFireAcres={data.largest_fire_acres}
              averageFireSizeAcres={data.average_fire_size_acres}
            />

            <YearlyIncidentChart data={data.yearly_incidents} />

            {(data.causes || data.severity_distribution) && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 mb-14">
                {data.causes && <FireCausesPieChart data={data.causes} />}
                {data.severity_distribution && <FireSeverityPieChart data={data.severity_distribution} />}
              </div>
            )}

            <RiskWarningCard totalIncidents={data.total_incidents} />
          </>
        ) : (
          <div className="p-4 text-center">
            <p className="text-muted-foreground">No historical wildfire data found for this location in the past 5 years.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
