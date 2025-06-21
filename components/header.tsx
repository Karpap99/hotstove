import { StyleSheet, View } from "react-native"
import { useState } from "react"
import { SearchBar } from "./searchBar"
import SearchProvider from "@/context/searchcontext"

export const Header = () => {
    
    return (
        <View style={[styles.header]} >
            <SearchBar/>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor: 'white',
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderBottomWidth: 0.3,
        alignContent:"center",
        padding: 10,
        paddingTop: 35,
    }
})