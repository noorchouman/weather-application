import { memo } from "react";
import PropTypes from "prop-types";

function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="detail-card">
      <div className="detail-top">
        <Icon size={16} aria-hidden="true" />
        <span>{label}</span>
      </div>
      <div className="detail-value">{value}</div>
    </div>
  );
}

DetailCard.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default memo(DetailCard);