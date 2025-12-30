import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useShared } from '@/contexts/SharedContext'

import '@/style/App.css'
import '@/style/components/file-info.css'

import Layout from '@/layout/Layout'
import FileList from '@pages/FileLise'
import PopUpFilesWaitUpload from '@pages/PopUpFilesWaitUpload'

import rest from '@/rest/rest'
import DeviceModel from '@/model/DeviceModel'
import FileCategory from '@/util/fileCategory'
import fileSize from '@/util/fileSizeCalc'
import { getDateString } from '@/util/dateConvert'

function App() {
  const { id } = useParams<string>()
  const navigator = useNavigate()
  const calledRef = useRef(false);

  const { setMyDevice, setDeviceSelected, selectedFile, isSelectFile, isShowFileInfo } = useShared();
  const [isLoading, setIsLoading] = useState(true);

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
      setIsLoading(false);
    })
  }

  return (
    <Layout>
      {
        isLoading ? <div>Loading...</div> : null
      }
      <FileList />
      {
        isSelectFile && isShowFileInfo && selectedFile ? (
          <div className="file-info-container">
            <div className="file-info-header">
              <h5>{selectedFile?.name}</h5>
            </div>
            <div className="file-info-preview">
              {
                new FileCategory(selectedFile?.type)?.isImage() ? (
                  <img className='image-icon' src={selectedFile?.new_name} alt={selectedFile?.name} />
                ) : (
                  <img className='other-file-icon' src={new FileCategory(selectedFile?.type)?.getIcon()} alt="Can't preview this file" />
                )
                
              }
              <p className='file-type'>{new FileCategory(selectedFile?.type)?.getCategoryName()}</p>
            </div>
            <div className="file-info-meta-data">
              <div className="meta-data-item">
                <p>File Type</p>
                <p>{selectedFile?.type}</p>
              </div>
              <div className="meta-data-item">
                <p>Size</p>
                <p>{fileSize(selectedFile?.size)}</p>
              </div>
              <div className="meta-data-item">
                <p>Uploaded At</p>
                <p>{getDateString(selectedFile?.create_at) || "NULL"}</p>
              </div>
            </div>
          </div>
        ) : null
      }

      <PopUpFilesWaitUpload />
    </Layout>
  )
}

export default App
