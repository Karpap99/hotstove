import { apiPrivate } from "@/common/api/api";
import { useRoutes } from "@/hooks/useRouter";
import { get, save } from "@/services/store";
import { Tokens, User, UserData, Response } from "@/types/authorization";
import { createContext, useContext, useEffect, useState } from "react";


interface ProviderProps {
    user:  User,
    userData: UserData,
    tokens: Tokens,
    isLogged: boolean,
    isLoaded: boolean,
    login (response: Response): void,
    reg_fstage (response: Response): void,
    reg_sstage (data: User): void,
    logout() :void,
}


const AuthContext = createContext<ProviderProps>({
    user: {
        id: "",
        nickname: "",
        email:  "",
    },
    userData: {
        profile_picture: "",
        age: "",
        description: ""
    },
    tokens: {
        access_token: "",
        refresh_token: ""
    },
    isLogged: false,
    isLoaded: false,
    login: () => {},
    reg_fstage: ()=> {},
    reg_sstage: ()=> {},
    logout: () => {}
})

const cleanUser = {
        id: "",
        nickname: "",
        email:  ""

}

const cleanUserData = {
        profile_picture:  "",
        age: "",
        description: ""
}


const AuthProvider = ({ children }: { children: React.ReactNode}) => {
    const {navigateAuthorization, navigateAccountSetup} = useRoutes()

    const [user, setUser] = useState<User>(cleanUser)
    const [userData, setUserData] = useState<UserData>(cleanUserData)
    const [tokens, setTokens] = useState<Tokens>({access_token: get('access_token') || '', refresh_token: get('refresh_token') || '' })
    const [isLogged, setIsLogged] = useState<boolean>(tokens.access_token !== '' ? true : false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)

    const getUserData = async () => {
        const user_data = await apiPrivate.get('/user-data/').catch((err)=>{console.log(err)})
        if (user_data?.data?.result) {
            setUserData(user_data.data.result)
        }
    }

    const refresh = async () => {
        try {
            const response: Response = await apiPrivate.get('/auth/reauth')
            if (response && response.access !== "") {
                await login(response)
            }
            else {
                logout()
            }
        } catch (error) {
            console.log(error)
            logout()
        }
    }

    useEffect(()=>{
        if(tokens.refresh_token !== ""){
            (async ()=>{
                try {
                    await refresh()
                } catch (e) {
                    logout()
                    setIsLoaded(true)
                }
                finally{
                    setIsLoaded(true)
                }
            })()
        }
    }, [])

    const saveToken = async (token: string, type: "access_token" | "refresh_token") => {
        save(type, token)
        setTokens(prev => ({ ...prev, [type]: token }))
    }

    const saveTokens = async (access: string, refresh: string) => {
        await saveToken(access, 'access_token')
        await saveToken(refresh, "refresh_token")
    }

    const login = async (response: Response) => {
        setUser(response.result)
        await saveTokens(response.access, response.refresh)
        await getUserData()
        setIsLogged(true)
        setIsLoaded(true)
    }

    const reg_fstage = async (response: Response) => {
        await saveTokens(response.access, response.refresh)
        setUser(response.result)
        navigateAccountSetup()
        setIsLoaded(true)
    }
    
    const reg_sstage = async () => {
        await getUserData()
        setIsLogged(true)
        setIsLoaded(true)
    }

    const logout = async () => {
        setUser(cleanUser);
        setUserData(cleanUserData);
        await saveTokens("", "")
        setIsLogged(false);
        navigateAuthorization()
    }

    return (
        <AuthContext.Provider value={{ user, userData, tokens, isLogged,isLoaded, login, logout, reg_fstage, reg_sstage}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}


