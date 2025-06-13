import React from "react"
import { ReactElement, useState } from "react"
import { TouchableOpacity, Text, StyleSheet, TextInput, View} from "react-native"


type Props = {
    value: string,
    style: object
}

export const PostTableInput = ({value, style}: Props) => {
    const TableSegment = () => {
        const [TableKey, setTableKey] = useState<string>()
        const [TableValue, setTableValue] = useState<string>()
        return (
            <View style={styles.segments}>
                <View style={styles.segment}>
                    <TextInput style={styles.text} value={TableKey} onChangeText={(e)=>{value = e}}/>
                </View>
                <View style={styles.segment}>
                    <TextInput style={styles.text} value={TableValue} onChangeText={(e)=>{value = e}}/>
                </View>
            </View>
        )
    }

    const AddSegment = () => {
        const new_segment = React.createElement(TableSegment)
        setSegments([...Segments, new_segment])
    }

    const [Segments, setSegments] = useState<ReactElement[]>([])
    return(
        <View>
            <View>
                {
                    Segments
                }
            </View>
            <TouchableOpacity style={[styles.button, styles.edit_button, {width:"100%"}]} onPress={()=>{AddSegment()}}>
                <Text style={[styles.control, styles.edit]}>
                    Додати сегмент
                </Text>
            </TouchableOpacity>
            <View style={styles.controls}>
                <TouchableOpacity style={[styles.button, styles.delete_button]}>
                    <Text style={[styles.control, styles.delete]}>
                        Видалити елемент
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.edit_button]}>
                    <Text style={[styles.control, styles.edit]}>
                         Редагувати зображення
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
        
    },
    tag_container: {
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
        borderRadius: 3,
        paddingLeft: 5,
        paddingRight: 5
    },
    button: {
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 0.5,
        height: 30,
        width: "50%",
        justifyContent: 'center',
        alignItems: "center"
    },
    delete_button: {
        backgroundColor:'rgb(255, 70, 70)',
    },
    edit_button:{
        backgroundColor:'rgb(255, 255, 255)'
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
       
    },
    delete: {
        color: 'rgb(255, 255, 255)',
    },
    edit: {
         color: 'rgb(61, 60, 60)',
    },
    segments:{ 
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
    },
    segment: {
        width: "50%",
        borderColor:'rgb(61, 60, 60)',
        borderWidth: 0.3
    }
})