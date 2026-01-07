import { useParams } from "react-router-dom"

import Layout from "@pages/settings/SettingsLayout"

import '@/style/settings/settings-page.css'

export default function Settings() {
    const { section } = useParams<{ section: string }>()

    return (
        <>
            <Layout>
                <div className="settings-content">
                    <div className="settings-content-item settings-general" style={{ display: section === "general" ? "block" : "none" }}>
                        <h1>Settings - General</h1>

                    </div>

                    <div className="settings-content-item settings-account" style={{ display: section === "account" ? "block" : "none" }}>
                        <h1>Settings - Account</h1>
                    </div>

                </div>
            </Layout>
        </>
    )
}