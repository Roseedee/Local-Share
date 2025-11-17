import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShared } from '../contexts/SharedContext'
import rest from '../rest/rest'

import File from '../Components/File'
import '../style/components/file.css'

// import imgTest from './../assets/test1.jpg'

export default function FileList() {
  // const calledRef = useRef(false);
  const { id } = useParams<string>() || "";
  const { myDevice, deviceSelected,
          fileListWaitUpload, isSelectMultiFile,
          setIsSelectMultiFile, selectedMultiFile, setSelectedMultiFile } = useShared();

  const local_id = localStorage.getItem("device_id") || ""
  const selected_id = localStorage.getItem("device_selected_client_id") || ""

  const [files, setFiles] = useState<any[]>([]);
  const [fileSelected, setFileSelected] = useState<string>("");

  useEffect(() => {
    // if (calledRef.current) return;
    // calledRef.current = true;
    setSelectedMultiFile?.([]);
    loadFiles();
  }, [myDevice, deviceSelected, fileListWaitUpload]);

  useEffect(() => {
    setSelectedMultiFile?.([]);
    setFileSelected("");
  }, [isSelectMultiFile]);

  useEffect(() => {
    setIsSelectMultiFile?.(false);
  } , [id]);

  const loadFiles = async () => {
    const response = await fetch('http://localhost:5000/files', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: id === undefined ? local_id : selected_id })
    });

    const data = await response.json();
    // console.log("Files:", data);
    setFiles(data.results);
    // console.log("Files State:", files);
  };

  const handleFileSelect = (fileId: string) => {
    // console.log("File selected:", fileId);
    if(isSelectMultiFile) {
      if (selectedMultiFile?.includes(fileId)) {
        setSelectedMultiFile?.(selectedMultiFile.filter(id => id !== fileId));
      } else {
        setSelectedMultiFile?.([...(selectedMultiFile ?? []), fileId]);
      }
    }else {
      setFileSelected(fileId);
    }
  };



  return (
    <div className="file-list" onClick={() => {setFileSelected("")}}>
      {
        files && files.length !== 0 ? (
          files.map((file: any, i: number) => (
            <File key={i} file={{ id: file.file_id, name: file.file_org_name, path:  rest.fileUrl(file.file_path), size: file.file_size, type: file.file_type }} isSelected={selectedMultiFile?.includes(file.file_id) || fileSelected === file.file_id} onClick={() => handleFileSelect(file.file_id)}/>
          ))
        ) : (
          <p className='no-item'>No files found.</p>
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