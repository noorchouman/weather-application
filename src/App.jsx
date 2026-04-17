import { useMemo, useState } from "react";
import "./App.css";

import SearchBar from "./components/SearchBar";
import CurrentWeatherCard from "./components/CurrentWeatherCard";
import StatsGrid from "./components/StatsGrid";
import TodayDetails from "./components/TodayDetails";
import ForecastPanel from "./components/ForecastPanel";

import { getWeatherMeta } from "./utils/weatherUtils";
import usePlaceSearch from "./hooks/usePlaceSearch";
import useWeather from "./hooks/useWeather";

export default function App() {
  const [activeTab, setActiveTab] = useState("today");

  const {
    searchState,
    searchActions,
    query,
    selectedPlace,
  } = usePlaceSearch();

  const { weather, loading, error } = useWeather(query, selectedPlace);

  const weatherCode = weather?.current?.weather_code ?? 1;

  const currentMeta = useMemo(() => getWeatherMeta(weatherCode), [weatherCode]);

  return (
    <div className="page">
      <div className="app-shell">
        <SearchBar
          weather={weather}
          searchState={searchState}
          searchActions={searchActions}
        />

        {loading ? (
          <div className="state-box">Loading weather...</div>
        ) : error ? (
          <div className="state-box error-box">{error}</div>
        ) : weather ? (
          <main className="dashboard-grid">
            <section className="left-col">
              <CurrentWeatherCard weather={weather} currentMeta={currentMeta} />
              <StatsGrid weather={weather} />
              <TodayDetails weather={weather} />
            </section>

            <ForecastPanel
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              weather={weather}
            />
          </main>
        ) : null}
      </div>
    </div>
  );
}