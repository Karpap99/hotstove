import { Children, ReactElement, ReactNode, useEffect, useState } from "react"
import { TouchableOpacity, Text, StyleSheet, TextInput, View} from "react-native"

type Props = {
    id: number,
    setText: (id: number, x: string) => void
}


export const PostTextInput = ({id, setText}: Props) => {
    const [val, setVal] = useState<string>('')

    useEffect(()=>{
        setText(id, val)
    },[val])
    return(
        <View>
            <TextInput style={styles.text} value={val} onChangeText={(e)=>{setVal(e)}} multiline/>
            <View style={styles.controls}>
                <TouchableOpacity style={styles.delete_button} onPress={()=>{}}>
                    <Text style={styles.control}>
                        Видалити елемент
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(61, 60, 60)',
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 0.3,
        minHeight: 50,
        width: "100%"
    },
    delete_button: {
        borderColor: "rgb(0, 0, 0)",
        backgroundColor:'rgb(255, 70, 70)',
        borderWidth: 0.5,
        height: 30,
        width: "100%",
        justifyContent: 'center',
        alignItems: "center"
    },
    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
    },
    control: {
        fontSize: 12,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(255, 255, 255)',
    }
})