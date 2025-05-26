import { createContext, useContext, useState } from "react";

interface ProviderProps {
    modal:  boolean,
    switchModal() : void
}

const AppContext = createContext<ProviderProps>({
    modal: false,
    switchModal: () => {}
})


const AppProvider = ({ children }: { children: React.ReactNode}) => {
    const [ modal, setModal ] = useState(false)
    
    const switchModal = () => {setModal(!modal)}

    return (
        <AppContext.Provider value={{modal, switchModal}}>
            { children }
        </AppContext.Provider>
    )
}

export default AppProvider

export const useApp = () => {
    return useContext(AppContext)
}


