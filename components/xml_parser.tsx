import { Link } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, Image } from 'react-native';
import * as ImagePicker from "expo-image-picker";




type Props = Omit<ComponentProps<typeof Link>, 'href'> & {file: Object, setfile: (x: Object) => void };

export const xml_parser = ({ file, setfile }: Props) => {
    const [error, setError] = useState(null);

    const parse = async (x: string) => {
        return 
    };


    return (
        <>
        </>
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
