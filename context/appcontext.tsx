import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { get, save } from "@/services/store";
import { apiPrivate } from "@/common/api/api";

type User = {
    nickname: string,
    email: string,
    profile_picture: string,
    age: string,
    description: string
}

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
    
    const switchModal = () => {setModal(!modal), console.log(`modalstate ${modal}`)}

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


