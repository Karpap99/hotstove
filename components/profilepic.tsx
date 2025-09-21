import { Link } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, View, Text} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'expo-image';
type FileType = {
  uri: string,
  file: string,
  mime: string
}
type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{
    file: FileType | null;
    setFile: (x: FileType | null) => void;
};

export const PicPicker = ({ file, setFile}: Props) => {
    const [error, setError] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted")
        {
            const result =
                await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true
                });
            if (!result.canceled) {
                setFile({
                    'uri': result.assets[0].uri,
                    'file' : result.assets[0].fileName,
                    'mime' : result.assets[0].mimeType
                })
                setError(null);
            }
        }   
    };

    const Pick = () => {
        if(file){setFile(null);} 
        else pickImage()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picker} onPress={()=>Pick()}>
                <Image style={styles.img} source={file ? {uri: file.uri} : require("@/assets/images/default_pfp.svg")}/>
            </TouchableOpacity>
            <Text style={styles.text}>{!file ? "Натисніть для вибору аватару" : "Натисніть для прибирання аватару"}</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    picker: {
        height: 200,
        width: 200,
        backgroundColor: 'gray',
        borderRadius: "50%",
        overflow:"hidden"
    },
    img: {
        height: 200,
        width: 200,
        backgroundColor: 'gray',
    },
    container: {
        display:"flex",
        alignItems: "center"
    },
    text:{
    fontSize: 14,
    fontFamily:"ComfortaaRegular"
  }
});
