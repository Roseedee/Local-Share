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
                setUuid(data.uuid)
            }).catch((err) => {
                console.error('Generate UUID failed: ', err)
                navigator('/error/network')
            })
            return;
        }else {
            navigator('/')
        }
    }, [])
    
    const handleClickConfirm = () => {
        console.log('click confirm')
        rest.verifyUUID(uuid, name).then((data) => {
            if(data.status === 'ok') {
                // console.log('client id: ', data.client_id)
                localStorage.setItem('device_id', data.client_id)
                localStorage.setItem('device_uuid', uuid)
                localStorage.setItem('device_name', name)
                navigator('/')
                return;
            }else if(data.status === 'bad') {
                window.alert('Device verification failed, Try again!!')
            }
        }).catch(() => {
            window.alert('Device verification failed, Try again!!')
            // console.log('Device verification failed : ', err)
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