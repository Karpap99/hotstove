import { Pressable, StyleSheet,Text, View} from 'react-native';
import { save, get } from '@/services/store';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'
import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { isLoaded } from 'expo-font';

export default function Authorization() {
  const {t} = useTranslation();
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
    const reg = async () => {
    const res = await axios.post('http://10.0.2.2:3000/auth/login', {
        'email': email,
        'password':password
      })
    if(res.data.token){
      save("isLoggedIn", "true")
      save('token', res.data.token)
    }
    
  }

  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
        <Text style={styles.header}>{t('AUTHORIZATION')}</Text>
        <Input text={t('EMAIL')} value={email} setValue={setemail} />
        <View>
            <Input text={t('PASSWORD')} value={password} setValue={setpassword}/>
            <Link style={[{textDecorationLine: 'underline'}, styles.description]} href={'/'}>
                {t("FORGOTPASS")}
            </Link>
        </View>
        <View>
            <Button text={t('AUTHORIZATION')} action={reg}/>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={ styles.description}>{t("DONTHAVEACC")} </Text>
                <Link href={'/(auth)/registration'} style={[{textDecorationLine: 'underline'},styles.description]}>{t("REGISTRATION")}</Link>
            </View>   
        </View>
        
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontFamily:"ComfortaaRegular"
  },
  description: {
    fontSize: 12,
    fontFamily:"ComfortaaRegular"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
    gap: 20
  },
});
