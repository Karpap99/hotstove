import { useState } from 'react';
import { StyleSheet ,TouchableOpacity,  ScrollView, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import { save } from '@/services/store';

type Props = {langs: Object};

export const LangRoulete = ({langs}: Props) => {
    const {i18n} = useTranslation();
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
        width: 350,
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
