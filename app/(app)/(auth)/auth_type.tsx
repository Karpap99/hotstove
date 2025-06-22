import { StyleSheet,Text, View} from 'react-native';
import { useRouter } from 'expo-router';
import {Button} from "@/components/button"
import { useTranslation } from 'react-i18next';

export default function AuthType() {
  const router = useRouter();
  const {t} = useTranslation();
  const toAuth = () => router.navigate("/(app)/(auth)/authorization")
  const toReg = () => router.navigate("/(app)/(auth)/registration")
  return (
    <View style={styles.container}>
      <Text style={styles.header}>HotStove</Text>
      <Text style={styles.description}>{t('FORAPPUSE')}</Text>
      <View style={{gap: 20}}>
        <Button text={t('AUTHORIZATION')} action={toAuth} image={require('@/assets/images/authButton.svg')} />
        <Button text={t("REGISTRATION")} action={toReg} image={require('@/assets/images/authButton.svg')}/>
      </View>
    </View>
    
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
    backgroundColor: 'white',
    gap: 35
  },
});
