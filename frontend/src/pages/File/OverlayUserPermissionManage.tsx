import { useEffect, useState } from 'react'
import { useShared } from '@/contexts/SharedContext'

import rest from '@/rest/rest'

import permissionCodeToString from '@/util/filePermission'
import UserPermissionModel from '@/model/UserPermissionModel'
import DeviceModel from '@/model/DeviceModel'

import "@/style/components/OverlayUserPermissionManage.css"

export default function OverlayUserPermissionManage() {
    const local_id = localStorage.getItem("device_id") || ""
    const { setIsManageUserPermission, selectedFile } = useShared();

    const [userPermissionList, setUserPermissionList] = useState<UserPermissionModel[]>([]);
    const [deviceList, setDeviceList] = useState<DeviceModel[]>([]);
    const [userName, setUserName] = useState("");
    const [permission, setPermission] = useState("r--");
    const [inputUserNameFocus, setInputUserNameFocus] = useState(false);

    useEffect(() => {
        loadUserPermissionList();
        loadDeviceList();
    }, [])

    const loadUserPermissionList = async () => {
        await rest.getFilePermissionList(selectedFile?.id || "").then((response) => {
            // console.log("User Permission List:", response.result);
            setUserPermissionList(response.result);
        }).catch((error) => {
            console.error("Error fetching user permission list:", error);
        });
    }

    const loadDeviceList = async () => {
        await rest.getAllClient(local_id).then((response) => {
            // console.log("Device List:", response.result);
            setDeviceList(response.result);
        }).catch((error) => {
            console.error("Error fetching device list:", error);
        });
    }

    const handleClickDevice = (device: DeviceModel) => {
        setUserName(device.name);
    }

    const handleAddPermission = () => {
        if (!userName || !selectedFile) return;
        const device = deviceList.find(d => d.name === userName);
        if (!device) {
            console.error("Device not found for user name:", userName);
            return;
        }

        console.log("device id: ", device?.id);
        console.log("image id: ", selectedFile?.id);
        console.log("permission: ", permission);
    }

    return (
        <div className="overlay-fixed" onClick={() => setIsManageUserPermission?.(false)}>
            <div className="overlay-content-user-permission-manage" onClick={(e) => e.stopPropagation()}>
                <h2>จัดการสิทธิ์ผู้ใช้</h2>
                <div className="form-add-user-permission">
                    <input type="text" placeholder="กรอกชื่ออุปกรณ์" value={userName} onChange={(e) => setUserName(e.target.value)} onFocus={() => setInputUserNameFocus(true)} onBlur={() => setInputUserNameFocus(false)} />
                    <select value={permission} onChange={(e) => setPermission(e.target.value)}>
                        <option value="r--">อ่านอย่างเดียว</option>
                        <option value="rw-">อ่านและเขียน</option>
                        <option value="rwx">เจ้าของ</option>
                    </select>
                    <button className="add-permission-btn" onClick={handleAddPermission}>เพิ่มสิทธิ์</button>
                </div>
                {
                    inputUserNameFocus ? (
                        deviceList.length > 0 ? (
                            <ul className='user-permission-list'>
                                {
                                    deviceList.filter(device => device.name.toLowerCase().includes(userName.toLowerCase())).map((device, index) => (
                                        <li key={index} className="user-permission-item" onMouseDown={() => handleClickDevice(device)}>
                                            <p>{index + 1}</p>
                                            <p>{device.name}</p>
                                            <p>{device.id.split('-')[0]+"..."}</p>
                                        </li>
                                    ))
                                }
                            </ul>
                        ) : (<></>)
                    ) : (
                        userPermissionList.length > 0 ? (
                            <ul className="user-permission-list">
                                {userPermissionList.map((permission, index) => (
                                    <li key={index} className="user-permission-item">
                                        <p>{permission.client_name || "ไม่ทราบชื่ออุปกรณ์"}</p>
                                        <p className="tag">
                                            {permissionCodeToString(permission.permission_code || "")}
                                        </p>
                                        <button className="remove-permission-btn" disabled={permission.permission_source === "SCOPE"}>ลบ</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (<></>)
                    )
                }
                <button className="close-overlay-btn" onClick={() => setIsManageUserPermission?.(false)}>ปิด</button>
            </div>
        </div>
    )
}