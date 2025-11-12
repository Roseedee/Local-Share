import React, { createContext, useState, useContext, useEffect } from "react";

import DeviceModel from "../model/DeviceModel";
import FileUploadHistoryModel from "../model/FileUploadHistoryModel";

interface SharedContextType {
    fileListWaitUpload: FileList | null | undefined;
    setFileListWaitUpload: (value: FileList | null | undefined) => void;

    uploadFilesHistory: FileUploadHistoryModel[];
    setUploadFilesHistory: React.Dispatch<React.SetStateAction<FileUploadHistoryModel[]>>;

    myDevice: DeviceModel;
    setMyDevice: (value: DeviceModel) => void;

    deviceSelected: DeviceModel | null;
    setDeviceSelected: (value: DeviceModel | null) => void;

    isSelectMode?: boolean;
    setIsSelectMode?: (value: boolean) => void;

    fileSelected?: string[];
    setFileSelected?: (value: string[]) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined)

interface SharedProviderProds {
    children: React.ReactNode
}

export function SharedProvider({ children }: SharedProviderProds) {

    const devMode = true;

    const [myDevice, setMyDevice] = useState<DeviceModel>({ client_id: "", id: "", name: "" })
    const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>({ client_id: "", id: "", name: "" })

    const [fileListWaitUpload, setFileListWaitUpload] = useState<FileList | null>()
    const [uploadFilesHistory, setUploadFilesHistory] = useState<FileUploadHistoryModel[]>([])

    const [isSelectMode, setIsSelectMode] = useState<boolean>(false)
    const [fileSelected, setFileSelected] = useState<string[]>([])

    if (devMode) {

        useEffect(() => {
            console.log("File Wait Upload : ", fileListWaitUpload)
        }, [fileListWaitUpload])
    }

    return (
        <SharedContext.Provider value={{
            myDevice, setMyDevice,
            deviceSelected, setDeviceSelected,
            fileListWaitUpload, setFileListWaitUpload,
            uploadFilesHistory, setUploadFilesHistory,
            isSelectMode, setIsSelectMode,
            fileSelected, setFileSelected
        }}>
            {children}
        </SharedContext.Provider>
    )
}

export function useShared() {
    const context = useContext(SharedContext)
    if (!context) throw new Error("useShared must be used inside SharedProvider");
    return context
}