import { useRef, ChangeEvent } from 'react'
import { useShared } from '../contexts/SharedContext'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
import { useParams } from 'react-router-dom'

export default function Header() {

    const { id } = useParams<string>()
    const { myDevice } = useShared();


    // const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()
    const {deviceSelected, setFileListWaitUpload, isSelectMode, setIsSelectMode} = useShared();

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
                <h4>{deviceSelected?.id === "" ? myDevice.name : deviceSelected?.name}{id === undefined ? '(You)' : ''}</h4>
                {/* <h4>{deviceSelected?.name}</h4> */}
                <img src={editIcon} alt="" className='content-header-icon' />
            </div>
            <div className='tools-group'>
                <div className="tool-icon" onClick={handleClickUpload}>
                    <input type="file" multiple name="" className='hide' ref={fileUploadRef} onChange={handleFileInputChange} />
                    <img src={fileUploadIcon} alt="" className='content-header-icon' />
                </div>
                <div className={`tool-icon ${isSelectMode ? 'active': ''}`} onClick={handleClieckSelectMode}>
                    <img src={selectIcon} alt="" className='content-header-icon' />
                </div>
                <div className="tool-icon">
                    <img src={synsIcon} alt="" className='content-header-icon' />
                </div>
            </div>
        </div>
    )
}