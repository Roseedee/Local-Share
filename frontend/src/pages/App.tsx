import { useEffect, useRef, useState } from 'react'
import { QRCodeSVG } from "qrcode.react"
import { useNavigate, useParams } from 'react-router-dom'

import '../style/App.css'

import DeviceModel from '../model/DeviceModel'
import rest from '../rest/rest'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
import Device from './Components/Device'

function App() {

  const navigate = useNavigate()
  const { id } = useParams<string>()

  const calledRef = useRef(false);

  const [serverUrl, setServerUrl] = useState<string>("")
  const [myDevice, setMyDevice] = useState<DeviceModel | null>(null)
  const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>(null)
  const [devicesList, setDevicesList] = useState<DeviceModel[]>([])

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    connectToAPI().then(() => {
      initMyDevice().then(() => {
        loadClients()
      })
    })

  }, []);

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

  const connectToAPI = async () => {
    await fetch("http://localhost:5000/connection", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => setServerUrl("http://" + data.ip + ":" + window.location.port + "/init"))
      .catch((err) => {
        console.error(err)
        setServerUrl("Error connecting to server")
      });
  }

  const initMyDevice = async () => {
    const uuid = localStorage.getItem('device_uuid')

    if(uuid) {
      // console.log("Found existing uuid:", uuid);
      rest.initRest(uuid).then((data) => {
        // console.log("Device info:", data);
        console.log("Device info:", data.deviceInfo.role);
        setMyDevice({
          id: data.deviceInfo.device_uuid,
          name: data.deviceInfo.device_name
        })
      })
    }else {
      // console.log("No existing uuid, generating new one");
      rest.initRest("").then((data) => {
        localStorage.setItem('device_uuid', data.uuid)
        setMyDevice({
          id: data.uuid,
          name: "Temp Name"
        })
        verifyMyDevice({id: data.uuid, name: "Temp Name"})
      })
    }

  }

  const verifyMyDevice = async (clientData: DeviceModel) => {
    console.log("Verifying device:", clientData);
    if (clientData) {
      await fetch("http://localhost:5000/verify", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ uuid: clientData.id, name: clientData.name })
      }).then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            console.log("Device verified");
          } else {
            console.log("Device not verified");
          }
        })
        .catch((err) => {
          console.error(err)
        });
    } else {
      console.log("My device is null");
    }
  }

  const loadClients = async () => {
    await fetch("http://localhost:5000/get-client", {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setDevicesList(data.clients)
        console.log(data.clients);
      })
      .catch((err) => {
        console.error(err)
      });
  }

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
            devicesList.map((device) => (
              <Device key={device.id} item={device} active={device.id === id ? true : false} />
            ))
          }
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
          <div className="file-not-found">
            <h2 className='water-mark'>ลากไฟล์มาวางเพื่ออัพโหลด หรือ กดเพื่ออัพโหลดไฟล์</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
