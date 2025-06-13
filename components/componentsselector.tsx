import { Link } from 'expo-router';
import { ReactElement, useState, type ComponentProps } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Image } from 'expo-image';
import { element, Table } from './types';
import { PostTextInput } from './PostTextInput';
import React from 'react';
import { PostImageInput } from './PostImageInput';
import { PostTableInput } from './PostTableInput';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{
    counter: number, 
    setText: (id: number, value: string,) => void, 
    setImage: (id: number, uri: string, name: string, type: string) => void,
    setTable: (id: number, table: Table[]) => void
    addElement: (x: ReactElement) => void
};

export const ComponentSelector = ({counter, setText, setImage, setTable, addElement}: Props) => {
    const OnPressText = () => addElement(React.createElement(PostTextInput, { id: counter, setText: setText }, []))
    const OnPressImage = () => addElement(React.createElement(PostImageInput, { id: counter, setImage: setImage }, []))
    const OnPressList = () => {}
    const OnPressTable = () => addElement(React.createElement(PostTableInput, { id: counter, setTable: setTable }, []))
    const components = [
        { key: 'text', label: 'текст', icon: require("@/assets/images/text.svg"), onPress: OnPressText },
        { key: 'image', label: 'зображення', icon: require("@/assets/images/image.svg"), onPress: OnPressImage },
        { key: 'list', label: 'список', icon: require("@/assets/images/list.svg"), onPress: OnPressList },
        { key: 'table', label: 'таблиця', icon: require("@/assets/images/table.svg"), onPress: OnPressTable },
    ];
    

    return (
        <View style={styles.container}>
            {components.map(({key, label, icon, onPress}) => (
                <TouchableOpacity key={key} style={styles.navButton} onPress={onPress}>
                <Image style={styles.navImage} source={icon} />
                <Text style={styles.navText}>{label}</Text>
                </TouchableOpacity>
            ))}
        </View>  
    );
}


const styles = StyleSheet.create({
   container: {
    height: 50,
    width: "100%",
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'space-around',

   },
   text:{
    fontSize: 14,
    fontFamily:"ComfortaaRegular"
   },
   content: {
    fontSize: 14,
    fontFamily:"ComfortaaRegular"
   },
   navButton: {
        display:"flex",
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 50,
        width: 60,
    },
    navText: {
        fontSize: 9,
        lineHeight: 12,
        fontFamily:"ComfortaaRegular",
        color: "rgb(41, 41, 41)"
    },
    navImage: {
        height: 24,
        width: 24
    }
});
