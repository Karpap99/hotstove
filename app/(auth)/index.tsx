import { Image } from 'expo-image';
import { Platform, StyleSheet,Text, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'

import {Button} from "@/components/button"

export default function WelcomePage() {
  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
      <Text style={styles.header}>HotStove</Text>
      <Text style={styles.description}>Для використання застосунку{"\n"} необхідно авторизуватись</Text>
      <Button text='Авторизуватись'/>
      <Button text='Використати Google'/>
    </LinearGradient>
    
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
    gap: 20
  },
});
