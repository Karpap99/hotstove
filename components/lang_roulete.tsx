import { Link } from 'expo-router';
import { useRef, useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, Image, ScrollView, Text, View} from 'react-native';
import { Lang } from './types';
import {useTranslation} from 'react-i18next';
import { useEffect } from 'react';
import { save } from '@/services/store';
import {Shadow} from "react-native-shadow-2"
type Props = Omit<ComponentProps<typeof Link>, 'href'> & {langs: Object};

export const LangRoulete = ({langs}: Props) => {
    const {i18n, t} = useTranslation();
    const [currL, setcurrL] = useState<string>()


    const setLang = async (str: string) => {
        setcurrL(str)
        i18n.changeLanguage(str)
        save("language",str)
    }

    return (
    <View style={[{height: 260}, styles.container]}>
        <ScrollView style={styles.containerInner}>
            {
                Object.keys(langs).map((key, index) => (
                        <TouchableOpacity key={key} style={styles.langContainer} onPress={() => setLang(key)}>
                            <Text style={currL == key ? styles.choosenLang : styles.lang} >{key}</Text>
                        </TouchableOpacity>
                    )
                )
            }
        </ScrollView>
     </View>  
        
    );
}


const styles = StyleSheet.create({
    choosenLang: {
        width: '100%',
        height: 30,
        fontSize: 18,
        fontFamily:"ComfortaaRegular",
        backgroundColor: 'rgb(240, 240, 240)',
        textAlign: "center"
    },
    lang: {
        width: '100%',
        height: 30,
        fontSize: 18,
        fontFamily:"ComfortaaRegular",
        textAlign: "center"
    },
    container: {
        borderColor:'black',
        borderWidth: 0.5,
        borderRadius: 5
    },
    containerInner: {
        width: 290,
        backgroundColor: "white",
        textAlign: "center",
        overflow: "hidden",      
         borderRadius: 5
    },
    langContainer: {
        height: 36,
        width: '100%',
    }
});
