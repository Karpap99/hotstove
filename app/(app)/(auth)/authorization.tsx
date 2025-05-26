import {  StyleSheet,Text, View} from 'react-native';
import { save} from '@/services/store';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { apiPublic } from '@/common/api/api';
import { useAuth } from '@/context/authcontext';
import { AxiosResponse } from 'axios';


type User = {
  email: string,
  password: string,
}

const cleanUser = {email: "", password: ""}

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


export default function Authorization() {
  const {t} = useTranslation();
  const {login}= useAuth()
  const [user, setUser] = useState<User>(cleanUser)
  const [errors, setErrors] = useState<User>(cleanUser)
  
  const setEmail = (x: string) => setUser({...user, email: x})
  const setPassword = (x: string) => setUser({...user, password: x})

  const reg = async () => {
    setErrors(cleanUser)
    if(user.email == "" || user.password == "" ){
      if(user.email == "") setErrors({...errors, email:t("FIELDCANTBEEMPTY")})
      if(user.password == "") setErrors({...errors, password:t("FIELDCANTBEEMPTY")})
      return
    }
    const res : AxiosResponse | void = await apiPublic.post('/auth/login', user)
    .catch((e: BadRequestError)=>
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
              case "user doesn't exist":
                setErrors({...errors, email:t('USERDONTEXIST')})
                break
            }
          })
        }
      })
    

    if(res)
    if(res.data.access){
      const authorized_user = {
        nickname: res.data.result.nickname,
        email: res.data.result.email,
        profile_picture: res.data.result.profile_picture,
        id: res.data.result.id,
        description: res.data.result.description,
        age: res.data.result.age
      }
      login(authorized_user, res.data.access,res.data.refresh)
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.header}>{t('AUTHORIZATION')}</Text>
        <Input text={t('EMAIL')} value={user.email} setValue={setEmail} error={errors.email} />
        <View>
            <Input text={t('PASSWORD')} value={user.password} setValue={setPassword} password error={errors.password}/>
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
