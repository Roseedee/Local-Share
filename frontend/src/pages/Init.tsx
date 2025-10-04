import { useEffect, useRef, useState } from 'react'
import "../style/Init.css"
import rest from '../rest/rest';

export default function Init() {
    const calledRef = useRef(false);
    const [uuid, setUuid] = useState<string | null>()

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;
        const local_uuid = localStorage.getItem('device_uuid') || ""
        // console.log(local_uuid)
        if (local_uuid === '') {
            // console.log('generate new UUID')
            rest.generateNewUUID().then((data) => {
                localStorage.setItem('device_uuid', data.uuid)
                setUuid(data.uuid)
            });
            return;
        }
        setUuid(local_uuid)
    }, [])

    return (
        <>
            <div className="init-body">
                <div className="init-container">
                    <div className="input-group">
                        <div className="uuid-container row-container">
                            <h3>UUID</h3>
                            <input type="text" name="" id="" value={uuid?.split("-")[0] + "..."} disabled />
                        </div>
                        <div className="name-container row-container">
                            <h3>Device Name</h3>
                            <input type="text" name="" id="" placeholder='Enter computer name' />
                        </div>

                    </div>
                    <button>Confirm</button>
                </div>
            </div>
        </>
    )
}