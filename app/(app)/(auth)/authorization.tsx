import {  StyleSheet,Text, View} from 'react-native';
import { save} from '@/services/store';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiPublic } from '@/common/api/api';
import { useAuth } from '@/context/authcontext';





export default function Authorization() {
  const {t} = useTranslation();
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const {isLogged, user, login}= useAuth()
  const [passwordError, setPasswordError] = useState<string>('')
  const [EmailError, setEmailError] = useState<string>('')
  const reg = async () => {
    setEmailError("")
    setPasswordError("")
    if(email == "" || password == "" ){
      if(email == "") setEmailError(t("FIELDCANTBEEMPTY"))
      if(password == "") setPasswordError(t("FIELDCANTBEEMPTY"))
      return
    }
    const res = await apiPublic.post('/auth/login', {
      'email': email,
      'password':password
    })
    .catch((e)=>
      {
        if(e["statusCode"] === 400){
          e.message.find((el) => {
             switch(el){
              case "password is not strong enough":
                setPasswordError(t('PASSWORDISWEAK'))
                break
              case "email must be an email":
                setEmailError(t('EMAILISWRONG'))
                break
              case "user doesn't exist":
                setEmailError(t('USERDONTEXIST'))
                break
            }
          })
        }
      })
    

    if(res.data.access){
      const user = {
        nickname: res.data.result.nickname,
        email: res.data.result.email,
        profile_picture: res.data.result.profile_picture
      }
      login(user, res.data.access,res.data.refresh)
    }

  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>{t('AUTHORIZATION')}</Text>
        <Input text={t('EMAIL')} value={email} setValue={setemail} error={EmailError} />
        <View>
            <Input text={t('PASSWORD')} value={password} setValue={setpassword} password error={passwordError}/>
            <Link style={[{textDecorationLine: 'underline'}, styles.description]} href={'/'}>
                {t("FORGOTPASS")}
            </Link>
        </View>
        <View>
            <Button text={t('AUTHORIZATION')} action={reg}/>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={ styles.description}>{t("DONTHAVEACC")} </Text>
                <Link href={'/(app)/(auth)/registration'} style={[{textDecorationLine: 'underline'},styles.description]}>{t("REGISTRATION")}</Link>
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
    gap: 10
  }
});
