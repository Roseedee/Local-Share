import { useEffect, useRef, useState } from 'react'
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
    id: "1",
    name: "My Computer",
  },
  {
    id: "2",
    name: "Work Laptop",
  }
]


function App() {

  const navigate = useNavigate()
  const { id } = useParams<string>()

  const calledRef = useRef(false);

  const [serverUrl, setServerUrl] = useState<string>("")
  const [myDevice, setMyDevice] = useState<DeviceModel | null>(null)
  const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>(myDevice)

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    
    connectToAPI().then(() => {
      initMyDevice()
    })

  }, []);

  // useEffect(() => {
  //   // console.log("ID:", id);
  //   if(myDevice?.id === id) {
  //     setDeviceSelected(myDevice)
  //   }else {
  //     const device = devices.find((d) => d.id === id)
  //     if (device) {
  //       setDeviceSelected(device)
  //     }
  //   }
  // }, [id]);
  
  const connectToAPI = async () => {
    await fetch("http://localhost:5000", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setServerUrl("http://" + data.ip + ":" + window.location.port))
      .catch((err) => {
        console.error(err)
        setServerUrl("Error connecting to server")
      });
  }

  const initMyDevice = () => {
    fetch("http://localhost:5000/init", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setMyDevice({
          id: data.uuid,
          name: "Local",
        })
        console.log("My Device ID:", data.uuid);
      })
      .catch((err) => {
        console.error(err)
        setMyDevice({
          id: "can't connect",
          name: "My Computer",
        })
      });
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
          {
            myDevice && (
              <Device item={myDevice} active={myDevice?.id === id || myDevice?.id === deviceSelected?.id ? true : false}/>
            )
          }
          <hr />
          {
            devices.map((device) => (
              <Device key={device.id} item={device} active={device.id === id ? true : false }/>
            ))
          }
        </div>
      </div>

      <div className="content">
        <div className="content-header">
          <div className="computer-name">
            <h4>{deviceSelected?.name}{myDevice?.id === id ? '(You)' : ''}</h4>
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
