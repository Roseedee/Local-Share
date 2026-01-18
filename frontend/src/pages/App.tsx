import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShared } from '@/contexts/SharedContext'

import '@/style/App.css'

import rest from '@/rest/rest'
import DeviceModel from '@/model/DeviceModel'

function App() {
  const { id } = useParams<string>()
  const navigator = useNavigate()
  const calledRef = useRef(false);

  const { setMyDevice, setDeviceSelected} = useShared();
  // const [isLoading, setIsLoading] = useState(true);

  const local_uuid = localStorage.getItem("device_uuid") || ""
  // const [myDevice, setMyDevice] = useState<DeviceModel>()

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (local_uuid === "") {
      navigator("/init")
      return;
    }

    if (id) {
      // console.log(id)
      setDeviceSelected({
        client_id: localStorage.getItem("device_selected_client_id") || "",
        id: localStorage.getItem("device_selected_uuid") || "",
        name: localStorage.getItem("device_selected_name") || ""
      })
    }

    loadData();
  }, []);

  const loadData = async () => {
    rest.auth(local_uuid).then((data: DeviceModel) => {
      setMyDevice(data)
      // setIsLoading(false);
    }).catch((err: any) => {
      console.error("Auth Failed: ", err.status, err.message);
      if (err.status === 404) {
        localStorage.removeItem("device_uuid")
        localStorage.removeItem("device_id")
        localStorage.removeItem("device_name")
        navigator("/init")
        return;
      } else if (err.status === "NETWORK_ERROR") {
        navigator("/error/network")
        return;
      }
    }).finally(() => {
      // setIsLoading(false);
      navigator('/file/me')
    })
  }

  return (<></>);
}

export default App
