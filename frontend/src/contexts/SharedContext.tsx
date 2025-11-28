import React, { createContext, useState, useContext, useEffect, use } from "react";

import DeviceModel from "../model/DeviceModel";
import FileUploadHistoryModel from "../model/FileUploadHistoryModel";

interface SharedContextType {
    fileListWaitUpload: File[] | null | undefined;
    setFileListWaitUpload: (value: File[] | null | undefined) => void;

    uploadFilesHistory: FileUploadHistoryModel[];
    setUploadFilesHistory: React.Dispatch<React.SetStateAction<FileUploadHistoryModel[]>>;

    myDevice: DeviceModel;
    setMyDevice: (value: DeviceModel) => void;

    deviceSelected: DeviceModel | null;
    setDeviceSelected: (value: DeviceModel | null) => void;

    isSelectMultiFile?: boolean;
    setIsSelectMultiFile?: (value: boolean) => void;

    isSelectFile?: boolean;
    setIsSelectFile?: (value: boolean) => void;

    selectedMultiFile: string[];
    setSelectedMultiFile: (value: string[]) => void;

    selectedFile?: string;
    setSelectedFile?: (value: string) => void;

    isLargeView?: boolean;
    setIsLargeView?: (value: boolean) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined)

interface SharedProviderProds {
    children: React.ReactNode
}

export function SharedProvider({ children }: SharedProviderProds) {

    const devMode = true;

    const [myDevice, setMyDevice] = useState<DeviceModel>({ client_id: "", id: "", name: "" })
    const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>({ client_id: "", id: "", name: "" })

    const [fileListWaitUpload, setFileListWaitUpload] = useState<File[] | null>()
    const [uploadFilesHistory, setUploadFilesHistory] = useState<FileUploadHistoryModel[]>([])

    const [isSelectMultiFile, setIsSelectMultiFile] = useState<boolean>(false)
    const [isSelectFile, setIsSelectFile] = useState<boolean>(false)
    const [selectedMultiFile, setSelectedMultiFile] = useState<string[]>([])
    const [selectedFile, setSelectedFile] = useState<string>("")

    const [isLargeView, setIsLargeView] = useState<boolean>(true)

    if (devMode) {

        useEffect(() => {
            console.log("File Wait Upload : ", fileListWaitUpload)
        }, [fileListWaitUpload]);

        useEffect(() => {
            console.log("Selected File : ", isSelectFile)
            console.log("Selected Muti File: ", isSelectMultiFile)
        }, [isSelectFile, isSelectMultiFile]);
    }

    useEffect(() => {
        if(isSelectMultiFile) setIsSelectFile(false);
    }, [isSelectMultiFile, isSelectFile]);

    return (
        <SharedContext.Provider value={{
            myDevice, setMyDevice,
            deviceSelected, setDeviceSelected,
            fileListWaitUpload, setFileListWaitUpload,
            uploadFilesHistory, setUploadFilesHistory,
            isSelectMultiFile, setIsSelectMultiFile,
            isSelectFile, setIsSelectFile,
            selectedMultiFile, setSelectedMultiFile,
            selectedFile, setSelectedFile,
            isLargeView, setIsLargeView

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