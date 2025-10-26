import { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShared } from '../contexts/SharedContext'

import '../style/App.css'

import Layout from '../layout/Layout'
import FileList from './FileLise'
import PopUpFilesWaitUpload from './PopUpFilesWaitUpload'

import rest from '../rest/rest'

function App() {
  const { id } = useParams<string>()
  const navigator = useNavigate()
  const calledRef = useRef(false);

  const { setMyDevice, setDeviceSelected } = useShared();

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
        id: localStorage.getItem("device_selected_uuid") || "",
        name: localStorage.getItem("device_selected_name") || ""
      })
    }

    loadData();
  }, []);

  const loadData = async () => {
    rest.auth(local_uuid).then((data) => {
      setMyDevice(data)
    }).catch((err: any) => {
      console.error("Auth Failed: ", err.status, err.message)
    })
  }

  return (
    <Layout>
      <FileList />
      <PopUpFilesWaitUpload/>
    </Layout>
  )
}

export default App
