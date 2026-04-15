export default function DetailCard({ icon: Icon, label, value }) {
  return (
    <div className="detail-card">
      <div className="detail-top">
        <Icon size={16} />
        <span>{label}</span>
      </div>
      <div className="detail-value">{value}</div>
    </div>
  );
}