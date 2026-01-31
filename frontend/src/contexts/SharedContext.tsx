import React, { createContext, useState, useContext, useEffect } from "react";

import DeviceModel from "../model/DeviceModel";
import FileModel, { FileUploadHistoryModel } from "../model/FileModel";

interface SharedContextType {
    fileListWaitUpload: File[] | null | undefined;
    setFileListWaitUpload: (value: File[] | null | undefined) => void;

    uploadFilesHistory: FileUploadHistoryModel[];
    setUploadFilesHistory: React.Dispatch<React.SetStateAction<FileUploadHistoryModel[]>>;

    myDevice: DeviceModel;
    setMyDevice: (value: DeviceModel) => void;

    nowIsYou: boolean;
    setNowIsYou: (value: boolean) => void;

    deviceSelected: DeviceModel | null;
    setDeviceSelected: (value: DeviceModel | null) => void;

    isFileListLoading?: boolean;
    setIsFileListLoading?: (value: boolean) => void;

    isSelectMultiFile?: boolean;
    setIsSelectMultiFile?: (value: boolean) => void;

    isSelectFile?: boolean;
    setIsSelectFile?: (value: boolean) => void;

    selectedMultiFile: string[];
    setSelectedMultiFile: (value: string[]) => void;

    selectedFile?: FileModel | null;
    setSelectedFile?: (value: FileModel | null) => void;

    isLargeView?: boolean;
    setIsLargeView?: (value: boolean) => void;

    fileDeleting?: boolean;
    setFileDeleting?: (value: boolean) => void;

    fileSearch?: string;
    setFileSearch?: (value: string) => void;

    isEditFileName?: boolean;
    setIsEditFileName?: (value: boolean) => void;

    isShowFileInfo?: boolean;
    setIsShowFileInfo?: (value: boolean) => void;

    sumFileSize?: number;
    setSumFileSize?: (value: number) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined)

interface SharedProviderProds {
    children: React.ReactNode
}

export function SharedProvider({ children }: SharedProviderProds) {
    
    const devMode = true;

    const [myDevice, setMyDevice] = useState<DeviceModel>({ client_id: "", id: "", name: "" })
    const [nowIsYou, setNowIsYou] = useState<boolean>(true);

    const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>({ client_id: "", id: "", name: "" })

    const [isFileListLoading, setIsFileListLoading] = useState<boolean>(false);

    const [fileListWaitUpload, setFileListWaitUpload] = useState<File[] | null>()
    const [uploadFilesHistory, setUploadFilesHistory] = useState<FileUploadHistoryModel[]>([])

    const [isSelectMultiFile, setIsSelectMultiFile] = useState<boolean>(false)
    const [isSelectFile, setIsSelectFile] = useState<boolean>(false)
    const [selectedMultiFile, setSelectedMultiFile] = useState<string[]>([])
    const [selectedFile, setSelectedFile] = useState<FileModel | null>(null)

    const [isLargeView, setIsLargeView] = useState<boolean>(true)

    const [fileDeleting, setFileDeleting] = useState<boolean>(false)

    const [fileSearch, setFileSearch] = useState<string>("")

    const [isEditFileName, setIsEditFileName] = useState<boolean>(false);

    const [isShowFileInfo, setIsShowFileInfo] = useState<boolean>(false);

    const [sumFileSize, setSumFileSize] = useState<number>(0);

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
        if (isSelectMultiFile) setIsSelectFile(false);
    }, [isSelectMultiFile, isSelectFile]);

    useEffect(() => {
        setMyDevice(prev => ({
            ...prev,
            client_id: localStorage.getItem("device_id") || '',
            id: localStorage.getItem("device_uuid") || "",
            name: localStorage.getItem("device_name") || "",
        }));
    }, []);

    useEffect(() => {
        const isMe = localStorage.getItem("device_selected_is_me");
        if (isMe === "true") {
            setNowIsYou(true);
        } else {
            setNowIsYou(false);
        }
    }, []);

    return (
        <SharedContext.Provider value={{
            myDevice, setMyDevice,
            nowIsYou, setNowIsYou,
            deviceSelected, setDeviceSelected,
            isFileListLoading, setIsFileListLoading,
            fileListWaitUpload, setFileListWaitUpload,
            uploadFilesHistory, setUploadFilesHistory,
            isSelectMultiFile, setIsSelectMultiFile,
            isSelectFile, setIsSelectFile,
            selectedMultiFile, setSelectedMultiFile,
            selectedFile, setSelectedFile,
            isLargeView, setIsLargeView,
            fileDeleting, setFileDeleting,
            fileSearch, setFileSearch,
            isEditFileName, setIsEditFileName,
            isShowFileInfo, setIsShowFileInfo,
            sumFileSize, setSumFileSize
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