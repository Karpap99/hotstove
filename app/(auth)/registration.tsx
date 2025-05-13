import { Image } from 'expo-image';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { StyleSheet,Text, View} from 'react-native';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'
export default function Registration() {
  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
            <Text style={styles.header}>Реєстрація</Text>
            <Input text='Логін'/>
            <Input text='Єл.пошта'/>
            <Input text='Пароль'/>
            <Input text='Повторіть пароль'/>
            <View>
                        <Button text='Авторизуватись'/>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={ styles.description}>Вже є аккаунт? </Text>
                            <Link href={'/(auth)/authorization'} style={{textDecorationLine: 'underline'}, styles.description}>Авторизація</Link>
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
