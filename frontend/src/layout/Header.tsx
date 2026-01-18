import { useState, useRef, ChangeEvent, useEffect } from 'react'
import { useShared } from '@/contexts/SharedContext'
import { useParams } from 'react-router-dom'

import rest from '@/rest/rest'

import editIcon from '@/assets/edit.png'
import fileUploadIcon from '@/assets/up-loading.png'
import downloadIcon from '@/assets/downloads.png'
import binIcon from '@/assets/bin.png'
import largeViewIcon from '@/assets/large-view.png'
import listViewIcon from '@/assets/list-view.png'
import selectIcon from '@/assets/select.png'
import renameIcon from '@/assets/rename.png'
import shareIcon from '@/assets/share.png'
import closeIcon from '@/assets/close.png'
import noticeIcon from '@/assets/attention.png'

export default function Header() {

    const { device_name } = useParams<string>()
    const { myDevice, setMyDevice } = useShared();
    const [loading, setLoading] = useState<boolean>(false);
    const [isMe, setIsMe] = useState<boolean>(false);
    const [isEditName, setIsEditName] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(myDevice.name);
    const inputNameRef = useRef<HTMLInputElement | null>(null);


    // const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()
    const {
        deviceSelected, setFileListWaitUpload,
        selectedMultiFile, setSelectedMultiFile,
        isSelectMultiFile, setIsSelectMultiFile,
        isSelectFile, setIsSelectFile,
        selectedFile, setSelectedFile,
        isLargeView, setIsLargeView,
        setFileDeleting, fileDeleting,
        setFileSearch, fileSearch,
        setIsEditFileName,
        isShowFileInfo, setIsShowFileInfo
    } = useShared();

    const fileUploadRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setFileListWaitUpload(null)
        setIsEditName(false);
        if (device_name === "me") {
            setIsMe(true);
        } else {
            setIsMe(false);
        }
    }, [device_name]);

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
        const files = e.target.files ? Array.from(e.target.files) : [];
        // console.log("selected files:", files);
        setFileListWaitUpload(files);
        e.target.value = "";
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
        if (loading) return;

        // console.log("multi file selected:", selectedMultiFile,
        //     "\nsingle file selected:", selectedFile);

        const selected =
            selectedMultiFile && selectedMultiFile.length > 0
                ? selectedMultiFile
                : selectedFile?.id
                    ? [selectedFile?.id]
                    : [];

        if (selected.length === 0) {
            console.error("No file selected");
            alert("กรุณาเลือกไฟล์ที่ต้องการดาวน์โหลด");
            return;
        }

        setLoading(true);


        try {
            const response = await rest.downloadFiles(selected);

            const disposition = response.headers.get("Content-Disposition");
            let fileName = "download.zip";
            if (disposition) {
                const match = disposition.match(/filename="(.+)"/);
                if (match?.[1]) fileName = match[1];
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

        } catch (err) {
            console.error(err);

        } finally {
            setLoading(false);
            setSelectedMultiFile?.([]);
            setIsSelectMultiFile?.(false);
        }
    };

    const handleDeleteFiles = async () => {
        if (!confirm("คุณแน่ใจหรือไม่ว่าต้องการลบไฟล์ที่เลือก?")) return;

        // console.log("multi file selected:", selectedMultiFile,
        //     "\nsingle file selected:", selectedFile);

        const selected =
            selectedMultiFile && selectedMultiFile.length > 0
                ? selectedMultiFile
                : selectedFile?.id
                    ? [selectedFile?.id]
                    : [];

        if (selected.length === 0) {
            console.error("No file selected");
            alert("กรุณาเลือกไฟล์ที่ต้องการลบ");
            return;
        }

        setFileDeleting?.(true);

        await rest.deleteFiles(selected).then((result) => {
            // console.log("Delete files result:", result);
            if (result.ok) {
                console.log("Delete files success");
            } else {
                alert("การลบไฟล์ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
            }
        }).catch((err) => {
            console.error(err);
        }).finally(() => {
            setFileDeleting?.(false);
            setSelectedMultiFile?.([]);
            setIsSelectMultiFile?.(false);
            setSelectedFile?.(null);
            setIsSelectFile?.(false);
        });
    }

    return (
        <>

            <div className="content-header">
                <div className="header-child-content header-title">
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
                    <div className="tool-icon-upload" onClick={handleClickUpload}>
                        <input type="file" multiple name="" className='hide' ref={fileUploadRef} onChange={handleFileInputChange} />
                        <img src={fileUploadIcon} alt="" className='content-header-icon' />
                        <span>อัพโหลด</span>
                    </div>
                </div>
                <div className="header-child-content search-container">
                    <div className="input-search-container">
                        <input type="text" className='search-input' name="" id="" placeholder='ค้นหา, สามารถใช้ wildcard ได้' onChange={(e) => setFileSearch?.(e.target.value)} value={fileSearch} />
                        <img src={closeIcon} alt="" className='input-search-clear' onClick={() => setFileSearch?.("")} />
                    </div>
                    {/* <div className="input-search-icon-container">
                        <img src={noticeIcon} alt="" className='input-search-icon' />
                    </div> */}
                </div>
                <div className='header-child-content tools-group'>
                    {
                        isSelectMultiFile && selectedMultiFile.length !== 0 ? (
                            <>
                                <div className={`tool-icon ${loading ? ' loading' : ''}`} onClick={handleDownloadSelected}>
                                    <img src={downloadIcon} alt="" className='content-header-icon' />
                                </div>
                                <div className="tool-icon">
                                    <img src={shareIcon} alt="" className='content-header-icon' />
                                </div>
                                <div className={`tool-icon ${fileDeleting ? ' loading' : ''}`} onClick={handleDeleteFiles}>
                                    <img src={binIcon} alt="" className='content-header-icon' />
                                </div>
                            </>
                        ) : (<></>)
                    }
                    {
                        isSelectFile ? (
                            <div className={`tool-icon ${loading ? ' loading' : ''}`} onClick={handleDownloadSelected}>
                                <img src={downloadIcon} alt="" className='content-header-icon' />
                            </div>
                        ) : (<></>)
                    }
                    {
                        isSelectFile && (selectedFile?.permission_code !== 'r--') ? (
                            <>
                                <div className="tool-icon">
                                    <img src={shareIcon} alt="" className='content-header-icon' />
                                </div>
                                <div className={`tool-icon ${fileDeleting ? ' loading' : ''}`} onClick={handleDeleteFiles}>
                                    <img src={binIcon} alt="" className='content-header-icon' />
                                </div>
                                <div className="tool-icon" onClick={() => setIsEditFileName?.(true)}>
                                    <img src={renameIcon} alt="" className='content-header-icon' />
                                </div>
                            </>
                        ) : (<></>)
                    }
                    {
                        !isSelectMultiFile && (
                            <>
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
                    <div className={`tool-icon ${isShowFileInfo ? 'active' : ''}`} onClick={() => setIsShowFileInfo?.(!isShowFileInfo)}>
                        <img src={noticeIcon} alt="" className='content-header-icon' />
                    </div>
                </div>
            </div>
        </>
    )
}