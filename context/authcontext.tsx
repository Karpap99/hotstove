import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { get, save } from "@/services/store";

type LoginType = {
    email: string;
    password: string;
    remember_me?: boolean | undefined;
}

type User = {
    nickname: string,
    email: string,
    profile_picture: string
}

interface ProviderProps {
    user:  User,
    access_token:  string,
    refresh_token:  string,
    isLogged: boolean,
    login (data: User, access_token: string, refresh_token: string): void,
    reg_fstage (data: User, access_token: string, refresh_token: string,): void,
    reg_sstage (data: User): void,
    logout() :void,
}

const AuthContext = createContext<ProviderProps>({
    user: {
        nickname: "",
        email:  "",
        profile_picture:  ""
    },
    access_token: '',
    refresh_token: '',
    isLogged: false,
    login: () => {},
    reg_fstage: ()=> {},
    reg_sstage: ()=> {},
    logout: () => {}
})


const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const [user, setUser ] = useState<User>({
        nickname: "",
        email:  "",
        profile_picture:  ""
    })
    const [ access_token, setAToken ] = useState( get('access_token') || '')
    const [ refresh_token, setRToken ] = useState( get('refresh_token') || '')
    const [isLogged, setIsLogged] = useState<boolean>(access_token != '' ? true : false)
    const router = useRouter()


    const login = (usr:User, access_token: string, refresh_token: string ) => {
        setTimeout(() => {
            setUser(usr)
            setAToken(access_token)
            setRToken(refresh_token)
            save('access_token', access_token)
            save('refresh_token', refresh_token)
            setIsLogged(true)
        }, 1000);
    }

    const reg_fstage = (usr:User,access_token: string, refresh_token: string) => {
        setTimeout(() => {
            setUser(usr)
            setAToken(access_token)
            setRToken(refresh_token)
            save('access_token', access_token)
            save('refresh_token', refresh_token)
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
        setUser({
        nickname: "",
        email:  "",
        profile_picture:  ""
        })
        setAToken('')
        setRToken('')
        save('access_token', "")
        save('refresh_token', "")
        setIsLogged(false)
    }

    return (
        <AuthContext.Provider value={{ user,access_token,refresh_token, isLogged, login, logout, reg_fstage, reg_sstage}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}


