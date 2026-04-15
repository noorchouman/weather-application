import {
  Sun,
  CloudSun,
  CloudRain,
  CloudLightning,
  Cloud,
  CloudDrizzle,
} from "lucide-react";

export const weatherCodeMap = {
  0: { label: "Clear Sky", icon: Sun },
  1: { label: "Mainly Clear", icon: CloudSun },
  2: { label: "Partly Cloudy", icon: CloudSun },
  3: { label: "Overcast", icon: Cloud },
  45: { label: "Fog", icon: Cloud },
  48: { label: "Fog", icon: Cloud },
  51: { label: "Light Drizzle", icon: CloudDrizzle },
  53: { label: "Drizzle", icon: CloudDrizzle },
  55: { label: "Dense Drizzle", icon: CloudRain },
  61: { label: "Light Rain", icon: CloudRain },
  63: { label: "Rain", icon: CloudRain },
  65: { label: "Heavy Rain", icon: CloudRain },
  80: { label: "Showers", icon: CloudRain },
  81: { label: "Showers", icon: CloudRain },
  82: { label: "Storm Showers", icon: CloudLightning },
  95: { label: "Thunderstorm", icon: CloudLightning },
  96: { label: "Thunderstorm", icon: CloudLightning },
  99: { label: "Thunderstorm", icon: CloudLightning },
};

export function getWeatherMeta(code) {
  return weatherCodeMap[code] || { label: "Partly Cloudy", icon: CloudSun };
}

export function formatHour(dateString) {
  return new Date(dateString).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDay(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
  });
}