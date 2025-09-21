import { StyleSheet, View } from "react-native"
import { SearchBar } from "../searchBar"

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