import {  StyleSheet, TouchableOpacity, View, Text} from "react-native"
import { useState } from "react"
import { NavButton } from "./navButton"
import { useApp } from "@/context/appcontext"
import { Href, RelativePathString, router, useRouter } from "expo-router"
import { useAuth } from "@/context/authcontext"

export const Footer = () => {
    const {switchModal} = useApp()
    const {user} = useAuth()
    const router = useRouter()

    const ToMain = () => router.navigate(`/(app)/(main_app)`)
    const ToChannel = () => router.navigate(`/(app)/(main_app)/channel/${user.id}`as Href)
    const ToSubscribes = () => router.navigate(`/(app)/(main_app)/followed`)
    const ToCreatePost = () => router.navigate('/(app)/(main_app)/create_post')

    return (
        <View style={[styles.footer]} >
            <NavButton text="головна" image={require("@/assets/images/main.svg")} action={ToMain} />
            <NavButton text="підписки" image={require("@/assets/images/subscribes.svg")} action={ToSubscribes}/>
            <NavButton text="публікація" image={require("@/assets/images/add_content.svg")} action={ToCreatePost}/>
            <NavButton text="мій канал" image={require("@/assets/images/channel.svg")} action={ToChannel}/>
            <NavButton text="меню" image={require("@/assets/images/menu.svg")} action={switchModal}/>
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
    }
})