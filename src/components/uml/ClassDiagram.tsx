
import React from "react";

export const ClassDiagram = () => {
  return (
    <div className="relative overflow-auto p-4 border border-muted rounded-md bg-white">
      <svg width="900" height="800" viewBox="0 0 900 800" className="mx-auto">
        {/* Base Prediction Forest Class */}
        <rect x="300" y="20" width="280" height="180" rx="4" fill="#ffffff" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="300" y1="50" x2="580" y2="50" stroke="#0ea5e9" strokeWidth="2" />
        <line x1="300" y1="120" x2="580" y2="120" stroke="#0ea5e9" strokeWidth="2" />
        <text x="440" y="40" textAnchor="middle" className="text-base font-semibold" fill="#0ea5e9">BasePredictionForest</text>
        <text x="310" y="70" className="text-xs" fill="#334155">- numTrees: int</text>
        <text x="310" y="90" className="text-xs" fill="#334155">- maxDepth: int</text>
        <text x="310" y="110" className="text-xs" fill="#334155">- trainingData: Dataset</text>
        <text x="310" y="140" className="text-xs" fill="#334155">+ train(data: Dataset): void</text>
        <text x="310" y="160" className="text-xs" fill="#334155">+ predict(features: Array): Object</text>
        <text x="310" y="180" className="text-xs" fill="#334155">+ evaluateAccuracy(): float</text>
        
        {/* Risk Classification Forest */}
        <rect x="50" y="300" width="280" height="200" rx="4" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="50" y1="330" x2="330" y2="330" stroke="#8b5cf6" strokeWidth="2" />
        <line x1="50" y1="400" x2="330" y2="400" stroke="#8b5cf6" strokeWidth="2" />
        <text x="190" y="320" textAnchor="middle" className="text-base font-semibold" fill="#8b5cf6">RiskClassificationForest</text>
        <text x="60" y="350" className="text-xs" fill="#334155">- riskCategories: Array</text>
        <text x="60" y="370" className="text-xs" fill="#334155">- probabilityThreshold: float</text>
        <text x="60" y="390" className="text-xs" fill="#334155">- confidenceScore: float</text>
        <text x="60" y="420" className="text-xs" fill="#334155">+ classifyRisk(location): String</text>
        <text x="60" y="440" className="text-xs" fill="#334155">+ getProbabilities(): Map</text>
        <text x="60" y="460" className="text-xs" fill="#334155">+ calculateConfusionMatrix(): Matrix</text>
        <text x="60" y="480" className="text-xs" fill="#334155">+ getConfidenceScore(): float</text>
        
        {/* Intensity Regression Forest */}
        <rect x="350" y="300" width="280" height="200" rx="4" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
        <line x1="350" y1="330" x2="630" y2="330" stroke="#f97316" strokeWidth="2" />
        <line x1="350" y1="400" x2="630" y2="400" stroke="#f97316" strokeWidth="2" />
        <text x="490" y="320" textAnchor="middle" className="text-base font-semibold" fill="#f97316">IntensityRegressionForest</text>
        <text x="360" y="350" className="text-xs" fill="#334155">- intensityScale: Object</text>
        <text x="360" y="370" className="text-xs" fill="#334155">- weatherFeatures: Array</text>
        <text x="360" y="390" className="text-xs" fill="#334155">- modelAccuracy: float</text>
        <text x="360" y="420" className="text-xs" fill="#334155">+ predictIntensity(conditions): float</text>
        <text x="360" y="440" className="text-xs" fill="#334155">+ analyzeFeatureImportance(): Map</text>
        <text x="360" y="460" className="text-xs" fill="#334155">+ calculateRMSE(): float</text>
        <text x="360" y="480" className="text-xs" fill="#334155">+ getAccuracyMetrics(): Object</text>
        
        {/* Emissions Prediction Forest */}
        <rect x="650" y="300" width="280" height="200" rx="4" fill="#ffffff" stroke="#10b981" strokeWidth="2" />
        <line x1="650" y1="330" x2="930" y2="330" stroke="#10b981" strokeWidth="2" />
        <line x1="650" y1="400" x2="930" y2="400" stroke="#10b981" strokeWidth="2" />
        <text x="790" y="320" textAnchor="middle" className="text-base font-semibold" fill="#10b981">EmissionsPredictionForest</text>
        <text x="660" y="350" className="text-xs" fill="#334155">- emissionTypes: Array</text>
        <text x="660" y="370" className="text-xs" fill="#334155">- biomassModel: Object</text>
        <text x="660" y="390" className="text-xs" fill="#334155">- calibrationFactor: float</text>
        <text x="660" y="420" className="text-xs" fill="#334155">+ estimateEmissions(area, type): Map</text>
        <text x="660" y="440" className="text-xs" fill="#334155">+ calculateTotalCarbon(): float</text>
        <text x="660" y="460" className="text-xs" fill="#334155">+ modelAccuracy(): float</text>
        <text x="660" y="480" className="text-xs" fill="#334155">+ calibrateModel(): void</text>
        
        {/* Model Ensemble */}
        <rect x="350" y="600" width="280" height="160" rx="4" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
        <line x1="350" y1="630" x2="630" y2="630" stroke="#ef4444" strokeWidth="2" />
        <line x1="350" y1="680" x2="630" y2="680" stroke="#ef4444" strokeWidth="2" />
        <text x="490" y="620" textAnchor="middle" className="text-base font-semibold" fill="#ef4444">ModelEnsemble</text>
        <text x="360" y="650" className="text-xs" fill="#334155">- models: Array&lt;BasePredictionForest&gt;</text>
        <text x="360" y="670" className="text-xs" fill="#334155">- weights: Map&lt;string, float&gt;</text>
        <text x="360" y="700" className="text-xs" fill="#334155">+ combineResults(): Prediction</text>
        <text x="360" y="720" className="text-xs" fill="#334155">+ weightModels(weights): void</text>
        <text x="360" y="740" className="text-xs" fill="#334155">+ validateEnsemble(): boolean</text>
        
        {/* Inheritance Lines with Improved Spacing */}
        <line x1="440" y1="200" x2="190" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="185,295 190,305 195,295" fill="#94a3b8" />
        
        <line x1="440" y1="200" x2="490" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="485,295 490,305 495,295" fill="#94a3b8" />
        
        <line x1="440" y1="200" x2="790" y2="300" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4" />
        <polygon points="785,295 790,305 795,295" fill="#94a3b8" />
        
        {/* Association Lines with Better Spacing */}
        <line x1="190" y1="500" x2="350" y2="600" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="345,595 355,605 355,595" fill="#94a3b8" />
        
        <line x1="490" y1="500" x2="490" y2="600" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="485,595 490,605 495,595" fill="#94a3b8" />
        
        <line x1="790" y1="500" x2="630" y2="600" stroke="#94a3b8" strokeWidth="1.5" />
        <polygon points="625,595 625,605 635,595" fill="#94a3b8" />
      </svg>
    </div>
  );
};
