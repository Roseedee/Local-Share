import React, { createContext, useState, useContext, useEffect, use } from "react";

import DeviceModel from "../model/DeviceModel";

interface SharedContextType {
    fileListWaitUpload: FileList | null | undefined;
    setFileListWaitUpload: (value: FileList | null | undefined) => void;

    myDevice: DeviceModel;
    setMyDevice: (value: DeviceModel) => void;

    deviceSelected: DeviceModel | null;
    setDeviceSelected: (value: DeviceModel | null) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined)

interface SharedProviderProds {
    children: React.ReactNode
}

export function SharedProvider({ children }: SharedProviderProds) {

    const devMode = true;

    const [myDevice, setMyDevice] = useState<DeviceModel>({client_id: "", id: "", name: "" })
    const [deviceSelected, setDeviceSelected] = useState<DeviceModel | null>({client_id: "", id: "", name: "" })
    const [fileListWaitUpload, setFileListWaitUpload] = useState<FileList | null>()

    if(devMode) {

        useEffect(() => {
            console.log("File Wait Upload : " , fileListWaitUpload)
        }, [fileListWaitUpload])
    }

    return (
        <SharedContext.Provider value={{
            myDevice, setMyDevice,
            deviceSelected, setDeviceSelected,
            fileListWaitUpload, setFileListWaitUpload
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