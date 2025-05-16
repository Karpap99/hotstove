import { Pressable, StyleSheet,Text, View} from 'react-native';
import { save, get } from '@/services/store';
import {Button} from "@/components/button"
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import {LinearGradient} from 'expo-linear-gradient'
import { useState } from 'react';
import axios from 'axios';
import { DatePicker } from '@/components/datepicker';

export default function Account_setup() {
  const [date, setDate] = useState<Date>(new Date())

    const get_countries = async () => {
        const res = await axios.get('https://restcountries.com/v3.1/all')
        
    }

  return (
    <>
        <DatePicker />
    </>
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
