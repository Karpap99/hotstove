import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"
import { useAuth } from "@/context/authcontext"
import { useEffect, useState } from "react"
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors"
import { SearchBar } from "./searchBar"
import { useApp } from "@/context/appcontext"

export const Header = () => {
    const [SearchValue, setSearchValue] = useState<string>('')
    return (
        <View style={[styles.header]} >
            <SearchBar value={SearchValue} setValue={setSearchValue} />
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
    },
    image:{
        height: 50,
        width: 50,
        borderRadius: 5
    },
    imagecontainer: {
        backgroundColor: 'gray',
        borderRadius: 5,
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.3,
        overflow: "hidden"
    }
})