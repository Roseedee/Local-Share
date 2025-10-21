import { useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { useShared } from '../contexts/SharedContext'

import '../style/App.css'

import Layout from '../layout/Layout'
import FileList from './FileLise'
// import DeviceModel from '../model/DeviceModel'

import rest from '../rest/rest'

function App() {
  const navigator = useNavigate()
  const calledRef = useRef(false);
  const {setMyDevice} = useShared();

  const local_uuid = localStorage.getItem("device_uuid") || ""
  // const [myDevice, setMyDevice] = useState<DeviceModel>()

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;

    if (local_uuid === "") {
      navigator("/init")
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    rest.auth(local_uuid).then((data) => {
      setMyDevice(data)
      // localStorage.setItem("device_uuid", data.id)
      // rest.getAllClient(local_uuid).then((data) => {
      //   setAllDevice(data.clients)
      // })
    }).catch((err: any) => {
      console.error("Auth Failed: ", err.status, err.message)
    })
  }

  return (
    <Layout>
      <FileList></FileList>
    </Layout>
  )
}

export default App
