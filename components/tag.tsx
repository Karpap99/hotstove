import { TouchableOpacity, Text, StyleSheet} from "react-native"

type Props = {
    text: string
}

export const Tag = ({text}: Props) => {
    return(
        <TouchableOpacity style={styles.tag_container}>
            <Text style={styles.text}   numberOfLines={1} ellipsizeMode="tail">{text}</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(61, 60, 60)',
        
    },
    tag_container: {
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
        borderRadius: 3,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: 'white',
        overflow: 'hidden',
        maxWidth: 130,
        maxHeight: 20
    }
})