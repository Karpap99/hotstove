import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { get, save } from "@/services/store";
import { apiPrivate } from "@/common/api/api";
import { reg_response } from "@/components/types";
import { t } from "i18next";

type User = {
    id: string,
    nickname: string,
    email: string,
}

type UserData = {
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
    userData: UserData,
    tokens: Tokens,
    isLogged: boolean,
    isLoaded: boolean,
    login (data: User, access_token: string, refresh_token: string): void,
    reg_fstage (access_token: string, refresh_token: string, result: User): void,
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
    const [user, setUser] = useState<User>(cleanUser)
    const [userData, setUserData] = useState<UserData>(cleanUserData)
    const [tokens, setTokens] = useState<Tokens>({access_token: get('access_token') || '', refresh_token: get('refresh_token') || '' })
    const [isLogged, setIsLogged] = useState<boolean>(tokens.access_token != '' ? true : false)
    const [isLoaded, setIsLoaded] = useState<boolean>(false)
    const router = useRouter()

    const getUserData = async () => {
        const user_data = await apiPrivate.get('/user-data/').catch((err)=>{console.log(err)})
        if (user_data?.data?.result) {
            setUserData(user_data.data.result)
        }
    }

    const refresh = async () => {
        try {
            const result = await apiPrivate.get('/auth/reauth')
            if (result?.data?.result && result?.data?.access && result?.data?.refresh) {
            await login(result.data.result, result.data.access, result.data.refresh)
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
                    console.log(e)
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

    const login = async (usr:User, access_token: string, refresh_token: string ) => {
        await getUserData()
        setUser(usr)
        await saveToken(access_token, 'access_token')
        await saveToken(refresh_token, "refresh_token")
        setTokens({ access_token, refresh_token })
        setIsLogged(true)
    }

    const reg_fstage = async (access_token: string, refresh_token: string, result: User) => {
        await saveToken(access_token, 'access_token')
        await saveToken(refresh_token, 'refresh_token')
        setUser(result)
        router.navigate('/(app)/(auth)/account_setup')
    }
    
    const reg_sstage = async (usr:User) => {
        await getUserData()
        setIsLogged(true)
    }

    const logout = () => {
        setUser(cleanUser);
        setUserData(cleanUserData);
        saveToken("", 'access_token');
        saveToken("", 'refresh_token');
        setIsLogged(false);
        router.replace("/(app)/(auth)/authorization");
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


