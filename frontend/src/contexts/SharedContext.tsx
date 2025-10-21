import React, {createContext, useState, useContext} from "react";

import DeviceModel from "../model/DeviceModel";

interface SharedContextType {
    text: string;
    setText: (value: string) => void;

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
    const [text, setText] = useState<string>("")
    const [myDevice, setMyDevice] = useState<DeviceModel>({id: "", name: ""})
    const [deviceSelected, setDeviceSelected] = useState<DeviceModel>({id: "", name: ""})

    return (
        <SharedContext.Provider value={{
            text, setText,
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