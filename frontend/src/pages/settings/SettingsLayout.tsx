import '@/style/settings/settings-layout.css'

type Props = {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: Props) {
    return (
        <div className="body">
            <div className="sidebar">
                <div className="sidebar-header">
                    <h2>Settings</h2>
                </div>
                <div className="sidebar-item-list"></div>
                <div className="sidebar-bottom">
                    Exit Settings
                </div>
            </div>
            <div className="content">
                <div className="content-header">

                </div>
                <div className="content-body">
                    { children }
                </div>
            </div>
        </div>
    )
}