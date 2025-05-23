import { Link } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, View, Text} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { Image } from 'expo-image';
import { File } from './types';
type Props = Omit<ComponentProps<typeof Link>, 'href'> & {file: any, setfile: (x: any) => void };

export const PicPicker = ({ file, setfile }: Props) => {
    const [error, setError] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted")
        {
            const result =
                await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setfile({
                    'uri': result.assets[0].uri,
                    'file' : result.assets[0].fileName,
                    'mime' : result.assets[0].mimeType
                })
                setError(null);
            }
        }   
    };

    const Pick = () => {
        if(file){
            const f = {
                    'uri': "",
                    'fileName' : "",
                    'mimeType' : ""
                }
            setfile(f);
        }
        else
            pickImage()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picker} onPress={()=>Pick()}>
            {
                file ? 
                <Image style={styles.img} source={{uri: file.uri}}/>
                :
                <Image style={{height: 200, width: 200}} source={require("@/assets/images/default_pfp.svg")}/>
            }
            </TouchableOpacity>
            {
                !file ? 
                <Text style={styles.text}>Натисніть для вибору аватару</Text>
                :
                <Text style={styles.text}>Натисніть для прибирання аватару</Text>
            }
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
