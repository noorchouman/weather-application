import { Sun, Cloud, Sunrise, Sunset, Thermometer, Zap } from "lucide-react";
import DetailCard from "./DetailCard";
import { formatHour } from "../utils/weatherUtils";

export default function TodayDetails({ weather }) {
  return (
    <div className="details-panel panel">
      <div className="card-title">Today Details</div>

      <div className="details-grid">
        <DetailCard
          icon={Thermometer}
          label="High / Low"
          value={`${Math.round(weather.todayHigh)}° / ${Math.round(weather.todayLow)}°`}
        />
        <DetailCard
          icon={Sunrise}
          label="Sunrise"
          value={formatHour(weather.sunrise)}
        />
        <DetailCard
          icon={Sunset}
          label="Sunset"
          value={formatHour(weather.sunset)}
        />
        <DetailCard
          icon={Cloud}
          label="Cloud Cover"
          value={`${weather.current.cloud_cover}%`}
        />
        <DetailCard
          icon={Zap}
          label="Wind Gusts"
          value={`${Math.round(weather.current.wind_gusts_10m)} km/h`}
        />
      </div>
    </div>
  );
}