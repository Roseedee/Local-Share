import { useShared } from '../contexts/SharedContext'
import rest from '../rest/rest'

import axios from 'axios'

import '../style/components/PopUpFilesWaitUpload.css'

import imgTest from '../assets/file.png'
import iconClose from '../assets/close.png'
import iconCloseWhite from '../assets/close-white.png'
import iconUpload from '../assets/up-loading.png'
import { useEffect, useState } from 'react'

export default function PopUpFilesWaitUpload() {

    const { myDevice, deviceSelected, fileListWaitUpload, setFileListWaitUpload } = useShared();

    interface FileProgressType {
        name: string;
        size: number;
        progress: number;
    }

    const [fileProgressList, setFileProgressList] = useState<FileProgressType[]>([]);

    const handleCancelUploadAllFiles = () => {
        if (confirm("Are you sure cancel all files!")) {
            setFileListWaitUpload(null)
        }
    }

    const handleCancelSomeFile = (removeIndex: number) => {
        if (!fileListWaitUpload) return;

        const filesArray = Array.from(fileListWaitUpload);

        const newFilesArray = filesArray.filter((_, i) => i !== removeIndex);

        if (newFilesArray.length === 0) {
            setFileListWaitUpload(null)
            return;
        }

        const dataTransfer = new DataTransfer();
        newFilesArray.forEach(file => dataTransfer.items.add(file))

        setFileListWaitUpload(dataTransfer.files)
    }

    useEffect(() => {
        const files = Array.from(fileListWaitUpload || []);
        setFileProgressList(files.map((file) => {return { name: file.name, size: file.size, progress: 0 }}));
        // if(fileProgressList.length > 0) {
        //     setFileProgressList((prevItems) => [...prevItems, ...files.map((file) => {return { name: file.name, size: file.size, progress: 0 }})]);
        // }
    }, [fileListWaitUpload]);

    const handleConfirmUploadFiles = async () => {
        if (!fileListWaitUpload) {
            alert("Please Select files first!")
            return;
        }

        // const formData = new FormData();
        // formData.append("uploadByID", myDevice.id)
        // if (deviceSelected && deviceSelected.id !== myDevice.id) {
        //     formData.append('uploadToID', deviceSelected.id)
        // }

        // Array.from(fileListWaitUpload).forEach((file) => {
        //     formData.append("files", file)
        // })

        // rest.uploadFiles(formData).then((data) => {
        //     console.log(data)
        //     setFileListWaitUpload(null)
        // }).catch((err: any) => {
        //     console.error("upload file failed : ", err.status, err.message)
        //     alert("Upload file failed!")
        // })

        const files = Array.from(fileListWaitUpload)

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();

            formData.append("uploadByID", myDevice.client_id)
            if (deviceSelected && deviceSelected.id !== myDevice.id) {
                formData.append('uploadToID', deviceSelected.client_id)
            }

            formData.append("files", files[i]);

            await axios.post("http://localhost:5000/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
                onUploadProgress: (progressEvent) => {
                    const loaded = progressEvent.loaded ?? 0;
                    const total = progressEvent.total ?? loaded ?? 1;
                    const percent = Math.round((loaded * 100) / total);
                    setFileProgressList(prev => {
                        const newProgress = [...prev];
                        newProgress[i].progress = percent;
                        return newProgress;
                    });
                },
            }).then((data) => {
                console.log(data)
                // setFileListWaitUpload(null)
            });

        }
    }

    return (
        <div className="list-files-wait-upload">
            <div className="header-list-files">
                <h5>{fileListWaitUpload === null || fileListWaitUpload === undefined ? 0 : fileListWaitUpload?.length} รายการ</h5>
                <p className='upload-status success'>สำเร็จ 0</p>
                <p className='upload-status failed'>ล้มเหลว 0</p>
            </div>
            <div className="list-files">
                {
                    fileListWaitUpload && Array.from(fileProgressList).map((file, i) => (
                        <div className='item-file' key={i}>
                            <img src={imgTest} alt="" />
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
            </div>
            <div className="list-files-btn-group">
                <div className="btn-list-files btn-confirm-upload" onClick={handleConfirmUploadFiles}><img src={iconUpload} alt="" /><span>Confirm</span></div>
                <div className="btn-list-files btn-cancel-all" onClick={handleCancelUploadAllFiles}><img src={iconCloseWhite} alt="" /></div>
            </div>
        </div>
    )
}