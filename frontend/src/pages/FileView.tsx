import { useEffect } from "react"
import { useParams } from "react-router-dom"

function FileView() {

    const { id } = useParams()

    useEffect(() => {
    }, [])


    return (
        <>
            <div className="header">
                <h3>File List({id})</h3>
            </div>
        </>
    )
}

export default FileView