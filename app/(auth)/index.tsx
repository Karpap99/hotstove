import { StyleSheet, View} from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import {Button} from "@/components/button"
import {useTranslation} from 'react-i18next';
import { useEffect} from 'react';
import { get} from '@/services/store';
import { LangRoulete } from '@/components/lang_roulete';
import { resources } from "@/lang/i18n"
export default function lang_select() {
  const router = useRouter();
  const {i18n, t} = useTranslation();

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await get('language')
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, []);

  const toAuth = () => {
    router.navigate("/(auth)/auth_type")
  }

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/lang.svg")} style={{height: 150, width: 150}}/>
      <LangRoulete langs={resources}/>
      <Button text={t("NEXT")} action={toAuth}/>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 35
  }
});
