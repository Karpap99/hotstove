import { Link } from 'expo-router';
import { useRef, useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, Image, ScrollView, Text, View} from 'react-native';
import { Lang } from './types';
import {useTranslation} from 'react-i18next';
import { useEffect } from 'react';
import { save } from '@/services/store';
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
        <View style={{height: 160}}>
            <ScrollView style={styles.container}>
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
        height: 30,
        fontSize: 20,
        fontFamily:"ComfortaaRegular",
    },
    lang: {
        height: 30,
        fontSize: 18,
        fontFamily:"ComfortaaRegular",
         
    },
    container: {
        width: 290,
        backgroundColor: "white",
        textAlign: "center",
        overflow: "hidden",      
    },
    langContainer: {
        height: 36,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center"
    }
});
