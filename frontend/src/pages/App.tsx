import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShared } from '../contexts/SharedContext'

import '../style/App.css'

import Layout from '../layout/Layout'
import FileList from './FileLise'

import imgTest from '../assets/test1.jpg'
import iconClose from '../assets/close.png'
import iconCloseWhite from '../assets/close-white.png'
import iconUpload from '../assets/up-loading.png'

import rest from '../rest/rest'

function App() {
  const { id } = useParams<string>()
  const navigator = useNavigate()
  const calledRef = useRef(false);

  const { setMyDevice, setDeviceSelected, fileListWaitUpload } = useShared();

  const local_uuid = localStorage.getItem("device_uuid") || ""
  // const [myDevice, setMyDevice] = useState<DeviceModel>()

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (local_uuid === "") {
      navigator("/init")
      return;
    }

    if (id) {
      // console.log(id)
      setDeviceSelected({
        id: localStorage.getItem("device_selected_uuid") || "",
        name: localStorage.getItem("device_selected_name") || ""
      })
    }

    loadData();
  }, []);

  const loadData = async () => {
    rest.auth(local_uuid).then((data) => {
      setMyDevice(data)
    }).catch((err: any) => {
      console.error("Auth Failed: ", err.status, err.message)
    })
  }

  return (
    <Layout>
      <FileList />
      {
        fileListWaitUpload && (

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
    </Layout>
  )
}

export default App
