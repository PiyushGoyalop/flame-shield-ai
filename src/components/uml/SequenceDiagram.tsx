
import React from "react";

export const SequenceDiagram = () => {
  return (
    <div className="relative overflow-auto p-4 border border-muted rounded-md bg-white">
      <svg width="900" height="600" viewBox="0 0 900 600" className="mx-auto">
        {/* Actor and Component Labels */}
        <text x="50" y="40" className="text-sm font-medium" fill="#334155">Data Source</text>
        <text x="200" y="40" className="text-sm font-medium" fill="#334155">Data Integration</text>
        <text x="350" y="40" className="text-sm font-medium" fill="#334155">Analysis Module</text>
        <text x="500" y="40" className="text-sm font-medium" fill="#334155">Prediction Engine</text>
        <text x="650" y="40" className="text-sm font-medium" fill="#334155">User Interface</text>
        <text x="800" y="40" className="text-sm font-medium" fill="#334155">Alert System</text>
        
        {/* Lifelines */}
        <line x1="50" y1="50" x2="50" y2="580" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="200" y1="50" x2="200" y2="580" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="350" y1="50" x2="350" y2="580" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="500" y1="50" x2="500" y2="580" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="650" y1="50" x2="650" y2="580" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        <line x1="800" y1="50" x2="800" y2="580" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4" />
        
        {/* Activation Bars */}
        <rect x="45" y="80" width="10" height="80" fill="#0ea5e9" />
        <rect x="195" y="100" width="10" height="100" fill="#0ea5e9" />
        <rect x="345" y="160" width="10" height="120" fill="#8b5cf6" />
        <rect x="495" y="220" width="10" height="150" fill="#f97316" />
        <rect x="645" y="300" width="10" height="100" fill="#10b981" />
        <rect x="795" y="380" width="10" height="60" fill="#ef4444" />
        
        {/* Message 1: Request Data */}
        <line x1="55" y1="100" x2="195" y2="100" stroke="#0ea5e9" strokeWidth="1.5" />
        <polygon points="185,95 195,100 185,105" fill="#0ea5e9" />
        <text x="125" y="90" className="text-xs" fill="#334155">Provide Raw Data</text>
        
        {/* Message 2: Process Data */}
        <line x1="205" y1="160" x2="345" y2="160" stroke="#0ea5e9" strokeWidth="1.5" />
        <polygon points="335,155 345,160 335,165" fill="#0ea5e9" />
        <text x="275" y="150" className="text-xs" fill="#334155">Send Processed Data</text>
        
        {/* Message 3: Analyze */}
        <line x1="355" y1="220" x2="495" y2="220" stroke="#8b5cf6" strokeWidth="1.5" />
        <polygon points="485,215 495,220 485,225" fill="#8b5cf6" />
        <text x="425" y="210" className="text-xs" fill="#334155">Analysis Results</text>
        
        {/* Message 4: Generate Prediction */}
        <line x1="505" y1="260" x2="505" y2="290" stroke="#f97316" strokeWidth="1.5" />
        <circle cx="505" cy="275" r="5" fill="#ffffff" stroke="#f97316" strokeWidth="1.5" />
        <text x="515" y="275" className="text-xs" fill="#334155">Generate Prediction</text>
        
        {/* Message 5: Update UI */}
        <line x1="505" y1="300" x2="645" y2="300" stroke="#f97316" strokeWidth="1.5" />
        <polygon points="635,295 645,300 635,305" fill="#f97316" />
        <text x="575" y="290" className="text-xs" fill="#334155">Send Predictions</text>
        
        {/* Message 6: If Risk High */}
        <line x1="505" y1="340" x2="645" y2="340" stroke="#f97316" strokeWidth="1.5" strokeDasharray="4" />
        <text x="575" y="330" className="text-xs" fill="#334155">Update Risk Display</text>
        
        {/* Message 7: Send Alert */}
        <line x1="655" y1="380" x2="795" y2="380" stroke="#10b981" strokeWidth="1.5" />
        <polygon points="785,375 795,380 785,385" fill="#10b981" />
        <text x="725" y="370" className="text-xs" fill="#334155">Trigger Alert</text>
        
        {/* Message 8: Acknowledge Alert */}
        <line x1="795" y1="420" x2="655" y2="420" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="665,425 655,420 665,415" fill="#ef4444" />
        <text x="725" y="410" className="text-xs" fill="#334155">Alert Confirmation</text>
        
        {/* Time Indicators */}
        <line x1="30" y1="80" x2="850" y2="80" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
        <text x="15" y="85" className="text-xs" fill="#94a3b8">t0</text>
        
        <line x1="30" y1="160" x2="850" y2="160" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
        <text x="15" y="165" className="text-xs" fill="#94a3b8">t1</text>
        
        <line x1="30" y1="220" x2="850" y2="220" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
        <text x="15" y="225" className="text-xs" fill="#94a3b8">t2</text>
        
        <line x1="30" y1="300" x2="850" y2="300" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
        <text x="15" y="305" className="text-xs" fill="#94a3b8">t3</text>
        
        <line x1="30" y1="380" x2="850" y2="380" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
        <text x="15" y="385" className="text-xs" fill="#94a3b8">t4</text>
        
        <line x1="30" y1="460" x2="850" y2="460" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2" />
        <text x="15" y="465" className="text-xs" fill="#94a3b8">t5</text>
      </svg>
    </div>
  );
};
