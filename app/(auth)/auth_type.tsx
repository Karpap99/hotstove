import { StyleSheet,Text, View} from 'react-native';
import { useRouter } from 'expo-router';
import {Button} from "@/components/button"
import { useTranslation } from 'react-i18next';


export default function AuthType() {
  const router = useRouter();
  const {t} = useTranslation();
  const toAuth = () => {
    router.navigate("/(auth)/authorization")
  }



  return (
    <View style={styles.container}>
      <Text style={styles.header}>HotStove</Text>
      <Text style={styles.description}>{t('FORAPPUSE')}</Text>
      <View style={{gap: 20}}>
        <Button text={t('AUTHORIZATION')} action={toAuth} />
        <Button text='Використати Google'/>
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
