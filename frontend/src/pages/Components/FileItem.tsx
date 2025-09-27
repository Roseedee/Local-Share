import { useState } from 'react';

import delIcon from '../../assets/close-white.png'


interface ImageData {
    src: string;
}


export default function FileItem({ src }: ImageData) {
    const [isFullView, setIsFullView] = useState(false)

    return (
        <>
            <div className="file-item" onClick={() => setIsFullView(true)}>
                <div className="del-btn" onClick={(e) =>  { setIsFullView(false); e.stopPropagation(); } }>
                    <img src={delIcon} alt="" />
                </div>
                <img className='image' src={src} alt="" />
                <span>{src.split('/')[3]}</span>
            </div>

            {
                isFullView && (
                    <div className="image-full-view" onClick={() => setIsFullView(false)}>
                        <div className="close-btn" onClick={() => setIsFullView(false)}>
                            <img src={delIcon} alt="" />
                        </div>
                        <img src={src} alt="" onClick={(e) => e.stopPropagation()} />
                    </div>
                )
            }

        </>


    )
}