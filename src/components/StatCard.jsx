import { memo } from "react";
import PropTypes from "prop-types";

function StatCard({ icon: Icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <Icon size={16} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div className="stat-value">
        {value}
        <span>{unit}</span>
      </div>
    </div>
  );
}

StatCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  unit: PropTypes.string.isRequired,
};

export default memo(StatCard);