import { useState } from 'react'
import { useShared } from '@/contexts/SharedContext'

import "@/style/components/OverlayUserPermissionManage.css"

export default function OverlayUserPermissionManage() {
    const { setIsManageUserPermission } = useShared();

    const [userName, setUserName] = useState("");

    return (
        <div className="overlay-fixed" onClick={() => setIsManageUserPermission?.(false)}>
            <div className="overlay-content-user-permission-manage" onClick={(e) => e.stopPropagation()}>
                <h2>จัดการสิทธิ์ผู้ใช้</h2>
                <div className="form-add-user-permission">
                    <input type="text" placeholder="กรอกชื่ออุปกรณ์" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <select>
                        <option value="r--">อ่านอย่างเดียว</option>
                        <option value="rw-">อ่านและเขียน</option>
                        <option value="rwx">เจ้าของ</option>
                    </select>
                    <button className="add-permission-btn">เพิ่มสิทธิ์</button>
                </div>
                {
                    userName ? (
                        <ul className='user-permission-list'>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                            </li>
                        </ul>
                    ) : (

                        <ul className="user-permission-list">
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn" disabled>ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn" disabled>ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn" disabled>ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                            <li className="user-permission-item">
                                <p>ผู้ใช้ A</p>
                                <p className="tag">อ่านอย่างเดียว<button className="remove-permission-btn">ลบ</button></p>
                            </li>
                        </ul>
                    )
                }
                <button className="close-overlay-btn" onClick={() => setIsManageUserPermission?.(false)}>ปิด</button>
            </div>
        </div>
    )
}