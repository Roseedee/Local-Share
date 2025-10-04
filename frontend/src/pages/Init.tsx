import { useEffect, useRef, useState } from 'react'
import rest from '../rest/rest';
import { useNavigate } from 'react-router-dom';

import "../style/Init.css"


export default function Init() {
    const navigator = useNavigate()

    const calledRef = useRef(false);
    const [uuid, setUuid] = useState<string>(() => {
        return localStorage.getItem('device_uuid') || ""
    })
    const [name, setName] = useState<string>('')

    useEffect(() => {
        if (calledRef.current) return;
        calledRef.current = true;
        // console.log(local_uuid)
        if (uuid === '') {
            // console.log('generate new UUID')
            rest.generateNewUUID().then((data) => {
                localStorage.setItem('device_uuid', data.uuid)
                setUuid(data.uuid)
            });
            return;
        }
    }, [])

    const handleClickConfirm = () => {
        console.log('click confirm')
        rest.verifyUUID(uuid, name).then((data) => {
            if(data.status === 'ok') {
                navigator('/')
                return;
            }
        }).catch((err) => {
            window.alert('Device verification failed, Try again!!')
            console.log('Device verification failed : ', err)
        })
    }

    return (
        <>
            <div className="init-body">
                <div className="init-container">
                    <div className="input-group">
                        <div className="uuid-container row-container">
                            <h3>UUID</h3>
                            <input type="text" name="" id="" value={uuid?.split("-")[0] + "..."} disabled required />
                        </div>
                        <div className="name-container row-container">
                            <h3>Device Name</h3>
                            <input type="text" id="" placeholder='Enter computer name' value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                    </div>
                    <input type='submit' onClick={handleClickConfirm} value="Confirm" />
                </div>
            </div>
        </>
    )
}