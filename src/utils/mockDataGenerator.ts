
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
  
  let baseProbability = 0;
  if (isHighRiskState) baseProbability += 40;
  if (isForested) baseProbability += 25;
  if (isCoastal) baseProbability -= 15;
  if (isUrban) baseProbability -= 10;
  
  const locationFactor = seed * 35;
  
  const probability = Math.min(95, Math.max(5, baseProbability + locationFactor));
  const temperature = 10 + (seed * 25);
  const humidity = isCoastal ? 50 + (seed * 30) : 20 + (seed * 40);
  const co2Level = 5 + (seed * 40) + (isUrban ? 15 : 0);
  const droughtIndex = isHighRiskState ? 80 - humidity : 60 - humidity;
  
  return {
    probability: Math.round(probability * 100) / 100,
    temperature: Math.round(temperature * 10) / 10,
    humidity: Math.round(humidity),
    co2Level: Math.round(co2Level * 10) / 10,
    droughtIndex: Math.round(Math.max(0, droughtIndex)),
    air_quality_index: Math.round(seed * 100),
    pm2_5: Math.round(seed * 10),
    pm10: Math.round(seed * 15)
  };
};
