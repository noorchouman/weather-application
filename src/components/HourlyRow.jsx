import { memo } from "react";
import PropTypes from "prop-types";
import { getWeatherMeta } from "../utils/weatherUtils";

function HourlyRow({ time, code, temp, wind, humidity }) {
  const meta = getWeatherMeta(code);
  const Icon = meta.icon;

  return (
    <div className="forecast-row">
      <div className="forecast-left">
        <div className="forecast-icon-wrap">
          <Icon size={24} aria-hidden="true" />
        </div>
        <div>
          <div className="forecast-time">{time}</div>
          <div className="forecast-label">{meta.label}</div>
        </div>
      </div>

      <div className="forecast-main-temp">{Math.round(temp)}°C</div>

      <div className="forecast-meta">
        <div>Wind: {Math.round(wind)} km/h</div>
        <div>Humidity: {Math.round(humidity)}%</div>
      </div>
    </div>
  );
}

HourlyRow.propTypes = {
  time: PropTypes.string.isRequired,
  code: PropTypes.number.isRequired,
  temp: PropTypes.number.isRequired,
  wind: PropTypes.number.isRequired,
  humidity: PropTypes.number.isRequired,
};

export default memo(HourlyRow);