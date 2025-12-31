import "@/style/components/storage-chart.css";

export default function StorageChart() {
  const total = 36;
  const used = 22;
  const percent = (used / total) * 100;

  return (
    <div className="circle-wrap">
      <svg className="circle" width="160" height="160">
        <circle
          className="bg"
          cx="80"
          cy="80"
          r="70"
        />
        <circle
          className="progress"
          cx="80"
          cy="80"
          r="70"
          style={{
            strokeDashoffset: 440 - (440 * percent) / 100,
          }}
        />
      </svg>

      <div className="text">
        <div className="title">{total}GB</div>
        <div className="sub">
          {used}GB ({percent.toFixed(1)}%)
        </div>
      </div>
    </div>
  );
}
