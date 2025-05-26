import {  StyleSheet, TouchableOpacity, View, Text} from "react-native"
import { useState } from "react"
import { NavButton } from "./navButton"
import { useApp } from "@/context/appcontext"
import { Href, RelativePathString, router, useRouter } from "expo-router"
import { useAuth } from "@/context/authcontext"

export const Footer = () => {
    const [modal, setModal] = useState<boolean>(false)
    const {switchModal} = useApp()
    const {user} = useAuth()
    const router = useRouter()

    
    const addButtons = () => setModal(!modal)
    const ToMain = () => router.navigate(`/(app)/(main_app)`)
    const ToChannel = () => router.navigate(`/(app)/(main_app)/channel/${user.id}`as Href)
    const ToSubscribes = () => router.navigate(`/(app)/(main_app)/followed`)
    const ToCreateVideo = () => router.navigate(`/(app)/(main_app)/create_video`)
    const ToCreatePost = () => router.navigate('/(app)/(main_app)/create_post')

    return (
        <View style={[styles.footer]} >
            <NavButton text="головна" image={require("@/assets/images/main.svg")} action={ToMain} />
            <NavButton text="підписки" image={require("@/assets/images/subscribes.svg")} action={ToSubscribes}/>
            <NavButton image={require("@/assets/images/add_content.svg")} action={addButtons}/>
            <NavButton text="мій канал" image={require("@/assets/images/channel.svg")} action={ToChannel}/>
            <NavButton text="меню" image={require("@/assets/images/menu.svg")} action={switchModal}/>
            {
                modal ? 
                <View style={{position: "absolute", display:'flex', flexDirection: 'row', gap: 30, transform: [{translateY:-65}],}}>
                    <TouchableOpacity style={[styles.add_content, {height: 50, width: 50}]} >
                        <Text style={[styles.add_text,{fontSize:12}]}>Відео</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.add_content, {height: 50, width: 50}]} >
                        <Text style={[styles.add_text,{fontSize:12}]}>Пост</Text>
                    </TouchableOpacity>
                </View> 
                :
                null  
            }
        
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        backgroundColor: "white",
        borderTopColor: "rgba(0, 0, 0, 0.4)",
        borderTopWidth: 0.5,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "space-between",
         alignItems: 'center',
        alignContent: 'center',
        paddingBottom: 40,
    },
    add_content: {
        height: 50,
        width: 50,
        borderRadius: "50%",
        borderColor: "rgba(0, 0, 0, 0.4)",
        borderWidth: 0.5,
        backgroundColor: 'rgb(255, 255, 255)',
        overflow: 'hidden',
        justifyContent: 'center', 
        alignItems: 'center',
        alignContent: 'center'
    },
    add_text: {
        verticalAlign: "middle",
        lineHeight: 32,
        fontSize: 32,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(0, 0, 0)',
    }
})