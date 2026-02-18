import { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useParams, useNavigate } from "react-router-dom"
import { useShared } from "@/contexts/SharedContext"

import rest from '@/rest/rest'
import DeviceModel from '@/model/DeviceModel'

import Device from '@/Components/Device'

import '@/style/layout/sidebar.css'

import upArrowIcon from '@/assets/up-arrow.png'
import StorageChart from "@/Components/StorageChart"

type Props = {
    local_uuid: string
}

export default function SideBar({ local_uuid }: Props) {
    const { device_name } = useParams<string>()
    const calledRef = useRef(false);
    const navigate = useNavigate()
    const local_id = localStorage.getItem("device_id") || ""

    const [serverPath, setServerPath] = useState<string>("can't connect to server")

    const { myDevice, setDeviceSelected, setNowIsYou } = useShared();

    const [devicesList, setDevicesList] = useState<DeviceModel[]>([])

    const [isShowStorageChart, setIsShowStorageChart] = useState<boolean>(true);

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
                    setDevicesList(data.result)
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
            if (device_name === "" || device_name === undefined || device_name === 'me') {
                setDeviceSelected(myDevice)
                setNowIsYou(true)
                localStorage.setItem("device_selected_client_id", myDevice.client_id)
                localStorage.setItem("device_selected_uuid", myDevice.id)
                localStorage.setItem("device_selected_name", myDevice.name)
                localStorage.setItem("device_selected_is_me", "true")
            } else {
                const device = devicesList.find((d) => d.id === device_name)
                if (device) {
                    setDeviceSelected(device)
                    setNowIsYou(false)
                    localStorage.setItem("device_selected_client_id", device.client_id)
                    localStorage.setItem("device_selected_uuid", device.id)
                    localStorage.setItem("device_selected_name", device.name)
                    localStorage.setItem("device_selected_is_me", "false")
                }
            }
        }
    }, [device_name]);



    // const handleDeleteUUID = () => {
    //     console.log('remove uuid')
    //     localStorage.removeItem('device_uuid')
    // }

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <div className={`qr-for-share ${!isShowStorageChart ? 'qr-for-share-show' : ''}`}>
                    <span className='tag'>แสกนเพื่อเข้ากลุ่ม</span>
                    <QRCodeSVG value={serverPath} />
                    <h5>{serverPath}</h5>
                </div>
                <div className="sw-view-header-sidebar" onClick={() => setIsShowStorageChart(!isShowStorageChart)} ><img src={upArrowIcon} alt="" style={{
                    transform: isShowStorageChart ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                }} /></div>
                <div className={`storage-chart ${isShowStorageChart ? 'storage-chart-show' : ''}`}>
                    <StorageChart />
                    <h2>{myDevice?.name}</h2>
                </div>
            </div>
            <div className="sidebar-item-list">
                {
                    myDevice && (
                        <Device item={myDevice} active={device_name === 'me' ? true : false} />
                    )
                }
                <hr />
                {
                    devicesList && devicesList.map((device, i) => (
                        <Device key={i} item={device} active={device.id === device_name ? true : false} />
                    ))
                }
            </div>
            <div className="sidebar-bottom">
                <button className="sidebar-bottom-btn" onClick={() => navigate('/settings')}>Settings</button>
                {/* <button onClick={handleDeleteUUID}>Remove UUID</button> */}
                <div className="footer">Local-Share&nbsp;<span className="tag">v1.0.100</span>&nbsp;@2025</div>
            </div>
        </div>
    )
}