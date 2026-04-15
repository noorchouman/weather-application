import { useEffect, useState } from "react";
import { fetchPlaceByName, fetchWeatherByCoords } from "../services/weatherApi";

export default function useWeather(query, selectedPlace) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadWeather() {
      setLoading(true);
      setError("");

      try {
        const place = selectedPlace || (await fetchPlaceByName(query));
        const weatherData = await fetchWeatherByCoords(place);
        setWeather(weatherData);
      } catch (err) {
        setError(err.message || "Something went wrong");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    }

    if (query) {
      loadWeather();
    }
  }, [query, selectedPlace]);

  return { weather, loading, error };
}