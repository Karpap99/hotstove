import { Href, router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface ProviderProps {
    query: string,
    setInput: (x:string)=>void
}

const SearchContext = createContext<ProviderProps>({
    query: "",
    setInput: ()=>{}
})


const SearchProvider = ({ children }: { children: React.ReactNode}) => {
    const [query, setQuery] = useState("")


    const setInput = (x: string) => {
        setQuery(x)
    }

    useEffect(()=>{
        router.push(`/(app)/(main_app)/?query=${query}` as Href)
    },[query])

    return (
        <SearchContext.Provider value={{query, setInput}}>
            { children }
        </SearchContext.Provider>
    )
}

export default SearchProvider

export const useSearch = () => {
    return useContext(SearchContext)
}


