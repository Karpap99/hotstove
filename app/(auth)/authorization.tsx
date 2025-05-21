import {  StyleSheet,Text, View} from 'react-native';
import { save} from '@/services/store';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiPublic } from '@/common/api/api';


export default function Authorization() {
  const {t} = useTranslation();
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
    const reg = async () => {
    const res = await apiPublic.post('/auth/login', {
        'email': email,
        'password':password
    })
    if(res.data.access){
      save("isLoggedIn", "true")
      save('access_token', res.data.access)
      save('refresh_token', res.data.refresh)
    }
    
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>{t('AUTHORIZATION')}</Text>
        <Input text={t('EMAIL')} value={email} setValue={setemail} />
        <View>
            <Input text={t('PASSWORD')} value={password} setValue={setpassword} password/>
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
        
    </View>
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
    backgroundColor: 'white',
    gap: 20
  }
});
