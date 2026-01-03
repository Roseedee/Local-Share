import { useState } from 'react';
import { useShared } from '@/contexts/SharedContext'

import '@/style/components/file-info.css'

import { getDateTimeString } from '@/util/dateConvert';
import FileCategory from '@/util/fileCategory';
import fileSize from '@/util/fileSizeCalc';
// import { useEffect } from 'react';

import editIcon from '@/assets/edit.png';

export default function FileInfo() {

    const {
        selectedFile,
        isSelectFile,
        isShowFileInfo
    } = useShared();

    const [isEditingAccessScope, setIsEditingAccessScope] = useState(false);

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

    // useEffect(() => {
    //     console.log("Selected File Info: ", selectedFile);
    //     console.log("isSelectFile: ", isSelectFile);
    //     console.log("isShowFileInfo: ", isShowFileInfo);
    // }, [selectedFile]);


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
                    <div className='row'>
                        {
                            isEditingAccessScope ? (
                                <>
                                    <select name="" id="" className='file-info-selector'>
                                        <option value="PUBLIC">PUBLIC</option>
                                        <option value="PRIVATE">PRIVATE</option>
                                        <option value="PROTECTED">PROTECTED</option>
                                    </select>
                                    <input type="button" value="Save" className='file-info-btn-save-access-scope' onClick={() => setIsEditingAccessScope(false)}/>
                                </>
                            ) : (
                                <>
                                    <p className={`card-text ${colorTag(selectedFile?.access_scope)}`}>{selectedFile?.access_scope}</p>
                                    <img src={editIcon} className='small' alt="" onClick={() => setIsEditingAccessScope(!isEditingAccessScope)} />
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    ) : (<></>)
}