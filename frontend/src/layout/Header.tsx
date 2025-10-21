import { useEffect, useState, useRef, ChangeEvent } from 'react'
import { useShared } from '../contexts/SharedContext'

import DeviceModel from '../model/DeviceModel'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
import { useParams } from 'react-router-dom'


type Props = {
    myDevice: DeviceModel | undefined
}


export default function Header({ myDevice }: Props) {

    const { id } = useParams<string>()

    const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()

    const fileUploadRef = useRef<HTMLInputElement | null>(null)
    const [files, setFiles] = useState<FileList | null>()

    useEffect(() => {
        // console.log(deviceSelected)
        setDeviceSelected(() => {
            return {
                id: localStorage.getItem('device_selected_uuid') || "",
                name: localStorage.getItem('device_selected_name') || ""
            }
        })
    }, [id])

    const handleClickUpload = () => {
        fileUploadRef.current?.click()
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFiles(e.target.files)
        }
    }

    const handleClickStartUploadFiles = async () => {
        if (!files) {
            alert("Please Select files first!")
            return;
        }

        const formData = new FormData();
        formData.append("clientId", "1234")

        Array.from(files).forEach((file) => {
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

    const {text, setText} = useShared();

    // useEffect(() => {
    //     console.log(files)
    // }, [files])

    const inputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    } 

    

    return (
        <div className="content-header">
            <div className="computer-name">
                <h4>{deviceSelected === null ? myDevice?.name : deviceSelected?.name}{id === undefined ? '(You)' : ''}</h4>
                {/* <h4>{deviceSelected?.name}</h4> */}
                <img src={editIcon} alt="" className='content-header-icon' />
            </div>
            <div className='tools-group'>
                <input type="text" onChange={inputChange} value={text}/>
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