export default function CurrentWeatherCard({ weather, currentMeta }) {
  const MainIcon = currentMeta.icon;

  return (
    <div className="hero-card panel">
      <div className="hero-top">
        <div>
          <div className="card-label">Current Weather</div>
          <div className="hero-time">
            {new Date().toLocaleTimeString([], {
              hour: "numeric",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="unit-pill">Celsius</div>
      </div>

      <div className="hero-main">
        <div className="hero-icon">
          <MainIcon size={54} />
        </div>

        <div className="hero-temp-wrap">
          <div className="hero-temp">{Math.round(weather.current.temperature_2m)}°</div>
          <div className="hero-desc">{currentMeta.label}</div>
          <div className="hero-feels">
            Feels like {Math.round(weather.current.apparent_temperature)}°
          </div>
        </div>
      </div>

      <p className="hero-text">
           Current weather in {weather.city} is {currentMeta.label.toLowerCase()}.
    </p>    
    </div>
  );
}