import React, {createContext, useState, useContext} from "react";

import DeviceModel from "../model/DeviceModel";

interface SharedContextType {

    myDevice: DeviceModel;
    setMyDevice: (value: DeviceModel) => void;

    deviceSelected: DeviceModel;
    setDeviceSelected: (value: DeviceModel) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined)

interface SharedProviderProds {
    children: React.ReactNode
}

export function SharedProvider({ children }: SharedProviderProds) {
    const [myDevice, setMyDevice] = useState<DeviceModel>({id: "", name: ""})
    const [deviceSelected, setDeviceSelected] = useState<DeviceModel>({id: "", name: ""})

    return (
        <SharedContext.Provider value={{
            myDevice, setMyDevice,
            deviceSelected, setDeviceSelected,
            }}>
            { children }
        </SharedContext.Provider>
    )
}

export function useShared() {
    const context = useContext(SharedContext)
    if(!context) throw new Error("useShared must be used inside SharedProvider");
    return context
}