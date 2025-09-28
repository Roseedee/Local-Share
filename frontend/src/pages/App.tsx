import { useEffect, useState } from 'react'
import { QRCodeSVG } from "qrcode.react"
import { useNavigate } from 'react-router-dom'

import '../style/App.css'

// import FileItem from './Components/FileItem'

import phoneIcon from '../assets/iphone.png'
import computerIcon from '../assets/computer.png'

import editIcon from '../assets/edit.png'
import synsIcon from '../assets/sync.png'
import fileUploadIcon from '../assets/up-loading.png'
import selectIcon from '../assets/select.png'
// // import delIcon from '../assets/close-white.png'
// import imgTest1 from '../assets/test1.jpg'
// import imgTest2 from '../assets/test2.jpg'
// import imgTest3 from '../assets/test3.jpg'
// import imgTest4 from '../assets/test4.jpg'


function App() {

  const navigate = useNavigate()

  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.json())
      .then((data) => setUrl("http://" + data.ip + ":" + window.location.port))
      .catch((err) => console.error(err));
  }, []);

  const handleDeviceItemClick = (id: number) => {
    navigate(`/fileview/${id}`)
  }

  return (
      <div className='body'>
        <div className="sidebar">
          <div className="sidebar-header">
            <span className='tag'>แสกนเพื่อเข้ากลุ่ม</span>
            <QRCodeSVG value={url} />
            <a href=""><h5>{url}</h5></a>
          </div>
          <div className="device-list">
            <div className="device active">
              <img src={computerIcon} alt="" />
              <div className="device-detail">
                <h5>My Computer</h5>
                <span className='tag'>192.168.1.240</span>
              </div>
            </div>
            <div className="device">
              <img src={computerIcon} alt="" />
              <div className="device-detail">
                <h5>Temporary</h5>
                <span className='tag'>192.168.1.240</span>
              </div>
            </div>
            <hr/>
            <div className="device">
              <img src={computerIcon} alt="" />
              <div className="device-detail">
                <h5>Computer 1</h5>
                <span className='tag'>192.168.1.159</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <div className="content-header">
            <div className="computer-name">
              <h4>My Computer{"(You)"}</h4>
              <img src={editIcon} alt="" className='content-header-icon'/>
            </div>
            <div className='tools-group'>
              <div className="tool-icon">
                <img src={fileUploadIcon} alt="" className='content-header-icon'/>
              </div>
              <div className="tool-icon">
                <img src={selectIcon} alt="" className='content-header-icon'/>
              </div>
              <div className="tool-icon">
                <img src={synsIcon} alt="" className='content-header-icon'/>
              </div>
            </div>
          </div>
        </div>
      </div>

      

  )
}

export default App
