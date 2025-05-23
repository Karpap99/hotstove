import { StyleSheet,Text, View} from 'react-native';
import { useRouter } from 'expo-router';
import {Button} from "@/components/button"
import { useTranslation } from 'react-i18next';
import {GoogleSignin} from '@react-native-google-signin/google-signin'



export default function AuthType() {
  const router = useRouter();
  const {t} = useTranslation();
  const toAuth = () => {
    router.navigate("/(app)/(auth)/authorization")
  }
  const googleSign = GoogleSignin.configure({
  webClientId: '642381207505-lfnbt0nd90mj6k93rs3708vpcv9ht3eg.apps.googleusercontent.com',
  scopes:['profile','email']
})

  const google = async () => {
    await googleSign.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()
    console.log(userInfo)
  }



  return (
    <View style={styles.container}>
      <Text style={styles.header}>HotStove</Text>
      <Text style={styles.description}>{t('FORAPPUSE')}</Text>
      <View style={{gap: 20}}>
        <Button text={t('AUTHORIZATION')} action={toAuth} image={require('@/assets/images/authButton.svg')} />
        <Button text={t("AUTHVIAGOOGLE")} action={google} image={require('@/assets/images/googleAuth.svg')}/>
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
