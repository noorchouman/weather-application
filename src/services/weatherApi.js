import {
  DAILY_SLOTS,
  HOURLY_SLOTS,
  MAX_SUGGESTIONS,
} from "../config/constants";

const WEATHER_API_URL =
  import.meta.env.VITE_WEATHER_API_URL || "https://api.open-meteo.com/v1/forecast";

const GEOCODING_API_URL =
  import.meta.env.VITE_GEOCODING_API_URL ||
  "https://geocoding-api.open-meteo.com/v1/search";

export async function fetchPlaceSuggestions(searchText, signal) {
  const res = await fetch(
    `${GEOCODING_API_URL}?name=${encodeURIComponent(
      searchText
    )}&count=${MAX_SUGGESTIONS}&language=en&format=json`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch place suggestions");
  }

  const data = await res.json();

  return (
    data.results?.map((place, index) => ({
      id: place.id ?? `${place.name}-${place.latitude}-${place.longitude}-${index}`,
      name: place.name,
      country: place.country,
      admin1: place.admin1 || "",
      latitude: place.latitude,
      longitude: place.longitude,
    })) || []
  );
}

export async function fetchPlaceByName(cityName, signal) {
  const res = await fetch(
    `${GEOCODING_API_URL}?name=${encodeURIComponent(
      cityName
    )}&count=1&language=en&format=json`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch location");
  }

  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const place = data.results[0];

  return {
    id: place.id ?? `${place.name}-${place.latitude}-${place.longitude}`,
    name: place.name,
    country: place.country,
    admin1: place.admin1 || "",
    latitude: place.latitude,
    longitude: place.longitude,
  };
}

export async function fetchWeatherByCoords(place, signal) {
  const res = await fetch(
    `${WEATHER_API_URL}?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,cloud_cover,wind_gusts_10m,is_day,precipitation&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,visibility,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&forecast_days=${DAILY_SLOTS}&timezone=auto`,
    { signal }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch weather");
  }

  const data = await res.json();

  const hourly = data.hourly.time.slice(0, HOURLY_SLOTS).map((time, i) => ({
    id: time,
    time,
    temp: data.hourly.temperature_2m[i],
    code: data.hourly.weather_code[i],
    wind: data.hourly.wind_speed_10m[i],
    humidity: data.hourly.relative_humidity_2m[i],
  }));

  const daily = data.daily.time.slice(0, DAILY_SLOTS).map((day, i) => ({
    id: day,
    day,
    code: data.daily.weather_code[i],
    max: data.daily.temperature_2m_max[i],
    min: data.daily.temperature_2m_min[i],
  }));

  return {
    city: place.name,
    country: place.country,
    current: data.current,
    hourly,
    daily,
    sunrise: data.daily.sunrise[0],
    sunset: data.daily.sunset[0],
    visibility: data.hourly.visibility[0],
    todayHigh: data.daily.temperature_2m_max[0],
    todayLow: data.daily.temperature_2m_min[0],
    uvIndex: data.daily.uv_index_max[0],
  };
}