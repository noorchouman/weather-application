import HourlyRow from "./HourlyRow";
import WeeklyRow from "./WeeklyRow";
import { formatDay, formatHour } from "../utils/weatherUtils";

export default function ForecastPanel({ activeTab, setActiveTab, weather }) {
  return (
    <aside className="right-col panel">
      <div className="right-top">
        <div className="tabs">
          <button
            className={`tab ${activeTab === "today" ? "active" : ""}`}
            onClick={() => setActiveTab("today")}
            type="button"
          >
            Today
          </button>
          <button
            className={`tab ${activeTab === "week" ? "active" : ""}`}
            onClick={() => setActiveTab("week")}
            type="button"
          >
            This Week
          </button>
        </div>
      </div>

      <div className="forecast-list">
        {activeTab === "today"
          ? weather.hourly.map((item, i) => (
              <HourlyRow
                key={i}
                time={i === 0 ? "Now" : formatHour(item.time)}
                code={item.code}
                temp={item.temp}
                wind={item.wind}
                humidity={item.humidity}
              />
            ))
          : weather.daily.map((item, i) => (
              <WeeklyRow
                key={i}
                day={formatDay(item.day)}
                code={item.code}
                max={item.max}
                min={item.min}
              />
            ))}
      </div>
    </aside>
  );
}