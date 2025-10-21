import React, {createContext, useState, useContext} from "react";

interface SharedContextType {
    text: string;
    setText: (value: string) => void;
}

const SharedContext = createContext<SharedContextType | undefined>(undefined)

interface SharedProviderProds {
    children: React.ReactNode
}

export function SharedProvider({ children }: SharedProviderProds) {
    const [text, setText] = useState<string>("")


    return (
        <SharedContext.Provider value={{text, setText}}>
            { children }
        </SharedContext.Provider>
    )
}

export function useShared() {
    const context = useContext(SharedContext)
    if(!context) throw new Error("useShared must be used inside SharedProvider");
    return context
}