export default function StatCard({ icon: Icon, label, value, unit }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <div className="stat-value">
        {value}
        <span>{unit}</span>
      </div>
    </div>
  );
}