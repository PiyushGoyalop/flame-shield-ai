
const getLocationSeed = (location: string): number => {
  let hash = 0;
  for (let i = 0; i < location.length; i++) {
    hash = ((hash << 5) - hash) + location.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
};

export const getMockPredictionData = (location: string) => {
  const seed = getLocationSeed(location);
  
  const isHighRiskState = /california|arizona|nevada|colorado|oregon|washington|utah/.test(location.toLowerCase());
  const isCoastal = /beach|coast|ocean|bay|gulf|sea/.test(location.toLowerCase());
  const isForested = /forest|wood|pine|redwood|national park/.test(location.toLowerCase());
  const isUrban = /city|downtown|urban|metro/.test(location.toLowerCase());
  const isDesert = /desert|valley|canyon|mesa/.test(location.toLowerCase());
  
  let baseProbability = 0;
  if (isHighRiskState) baseProbability += 40;
  if (isForested) baseProbability += 25;
  if (isCoastal) baseProbability -= 15;
  if (isUrban) baseProbability -= 10;
  if (isDesert) baseProbability += 15;
  
  const locationFactor = seed * 35;
  
  const probability = Math.min(95, Math.max(5, baseProbability + locationFactor));
  const temperature = 10 + (seed * 25);
  const humidity = isCoastal ? 50 + (seed * 30) : 20 + (seed * 40);
  const co2Level = 5 + (seed * 40) + (isUrban ? 15 : 0);
  const droughtIndex = isHighRiskState ? 80 - humidity : 60 - humidity;
  
  // Generate vegetation indices
  const ndvi = isForested ? 0.7 + (seed * 0.3) : 
               isUrban ? 0.1 + (seed * 0.2) : 
               isDesert ? 0.05 + (seed * 0.15) : 
               0.3 + (seed * 0.4);
  
  const evi = Math.max(0, Math.min(1, ndvi * 0.9 + (seed * 0.1 - 0.05)));
  
  // Generate land cover data
  let forestPercent = isForested ? 60 + (seed * 30) : 20 + (seed * 30);
  let grasslandPercent = isDesert ? 10 + (seed * 20) : 20 + (seed * 40);
  let urbanPercent = isUrban ? 50 + (seed * 40) : 5 + (seed * 15);
  let waterPercent = isCoastal ? 15 + (seed * 20) : 2 + (seed * 8);
  let barrenPercent = isDesert ? 40 + (seed * 30) : 5 + (seed * 15);
  
  // Normalize to ensure total is 100%
  const total = forestPercent + grasslandPercent + urbanPercent + waterPercent + barrenPercent;
  forestPercent = Math.round((forestPercent / total) * 100);
  grasslandPercent = Math.round((grasslandPercent / total) * 100);
  urbanPercent = Math.round((urbanPercent / total) * 100);
  waterPercent = Math.round((waterPercent / total) * 100);
  barrenPercent = Math.round((barrenPercent / total) * 100);
  
  // Final adjustment to ensure exactly 100%
  const finalTotal = forestPercent + grasslandPercent + urbanPercent + waterPercent + barrenPercent;
  if (finalTotal < 100) forestPercent += (100 - finalTotal);
  if (finalTotal > 100) forestPercent -= (finalTotal - 100);
  
  return {
    probability: Math.round(probability * 100) / 100,
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    co2Level: Math.round(co2Level * 10) / 10,
    droughtIndex: Math.round(Math.max(0, droughtIndex)),
    air_quality_index: Math.round(1 + seed * 4),  // AQI from 1-5
    pm2_5: Math.round(seed * 50 * 10) / 10,
    pm10: Math.round(seed * 70 * 10) / 10,
    vegetation_index: {
      ndvi: Math.round(ndvi * 100) / 100,
      evi: Math.round(evi * 100) / 100
    },
    land_cover: {
      forest_percent: forestPercent,
      grassland_percent: grasslandPercent,
      urban_percent: urbanPercent,
      water_percent: waterPercent,
      barren_percent: barrenPercent
    }
  };
};
