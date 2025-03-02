
import { ReactNode } from "react";

interface RiskIndicatorProps {
  probability: number;
}

export function RiskIndicator({ probability }: RiskIndicatorProps) {
  // Determine risk level for more detailed styling
  const getRiskLevel = () => {
    if (probability < 33) return { color: 'green', text: 'Low Risk' };
    if (probability < 66) return { color: 'amber', text: 'Moderate Risk' };
    return { color: 'red', text: 'High Risk' };
  };
  
  const risk = getRiskLevel();
  
  return (
    <div className="mb-4">
      <div className="relative h-5 bg-secondary rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 transition-all duration-1000 ease-out"
          style={{ 
            width: `${probability}%`,
            background: `linear-gradient(90deg, ${
              probability < 33 ? '#34D399' : 
              probability < 66 ? '#FBBF24' : '#EF4444'
            }, ${
              probability < 33 ? '#10B981' : 
              probability < 66 ? '#F59E0B' : '#DC2626'
            })` 
          }}
        />
        
        {/* Animated pulse marker for exact position */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-white animate-pulse"
          style={{ left: `${probability}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm mt-1">
        <span className="text-green-600 font-medium">Low Risk</span>
        <span className="text-amber-600 font-medium">Moderate Risk</span>
        <span className="text-red-600 font-medium">High Risk</span>
      </div>
      
      <div className="text-center mt-2">
        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
          ${risk.color === 'green' ? 'bg-green-100 text-green-800' : 
            risk.color === 'amber' ? 'bg-amber-100 text-amber-800' : 
              'bg-red-100 text-red-800'}`}>
          {risk.text}: {probability}%
        </span>
      </div>
    </div>
  );
}
