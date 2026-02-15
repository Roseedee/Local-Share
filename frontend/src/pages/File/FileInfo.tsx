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
        nowIsYou,
        setIsManageUserPermission
    } = useShared();
    const local_id = localStorage.getItem("device_id") || ""

    const [isEditingAccessScope, setIsEditingAccessScope] = useState(false);
    const [accessScopeInput, setAccessScopeInput] = useState<string>("");

    const [filePermissionList, setFilePermissionList] = useState<Array<any>>([]);
    // const [isEditingFilePermission, setIsEditingFilePermission] = useState(false);
    // const [filePermissionInput, setFilePermissionInput] = useState<string>("");


    const [countdown, setCountdown] = useState(0);
    const [loading, setLoading] = useState(false);

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

    // useEffect(() => {
    //     console.log("Access Scope Input Changed: ", accessScopeInput);
    // }, [accessScopeInput]);

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

    // const handleAddFilePermission = async () => {

    // }

    useEffect(() => {
        if (!selectedFile) return;

        setLoading(true);
        setCountdown(3);

        const interval = setInterval(() => {
            setCountdown(prev => {
                if (prev === 1) {
                    clearInterval(interval);
                    // setLoading(false);
                    loadDevicePermissionList();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [selectedFile]);

    const loadDevicePermissionList = async () => {
        await rest.getFilePermissionList(selectedFile?.id || "").then((data) => {
            //    console.log("Permission List: ", data.result);
            setFilePermissionList(data.result);
        }).catch((err) => {
            console.error("Failed to get file permission list:", err);
        });
        setLoading(false);
    }


    return isSelectFile && isShowFileInfo && selectedFile ? (
        <div className="file-info-container">
            <div className="file-info-header">
                <h5>{selectedFile?.name}</h5>
            </div>
            <div className="file-info-preview">
                {
                    new FileCategory(selectedFile?.type)?.isImage() ? (
                        <img className='image-icon' src={selectedFile?.download_url} alt={selectedFile?.name} />
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
                                        <option value="PRIVATE">PRIVATE</option>
                                        <option value="PROTECTED">PROTECTED</option>
                                        <option value="PUBLIC">PUBLIC</option>
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
                    nowIsYou ? (
                        (selectedFile?.access_scope === "PROTECTED" || selectedFile?.access_scope === "PUBLIC") && (
                            <>
                                <div className="meta-data-item list">
                                    <div className="meta-data-item-header">
                                        <p>Permission List</p>
                                        {
                                            selectedFile?.access_scope === "PUBLIC" ? (
                                                <>
                                                    <p className='no-permission-text tag'>ทุกคนสามารถเข้าถึงไฟล์นี้ได้</p>
                                                </>
                                            ) : (
                                                <input type='button' value="จัดการสิทธิ์" className='file-info-btn-add-permission' onClick={() => setIsManageUserPermission?.(true)} />
                                            )
                                        }
                                    </div>
                                    <div className="meta-data-item-list">

                                        {
                                            selectedFile?.access_scope === "PROTECTED" && (loading ? (
                                                <div className='file-info-loading'>{countdown}</div>
                                            ) : (
                                                filePermissionList.length === 0 ? (
                                                    <p className='no-permission-text tag'>No device has been granted permission to access this file.</p>
                                                ) : (
                                                    filePermissionList.map((item, index) => {
                                                        return (
                                                            <div className="device-permission-item" key={index}>
                                                                <p>{`${item.client_name}`}</p>
                                                                <span className='tag'>{filePermissionCodeToString(item.permission_code)}</span>
                                                                {/* <input type="button" value="ลบ" className='file-info-btn-del-permission' /> */}
                                                            </div>
                                                        )
                                                    })
                                                )
                                            )
                                            )
                                        }

                                    </div>
                                </div>
                            </>
                        )
                    ) : (<>
                        <div className="meta-data-item">
                            <p>Your Permission</p>
                            <p>{filePermissionCodeToString(selectedFile?.permission_code)}</p>
                        </div>
                    </>)
                }
            </div>
        </div>
    ) : (<></>)
}