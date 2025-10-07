import '../../style/components/file.css'

import FileModel from '../../model/FileModel'

interface Props {
    file: FileModel
}

export default function File({ file }: Props) {

    return (
        <>
            <div className="file-item" key={file.id}>
                <img src={file.path} alt="" />
                <h6>{file.name}</h6>
            </div>
        </>
    )
}