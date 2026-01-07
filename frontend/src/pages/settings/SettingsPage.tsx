import { useParams } from "react-router-dom"

import Layout from "@pages/settings/SettingsLayout"

import '@/style/settings/settings-page.css'

export default function Settings() {
    const { section } = useParams<{ section: string }>()

    return (
        <>
            <Layout>
                <div className="settings-content">
                    <div className="settings-content-section settings-general" style={{ display: section === "general" ? "flex" : "none" }}>
                        <h2>ตั้งค่าทั่วไป</h2>
                        {/* <div className="settings-item">
                            <h3>ธีมของเว็บ</h3>
                            <select name="theme" id="theme-select">
                                <option value="auto">System</option>
                                <option value="light">Light</option>
                                <option value="dark">Dark</option>
                            </select>
                        </div> */}
                    </div>
                    <div className="settings-content-section settings-account" style={{ display: section === "account" ? "flex" : "none" }}>
                        <h2>ตั้งค่าบัญชี</h2>
                        <div className="setting-item">
                            <div className="setting-item-header">
                                <h3>ตั้งค่าการเข้าสู่ระบบ {'(แนะนำ)'}</h3>
                                <span className="tag">ตั้งชื่อผู้ใช้และรหัสผ่านเพื่อที่จะสามารถล็อกอินได้ในครั้งหน้า <span className="tag-warning-bold">!!!ในกรณีที่ล้างเครื่องหรือย้ายเครื่อง</span></span>
                            </div>
                            <div className="setting-item-body">
                                <div className="input-group">
                                    <input type="text" id="username" placeholder="" required />
                                    <label>Username</label>
                                </div>
                                <div className="input-group">
                                    <input type="text" id="username" placeholder="" required />
                                    <label>Password</label>
                                </div>
                                <button className="setting-btn-save">บันทึกการตั้งค่า</button>
                            </div>
                        </div>
                    </div>
                    <div className="settings-content-section settings-storage" style={{ display: section === "storage" ? "flex" : "none" }}>
                        <h2>จัดการพื้นที่จัดเก็บข้อมูล</h2>
                    </div>
                    <div className="settings-content-section settings-access" style={{ display: section === "access" ? "flex" : "none" }}>
                        <h2>การเข้าถึง</h2>
                    </div>
                    <div className="settings-content-section settings-security" style={{ display: section === "security" ? "flex" : "none" }}>
                        <h2>ความปลอดภัย</h2>
                    </div>
                    <div className="settings-content-section settings-download" style={{ display: section === "download" ? "flex" : "none" }}>
                        <h2>การดาวน์โหลด</h2>
                    </div>
                </div>
            </Layout>
        </>
    )
}