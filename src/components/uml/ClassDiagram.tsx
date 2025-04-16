
import React from "react";

export const ClassDiagram = () => {
  return (
    <div className="relative overflow-auto p-4 border border-muted rounded-md bg-white">
      <svg width="800" height="700" viewBox="0 0 800 700" className="mx-auto">
        {/* Base Prediction Forest Class */}
        <rect x="300" y="50" width="220" height="160" rx="4" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="300" y1="80" x2="520" y2="80" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="300" y1="140" x2="520" y2="140" stroke="#0ea5e9" strokeWidth="2" />
        <text x="410" y="70" textAnchor="middle" className="text-base font-semibold" fill="#0ea5e9">BasePredictionForest</text>
        <text x="310" y="100" className="text-xs" fill="#334155">- numTrees: int</text>
        <text x="310" y="120" className="text-xs" fill="#334155">- maxDepth: int</text>
        <text x="310" y="160" className="text-xs" fill="#334155">+ train(data: Dataset): void</text>
        <text x="310" y="180" className="text-xs" fill="#334155">+ predict(features: Array): Object</text>
        <text x="310" y="200" className="text-xs" fill="#334155">+ evaluateAccuracy(): float</text>
        
        {/* Risk Classification Forest */}
        <rect x="100" y="300" width="220" height="160" rx="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="100" y1="330" x2="320" y2="330" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="100" y1="390" x2="320" y2="390" stroke="#8b5cf6" strokeWidth="2" />
        <text x="210" y="320" textAnchor="middle" className="text-base font-semibold" fill="#8b5cf6">RiskClassificationForest</text>
        <text x="110" y="350" className="text-xs" fill="#334155">- riskCategories: Array</text>
        <text x="110" y="370" className="text-xs" fill="#334155">- probabilityThreshold: float</text>
        <text x="110" y="410" className="text-xs" fill="#334155">+ classifyRisk(location): String</text>
        <text x="110" y="430" className="text-xs" fill="#334155">+ getProbabilities(): Map</text>
        <text x="110" y="450" className="text-xs" fill="#334155">+ calculateConfusionMatrix(): Matrix</text>
        
        {/* Intensity Regression Forest */}
        <rect x="300" y="300" width="220" height="160" rx="4" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <line x1="300" y1="330" x2="520" y2="330" stroke="#f97316" strokeWidth="2" />
        <line x1="300" y1="390" x2="520" y2="390" stroke="#f97316" strokeWidth="2" />
        <text x="410" y="320" textAnchor="middle" className="text-base font-semibold" fill="#f97316">IntensityRegressionForest</text>
        <text x="310" y="350" className="text-xs" fill="#334155">- intensityScale: Object</text>
        <text x="310" y="370" className="text-xs" fill="#334155">- weatherFeatures: Array</text>
        <text x="310" y="410" className="text-xs" fill="#334155">+ predictIntensity(conditions): float</text>
        <text x="310" y="430" className="text-xs" fill="#334155">+ analyzeFeatureImportance(): Map</text>
        <text x="310" y="450" className="text-xs" fill="#334155">+ calculateRMSE(): float</text>
        
        {/* Emissions Prediction Forest */}
        <rect x="500" y="300" width="220" height="160" rx="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <line x1="500" y1="330" x2="720" y2="330" stroke="#10b981" strokeWidth="2" />
        <line x1="500" y1="390" x2="720" y2="390" stroke="#10b981" strokeWidth="2" />
        <text x="610" y="320" textAnchor="middle" className="text-base font-semibold" fill="#10b981">EmissionsPredictionForest</text>
        <text x="510" y="350" className="text-xs" fill="#334155">- emissionTypes: Array</text>
        <text x="510" y="370" className="text-xs" fill="#334155">- biomassModel: Object</text>
        <text x="510" y="410" className="text-xs" fill="#334155">+ estimateEmissions(area, type): Map</text>
        <text x="510" y="430" className="text-xs" fill="#334155">+ calculateTotalCarbon(): float</text>
        <text x="510" y="450" className="text-xs" fill="#334155">+ modelAccuracy(): float</text>
        
        {/* Model Ensemble */}
        <rect x="300" y="530" width="220" height="130" rx="4" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
        <line x1="300" y1="560" x2="520" y2="560" stroke="#ef4444" strokeWidth="2" />
        <line x1="300" y1="600" x2="520" y2="600" stroke="#ef4444" strokeWidth="2" />
        <text x="410" y="550" textAnchor="middle" className="text-base font-semibold" fill="#ef4444">ModelEnsemble</text>
        <text x="310" y="580" className="text-xs" fill="#334155">- models: Array</text>
        <text x="310" y="620" className="text-xs" fill="#334155">+ combineResults(): Prediction</text>
        <text x="310" y="640" className="text-xs" fill="#334155">+ weightModels(weights): void</text>
        
        {/* Inheritance Lines */}
        <line x1="410" y1="210" x2="210" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="205,295 210,305 215,295" fill="#94a3b8" />
        
        <line x1="410" y1="210" x2="410" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="405,295 410,305 415,295" fill="#94a3b8" />
        
        <line x1="410" y1="210" x2="610" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="605,295 610,305 615,295" fill="#94a3b8" />
        
        {/* Association Lines */}
        <line x1="210" y1="460" x2="300" y2="530" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="295,525 305,535 305,525" fill="#94a3b8" />
        
        <line x1="410" y1="460" x2="410" y2="530" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="405,525 410,535 415,525" fill="#94a3b8" />
        
        <line x1="610" y1="460" x2="520" y2="530" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="515,525 515,535 525,525" fill="#94a3b8" />
      </svg>
    </div>
  );
};
