import { Pressable, StyleSheet,Text, View} from 'react-native';
import { save, get } from '@/services/store';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'
import { useState } from 'react';
import axios from 'axios';

export default function Authorization() {
  const [email, setemail] = useState<string>('')
  const [password, setpassword] = useState<string>('')


    const reg = async () => {
    const res = await axios.post('http://10.0.2.2:3000/auth/login', {
        'email': email,
        'password':password
      })
    save('token', res.data.token)
  }

  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
        <Text style={styles.header}>Авторизація</Text>
        <Input text='Єл.пошта' value={email} setValue={setemail} />
        <View>
            <Input text='Пароль' value={password} setValue={setpassword}/>
            <Link style={[{textDecorationLine: 'underline'}, styles.description]} href={'/'}>
                Забули пароль?
            </Link>
        </View>
        <View>
            <Button text='Авторизуватись' action={reg}/>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={ styles.description}>Немає аккаунту? </Text>
                <Link href={'/(auth)/registration'} style={[{textDecorationLine: 'underline'},styles.description]}>Реєстрація</Link>
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
