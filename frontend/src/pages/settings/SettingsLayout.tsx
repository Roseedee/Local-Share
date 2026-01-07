import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import '@/style/settings/settings-layout.css'

type Props = {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {

    const navigate = useNavigate()
    const { section } = useParams<{ section: string }>()

    useEffect(() => {
        if (!section) {
            navigate('/settings/general')
        }
    }, [section])

    const handleSidebarItemClick = (section: string) => {
        navigate(`/settings/${section}`)
    }

    return (
        <div className="body">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Settings</h2>
                </div>
                <div className="sidebar-item-list">
                    <div className={section === "general" ? "sidebar-setting-item active" : "sidebar-setting-item"} onClick={() => handleSidebarItemClick("general")}>ตั้งค่าทั่วไป</div>
                    <div className={section === "account" ? "sidebar-setting-item active" : "sidebar-setting-item"} onClick={() => handleSidebarItemClick("account")}>ตั้งค่าบัญชี</div>
                    <div className={section === "storage" ? "sidebar-setting-item active" : "sidebar-setting-item"} onClick={() => handleSidebarItemClick("storage")}>จัดการพื้นที่จัดเก็บข้อมูล</div>
                    <div className={section === "access" ? "sidebar-setting-item active" : "sidebar-setting-item"} onClick={() => handleSidebarItemClick("access")}>การเข้าถึง</div>
                    <div className={section === "security" ? "sidebar-setting-item active" : "sidebar-setting-item"} onClick={() => handleSidebarItemClick("security")}>ความปลอดภัย</div>
                    <div className={section === "download" ? "sidebar-setting-item active" : "sidebar-setting-item"} onClick={() => handleSidebarItemClick("download")}>การดาวน์โหลด</div>
                </div>
                <div className="sidebar-bottom">
                    <button className="sidebar-bottom-btn" onClick={() => navigate('/')}>Back</button>
                    <div className="footer">Local-Share&nbsp;<span className="tag">v1.0.100</span>&nbsp;@2025</div>
                </div>
            </div>
            <div className="content">
                {/* <div className="content-header">

                </div> */}
                <div className="content-body">
                    { children }
                </div>
            </div>
        </div>
    )
}