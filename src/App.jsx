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
    input,
    setInput,
    query,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    searchingPlaces,
    selectedPlace,
    setSelectedPlace,
    searchBoxRef,
    handleSubmit,
    handleSuggestionClick,
  } = usePlaceSearch("Beirut");

  const { weather, loading, error } = useWeather(query, selectedPlace);

  const currentMeta = useMemo(
    () => getWeatherMeta(weather?.current?.weather_code ?? 1),
    [weather]
  );

  return (
    <div className="page">
      <div className="app-shell">
        <SearchBar
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
          searchingPlaces={searchingPlaces}
          handleSuggestionClick={handleSuggestionClick}
          searchBoxRef={searchBoxRef}
          weather={weather}
          setSelectedPlace={setSelectedPlace}
        />

        {loading ? (
          <div className="state-box">Loading weather...</div>
        ) : error ? (
          <div className="state-box error-box">{error}</div>
        ) : (
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
        )}
      </div>
    </div>
  );
}