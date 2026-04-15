import { Droplets, Wind, Eye, Gauge } from "lucide-react";
import StatCard from "./StatCard";

export default function StatsGrid({ weather }) {
  return (
    <div className="stats-grid">
      <StatCard
        icon={Droplets}
        label="Humidity"
        value={weather.current.relative_humidity_2m}
        unit="%"
      />
      <StatCard
        icon={Wind}
        label="Wind"
        value={Math.round(weather.current.wind_speed_10m)}
        unit=" km/h"
      />
      <StatCard
        icon={Eye}
        label="Visibility"
        value={Math.round((weather.visibility || 0) / 1000)}
        unit=" km"
      />
      <StatCard
        icon={Gauge}
        label="Pressure"
        value={Math.round(weather.current.surface_pressure)}
        unit=" hPa"
      />
    </div>
  );
}