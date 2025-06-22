import { TouchableOpacity, Text, StyleSheet, TextInput, View} from "react-native"
import { Image } from "expo-image"
import { useState } from "react"
import * as ImagePicker from "expo-image-picker";
import { Table } from "./types";

type UIinner = {
    id: number,
    value? : string,
    table? : Table[],
    list? : {id: number, value: string}[],
    uri? : string,
    name? : string,
    type? : string
}

type Props = {
    id: number,
    setImage: (id: number, uri: string, name: string, mime: string) => void,
    onDelete: (id: number) => void,
    data?: UIinner[]
}

export const PostImageInput = ({id, setImage, onDelete,data}: Props) => {
    const [error, setError] = useState(null);
    const [file, setfile] = useState({'uri': "",'fileName' : "",'mimeType' : ""})
    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted")
        {
            const result =
                await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true
                });
            if (!result.canceled) {
                setfile({
                    'uri': result.assets[0].uri,
                    'fileName' : result.assets[0].fileName,
                    'mimeType' : result.assets[0].mimeType
                })
                setImage( id, result.assets[0].uri, `file${id}`, result.assets[0].mimeType)
                setError(null);
            }   
        }
    }   

    const Pick = () => {
        if(file.uri != ""){
            setImage(id, "", "", "")
            setfile({
                    'uri': "",
                    'fileName' : "",
                    'mimeType' : ""
                })
        }
        else pickImage()
    }


    const returnImg = () => {
        if(data){
            if(file.uri != "") return file.uri
            return data?.find((item) => item.id === id)?.uri;
        }
        return file.uri
    }
    return(
        <View>
            <View style={styles.image_container}>
                <Image style={styles.image} source={returnImg()}/>
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={[styles.button, styles.delete_button]}>
                    <Text style={[styles.control, styles.delete]} onPress={()=>onDelete(id)}>
                        Видалити елемент
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.edit_button]} onPress={()=>Pick()}>
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
    image_container: {
        height: 180,
        backgroundColor:'rgb(112, 112, 112)'
    },
    image:{ 
        height: "100%"
    }
})