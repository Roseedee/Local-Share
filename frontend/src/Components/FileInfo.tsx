import { useShared } from '@/contexts/SharedContext'

import '@/style/components/file-info.css'

import { getDateTimeString } from '@/util/dateConvert';
import FileCategory from '@/util/fileCategory';
import fileSize from '@/util/fileSizeCalc';
import { useEffect } from 'react';

export default function FileInfo() {

    const { 
        selectedFile,
        isSelectFile,
        isShowFileInfo
    } = useShared();

    const colorTag = (tag?: string) => {
        switch (tag) {
            case 'PUBLIC':
                return 'bg-green';
            case 'PRIVATE':
                return 'bg-red';
            default:
                return 'bg-blue';
        }
    };

    useEffect(() => {
        console.log("Selected File Info: ", selectedFile);
        console.log("isSelectFile: ", isSelectFile);
        console.log("isShowFileInfo: ", isShowFileInfo);
    }, [selectedFile]);


    return isSelectFile && isShowFileInfo && selectedFile ? (
        <div className="file-info-container">
            <div className="file-info-header">
                <h5>{selectedFile?.name}</h5>
            </div>
            <div className="file-info-preview">
                {
                    new FileCategory(selectedFile?.type)?.isImage() ? (
                        <img className='image-icon' src={selectedFile?.new_name} alt={selectedFile?.name} />
                    ) : (
                        <img className='other-file-icon' src={new FileCategory(selectedFile?.type)?.getIcon()} alt="Can't preview this file" />
                    )

                }
                <p className='file-type'>{new FileCategory(selectedFile?.type)?.getCategoryName()}</p>
                {/* <div className="file-info-preview-hover">
                  <img src={zoomInIcon} alt="" />
                </div> */}
            </div>
            <div className="file-info-meta-data">
                <div className="meta-data-item">
                    <p>File Type</p>
                    <p>{selectedFile?.type}</p>
                </div>
                <div className="meta-data-item">
                    <p>Size</p>
                    <p>{fileSize(selectedFile?.size)}</p>
                </div>
                <div className="meta-data-item">
                    <p>Uploaded At</p>
                    <p>{getDateTimeString(selectedFile?.create_at) || "NULL"}</p>
                </div>
                <div className="meta-data-item">
                    <p>Access Level</p>
                    <p className={`card-text ${colorTag(selectedFile?.access_scope)}`}>{selectedFile?.access_scope}</p>
                </div>
            </div>
        </div>
    ) : (<></>)
}