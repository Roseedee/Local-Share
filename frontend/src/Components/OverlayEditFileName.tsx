import { useShared } from '../contexts/SharedContext';
import '../style/components/OverlayEditFileName.css'

export default function OverlayEditFileName() {

    const { setIsEditFileName } = useShared();

    return (
        <div className="overlay-edit-file-name" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-edit-file-name-content">
                <input type="text" name="" id="" value={'test'} />
                <button className="btn-confirm-edit-file-name" onClick={() => setIsEditFileName?.(false)}>
                    {/* <img src={} alt="Close" /> */}
                    Confirm
                </button>
            </div>
        </div>
    )
}