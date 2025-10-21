import { useState } from 'react'

import '../style/components/file.css'

import FileModel from '../model/FileModel'
import { useEffect } from 'react'

interface Props {
    file: FileModel
    isUpload?: boolean
    progressNow?: number
}

export default function File({ file, isUpload = false, progressNow = 0 }: Props) {
    const [progress, setProgress] = useState<number>(0)

    useEffect(() => {
        setProgress(progressNow)
    }, [])

    return (
        <>
            <div className="file-item" key={file.id}>
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
                <img className='file-icon' src={file.path} alt="" />
                <h6>{file.name}</h6>
            </div>
        </>
    )
}