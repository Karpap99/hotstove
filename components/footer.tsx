import { Dimensions, StyleSheet, TouchableOpacity, View, Text} from "react-native"
import { Image } from "expo-image"
import { useAuth } from "@/context/authcontext"
import { useEffect, useState } from "react"
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors"
import { NavButton } from "./navButton"
import { useApp } from "@/context/appcontext"

export const Footer = () => {
    const [modal, setModal] = useState<boolean>(false)
    const {switchModal} = useApp()

    return (
        <View style={[styles.footer]} >
            <NavButton text="головна" image={require("@/assets/images/main.svg")} />
            <NavButton text="підписки" image={require("@/assets/images/subscribes.svg")}/>
            <NavButton image={require("@/assets/images/add_content.svg")}/>
            <NavButton text="Мій канал" image={require("@/assets/images/channel.svg")}/>
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
                </View> : null  
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
        alignContent: 'center'
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