import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { StyleSheet,Text, View} from 'react-native';
import { Link,useRouter } from 'expo-router';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { apiPublic } from "@/common/api/api";
import { useAuth } from "@/context/authcontext";
import { AxiosResponse } from "axios";


type User = {
  nickname: string, 
  email: string,
  password: string,
  password2: string
}

const cleanUser = {nickname: "", email: "",password: "",password2: ""}

type BadRequestError = {
  message: string[],
  error: string,
  statusCode: number
}


type Response = {
  result: User,
  access: string,
  refresh: string
}

export default function Registration() {
  const [user, setUser] = useState<User>(cleanUser)
  const [errors, setErrors] = useState<User>(cleanUser)

  const {t} = useTranslation();
  const router = useRouter();
  const {reg_fstage} = useAuth()


  const setNickname = (x: string) => setUser({...user, nickname: x })
  const setEmail = (x: string) => setUser({...user, email: x })
  const setPassword = (x: string) => setUser({...user, password: x })
  const setPassword2 = (x: string) => setUser({...user, password2: x })

  useEffect(()=>{
    if(user.password != user.password2) setErrors({...errors, password2: t('PASSWORDSDIFFERENT')})
    else setErrors({...errors, password2: ""})
  },[user.password2])

  const reg = async () => {
    setErrors(cleanUser)
    if(user.email == "" || user.nickname == "" || user.password == "" || user.password2 == ""){
      if(user.email == "") setErrors({...errors, email: t("FIELDCANTBEEMPTY")})
      if(user.nickname == "") setErrors({...errors, nickname: t("FIELDCANTBEEMPTY")})
      if(user.password == "") setErrors({...errors, password: t("FIELDCANTBEEMPTY")})
      if(user.password2 == "") setErrors({...errors, password2: t("FIELDCANTBEEMPTY")})
      return
    }
      

    const res : AxiosResponse | void = await apiPublic.post('auth/sign-up', user).catch((e)=>
    {
      if(e["statusCode"] === 400){
        
        e.message.find((el) => {
          switch(el){
            case "password is not strong enough":
              setErrors({...errors, password:t('PASSWORDISWEAK')})
              break
            case "email must be an email":
              setErrors({...errors, email:t('EMAILISWRONG')})
              break
            case "this email taken":
              setErrors({...errors, email:t('EMAILTAKEN')})
              break
          }
        })
      }
    })


    if(res){
      const response: Response = res.data
      if(response.access != ''){
        reg_fstage(response.access, response.refresh, response.result)
        router.navigate('/(app)/(auth)/account_setup')
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('REGISTRATION')}</Text>
      <Input text={t('LOGIN')} value={user.nickname} setValue={setNickname} error={errors.nickname} />
      <Input text={t('EMAIL')} value={user.email} setValue={setEmail} error={errors.email}/>
      <Input text={t('PASSWORD')} value={user.password} setValue={setPassword} password error={errors.password}/>
      <Input text={t('REPEATPASS')} value={user.password2} setValue={setPassword2} password error={errors.password2}/>
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
