export const checkNoiseLevel = (noiseLevel = 0) => {
  if (!noiseLevel)
    return {
      color: "#eaeaec",
      textColor: "#000000",
      message: "Sin medida",
      examples: "Sin medida",
      hasToShowWarning: false,
    };

  if (noiseLevel <= 19)
    return {
      color: "#024B19",
      textColor: "#ffffff",
      message: "Muy silencioso",
      examples: "Cámara aenoica, respiración",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 29)
    return {
      color: "#4cd137",
      textColor: "#000000",
      message: "Muy silencioso",
      examples: "Estudio de grabación, crujir de hojas secas",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 39)
    return {
      color: "#a3cb37",
      textColor: "#000000",
      message: "Silencioso",
      examples: "Biblioteca tranquila, susurros, área rural tranquila",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 49)
    return {
      color: "#c4e539",
      textColor: "#000000",
      message: "Silencioso",
      examples: "Refrigerador, cantar de aves",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 59)
    return {
      color: "#b8e993",
      textColor: "#000000",
      message: "Poco ruidoso",
      examples: "Oficina tranquila, lluvia moderada",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 69)
    return {
      color: "#99E27F",
      textColor: "#000000",
      message: "Poco ruidoso",
      examples: "Conversación",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 79)
    return {
      color: "#fad390",
      textColor: "#000000",
      message: "Ruidoso",
      examples: "Tráfico, aspiradora, restaurante",
      hasToShowWarning: false,
    };
  else if (noiseLevel <= 89)
    return {
      color: "#f7c291",
      textColor: "#000000",
      message: "Muy ruidoso",
      examples: "Música a todo volumen, alarma de reloj, secador de cabello",
      hasToShowWarning: noiseLevel >= 85,
    };
  else if (noiseLevel <= 99)
    return {
      color: "#ffc314",
      textColor: "#000000",
      message: "Muy ruidoso",
      examples: "Camión con motor diésel, cortadora de césped",
      hasToShowWarning: noiseLevel >= 85,
    };
  else if (noiseLevel <= 109)
    return {
      color: "#f79f1e",
      textColor: "#000000",
      message: "Excesivamente ruidoso",
      examples: "Moto, fábrica",
      hasToShowWarning: noiseLevel >= 85,
    };
  else if (noiseLevel <= 119)
    return {
      color: "#F59F7F",
      textColor: "#000000",
      message: "Excesivamente ruidoso",
      examples: "Aeropuerto",
      hasToShowWarning: noiseLevel >= 85,
    };

  return {
    color: "#752428",
    textColor: "#ffffff",
    message: "Excesivamente ruidoso",
    examples: "Umbral de malestar",
    hasToShowWarning: noiseLevel >= 85,
  };
};
