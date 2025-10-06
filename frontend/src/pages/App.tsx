import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from "qrcode.react"
import { useNavigate, useParams } from 'react-router-dom'

import '../style/App.css'
import '../style/components/file.css'

import DeviceModel from '../model/DeviceModel'
import rest from '../rest/rest'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
import imgTest from '../assets/test1.jpg'

import Device from './Components/Device'

function App() {

  const navigator = useNavigate()
  const { id } = useParams<string>()

  const calledRef = useRef(false);

  const local_uuid = localStorage.getItem("device_uuid") || ""

  const [serverUrl, setServerUrl] = useState<string>("")
  const [myDevice, setMyDevice] = useState<DeviceModel | null>(null)
  const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>(null)
  const [devicesList, setDevicesList] = useState<DeviceModel[]>([])

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (local_uuid === "") {
      navigator("/init")
      return;
    }

    loadData()

  }, []);

  const loadData = async () => {
    rest.ping().then((data) => {
      if (data.status === 'ok') {
        rest.getConnection().then((data) => {
          setServerUrl(data.url)
          // console.log(data.url)
        })
        rest.getAllClient(local_uuid).then((data) => {
          setDevicesList(data.clients)
          // console.log(data.clients)
        })
      }
    })
  }

  useEffect(() => {
    if (devicesList) {
      const temp_myDevice = devicesList.find((item) => item.id === local_uuid);
      const index_myUuid = devicesList.findIndex(item => item.id === local_uuid);
      if (index_myUuid !== -1) {
        devicesList.splice(index_myUuid, 1); // ลบออกจาก array เดิม
      }
      // console.log(temp_myDevice)
      if (temp_myDevice) setMyDevice(temp_myDevice);
    }
  }, [devicesList])



  // When id param change, update selected device
  useEffect(() => {
    // console.log("ID:", id);
    if (myDevice?.id === id) {
      setDeviceSelected(myDevice)
    } else {
      const device = devicesList.find((d) => d.id === id)
      if (device) {
        setDeviceSelected(device)
      }
    }
  }, [id]);

  const handleDeleteUUID = () => {
    console.log('remove uuid')
    localStorage.removeItem('device_uuid')
  }

  return (
    <div className='body'>
      <div className="sidebar">
        <div className="sidebar-header">
          <span className='tag'>แสกนเพื่อเข้ากลุ่ม</span>
          <QRCodeSVG value={serverUrl} />
          <h5>{serverUrl}</h5>
        </div>
        <div className="device-list">
          {
            myDevice && (
              <Device item={myDevice} active={id === undefined ? true : false} />
            )
          }
          <hr />
          {
            devicesList.map((device, i) => (
              <Device key={i} item={device} active={device.id === id ? true : false} />
            ))
          }
        </div>
        <div className="sidebar-bottom">
          <button onClick={handleDeleteUUID}>Remove UUID</button>
        </div>
      </div>

      <div className="content">
        <div className="content-header">
          <div className="computer-name">
            <h4>{deviceSelected === null ? myDevice?.name : deviceSelected?.name}{id === undefined ? '(You)' : ''}</h4>
            <img src={editIcon} alt="" className='content-header-icon' />
          </div>
          <div className='tools-group'>
            <div className="tool-icon">
              <img src={fileUploadIcon} alt="" className='content-header-icon' />
            </div>
            <div className="tool-icon">
              <img src={selectIcon} alt="" className='content-header-icon' />
            </div>
            <div className="tool-icon">
              <img src={synsIcon} alt="" className='content-header-icon' />
            </div>
          </div>
        </div>
        <div className="content-body">
          {/* <div className="file-not-found">
            <h2 className='water-mark'>ลากไฟล์มาวางเพื่ออัพโหลด หรือ กดเพื่ออัพโหลดไฟล์</h2>
          </div> */}
          <div className="file-list">
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file namasdfasdfasdfasdfasdfasdfase</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
            <div className="file-item">
              <img src={imgTest} alt="" />
              <h6>file name</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
