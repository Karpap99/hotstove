import { useApp } from "@/context/appcontext"
import { useRoutes } from "@/hooks/useRouter"
import { useEffect, useState } from "react"
import { Keyboard, Platform, StyleSheet, View } from "react-native"
import { NavButton } from "../navButton/navButton"

function useKeyboard() {
        const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
        useEffect(() => {
            const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
            const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

            const onShow = () => setIsKeyboardOpen(true);
            const onHide = () => setIsKeyboardOpen(false);

            const showSub = Keyboard.addListener(showEvent, onShow);
            const hideSub = Keyboard.addListener(hideEvent, onHide);

            return () => {
                showSub.remove();
                hideSub.remove();
            };
        }, []);
         return isKeyboardOpen;
}

export const Footer = () => {
    const {switchModal} = useApp()
    const keyboardOpen = useKeyboard();
    const {navigateMain, navigateChannel, navigateSubscribes, navigateCreatePost} = useRoutes()
    
    return (
        <View style={[styles.footer, (keyboardOpen ? {padding: 0} : {paddingBottom: 40})]} >
            <NavButton text="головна" image={require("@/assets/images/main.svg")} action={navigateMain} />
            <NavButton text="підписки" image={require("@/assets/images/subscribes.svg")} action={navigateSubscribes}/>
            <NavButton text="публікація" image={require("@/assets/images/add_content.svg")} action={navigateCreatePost}/>
            <NavButton text="мій канал" image={require("@/assets/images/channel.svg")} action={navigateChannel}/>
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
    }
})