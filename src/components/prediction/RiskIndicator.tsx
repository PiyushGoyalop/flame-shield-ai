
import { Card, CardContent } from "@/components/ui/card";

interface RiskIndicatorProps {
  probability: number;
}

export function RiskIndicator({ probability }: RiskIndicatorProps) {
  // Format probability for display
  const formattedProbability = probability % 1 === 0 ? probability : probability.toFixed(1);
  
  // Determine the risk level based on probability
  const getRiskLevel = () => {
    if (probability < 33) return { level: 'Low Risk', color: 'green' };
    if (probability < 67) return { level: 'Moderate Risk', color: 'amber' };
    return { level: 'High Risk', color: 'red' };
  };
  
  const risk = getRiskLevel();
  
  // Get background gradient color based on risk level
  const getBackgroundColor = () => {
    if (probability < 33) return 'bg-gradient-to-r from-green-100 to-green-400';
    if (probability < 67) return 'bg-gradient-to-r from-amber-100 to-amber-400';
    return 'bg-gradient-to-r from-wildfire-100 to-red-500';
  };
  
  // Get slider marker/text color based on risk level
  const getTextColor = () => {
    if (probability < 33) return 'text-green-700';
    if (probability < 67) return 'text-amber-700';
    return 'text-red-700';
  };
  
  return (
    <Card className="border-wildfire-200 overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Wildfire Risk Assessment</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium
              ${risk.color === 'green' ? 'bg-green-100 text-green-800' : 
                risk.color === 'amber' ? 'bg-amber-100 text-amber-800' : 
                  'bg-red-100 text-red-800'}`}>
              {risk.level}
            </span>
          </div>
          
          {/* Risk Slider */}
          <div className="mt-2">
            <div className="relative h-8 bg-gray-200 rounded-full overflow-hidden">
              {/* Gradient background */}
              <div className="absolute inset-0 flex">
                <div className="h-full w-1/3 bg-gradient-to-r from-green-100 to-green-300"></div>
                <div className="h-full w-1/3 bg-gradient-to-r from-amber-100 to-amber-300"></div>
                <div className="h-full w-1/3 bg-gradient-to-r from-wildfire-200 to-red-500"></div>
              </div>
              
              {/* Progress indicator */}
              <div 
                className={`absolute inset-y-0 left-0 transition-all duration-1000 ease-out ${getBackgroundColor()}`}
                style={{ width: `${probability}%` }}
              />
              
              {/* Pulsing indicator at current position */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white shadow-md animate-pulse"
                style={{ left: `${probability}%`, transform: 'translateX(-50%)' }}
              />
              
              {/* Percentage display */}
              <div 
                className={`absolute text-xs font-bold ${getTextColor()} px-1 rounded transform -translate-x-1/2`}
                style={{ 
                  left: `${probability}%`, 
                  top: '50%', 
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {formattedProbability}%
              </div>
            </div>
            
            {/* Labels */}
            <div className="flex justify-between text-xs mt-1">
              <span className="text-green-600 font-medium">Low Risk</span>
              <span className="text-amber-600 font-medium">Moderate Risk</span>
              <span className="text-red-600 font-medium">High Risk</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-2">
            This assessment is based on environmental conditions, weather data, and historical patterns.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
