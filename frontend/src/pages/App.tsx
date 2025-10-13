import { useEffect, useRef } from 'react'

import '../style/App.css'
import '../style/components/file.css'

import Layout from './layout/Layout'
import File from './Components/File'

import imgTest from './../assets/test1.jpg'

function App() {

  const calledRef = useRef(false);


  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;


  }, []);

  return (
    <Layout>
        {/* <div className="file-not-found">
            <h2 className='water-mark'>ลากไฟล์มาวางเพื่ออัพโหลด หรือ กดเพื่ออัพโหลดไฟล์</h2>
          </div> */}
        <div className="file-list">
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={100} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} isUpload progressNow={50} />
          <File file={{ id: "0", name: "Test", path: imgTest, size: 10 }} />
        </div>
    </Layout>

  )
}

export default App
