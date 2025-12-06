import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShared } from '../contexts/SharedContext'
import rest from '../rest/rest'

import File from '../Components/File'
import OverlayFileFullView, { OverlayFileFullViewModel } from '../Components/OverlayFileFullView';

export default function FileList() {
  // const calledRef = useRef(false);
  const { id } = useParams<string>() || "";
  const { myDevice, deviceSelected,
    fileListWaitUpload, isSelectMultiFile,
    setIsSelectMultiFile, selectedMultiFile,
    selectedFile, setSelectedFile,
    setSelectedMultiFile, setIsSelectFile,
    fileDeleting, setFileDeleting,
    fileSearch
  } = useShared();

  const local_id = localStorage.getItem("device_id") || ""
  const selected_id = localStorage.getItem("device_selected_client_id") || ""

  const [files, setFiles] = useState<any[]>([]);
  const [overlayFileFullView, setOverlayFileFullView] = useState<boolean>(false)
  const [fileSelectForFileFullView, setFileSelectForFileFullView] = useState<OverlayFileFullViewModel>()
  const [fileFiltered, setFileFilterd] = useState<any[]>([])
  // const [fileSelected, setFileSelected] = useState<string>("");

  useEffect(() => {
    // if (calledRef.current) return;
    // calledRef.current = true;
    setSelectedMultiFile?.([]);
    loadFiles();
  }, [myDevice, deviceSelected, fileListWaitUpload]);

  useEffect(() => {
    setSelectedMultiFile?.([]);
    setSelectedFile?.("");
    // setFileSelected("");
  }, [isSelectMultiFile]);

  useEffect(() => {
    loadFiles();
  }, [fileDeleting]);

  useEffect(() => {
    setIsSelectMultiFile?.(false);
  }, [id]);

  useEffect(() => {
    if (fileSearch === "") {
      setFileFilterd(files);
      return;
    }

    // Convert wildcard pattern (*, ?) to RegExp
    const pattern = fileSearch
      ?.replace(/[-\/\\^$+?.()|[\]{}]/g, '\\$&') // escape regex chars
      .replace(/\*/g, '.*')                    // * → any chars
      .replace(/\?/g, '.');                    // ? → one char

    const regex = new RegExp(`^${pattern}$`, "i"); // i = ignore case

    const filteredFiles = files.filter(file =>
      regex.test(file.file_org_name)
    );

    setFileFilterd(filteredFiles);
  }, [fileSearch, files]);


  const loadFiles = async () => {
    const userId = id === undefined ? local_id : selected_id
    await rest.getFiles(userId).then((data) => {
      // console.log("Files:", data);
      setFiles(data.results)
    }).finally(() => {
      setFileDeleting?.(false);
    });
  };

  const handleFileSelect = (fileId: string, filePath: string, fileType: string) => {
    // console.log("File selected:", fileId);
    if (isSelectMultiFile) {
      setIsSelectFile?.(false);
      if (selectedMultiFile?.includes(fileId)) {
        setSelectedMultiFile?.(selectedMultiFile.filter(id => id !== fileId));
      } else {
        setSelectedMultiFile?.([...(selectedMultiFile ?? []), fileId]);
      }
    } else {
      setIsSelectFile?.(true);
      setSelectedFile?.(fileId);
      setFileSelectForFileFullView({ fileId: fileId, filePath: filePath, fileType: fileType });
    }
  };

  const handleFileDoubleClick = () => {
    // console.log("onDoubleClick")
    setOverlayFileFullView(true)
  }

  const handleFileFullViewClick = () => {
    console.log("onCloseFullView")
    setOverlayFileFullView(false)
  }

  const handlePrevFileFullView = () => {
    if (!fileSelectForFileFullView) return;
    const currentIndex = files.findIndex(file => file.file_id === fileSelectForFileFullView.fileId);
    if (currentIndex > 0) {
      const prevFile = files[currentIndex - 1];
      setFileSelectForFileFullView({ fileId: prevFile.file_id, filePath: rest.fileUrl(prevFile.file_path), fileType: prevFile.file_type });
    }
  }

  const handleNextFileFullView = () => {
    if (!fileSelectForFileFullView) return;
    const currentIndex = files.findIndex(file => file.file_id === fileSelectForFileFullView.fileId);
    if (currentIndex < files.length - 1) {
      const nextFile = files[currentIndex + 1];
      setFileSelectForFileFullView({ fileId: nextFile.file_id, filePath: rest.fileUrl(nextFile.file_path), fileType: nextFile.file_type });
    }
  }

  return (
    <div className="file-list" onClick={() => { setIsSelectFile?.(false); setSelectedFile?.("") }}>
      {
        fileFiltered && fileFiltered.length !== 0 ? (
          fileFiltered.map((file: any, i: number) => (
            <File key={i} file={{ id: file.file_id, name: file.file_org_name, path: rest.fileUrl(file.file_path), size: file.file_size, type: file.file_type }} isSelected={selectedMultiFile?.includes(file.file_id) || selectedFile === file.file_id} onClick={() => handleFileSelect(file.file_id, rest.fileUrl(file.file_path), file.file_type)} onDoubleClick={() => { handleFileDoubleClick() }} />
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
      <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />*/}
      {
        overlayFileFullView && (
          <OverlayFileFullView file={fileSelectForFileFullView} onClick={handleFileFullViewClick} onPrev={handlePrevFileFullView} onNext={handleNextFileFullView} />
        )
      }
    </div>
  )
}