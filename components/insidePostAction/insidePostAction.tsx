import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Image } from "expo-image"

type Props = {
    text?: string,
    image: string,
    action?() : void,
    style? : object
}

export const InsidePostAction = ({text,image, action}: Props) => {
    return (
        <View style={styles.action}>
            <TouchableOpacity onPress={()=>action ? action() : null}>
                <Image style={styles.ico} source={image}/>
            </TouchableOpacity>
            <Text style={styles.text}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    action: {
        display: 'flex',
        alignItems: "center",
        gap: 5,
        padding: 3
    },
    ico: {
        height: 40,
        width: 40,
    },
    text:{
        fontSize: 14,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(0, 0, 0)',
    }
})