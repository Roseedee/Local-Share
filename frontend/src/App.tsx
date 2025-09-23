import { useState } from 'react'
import { QRCodeSVG } from "qrcode.react"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import phoneIcon from './assets/iphone.png'
import computerIcon from './assets/computer.png'
import './App.css'

function App() {
  const [url, setUrl] = useState("http://localhost:8080")


  return (
    <>
      <div className='header'>
        <QRCodeSVG value={url}/>
        <div className="detail">
          <h3>{url}</h3>
        </div>
      </div>
      <div className="device-list">
        <div className="device-item">
          <img src={phoneIcon} alt="" />
          <div className="device-detail">
            <h3>Device Name</h3>
            <span>IP: 192.168.1.1</span>
          </div>
        </div>
        <div className="device-item">
          <img src={computerIcon} alt="" />
          <div className="device-detail">
            <h3>Device Name</h3>
            <span>IP: 192.168.1.1</span>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
