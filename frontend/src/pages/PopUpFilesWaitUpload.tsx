import { useShared } from '../contexts/SharedContext'
import rest from '../rest/rest'

import '../style/components/PopUpFilesWaitUpload.css'

import imgTest from '../assets/file.png'
import iconClose from '../assets/close.png'
import iconCloseWhite from '../assets/close-white.png'
import iconUpload from '../assets/up-loading.png'
import { useEffect, useState } from 'react'
import FileUploadHistoryModel from '../model/FileUploadHistoryModel'

export default function PopUpFilesWaitUpload() {

    const { myDevice, deviceSelected, fileListWaitUpload, setFileListWaitUpload, uploadFilesHistory, setUploadFilesHistory } = useShared();

    interface FileProgressType {
        name: string;
        size: number;
        progress: number;
    }

    const [fileProgressList, setFileProgressList] = useState<FileProgressType[]>([]);

    const handleCancelUploadAllFiles = () => {
        if (fileListWaitUpload === null || fileProgressList.length === 0) {
            setFileListWaitUpload(null)
            setUploadFilesHistory([])
        } else {
            if (confirm("Are you sure!")) {
                setFileListWaitUpload(null)
                setUploadFilesHistory([])
            }
        }
    }

    const handleCancelSomeFile = (removeIndex: number) => {
        if (!fileListWaitUpload) return;

        const newFilesArray = fileListWaitUpload.filter((_, i) => i !== removeIndex);

        if (newFilesArray.length === 0) {
            setFileListWaitUpload(null);
            return;
        }

        setFileListWaitUpload(newFilesArray);
    }

    useEffect(() => {
        console.log(fileListWaitUpload)
        const files = Array.from(fileListWaitUpload || []);
        setFileProgressList(files.map((file) => { return { name: file.name, size: file.size, progress: 0 } }));
        // if(fileProgressList.length > 0) {
        //     setFileProgressList((prevItems) => [...prevItems, ...files.map((file) => {return { name: file.name, size: file.size, progress: 0 }})]);
        // }
    }, [fileListWaitUpload]);

    const handleConfirmUploadFiles = async () => {
        if (!fileListWaitUpload) {
            alert("Please Select files first!")
            return;
        }

        const files = Array.from(fileListWaitUpload)

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();

            formData.append("uploadByID", myDevice.client_id)
            if (deviceSelected && deviceSelected.id !== myDevice.id) {
                formData.append('uploadToID', deviceSelected.client_id)
            }

            formData.append("files", files[i]);

            await rest.uploadFiles(formData, (percent: number) => {
                setFileProgressList(prev => {
                    const newProgress = [...prev];
                    newProgress[i].progress = percent;
                    return newProgress;
                });
            }).then(() => {
                const newFileUploadHistory: FileUploadHistoryModel = { name: files[i].name, size: files[i].size, status: 'completed' };
                setUploadFilesHistory((prev: FileUploadHistoryModel[]) => [
                    ...prev,
                    newFileUploadHistory
                ]);
            }).catch((err) => {
                console.error("Upload file error: ", err);
                const newFileUploadHistory: FileUploadHistoryModel = { name: files[i].name, size: files[i].size, status: 'failed' };
                setUploadFilesHistory((prev: FileUploadHistoryModel[]) => [
                    ...prev,
                    newFileUploadHistory
                ]);
            });
        }
        setFileListWaitUpload(null)
    }

    return (
        fileListWaitUpload || uploadFilesHistory.length !== 0 ? (
            <div className="list-files-wait-upload">
                <div className="header-list-files">
                    {/* <h5>{fileListWaitUpload === null || fileListWaitUpload === undefined ? 0 : fileListWaitUpload?.length} รายการ</h5> */}
                    <p className='upload-status success'>สำเร็จ {uploadFilesHistory.filter(i => i.status === 'completed').length}</p>
                    <p className='upload-status failed'>ล้มเหลว {uploadFilesHistory.filter(i => i.status === 'failed').length}</p>
                </div>
                <div className="list-files">
                    {
                        fileProgressList && Array.from(fileProgressList).map((file, i) => (
                            <div className='item-file' key={i}>
                                <img src={imgTest} alt="" className='img-file' />
                                <div className='file-details'>
                                    <h5>{file.name}</h5>
                                    <span className='tag'>{Math.round(file.size / 1024)} KB</span>
                                </div>
                                <div className="btn-cancel" onClick={() => handleCancelSomeFile(i)}>
                                    <img src={iconClose} alt="Cancel upload" />
                                </div>
                                <div className="upload-progress" style={{ width: `${file.progress || 0}%` }}></div>
                            </div>
                        ))
                    }
                    {
                        uploadFilesHistory && Array.from(uploadFilesHistory).map((file, i) => (
                            <div className='item-file' key={i}>
                                <img src={imgTest} alt="" className='img-file' />
                                <div className='file-details'>
                                    <h5>{file.name}</h5>
                                    <span className='tag'>{Math.round(file.size / 1024)} KB</span>
                                </div>
                                <div className="file-status">
                                    {file.status === 'completed' ? (
                                        <span className='text-status completed'>สำเร็จ</span>
                                    ) : (
                                        <span className='text-status failed'>ล้มเหลว</span>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="list-files-btn-group">
                    {
                        fileListWaitUpload && (
                            <div className="btn-list-files btn-confirm-upload" onClick={handleConfirmUploadFiles}><img src={iconUpload} alt="" /><span>Confirm</span></div>
                        )
                    }
                    <div className="btn-list-files btn-cancel-all" onClick={handleCancelUploadAllFiles}><img src={iconCloseWhite} alt="" />{fileProgressList.length === 0 && uploadFilesHistory.length !== 0 ? 'ล้างประวัติ' : ''}</div>
                </div>
            </div>
        ) : (<></>)
    )
}