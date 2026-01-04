import { useEffect, useState } from "react";
import { useShared } from '@/contexts/SharedContext'

import rest from "@/rest/rest";

import fileSize from "@/util/fileSizeCalc";

import "@/style/components/storage-chart.css";

export default function StorageChart() {
  const { fileListWaitUpload } = useShared();

  const [storageInfo, setStorageInfo] = useState<{ total_storage_used: number; storage_limit: number }>({ total_storage_used: 0, storage_limit: 0 });

  const [percent, setPercent] = useState<number>(0);
  const local_id = localStorage.getItem("device_id") || ""

  useEffect(() => {
    getStorageInfo();
  }, [fileListWaitUpload]);

  const getStorageInfo = async () => {
    await rest.getStorageInfo(local_id).then((res) => {
        // console.log("Storage Info:", res);
        setStorageInfo(res);
      })
      .catch((err) => {
        console.error("Failed to get storage info:", err);
      });
  };

  useEffect(() => {
    // console.log("Storage Info Updated:", storageInfo);
    const newPercent = (storageInfo.total_storage_used / storageInfo.storage_limit) * 100;
    setPercent(newPercent);
    // console.log("Storage Used Percent:", percent);
  }, [storageInfo]);

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
            strokeDashoffset: 440 - (440 * percent || 0) / 100,
          }}
        />
      </svg>

      <div className="text">
        <div className="title">{fileSize(storageInfo.storage_limit)}</div>
        <div className="sub">
          {fileSize(storageInfo.total_storage_used)} ({percent.toFixed(1)}%)
        </div>
      </div>
    </div>
  );
}
