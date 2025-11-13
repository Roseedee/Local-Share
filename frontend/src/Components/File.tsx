import { useState, useEffect } from 'react'
import fileSize from '../util/fileSizeCalc'

import '../style/components/file.css'

import FileModel from '../model/FileModel'

import videoIcon from '../assets/video.png'
import soundIcon from '../assets/sound.png'
import documentIcon from '../assets/document.png'
import otherIcon from '../assets/other.png'

interface Props {
    file: FileModel
    isUpload?: boolean
    progressNow?: number
    isSelected?: boolean
    onClick?: () => void
}

export default function File({ file, isUpload = false, progressNow = 0, isSelected = false, onClick }: Props) {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        setProgress(progressNow)
    }, [])

    function fileCategory(fileType: string): string {
        if (!fileType) return otherIcon;

        if (fileType.startsWith("image/")) return "image";
        if (fileType.startsWith("video/")) return videoIcon;
        if (fileType.startsWith("audio/")) return soundIcon;

        const documentTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/vnd.ms-excel",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "text/plain",
            "text/html",
            "application/json",
            "text/csv"
        ];

        if (documentTypes.includes(fileType)) return documentIcon;

        return otherIcon;
    }


    return (
        <div 
            onClick={onClick}
            className={`file-item ${isSelected ? "file-selected" : ""}`} 
            key={file.id}
            title={`ชื่อ : ${file.name} \nขนาด : ${fileSize(file.size)}`}
        >
            {
                isUpload ? (
                    <div className="file-progress">
                        <div className="progress">
                            <div className="progress-value" style={{ width: progress + "%" }}></div>
                        </div>
                        <h5>{progressNow}</h5>
                    </div>
                ) : (<></>)
            }
            <div className="file-icon-container">
                {
                    fileCategory(file.type) === "image" ? (
                        <img className='image-icon' src={file.path} alt={file.name} />

                    ) : (
                        <img className='other-file-icon' src={fileCategory(file.type)} alt="Can't preview this file" />
                    )

                }
            </div>
            <h6>{file.name}</h6>
        </div>
    )
}