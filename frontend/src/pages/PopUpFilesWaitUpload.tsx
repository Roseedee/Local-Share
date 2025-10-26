import { useShared } from '../contexts/SharedContext'

import '../style/components/PopUpFilesWaitUpload.css'

import imgTest from '../assets/file.png'
import iconClose from '../assets/close.png'
import iconCloseWhite from '../assets/close-white.png'
import iconUpload from '../assets/up-loading.png'

export default function PopUpFilesWaitUpload() {

    const { fileListWaitUpload } = useShared();

    return fileListWaitUpload && (
        <div className="list-files-wait-upload">
            <div className="header-list-files">
                <h5>10 รายการ</h5>
                <p className='upload-status success'>สำเร็จ 0</p>
                <p className='upload-status failed'>ล้มเหลว 0</p>
            </div>
            <div className="list-files">
                {
                    Array.from(fileListWaitUpload).map((file, i) => (
                        <div className='item-file' key={i}>
                            <img src={imgTest} alt="" />
                            <div className='file-details'>
                                <h5>{file.name}</h5>
                                <span className='tag'>{Math.round(file.size / 1024)} KB</span>
                            </div>
                            <div className="btn-cancel">
                                <img src={iconClose} alt="Cancel upload" />
                            </div>
                            <div className="upload-progress" style={{width: (i + 1) * 10 + "%"}}></div>
                        </div>
                    ))
                }
            </div>
            <div className="list-files-btn-group">
                <div className="btn-list-files btn-confirm-upload"><img src={iconUpload} alt="" /><span>Confirm</span></div>
                <div className="btn-list-files btn-cancel-all"><img src={iconCloseWhite} alt="" /></div>
            </div>
        </div>
    )
}