import { useState, useEffect } from 'react'
import fileSize from '../util/fileSizeCalc'
import FileCategory from '../util/fileCategory'

import '../style/components/file.css'

import FileModel from '../model/FileModel'

interface Props {
    file: FileModel
    isUpload?: boolean
    progressNow?: number
    isSelected?: boolean
    onClick?: () => void
    onDoubleClick?: () => void
}

export default function File({ file, isUpload = false, progressNow = 0, isSelected = false, onClick, onDoubleClick }: Props) {
    const [progress, setProgress] = useState<number>(0)
    const fileCategory = new FileCategory(file.type);

    useEffect(() => {
        setProgress(progressNow)
    }, [])

    return (
        <div 
            onClick={(e) => {
                e.stopPropagation();
                onClick && onClick();
            }}

            onDoubleClick={() => {
                onDoubleClick && onDoubleClick()
            }}
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
                    fileCategory.isImage() ? (
                        <img className='image-icon' src={file.path} alt={file.name} />
                    ) : (
                        <img className='other-file-icon' src={fileCategory.getIcon()} alt="Can't preview this file" />
                    )

                }
            </div>
            <h6>{file.name}</h6>
        </div>
    )
}