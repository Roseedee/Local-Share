import { useEffect, useState } from 'react'
import { QRCodeSVG } from "qrcode.react"
import { useNavigate } from 'react-router-dom'

import '../style/App.css'

import phoneIcon from '../assets/iphone.png'
import computerIcon from '../assets/computer.png'
import delIcon from '../assets/close-white.png'
import imgTest1 from '../assets/test1.jpg'
import imgTest2 from '../assets/test2.jpg'
import imgTest3 from '../assets/test3.jpg'
import imgTest4 from '../assets/test4.jpg'


function App() {

  const navigate = useNavigate()

  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    setUrl("Can't connect API")
  }, [])

  const handleDeviceItemClick = (id: number) => {
    navigate(`/fileview/${id}`)
  }

  const handleDelImage = (id: number) => {
    alert(`Delete image ${id}`)
  }

  return (
    <>
      <div className='header'>
        <span>scan for join group</span>
        <QRCodeSVG value={url} />
        <h3>{url}</h3>
      </div>
      <div className="device-list-container">
        <h2 style={{ textAlign: 'center' }}>Device List</h2>
        <div className="device-list">
          <div className="device-item" onClick={() => handleDeviceItemClick(1)}>
            <img src={phoneIcon} alt="" />
            <div className="device-detail">
              <h3>Device Name</h3>
              <span>IP: 192.168.1.1</span>
            </div>
          </div>
          <div className="device-item" onClick={() => handleDeviceItemClick(2)}>
            <img src={computerIcon} alt="" />
            <div className="device-detail">
              <h3>Device Name</h3>
              <span>IP: 192.168.1.1</span>
            </div>
          </div>
        </div>
      </div>
      <div className="my-file-list-container">
        <h2>My File List</h2>
        <div className="my-file-list">
          <div className="file-item">
            <div className="del-btn" onClick={() => handleDelImage(0)}>
              <img src={delIcon} alt="" />
            </div>
            <img className='image' src={imgTest1} alt="" />
            <span>{imgTest1.split('/')[3]}</span>
          </div>
          <div className="file-item">
            <div className="del-btn" onClick={() => handleDelImage(1)}>
              <img src={delIcon} alt="" />
            </div>
            <img className='image' src={imgTest2} alt="" />
            <span>{imgTest2.split('/')[3]}</span>
          </div>
          <div className="file-item">
            <div className="del-btn" onClick={() => handleDelImage(2)}>
              <img src={delIcon} alt="" />
            </div>
            <img className='image' src={imgTest3} alt="" />
            <span>{imgTest3.split('/')[3]}</span>
          </div>
          <div className="file-item">
            <div className="del-btn" onClick={() => handleDelImage(3)}>
              <img src={delIcon} alt="" />
            </div>
            <img className='image' src={imgTest4} alt="" />
            <span>{imgTest4.split('/')[3]}</span>
          </div>
        </div>
      </div>
      <div className="image-full-view">
        <img src={imgTest2} alt="" />
      </div>
    </>
  )
}

export default App
