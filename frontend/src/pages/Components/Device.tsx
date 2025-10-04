import { useNavigate } from "react-router-dom";
import "../../style/components/Device.css"

import DeviceModel from '../../model/DeviceModel';

import computerIcon from '../../assets/computer.png';

interface Props {
    item: DeviceModel;
    active?: boolean;
}
export default function Device({item, active = false}: Props) {

    const navigate = useNavigate()

    const handleClick = () => {
        const uuid = localStorage.getItem("device_uuid")
        if (item.id === uuid) {
            navigate(`/`)
            return
        }
        navigate(`/${item.id}`)
    }

    return (
        <div className={"device " + (active ? "active" : "")} onClick={handleClick}>
            <img src={computerIcon} alt="" />
            <div className="device-detail">
                <h5>{item?.name}</h5>
                <span className='tag'>{item?.id.split('-')[0]+"..."}</span>
                {/* <span className='tag'>{item?.id}</span> */}
            </div>
            <div className="btn-verify">
                {/* <button>Verify</button> */}
            </div>
        </div>
    )
}