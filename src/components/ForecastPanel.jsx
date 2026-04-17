import PropTypes from "prop-types";
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
            aria-label="Show today's forecast"
          >
            Today
          </button>
          <button
            className={`tab ${activeTab === "week" ? "active" : ""}`}
            onClick={() => setActiveTab("week")}
            type="button"
            aria-label="Show weekly forecast"
          >
            This Week
          </button>
        </div>
      </div>

      <div className="forecast-list">
        {activeTab === "today"
          ? weather.hourly.map((item) => (
              <HourlyRow
                key={item.id}
                time={item.id === weather.hourly[0].id ? "Now" : formatHour(item.time)}
                code={item.code}
                temp={item.temp}
                wind={item.wind}
                humidity={item.humidity}
              />
            ))
          : weather.daily.map((item) => (
              <WeeklyRow
                key={item.id}
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

ForecastPanel.propTypes = {
  activeTab: PropTypes.oneOf(["today", "week"]).isRequired,
  setActiveTab: PropTypes.func.isRequired,
  weather: PropTypes.shape({
    hourly: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        temp: PropTypes.number.isRequired,
        wind: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
      })
    ).isRequired,
    daily: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
        code: PropTypes.number.isRequired,
        max: PropTypes.number.isRequired,
        min: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};