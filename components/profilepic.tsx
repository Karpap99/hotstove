import { Link } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";

type Props = Omit<ComponentProps<typeof Link>, 'href'> & {file: Object, setfile: (x: Object) => void };

export const PicPicker = ({ file, setfile }: Props) => {
    const [error, setError] = useState(null);

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted")
        {
            const result =
                await ImagePicker.launchImageLibraryAsync();
            if (!result.canceled) {
                setfile(result.assets[0])
                setError(null);
            }
        }   
    };


    return (
        <TouchableOpacity style={styles.picker} onPress={()=>pickImage()}>
            {
                file ? 
                <Image style={styles.img} source={{uri: file.uri}}/>
                :
                null
            }
        </TouchableOpacity>
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
    }
});
