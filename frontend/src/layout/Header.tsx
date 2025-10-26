import { useState, useRef, ChangeEvent } from 'react'
import { useShared } from '../contexts/SharedContext'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
import { useParams } from 'react-router-dom'

export default function Header() {

    const { id } = useParams<string>()
    const { myDevice } = useShared();


    // const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()
    const {deviceSelected, fileListWaitUpload, setFileListWaitUpload} = useShared();

    const fileUploadRef = useRef<HTMLInputElement | null>(null)
    // const [files, setFiles] = useState<FileList | null>()

    const handleClickUpload = () => {
        fileUploadRef.current?.click()
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileListWaitUpload(e.target.files)
        }
    }

    const handleClickStartUploadFiles = async () => {
        if (!fileListWaitUpload) {
            alert("Please Select files first!")
            return;
        }

        const formData = new FormData();
        formData.append("clientId", "1234")

        Array.from(fileListWaitUpload).forEach((file) => {
            formData.append("files", file)
        })

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                body: formData
            });

            if (!response.ok) throw new Error("Upload Failed");

            const data = await response.json();
            console.log("Upload Success: ", data)
        } catch (error) {
            console.error("❌ Upload error:", error);
            alert("Upload failed!");
        }

    }

    return (
        <div className="content-header">
            <div className="computer-name">
                <h4>{deviceSelected?.id === "" ? myDevice.name : deviceSelected?.name}{id === undefined ? '(You)' : ''}</h4>
                {/* <h4>{deviceSelected?.name}</h4> */}
                <img src={editIcon} alt="" className='content-header-icon' />
            </div>
            <div className='tools-group'>
                <div className="tool-icon" onClick={handleClickUpload}>
                    <input type="file" multiple name="" className='hide' ref={fileUploadRef} onChange={handleFileInputChange} />
                    <img src={fileUploadIcon} alt="" className='content-header-icon' />
                </div>
                <div className="tool-icon" onClick={handleClickStartUploadFiles}>
                    {/* <img src={fileUploadIcon} alt="" className='content-header-icon' /> */}
                    <span>start</span>
                </div>
                <div className="tool-icon">
                    <img src={selectIcon} alt="" className='content-header-icon' />
                </div>
                <div className="tool-icon">
                    <img src={synsIcon} alt="" className='content-header-icon' />
                </div>
            </div>
        </div>
    )
}