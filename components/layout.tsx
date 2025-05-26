import { Header } from "@/components/header"
import { View } from "react-native"
import { Footer } from "./footer";
import { useApp } from "@/context/appcontext";
import { Modal } from "./modal";


export const Layout = ({ children }: { children: React.ReactNode})=> {
    const {modal} = useApp()

    return(
        <View style={{flex: 1, position: "relative"}}>
            <Header/>
            <View style={{flex:1, zIndex: -1 }}>
                {children}
            </View>
            <Footer/>
            {modal ? <Modal/> : null}
        </View>  
    )
}
