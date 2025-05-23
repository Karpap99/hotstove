import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { StyleSheet,Text, View} from 'react-native';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'
import { useEffect, useState } from "react";
import axios from 'axios'
import { save } from "@/services/store";
import { useTranslation } from "react-i18next";
import { useRouter } from 'expo-router';
import { apiPublic } from "@/common/api/api";
import { useAuth } from "@/context/authcontext";


export default function Registration() {
  const [nickname, setnickname] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [password2, setpassword2] = useState<string>('')

  const [passwordError, setPasswordError] = useState<string>('')
  const [password2Error, setPassword2Error] = useState<string>('')
  const [EmailError, setEmailError] = useState<string>('')
  const [nicknameError, setnicknameError] = useState<string>('')

  const {t} = useTranslation();
  const router = useRouter();
  const {reg_fstage} = useAuth()

  useEffect(()=>{
    if(password != password2) setPassword2Error(t('PASSWORDSDIFFERENT'))
    else setPassword2Error(t('PASSWORDSDIFFERENT'))
  },[password2])

  const reg = async () => {
    setEmailError("")
    setnicknameError("")
    setPasswordError("")
    setPassword2Error("")
    if(email == "" || nickname == "" || password == "" || password2 == ""){
      if(email == "") setEmailError(t("FIELDCANTBEEMPTY"))
      if(nickname == "") setnicknameError(t("FIELDCANTBEEMPTY"))
      if(password == "") setPasswordError(t("FIELDCANTBEEMPTY"))
      if(password2 == "") setPassword2Error(t("FIELDCANTBEEMPTY"))
      return
    }
      
    
    const res = await apiPublic.post('auth/sign-up', {
    'nickname':nickname,
    'email':email,
    'password':password,
    'password2' : password2
    }).catch((e)=>
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
              case "this email taken":
                setEmailError(t('EMAILTAKEN'))
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
      reg_fstage(user, res.data.access, res.data.refresh )
      router.navigate('/(app)/(auth)/account_setup')
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('REGISTRATION')}</Text>
      <Input text={t('LOGIN')} value={nickname} setValue={setnickname} error={nicknameError} />
      <Input text={t('EMAIL')} value={email} setValue={setemail} error={EmailError}/>
      <Input text={t('PASSWORD')} value={password} setValue={setpassword} password error={passwordError}/>
      <Input text={t('REPEATPASS')} value={password2} setValue={setpassword2} password error={password2Error}/>
      <View>
        <Button text={t('REGISTRATION')} action={reg} />
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <Text style={ styles.description}>{t("HAVEACC")}</Text>
            <Link href={'/(app)/(auth)/authorization'} style={[{textDecorationLine: 'underline'}, styles.description]}>{t('AUTHORIZATION')}</Link>
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
