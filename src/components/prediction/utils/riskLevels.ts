
export const getRiskLevel = (prob: number) => {
  if (prob < 30) return { level: "Low", color: "text-green-600" };
  if (prob < 60) return { level: "Moderate", color: "text-amber-600" };
  if (prob < 80) return { level: "High", color: "text-orange-600" };
  return { level: "Severe", color: "text-red-600" };
};

export const getAQIInfo = (aqi?: number) => {
  if (!aqi) return { text: "Unknown", color: "text-gray-500", value: 0 };
  
  switch(aqi) {
    case 1: 
      return { text: "Good", color: "text-green-600", value: 50 };
    case 2: 
      return { text: "Fair", color: "text-lime-600", value: 100 };
    case 3: 
      return { text: "Moderate", color: "text-amber-600", value: 150 };
    case 4: 
      return { text: "Poor", color: "text-orange-600", value: 200 };
    case 5: 
      return { text: "Very Poor", color: "text-red-600", value: 300 };
    default: 
      return { text: "Unknown", color: "text-gray-500", value: 0 };
  }
};
