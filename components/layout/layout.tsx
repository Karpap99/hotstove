import { Header, Footer, Modal } from "@/components";
import { useApp } from "@/context/appcontext";
import { View } from "react-native";


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
