import { useEffect, useState } from 'react'

import DeviceModel from '../../model/DeviceModel'

import editIcon from '../../assets/edit.png'
import synsIcon from '../../assets/sync.png'
import fileUploadIcon from '../../assets/up-loading.png'
import selectIcon from '../../assets/select.png'
import { useParams } from 'react-router-dom'


type Props = {
    myDevice: DeviceModel | undefined
}


export default function Header({myDevice}: Props) {

    const { id } = useParams<string>()

    const [deviceSelected, setDeviceSelected] = useState<DeviceModel>()

    useEffect(() => {
        // console.log(deviceSelected)
        setDeviceSelected(() => {
            return {
                id: localStorage.getItem('device_selected_uuid') || "",
                name: localStorage.getItem('device_selected_name') || ""
            }
        })
    }, [id])

    return (
        <div className="content-header">
            <div className="computer-name">
                <h4>{deviceSelected === null ? myDevice?.name : deviceSelected?.name}{id === undefined ? '(You)' : ''}</h4>
                {/* <h4>{deviceSelected?.name}</h4> */}
                <img src={editIcon} alt="" className='content-header-icon' />
            </div>
            <div className='tools-group'>
                <div className="tool-icon">
                    <img src={fileUploadIcon} alt="" className='content-header-icon' />
                </div>
                <div className="tool-icon">
                    <img src={selectIcon} alt="" className='content-header-icon' />
                </div>
                <div className="tool-icon">
                    <img src={synsIcon} alt="" className='content-header-icon' />
                </div>
            </div>
        </div>
    )
}