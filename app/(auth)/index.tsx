import { Platform, StyleSheet,Text, View} from 'react-native';
import { Image } from 'expo-image';
import {LinearGradient} from 'expo-linear-gradient'
import { useRouter } from 'expo-router';
import {Button} from "@/components/button"
import i18next from 'i18next';
import {useTranslation} from 'react-i18next';
import { useEffect, useState } from 'react';
import { save, get, get_async } from '@/services/store';
import { LangRoulete } from '@/components/lang_roulete';
import { resources } from "@/lang/i18n"
export default function lang_select() {
  const router = useRouter();
  const {i18n, t} = useTranslation();

  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await get('language')
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
        if((await get_async("isLoggedIn")) == 'true') console.log() //toApp()
        else console.log()
      }
    };
    loadLanguage();
  }, []);




  const toAuth = () => {
    router.navigate("/(auth)/auth_type")
  }

  const toApp = () => {
    router.navigate("/(main_app)/explore")
  }

  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
      <Image source={require("@/assets/images/lang.svg")} style={{height: 150, width: 150}}/>
      <LangRoulete langs={resources}/>
      <Button text={t("NEXT")} action={toAuth}/>
    </LinearGradient>
    
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontFamily:"ComfortaaRegular"
  },
  description: {
    fontSize: 18, 
    textAlign: "center",
    fontFamily:"ComfortaaRegular"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
    gap: 70
  },
});
