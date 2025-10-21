import { useShared } from '../contexts/SharedContext'

import File from '../Components/File'
import '../style/components/file.css'

import imgTest from './../assets/test1.jpg'

export default function FileList() {

    const {text} = useShared();

    return (
        <div className="file-list">
          <h1>{text}</h1>
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
        </div>
    )
}