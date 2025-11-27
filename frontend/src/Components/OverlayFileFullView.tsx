import FileCategory from '../util/fileCategory';

import '../style/components/OverlayFileFullView.css'

import leftArrowIcon from "../assets/left-arrow-white.png"
import rightArrowIcon from "../assets/right-arrow-white.png"



export interface OverlayFileFullViewModel {
  fileId: string;
  filePath: string;
  fileType?: string;
}

type Props = {
  file?: OverlayFileFullViewModel
  onClick?: () => void
  onPrev?: () => void
  onNext?: () => void
}

export default function OverlayFileFullView({ file, onClick, onPrev, onNext }: Props) {

  const categories = new FileCategory(file?.fileType);

  return (
    <div className="overlay-fixed">
      <div className="overlay-content">
        <div className="btn-overlay btn-prev" onClick={onPrev}><img src={leftArrowIcon} alt="" /></div>
        <div className="overlay-img-index-content" onClick={(e) => {
          e.stopPropagation();
          onClick && onClick()
        }}>
          {
            categories.isImage() ? (
              <img className='overlay-img-index' src={file?.filePath} alt="" />
            ) : categories.isVideo() ? (
              <video className='overlay-video-index' controls> 
                <source src={file?.filePath} type={file?.fileType} />
              </video>
            ) : categories.isAudio() ? (
              <audio className='overlay-audio-index' controls>
                <source src={file?.filePath} type={file?.fileType} />
              </audio>
            ) : (
              <div className='overlay-other-file'>
                <p>Cannot preview this file type.</p>
                <a href={file?.filePath} download>Download File</a>
              </div>
            )
          }
        </div>
        <div className="btn-overlay btn-next" onClick={onNext}><img src={rightArrowIcon} alt="" /></div>
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