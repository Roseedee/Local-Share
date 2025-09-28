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
        navigate(`/${item.id}`)
    }

    return (
        <div className={"device " + (active ? "active" : "")} onClick={handleClick}>
            <img src={computerIcon} alt="" />
            <div className="device-detail">
                <h5>{item?.name}</h5>
                <span className='tag'>{item?.ip}</span>
            </div>
        </div>
    )
}