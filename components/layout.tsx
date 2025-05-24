import { Header } from "@/components/header"
import { Dimensions, ScrollView, StyleSheet, View,Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { Footer } from "./footer";
import AppProvider, { useApp } from "@/context/appcontext";
import { Modal } from "./modal";
import { useEffect, useState } from "react";


export const Layout = ({ children }: { children: React.ReactNode})=> {
    const windowHeight = Dimensions.get('window').height;
    const {modal} = useApp()

    return(
        <SafeAreaView style={{flex: 1}}>
            <Header/>
            <View style={[styles.content, {flex:1 }]}>
                {children}
            </View>
            <Footer></Footer>
            {modal ? <Modal/> : ""}
        </SafeAreaView>
        
    )
}

const styles = StyleSheet.create({

    content: {
        zIndex: -1,

    }
})