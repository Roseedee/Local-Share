import { useEffect, useState } from 'react'
import { QRCodeSVG } from "qrcode.react"
import { useNavigate, useParams } from 'react-router-dom'

import '../style/App.css'

import DeviceModel from '../model/DeviceModel'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
import Device from './Components/Device'

//test data
const devices: DeviceModel[] = [
  {
    id: 1,
    name: "My Computer",
    ip: "192.168.1.10"
  },
  {
    id: 2,
    name: "Work Laptop",
    ip: "192.168.1.5"
  }
]


function App() {

  const navigate = useNavigate()
  const { id } = useParams<string>()

  const [serverUrl, setServerUrl] = useState<string>("")
  const [myDevice, setMyDevice] = useState<DeviceModel>(() => loadMyDeviceInfo())
  const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>(null)

  useEffect(() => {
    connectToAPI()
  }, []);

  useEffect(() => {
    console.log("ID:", id);
    if(myDevice.id === Number(id)) {
      setDeviceSelected(myDevice)
    }else {
      const device = devices.find((d) => d.id === Number(id))
      if (device) {
        setDeviceSelected(device)
      }
    }
  }, [id]);
  
  const connectToAPI = () => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setServerUrl("http://" + data.ip + ":" + window.location.port))
      .catch((err) => {
        console.error(err)
        setServerUrl("Error connecting to server")
      });
  }

  function loadMyDeviceInfo() {
    return {
      id: 3,
      name: "My Computer",
      ip: "192.168.1.240"
    }
  }

  return (
    <div className='body'>
      <div className="sidebar">
        <div className="sidebar-header">
          <span className='tag'>แสกนเพื่อเข้ากลุ่ม</span>
          <QRCodeSVG value={serverUrl} />
          <a href=""><h5>{serverUrl}</h5></a>
        </div>
        <div className="device-list">
          <Device item={myDevice} active={myDevice.id === Number(id) ? true : false}/>
          <hr />
          {
            devices.map((device) => (
              <Device key={device.id} item={device} active={device.id === Number(id) ? true : false }/>
            ))
          }
        </div>
      </div>

      <div className="content">
        <div className="content-header">
          <div className="computer-name">
            <h4>{deviceSelected?.name}{myDevice?.id === Number(id) ? '(You)' : ''}</h4>
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
          <div className="file-not-found">
            <h2 className='water-mark'>ลากไฟล์มาวางเพื่ออัพโหลด หรือ กดเพื่ออัพโหลดไฟล์</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
