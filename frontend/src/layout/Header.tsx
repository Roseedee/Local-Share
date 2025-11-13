import { useRef, ChangeEvent } from 'react'
import { useShared } from '../contexts/SharedContext'
import { useParams } from 'react-router-dom'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import downloadIcon from '../assets/downloads.png'
import binIcon from '../assets/bin.png'
import largeViewIcon from '../assets/large-view.png'
import listViewIcon from '../assets/list-view.png'
import selectIcon from '../assets/select.png'

export default function Header() {

    const { id } = useParams<string>()
    const { myDevice, fileSelected } = useShared();


    // const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()
    const { deviceSelected, setFileListWaitUpload, isSelectMode, setIsSelectMode, isLargeView, setIsLargeView } = useShared();

    const fileUploadRef = useRef<HTMLInputElement | null>(null)

    const handleClickUpload = () => {
        fileUploadRef.current?.click()
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileListWaitUpload(e.target.files)
        }
    }

    const handleClieckSelectMode = () => {
        setIsSelectMode?.(!isSelectMode)
    }

    return (
        <div className="content-header">
            <div className="computer-name">
                {
                    isSelectMode ? <h4>เลือก {fileSelected?.length}</h4> :
                        <>
                            <h4>{deviceSelected?.id === "" ? myDevice.name : deviceSelected?.name}{id === undefined ? '(You)' : ''}</h4>
                            <img src={editIcon} alt="" className='content-header-icon' />
                        </>
                }
            </div>
            <div className='tools-group'>
                {
                    isSelectMode === true && (
                        <>
                            <div className="tool-icon">
                                <img src={downloadIcon} alt="" className='content-header-icon' />
                            </div>
                            <div className="tool-icon">
                                <img src={binIcon} alt="" className='content-header-icon' />
                            </div>

                        </>
                    )
                }
                {
                    isSelectMode === false && (
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
                <div className={`tool-icon ${isSelectMode ? 'active' : ''}`} onClick={handleClieckSelectMode}>
                    <img src={selectIcon} alt="" className='content-header-icon' />
                </div>
                {
                    isSelectMode === false && (
                        <div className="tool-icon">
                            <img src={synsIcon} alt="" className='content-header-icon' />
                        </div>
                    )
                }
            </div>
        </div>
    )
}