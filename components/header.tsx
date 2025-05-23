import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Image } from "expo-image"
import { useAuth } from "@/context/authcontext"
import { useEffect } from "react"
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors"

export const Header = () => {
    const {user, logout} = useAuth()
    useEffect(()=>{
        console.log(user)
    },[])
    return (
        <View style={styles.header} >
            <TouchableOpacity style={{height: 50, width:50}}>

            </TouchableOpacity>
            <TouchableOpacity style={styles.imagecontainer} onPress={()=>logout()}>
            {
                user ? 
                user.profile_picture ?
                
                <Image style={styles.image} source={user.profile_picture}/> :
                  <Image style={styles.image} source={require("@/assets/images/default_pfp.svg")}/>
                :
                
                  <Image style={styles.image} source={require("@/assets/images/default_pfp.svg")}/>
                
            }
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 75,
        backgroundColor: 'white',
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderBottomWidth: 0.3,
        display:'flex',
        alignItems:'center',
        justifyContent:"space-between",
        flexDirection: "row",
        padding: 20
    },
    image:{
        height: 50,
        width: 50,
        borderRadius: "50%",
    },
    imagecontainer: {
        backgroundColor: 'gray',
        borderRadius: "50%",
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.3,
        overflow: "hidden"
    }
})