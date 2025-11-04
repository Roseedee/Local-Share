import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShared } from '../contexts/SharedContext'

import File from '../Components/File'
import '../style/components/file.css'

// import imgTest from './../assets/test1.jpg'

export default function FileList() {
  // const calledRef = useRef(false);
  const { id } = useParams<string>() || "";

  const local_id = localStorage.getItem("device_id") || ""
  const selected_id = localStorage.getItem("device_selected_client_id") || ""  
  const { myDevice, deviceSelected } = useShared();
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    // if (calledRef.current) return;
    // calledRef.current = true;

    loadFiles();
  }, [myDevice, deviceSelected]);




  const loadFiles = async () => {
    const response = await fetch('http://localhost:5000/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: id === undefined ? local_id : selected_id })
    });

    const data = await response.json();
    console.log("Files:", data);
    setFiles(data.results);
    console.log("Files State:", files);
  };

  return (
    <div className="file-list">
      {
        files && (
          files.map((file: any, i: number) => (
            <File key={i} file={{ id: file.file_id, name: file.file_org_name, path: "http://localhost:5000/files/" + file.file_path, size: file.file_size, type: file.file_type}} />
          ))
        )
        // files.results.map((file) => (
        //   <p>adf</p>
        //   // <File key={i} file={{id: file.file_id, name: file.file_path, path: "localhost:5000:files/" + file.file_path, size: file.file_size}} />
        // ))
      }
      {/* <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} /> */}
    </div>
  )
}