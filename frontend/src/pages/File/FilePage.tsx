import Layout from '@/layout/Layout'
import FileList from './FileLise'
import FileInfo from '@/Components/FileInfo'
import PopUpFilesWaitUpload from '../PopUpFilesWaitUpload'

export default function FilePage() {
    
    return (
        <Layout>
            <FileList />
            <FileInfo />
            <PopUpFilesWaitUpload />
        </Layout>
    )
}