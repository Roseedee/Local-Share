import { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useParams } from "react-router-dom"
import { useShared } from "../contexts/SharedContext"

import rest from '../rest/rest'
import DeviceModel from '../model/DeviceModel'

import Device from '../Components/Device'

import '../style/layout/sidebar.css'

type Props = {
    local_uuid: string
}

export default function SideBar({ local_uuid }: Props) {
    const { id } = useParams<string>()
    const calledRef = useRef(false);
    const local_id = localStorage.getItem("device_id") || ""

    const [serverPath, setServerPath] = useState<string>("can't connect to server")

    const { myDevice, setDeviceSelected } = useShared();
    
    const [devicesList, setDevicesList] = useState<DeviceModel[]>([])

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;

        loadData()

    }, [])

    const loadData = async () => {
        rest.ping().then((data) => {
            if (data.status === 'ok') {
                rest.getConnection().then((data) => {
                    setServerPath(data.url)
                })
                rest.getAllClient(local_id).then((data) => {
                    setDevicesList(data.clients)
                })
            }
        })
    }

    useEffect(() => {
        if (devicesList) {
            const index_myUuid = devicesList.findIndex(item => item.id === local_uuid);
            if (index_myUuid !== -1) {
                devicesList.splice(index_myUuid, 1); // ลบออกจาก array เดิม
            }
        }
    }, [devicesList])

    useEffect(() => {
        // console.log("ID:", id);
        if (myDevice && devicesList) {
            if (id === "" || id === undefined) {
                setDeviceSelected(myDevice)
                localStorage.setItem("device_selected_client_id", myDevice.client_id)
                localStorage.setItem("device_selected_uuid", myDevice.id)
                localStorage.setItem("device_selected_name", myDevice.name)
            } else {
                const device = devicesList.find((d) => d.id === id)
                if (device) {
                    setDeviceSelected(device)
                    localStorage.setItem("device_selected_client_id", device.client_id)
                    localStorage.setItem("device_selected_uuid", device.id)
                    localStorage.setItem("device_selected_name", device.name)
                }
            }
        }
    }, [id]);



    // const handleDeleteUUID = () => {
    //     console.log('remove uuid')
    //     localStorage.removeItem('device_uuid')
    // }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <span className='tag'>แสกนเพื่อเข้ากลุ่ม</span>
                <QRCodeSVG value={serverPath} />
                <h5>{serverPath}</h5>
            </div>
            <div className="device-list">
                {
                    myDevice && (
                        <Device item={myDevice} active={id === undefined ? true : false} />
                    )
                }
                <hr />
                {
                    devicesList && devicesList.map((device, i) => (
                        <Device key={i} item={device} active={device.id === id ? true : false} />
                    ))
                }
            </div>
            <div className="sidebar-bottom">
                <button className="sidebar-bottom-btn">Settings</button>
                {/* <button onClick={handleDeleteUUID}>Remove UUID</button> */}
                <div className="footer">Local-Share&nbsp;<span className="tag">v1.0.100</span>&nbsp;@2025</div>
            </div>
        </div>
    )
}