import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useShared } from '@/contexts/SharedContext'
import rest from '@/rest/rest'

import File from '@/Components/File'
import OverlayFileFullView, { OverlayFileFullViewModel } from '@/Components/OverlayFileFullView';
import FileModel from '@/model/FileModel';
import OverlayEditFileName from '@/Components/OverlayEditFileName';

export default function FileList() {
  // const calledRef = useRef(false);
  const { id } = useParams<string>() || "";
  const { myDevice, deviceSelected,
    fileListWaitUpload, isSelectMultiFile,
    setIsSelectMultiFile, selectedMultiFile,
    selectedFile, setSelectedFile,
    setSelectedMultiFile, setIsSelectFile,
    fileDeleting, setFileDeleting,
    fileSearch,
    isEditFileName, setIsEditFileName
  } = useShared();

  const local_id = localStorage.getItem("device_id") || ""
  const selected_id = localStorage.getItem("device_selected_client_id") || ""

  const [files, setFiles] = useState<FileModel[]>([]);
  const [overlayFileFullView, setOverlayFileFullView] = useState<boolean>(false)
  const [fileSelectForFileFullView, setFileSelectForFileFullView] = useState<OverlayFileFullViewModel>()
  const [fileFiltered, setFileFilterd] = useState<FileModel[]>([])
  // const [fileSelected, setFileSelected] = useState<string>("");

  useEffect(() => {
    // if (calledRef.current) return;
    // calledRef.current = true;
    setSelectedMultiFile?.([]);
    loadFiles();
  }, [myDevice, deviceSelected, fileListWaitUpload]);

  useEffect(() => {
    setSelectedMultiFile?.([]);
    setSelectedFile?.(null);
    // setFileSelected("");
  }, [isSelectMultiFile]);

  useEffect(() => {
    loadFiles();
  }, [fileDeleting]);

  useEffect(() => {
    setIsSelectMultiFile?.(false);
  }, [id]);

  useEffect(() => {
    if (!isEditFileName) return;

    return () => {
      loadFiles();
    };
  }, [isEditFileName]);

  useEffect(() => {
    if (fileSearch === "") {
      setFileFilterd(files);
      return;
    }

    let pattern = (fileSearch || "")
      .replace(/[-\/\\^$+?.()|[\]{}]/g, "\\$&") // escape regex
      .replace(/\*/g, ".*")   // wildcard *
      .replace(/\?/g, ".");   // wildcard ?

    // ❗ ไม่ใส่ ^$ เพื่อให้ค้นแบบ contains ได้
    const regex = new RegExp(pattern, "i");

    const filteredFiles = files.filter(file =>
      regex.test(file.name || "")
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

  const handleFileSelect = (fileId: string, filePath: string, fileType: string, orgName: string) => {
    setIsEditFileName?.(false);
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
      setSelectedFile?.({ id: fileId, new_name: filePath, type: fileType, name: orgName });
      setFileSelectForFileFullView({ fileId: fileId, filePath: filePath, fileType: fileType });
    }
  };

  const handleFileDoubleClick = () => {
    // console.log("onDoubleClick")
    setOverlayFileFullView(true)
  }

  const handleFileFullViewClick = () => {
    // console.log("onCloseFullView")
    setOverlayFileFullView(false)
  }

  const handlePrevFileFullView = () => {
    if (!fileSelectForFileFullView) return;
    const currentIndex = files.findIndex(file => file.id === fileSelectForFileFullView.fileId);
    if (currentIndex > 0) {
      const prevFile = files[currentIndex - 1];
      setFileSelectForFileFullView({ fileId: prevFile.id, filePath: rest.fileUrl(prevFile.new_name || ""), fileType: prevFile.type });
    }
  }

  const handleNextFileFullView = () => {
    if (!fileSelectForFileFullView) return;
    const currentIndex = files.findIndex(file => file.id === fileSelectForFileFullView.fileId);
    if (currentIndex < files.length - 1) {
      const nextFile = files[currentIndex + 1];
      setFileSelectForFileFullView({ fileId: nextFile.id, filePath: rest.fileUrl(nextFile.new_name || ""), fileType: nextFile.type });
    }
  }

  return (
    <div className="file-list" onClick={() => { setIsSelectFile?.(false); setSelectedFile?.(null); setSelectedMultiFile?.([]); setIsEditFileName?.(false); }}>
      {fileFiltered && fileFiltered.length !== 0 ? (
        fileFiltered.map((file, i) => (
          <File
            key={i}
            file={{
              id: file.id,
              name: file.name,
              new_name: rest.fileUrl(file.new_name || ""),
              size: file.size,
              type: file.type,
              create_at: file.create_at
            }}
            isSelected={
              (file.id ? selectedMultiFile?.includes(file.id) : false) ||
              (selectedFile?.id === file.id)
            }
            onClick={() =>
              handleFileSelect(
                file.id || "",
                rest.fileUrl(file.new_name || ""),
                file.type || "",
                file.name || ""
              )
            }
            onDoubleClick={() => {
              handleFileDoubleClick();
            }}
          />
        ))
      ) : (
        <p className="no-item">No files found.</p>
      )}
      {/* <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
        <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />*/}
      {
        overlayFileFullView && (
          <OverlayFileFullView file={fileSelectForFileFullView} onClick={handleFileFullViewClick} onPrev={handlePrevFileFullView} onNext={handleNextFileFullView} />
        )
      }

      {
        isEditFileName && (
          <OverlayEditFileName />
        )
      }
    </div>
  )
}