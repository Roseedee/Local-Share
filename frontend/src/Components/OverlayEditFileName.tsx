import { useEffect, useRef, useState } from 'react';
import { useShared } from '@/contexts/SharedContext';
import rest from '@/rest/rest';
import '@/style/components/OverlayEditFileName.css'

export default function OverlayEditFileName() {

    const { setIsEditFileName, selectedFile } = useShared();
    const [newFileName, setNewFileName] = useState<string>(selectedFile?.name?.split(".")[0] || "");
    const inputNameRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        inputNameRef.current?.focus();
    }, []);

    const handleRename = async () => {
        if (!selectedFile) return;
        try {
            await rest.renameFile(selectedFile.id || "", newFileName, selectedFile.name?.split(".")[1] || "");
            setIsEditFileName?.(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="overlay-edit-file-name" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-edit-file-name-content">
                <input type="text" name="" id="" ref={inputNameRef} value={newFileName} onChange={(e) => setNewFileName(e.target.value)} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleRename();
                    }
                }} />
                <button className="btn-confirm-edit-file-name" onClick={() => handleRename()}>
                    {/* <img src={} alt="Close" /> */}
                    Confirm
                </button>
            </div>
        </div>
    )
}