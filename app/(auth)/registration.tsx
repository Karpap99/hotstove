import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { StyleSheet,Text, View} from 'react-native';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'
import { useEffect, useState } from "react";
import axios from 'axios'
import { save } from "@/services/store";

type user = {
  nickname: string,
  email: string,
  password: string,
}

export default function Registration() {
  const [nickname, setnickname] = useState<string>('')
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')
  const [password2, setpassword2] = useState<string>('')


  const reg = async () => {
    const res = await axios.post('http://10.0.2.2:3000/auth/sign-up', {
    'nickname':nickname,
    'email':email,
    'password':password
    })
    save('token', res.data.token)
  }


  
  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
            <Text style={styles.header}>Реєстрація</Text>
            <Input text='Логін' value={nickname} setValue={setnickname} />
            <Input text='Єл.пошта' value={email} setValue={setemail} />
            <Input text='Пароль' value={password} setValue={setpassword} />
            <Input text='Повторіть пароль' value={password2} setValue={setpassword2} />
            <View>
                        <Button text='Зареєструватись' action={reg} />
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={ styles.description}>Вже є аккаунт? </Text>
                            <Link href={'/(auth)/authorization'} style={[{textDecorationLine: 'underline'}, styles.description]}>Авторизація</Link>
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
