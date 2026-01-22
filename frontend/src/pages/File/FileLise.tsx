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
  const { device_name } = useParams<string>() || "";
  const { myDevice, deviceSelected,
    fileListWaitUpload, isSelectMultiFile,
    setIsSelectMultiFile, selectedMultiFile,
    selectedFile, setSelectedFile,
    setSelectedMultiFile, setIsSelectFile,
    fileDeleting, setFileDeleting,
    fileSearch,
    isEditFileName, setIsEditFileName,
    setSumFileSize,
    isFileListLoading, setIsFileListLoading
  } = useShared();

  const local_id = localStorage.getItem("device_id") || ""
  const selected_id = localStorage.getItem("device_selected_client_id") || ""

  const [files, setFiles] = useState<FileModel[]>([]);
  const [overlayFileFullView, setOverlayFileFullView] = useState<boolean>(false)
  const [fileSelectForFileFullView, setFileSelectForFileFullView] = useState<OverlayFileFullViewModel>()
  const [fileFiltered, setFileFilterd] = useState<FileModel[]>([]);

  useEffect(() => {
    loadFiles();
  }, [isFileListLoading]);

  useEffect(() => {
    setSelectedMultiFile?.([]);
    setSelectedFile?.(null);
    loadFiles();
  }, [myDevice, deviceSelected, fileListWaitUpload]);

  useEffect(() => {
    setSelectedMultiFile?.([]);
    setSelectedFile?.(null);
  }, [isSelectMultiFile]);

  useEffect(() => {
    loadFiles();
  }, [fileDeleting]);

  useEffect(() => {
    setIsSelectMultiFile?.(false);
    setIsSelectFile?.(false)
  }, [device_name]);

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
    const ownerId = device_name === "me" ? local_id : selected_id
    const viewerId = local_id;
    await rest.getFiles(viewerId, ownerId).then((data) => {
      console.log("Files:", data.results);
      setFiles(data.results)
    }).finally(() => {
      setSumFileSize?.(files.reduce((acc, file) => acc + (file.size || 0), 0));
      setFileDeleting?.(false);
      setIsFileListLoading?.(false);
    });
  };

  const handleFileSelect = (file: FileModel) => {
    setIsEditFileName?.(false);
    // console.log("File selected:", fileId);
    if (isSelectMultiFile) {
      setIsSelectFile?.(false);
      if (selectedMultiFile?.includes(file.id || "")) {
        setSelectedMultiFile?.(selectedMultiFile.filter(id => id !== file.id));
      } else {
        setSelectedMultiFile?.([...(selectedMultiFile ?? []), file.id || ""]);
      }
    } else {
      const fileUrl = rest.fileUrl(file.download_url || "");
      setIsSelectFile?.(true);
      setSelectedFile?.({ id: file.id, download_url: fileUrl, type: file.type, name: file.name, size: file.size, create_at: file.create_at, access_scope: file.access_scope, permission_code: file.permission_code, client_id_source: file.client_id_source, client_id_target: file.client_id_target });
      setFileSelectForFileFullView({ fileId: file.id, filePath: fileUrl, fileType: file.type });
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
      setFileSelectForFileFullView({ fileId: prevFile.id, filePath: rest.fileUrl(prevFile.download_url || ""), fileType: prevFile.type });
    }
  }

  const handleNextFileFullView = () => {
    if (!fileSelectForFileFullView) return;
    const currentIndex = files.findIndex(file => file.id === fileSelectForFileFullView.fileId);
    if (currentIndex < files.length - 1) {
      const nextFile = files[currentIndex + 1];
      setFileSelectForFileFullView({ fileId: nextFile.id, filePath: rest.fileUrl(nextFile.download_url || ""), fileType: nextFile.type });
    }
  }

  return (
    <div className="files-content" onClick={() => { setIsSelectFile?.(false); setSelectedFile?.(null); setSelectedMultiFile?.([]); setIsEditFileName?.(false); }}>
      {fileFiltered && fileFiltered.length !== 0 ? (
        fileFiltered.map((file, i) => (
          <File
            key={i}
            file={file}
            isSelected={
              (file.id ? selectedMultiFile?.includes(file.id) : false) ||
              (selectedFile?.id === file.id)
            }
            onClick={() =>
              handleFileSelect(file)
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