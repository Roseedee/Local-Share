import { useState, useEffect as useffect } from 'react'
import "../style/Init.css"

export default function Init() {
    const [uuid, setUuid] = useState<string>(() => {
        return localStorage.getItem('device_uuid') || ''
    })

    return (
        <>
            <div className="init-body">
                <div className="init-container">
                    <div className="input-group">
                        <div className="uuid-container row-container">
                            <h3>UUID</h3>
                            <input type="text" name="" id="" value={uuid.split("-")[0] + "..."} disabled />
                        </div>
                        <div className="name-container row-container">
                            <h3>Device Name</h3>
                            <input type="text" name="" id="" placeholder='Enter computer name'/>
                        </div>

                    </div>
                <button>Confirm</button>
                </div>
            </div>
        </>
    )
}