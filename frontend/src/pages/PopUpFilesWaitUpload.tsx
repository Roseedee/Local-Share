import { useShared } from '../contexts/SharedContext'
import rest from '../rest/rest'

import '../style/components/PopUpFilesWaitUpload.css'

import imgTest from '../assets/file.png'
import iconClose from '../assets/close.png'
import iconCloseWhite from '../assets/close-white.png'
import iconUpload from '../assets/up-loading.png'

export default function PopUpFilesWaitUpload() {

    const { myDevice, deviceSelected, fileListWaitUpload, setFileListWaitUpload } = useShared();

    const handleCancelUploadAllFiles = () => {
        if(confirm("Are you sure cancel all files!")) {
            setFileListWaitUpload(null)
        }
    }

    const handleCancelSomeFile = (removeIndex: number) => {
        if(!fileListWaitUpload) return;

        const filesArray = Array.from(fileListWaitUpload);

        const newFilesArray = filesArray.filter((_, i) => i !== removeIndex);

        if(newFilesArray.length === 0) {
            setFileListWaitUpload(null)
            return;
        }

        const dataTransfer = new DataTransfer();
        newFilesArray.forEach(file => dataTransfer.items.add(file))

        setFileListWaitUpload(dataTransfer.files)
    }

    const handleConfirmUploadFiles = async () => {
        if (!fileListWaitUpload) {
            alert("Please Select files first!")
            return;
        }

        const formData = new FormData();
        formData.append("uploadByID", myDevice.id)
        if(deviceSelected && deviceSelected.id !== myDevice.id) {
            formData.append('uploadToID', deviceSelected.id)
        }

        Array.from(fileListWaitUpload).forEach((file) => {
            formData.append("files", file)
        })

        rest.uploadFiles(formData).then((data) => {
            console.log(data)
            setFileListWaitUpload(null)
        }).catch((err: any) => {
            console.error("upload file failed : ", err.status, err.message)
            alert("Upload file failed!")
        })
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
                    fileListWaitUpload && Array.from(fileListWaitUpload).map((file, i) => (
                        <div className='item-file' key={i}>
                            <img src={imgTest} alt="" />
                            <div className='file-details'>
                                <h5>{file.name}</h5>
                                <span className='tag'>{Math.round(file.size / 1024)} KB</span>
                            </div>
                            <div className="btn-cancel" onClick={() => handleCancelSomeFile(i)}>
                                <img src={iconClose} alt="Cancel upload" />
                            </div>
                            <div className="upload-progress" style={{width: (i + 1) * 10 + "%"}}></div>
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