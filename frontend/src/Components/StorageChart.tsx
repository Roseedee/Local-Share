import { useEffect } from "react";
import { useShared } from "@/contexts/SharedContext";

import fileSize from "@/util/fileSizeCalc";

import "@/style/components/storage-chart.css";

export default function StorageChart() {

  const { sumFileSize } = useShared();

  const total = 1073741824;
  const used = sumFileSize || 0;
  const percent = (used / total) * 100;


  useEffect(() => {
    console.log("Sum File Size in StorageChart: ", sumFileSize);
  }, [sumFileSize]);

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
        <div className="title">{fileSize(total)}</div>
        <div className="sub">
          {fileSize(used)} ({percent.toFixed(1)}%)
        </div>
      </div>
    </div>
  );
}
