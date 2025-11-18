import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { useShared } from '../contexts/SharedContext'
import { useParams } from 'react-router-dom'

import rest from '../rest/rest'

import editIcon from '../assets/edit.png'
import fileUploadIcon from '../assets/up-loading.png'
import downloadIcon from '../assets/downloads.png'
import binIcon from '../assets/bin.png'
import largeViewIcon from '../assets/large-view.png'
import listViewIcon from '../assets/list-view.png'
import selectIcon from '../assets/select.png'

export default function Header() {

    const { id } = useParams<string>()
    const { myDevice, setMyDevice, selectedMultiFile, setSelectedMultiFile } = useShared();
    const [loading, setLoading] = useState<boolean>(false);
    const [isMe, setIsMe] = useState<boolean>(false);
    const [isEditName, setIsEditName] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(myDevice.name);
    const inputNameRef = useRef<HTMLInputElement | null>(null);


    // const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()
    const { deviceSelected, setFileListWaitUpload, isSelectMultiFile, setIsSelectMultiFile, isLargeView, setIsLargeView } = useShared();

    const fileUploadRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setIsEditName(false);
        if (id === undefined) {
            setIsMe(true);
        } else {
            setIsMe(false);
        }
    }, [id]);

    useEffect(() => {
        if (isEditName) {
            setNewName(myDevice.name)
            inputNameRef.current?.focus();
        }
    }, [isEditName]);

    const handleClickUpload = () => {
        fileUploadRef.current?.click()
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileListWaitUpload(e.target.files)
        }
    }

    const handleClieckSelectMode = () => {
        setIsSelectMultiFile?.(!isSelectMultiFile)
    }

    const handleRenameComputer = async () => {
        setIsEditName(false)
        if (newName === "") return;
        rest.renameComputer(myDevice.client_id, newName).then((data) => {
            if (data.ok) {
                setMyDevice({ ...myDevice, name: newName })
            }
        }).catch(() => {
            alert("การเปลี่ยนชื่อคอมพิวเตอร์ของคุณไม่สำเร็จ ลองใหม่อีกครั้ง")
        })
    }

    const handleDownloadSelected = async () => {
        if ((selectedMultiFile === undefined || selectedMultiFile.length === 0) && loading) return;
        // console.log("Download selected files:", selectedMultiFile);
        setLoading(true);

        if (selectedMultiFile !== undefined) {
            await rest.downloadFiles(selectedMultiFile).then(async (response) => {
                const disposition = response.headers.get("Content-Disposition");
                let fileName = "download.zip";
                if (disposition) {
                    const match = disposition.match(/filename="(.+)"/);
                    if (match && match[1]) fileName = match[1];
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.URL.revokeObjectURL(url);
            }).catch((err) => {
                console.error(err);
                setLoading(false);
            }).finally(() => {
                setLoading(false);
                setSelectedMultiFile?.([]);
                setIsSelectMultiFile?.(false);
            });
        }
    }

    return (
        <div className="content-header">
            <div className="computer-name">
                {
                    isSelectMultiFile ?
                        <h4>เลือก {selectedMultiFile?.length}</h4> :
                        <>
                            {
                                !isEditName && <h4>{deviceSelected?.id === "" ? myDevice.name : deviceSelected?.name}{isMe ? '(You)' : ''}</h4>
                            }
                            {
                                isMe && !isEditName && <img src={editIcon} alt="" className='content-header-icon' onClick={() => { setIsEditName(true) }} />
                            }
                            {
                                isEditName && (
                                    <>
                                        <input ref={inputNameRef} className='computer-name-input' type="text" name="" id="" value={newName} onChange={(e) => { setNewName(e.target.value) }} onBlur={handleRenameComputer} onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                handleRenameComputer();
                                                inputNameRef.current?.blur();
                                            }
                                        }} />
                                    </>
                                )
                            }
                        </>
                }
            </div>
            <div className='tools-group'>
                {
                    isSelectMultiFile === true && (
                        <>
                            <div className={`tool-icon ${loading ? ' loading' : ''}`} onClick={handleDownloadSelected}>
                                <img src={downloadIcon} alt="" className='content-header-icon' />
                            </div>
                            <div className="tool-icon">
                                <img src={binIcon} alt="" className='content-header-icon' />
                            </div>

                        </>
                    )
                }
                {
                    isSelectMultiFile === false && (
                        <>
                            <div className="tool-icon" onClick={handleClickUpload}>
                                <input type="file" multiple name="" className='hide' ref={fileUploadRef} onChange={handleFileInputChange} />
                                <img src={fileUploadIcon} alt="" className='content-header-icon' />
                            </div>
                            {
                                isLargeView ? (
                                    <div className="tool-icon" onClick={() => setIsLargeView?.(false)}>
                                        <img src={listViewIcon} alt="" className='content-header-icon' />
                                    </div>
                                ) : (
                                    <div className="tool-icon" onClick={() => setIsLargeView?.(true)}>
                                        <img src={largeViewIcon} alt="" className='content-header-icon' />
                                    </div>
                                )
                            }
                        </>
                    )
                }
                <div className={`tool-icon ${isSelectMultiFile ? 'active' : ''}`} onClick={handleClieckSelectMode}>
                    <img src={selectIcon} alt="" className='content-header-icon' />
                </div>
                {
                    // isSelectMultiFile === false && (
                    //     <div className="tool-icon">
                    //         <img src={synsIcon} alt="" className='content-header-icon' />
                    //     </div>
                    // )
                }
            </div>
        </div>
    )
}