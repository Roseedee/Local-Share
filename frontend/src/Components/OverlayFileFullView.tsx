import '../style/components/OverlayFileFullView.css'

import leftArrowIcon from "../assets/left-arrow-white.png"
import rightArrowIcon from "../assets/right-arrow-white.png"



export interface OverlayFileFullViewModel {
  fileId: string;
  filePath: string;
}

type Props = {
  file?: OverlayFileFullViewModel
  onClick?: () => void
}

export default function OverlayFileFullView({ file, onClick }: Props) {

  return (
    <div className="overlay-fixed">
      <div className="overlay-content">
        <div className="btn-overlay btn-prev"><img src={leftArrowIcon} alt="" /></div>
        <div className="overlay-img-index-content" onClick={(e) => {
          e.stopPropagation();
          onClick && onClick()
        }}>
          <img className='overlay-img-index' src={file?.filePath} alt="" />
        </div>
        <div className="btn-overlay btn-next"><img src={rightArrowIcon} alt="" /></div>
      </div>
      {/* <div className="overlay-img-list">
          {files
            .filter(item => item.file_type.startsWith("image/"))
            .map((file, i) => (
              <div className={`overlay-img-list-item`} key={i}>
                <img
                  className=""
                  src={rest.fileUrl(file.file_path)}
                  alt=""
                />
              </div>
            ))}
        </div> */}
    </div>
  )
}