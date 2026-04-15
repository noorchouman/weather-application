export async function fetchPlaceSuggestions(searchText) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      searchText
    )}&count=6&language=en&format=json`
  );
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

export async function fetchPlaceByName(cityName) {
  const res = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      cityName
    )}&count=1&language=en&format=json`
  );
  const data = await res.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  const place = data.results[0];

  return {
    name: place.name,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
  };
}

export async function fetchWeatherByCoords(place) {
  const res = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,surface_pressure,cloud_cover,wind_gusts_10m,is_day,precipitation&hourly=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,visibility,precipitation_probability&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&forecast_days=7&timezone=auto`
  );
  const data = await res.json();

  const hourly = data.hourly.time.slice(0, 8).map((time, i) => ({
    time,
    temp: data.hourly.temperature_2m[i],
    code: data.hourly.weather_code[i],
    wind: data.hourly.wind_speed_10m[i],
    humidity: data.hourly.relative_humidity_2m[i],
  }));

  const daily = data.daily.time.slice(0, 7).map((day, i) => ({
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