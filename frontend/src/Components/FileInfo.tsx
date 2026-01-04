import { useEffect, useState } from 'react';
import { useShared } from '@/contexts/SharedContext'

import rest from '@/rest/rest'

import '@/style/components/file-info.css'

import { getDateTimeString } from '@/util/dateConvert';
import FileCategory from '@/util/fileCategory';
import fileSize from '@/util/fileSizeCalc';
// import { useEffect } from 'react';

import editIcon from '@/assets/edit.png';
import filePermissionCodeToString from '@/util/filePermission';

export default function FileInfo() {

    const {
        selectedFile,
        isSelectFile,
        isShowFileInfo,
        setIsFileListLoading,
        nowIsYou
    } = useShared();
    const local_id = localStorage.getItem("device_id") || ""

    const [isEditingAccessScope, setIsEditingAccessScope] = useState(false);
    const [accessScopeInput, setAccessScopeInput] = useState<string>("");

    // const [isEditingFilePermission, setIsEditingFilePermission] = useState(false);
    // const [filePermissionInput, setFilePermissionInput] = useState<string>("");

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
        setAccessScopeInput(selectedFile?.access_scope || "");
        setIsEditingAccessScope(false);
    }, [selectedFile]);

    useEffect(() => {
        console.log("Access Scope Input Changed: ", accessScopeInput);
    }, [accessScopeInput]);

    const handleConfirmAccessScopeChange = async () => {
        // console.log("Confirm Change Access Scope");
        // console.log("Old Access Scope: ", selectedFile?.access_scope);
        // console.log("New Access Scope: ", accessScopeInput);
        if (accessScopeInput === selectedFile?.access_scope) {
            setIsEditingAccessScope(false);
            return;
        }

        await rest.editFileAccessScope(selectedFile?.id || "", local_id, accessScopeInput).then(() => {
            // console.log("Access Scope Updated Successfully");
            setIsEditingAccessScope(false);
            setIsFileListLoading?.(true);
            selectedFile!.access_scope = accessScopeInput;
        }).catch((err) => {
            console.error("Failed to update access scope:", err);
        });
    };


    // const handleConfirmFilePermissionChange = async () => {
    //     // console.log("Confirm Change File Permission");
    //     if (filePermissionInput === selectedFile?.permission_code) {
    //         setIsEditingFilePermission(false);
    //         return;
    //     }
    // }


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
                                    <select name="" id="" className='file-info-selector' value={accessScopeInput} onChange={(e) => setAccessScopeInput(e.target.value)}>
                                        <option value="PUBLIC">PUBLIC</option>
                                        <option value="PRIVATE">PRIVATE</option>
                                        <option value="PROTECTED">PROTECTED</option>
                                    </select>
                                    <input type="button" value="Save" className='file-info-btn-save' onClick={handleConfirmAccessScopeChange} />
                                </>
                            ) : (
                                <>
                                    <p className={`card-text ${colorTag(selectedFile?.access_scope)}`}>{selectedFile?.access_scope}</p>
                                    {
                                        nowIsYou ?
                                            <img src={editIcon} className='small' alt="" onClick={() => setIsEditingAccessScope(!isEditingAccessScope)} />
                                            :
                                            <></>
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
                {
                    !nowIsYou ? (
                        <div className="meta-data-item">
                            <p>File Permission</p>
                            <p>{filePermissionCodeToString(selectedFile?.permission_code)}</p>
                        </div>
                    ) : (<></>)
                }
            </div>
        </div>
    ) : (<></>)
}