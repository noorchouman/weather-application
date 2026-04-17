import { useEffect, useState } from "react";
import { fetchPlaceByName, fetchWeatherByCoords } from "../services/weatherApi";

export default function useWeather(query, selectedPlace) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!query && !selectedPlace) return;

    const controller = new AbortController();

    async function loadWeather() {
      setLoading(true);
      setError("");

      try {
        const place = selectedPlace
          ? selectedPlace
          : await fetchPlaceByName(query, controller.signal);

        const weatherData = await fetchWeatherByCoords(place, controller.signal);
        setWeather(weatherData);
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong");
        setWeather(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadWeather();

    return () => {
      controller.abort();
    };
  }, [query, selectedPlace]);

  return { weather, loading, error };
}