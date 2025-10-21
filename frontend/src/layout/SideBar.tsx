import { useState, useRef, useEffect } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useParams } from "react-router-dom"
import { useShared } from "../contexts/SharedContext"

import rest from '../rest/rest'
import DeviceModel from '../model/DeviceModel'

import Device from '../Components/Device'

import '../style/layout.css'

type Props = {
    local_uuid: string
    myDevice: DeviceModel | undefined
    devicesList: DeviceModel[] | undefined
}

export default function SideBar({ local_uuid, myDevice, devicesList }: Props) {
    const { id } = useParams<string>()
    const calledRef = useRef(false);

    const [serverPath, setServerPath] = useState<string>("can't connect to server")

    const { setDeviceSelected } = useShared();
    // const [myDevice, setMyDevice] = useState<DeviceModel | null>(null)
    // const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>(null)
    // const [devicesList, setDevicesList] = useState<DeviceModel[]>([])

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
                    // console.log(data.url)
                })
                // rest.auth(local_uuid).then((data) => {
                //     setMyDevice(data)
                // })
                // rest.getAllClient(local_uuid).then((data) => {
                //     setDevicesList(data.clients)
                //     // console.log(data.clients)
                // })
            }
        })
    }

    useEffect(() => {
        if (devicesList) {
            // const temp_myDevice = devicesList.find((item) => item.id === local_uuid);
            const index_myUuid = devicesList.findIndex(item => item.id === local_uuid);
            if (index_myUuid !== -1) {
                devicesList.splice(index_myUuid, 1); // ลบออกจาก array เดิม
            }
            // console.log(temp_myDevice)
            // if (temp_myDevice) setMyDevice(temp_myDevice);
        }
    }, [devicesList])

    useEffect(() => {
        // console.log("ID:", id);
        if (myDevice && devicesList) {
            if (id === "" || id === undefined) {
                setDeviceSelected(myDevice)
                // localStorage.setItem("device_selected_uuid", myDevice.id)
                // localStorage.setItem("device_selected_name", myDevice.name)
            } else {
                const device = devicesList.find((d) => d.id === id)
                if (device) {
                    setDeviceSelected(device)
                    // localStorage.setItem("device_selected_uuid", device.id)
                    // localStorage.setItem("device_selected_name", device.name)
                }
            }
        }
    }, [id]);



    const handleDeleteUUID = () => {
        console.log('remove uuid')
        localStorage.removeItem('device_uuid')
    }

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
                <button onClick={handleDeleteUUID}>Remove UUID</button>
            </div>
        </div>
    )
}