import { getWeatherMeta } from "../utils/weatherUtils";

export default function WeeklyRow({ day, code, max, min }) {
  const meta = getWeatherMeta(code);
  const Icon = meta.icon;

  return (
    <div className="forecast-row">
      <div className="forecast-left">
        <div className="forecast-icon-wrap">
          <Icon size={24} />
        </div>
        <div>
          <div className="forecast-time">{day}</div>
          <div className="forecast-label">{meta.label}</div>
        </div>
      </div>

      <div className="forecast-main-temp">{Math.round(max)}°C</div>

      <div className="forecast-meta">
        <div>High: {Math.round(max)}°</div>
        <div>Low: {Math.round(min)}°</div>
      </div>
    </div>
  );
}