import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { get, save } from "@/services/store";
import { apiPrivate } from "@/common/api/api";
import { reg_response } from "@/components/types";

type User = {
    id: string,
    nickname: string,
    email: string,
    profile_picture: string,
    age: string,
    description: string
}

type Tokens = {
    access_token: string,
    refresh_token: string
}

interface ProviderProps {
    user:  User,
    tokens: Tokens,
    isLogged: boolean,
    login (data: User, access_token: string, refresh_token: string): void,
    reg_fstage (access_token: string, refresh_token: string): void,
    reg_sstage (data: User): void,
    logout() :void,
}



const AuthContext = createContext<ProviderProps>({
    user: {
        id: "",
        nickname: "",
        email:  "",
        profile_picture:  "",
        age: "",
        description: ""
    },
    tokens: {
        access_token: "",
        refresh_token: ""
    },
    isLogged: false,
    login: () => {},
    reg_fstage: ()=> {},
    reg_sstage: ()=> {},
    logout: () => {}
})

const cleanUser = {
        id: "",
        nickname: "",
        email:  "",
        profile_picture:  "",
        age: "",
        description: ""
    }


const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser] = useState<User>(cleanUser)
    const [tokens, setTokens] = useState<Tokens>({access_token: get('access_token') || '', refresh_token: get('refresh_token') || '' } )
    const [isLogged, setIsLogged] = useState<boolean>(tokens.access_token != '' ? true : false)
    const router = useRouter()

    const refresh = async () => {
        const result = await apiPrivate.get('/auth/reauth')
        if(result) login(result.data.result, result.data.access, result.data.refresh)
        else logout()
    }

    useEffect(()=>{if(tokens.refresh_token != undefined) refresh()}, [])

    const saveToken = async (token: string, type: "access_token" | "refresh_token") => {
        if(type == 'access_token') setTokens({...tokens, access_token: token })
        else setTokens({...tokens, refresh_token: token })
        await save(type, token)
    }

    const login = async (usr:User, access_token: string, refresh_token: string ) => {
        setTimeout(() => {
            setUser(usr)
            setIsLogged(true)
        }, 1000);
    }

    const reg_fstage = (access_token: string, refresh_token: string) => {
        setTimeout(() => 
        {
            saveToken(access_token, 'access_token')
            saveToken(refresh_token, 'refresh_token')
            router.navigate('/(app)/(auth)/account_setup')
        }, 1000);
    }
    
    const reg_sstage = (usr:User) => {
        setTimeout(() => {
            setUser(usr)
            setIsLogged(true)
        }, 1000);
    }

    const logout = () => {
        setUser(cleanUser)
        saveToken("", 'access_token')
        saveToken("", 'refresh_token')
        setIsLogged(false)
    }

    return (
        <AuthContext.Provider value={{ user, tokens, isLogged, login, logout, reg_fstage, reg_sstage}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}


