
import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { getRiskLevel } from "../utils/riskLevels";

interface WildfireRiskCardProps {
  probability: number;
}

export function WildfireRiskCard({ probability }: WildfireRiskCardProps) {
  const formattedProbability = probability % 1 === 0 ? probability : probability.toFixed(1);
  const riskInfo = getRiskLevel(probability);

  return (
    <Card className="border-wildfire-200 shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-full ${probability > 50 ? 'bg-red-100' : 'bg-green-100'}`}>
              <AlertTriangle className={`h-5 w-5 ${probability > 50 ? 'text-red-600' : 'text-green-600'}`} />
            </div>
            <div>
              <h3 className="text-lg font-medium">Wildfire Risk</h3>
              <p className={`text-sm ${riskInfo.color}`}>{riskInfo.level} Risk Level</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold">{formattedProbability}%</span>
            <p className="text-sm text-muted-foreground">Probability</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
