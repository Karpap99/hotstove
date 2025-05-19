import { StyleSheet,Text} from 'react-native';
import { save, get } from '@/services/store';
import {Button} from "@/components/button"
import {LinearGradient} from 'expo-linear-gradient'
import { useState } from 'react';
import axios from 'axios';
import { PicPicker } from '@/components/profilepic';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/input';
import { DatePicker } from '@/components/datepicker';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';

export default function Account_setup() {
  const [description, setDescription] = useState<string>('')
  const [file, setFile] = useState<Object>({})
  const {t} = useTranslation();
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<DateType>();
  

  const save_pfp = async () => {
    if(file){
      const formData = new FormData()
      formData.append('file', 
      {
        uri: file.uri,
        name: file.fileName,
        type: file.mimeType
      })
      formData.append('isPublic', 'true')
      axios.post('http://192.168.3.30:3000/uploader/file', formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }).then((res)=>console.log(res))
    }
  }

  const activeState = () => {
    setActive(!active)
    if (selected){
      const date = new Date(selected.toString())
      console.log(date.getFullYear())
    }
    
  }

  return (
    <LinearGradient colors={['#FFDFBE', '#FFFFFF']} style={styles.container}>
      <Text style={styles.header}>{t('SETTINGS')}</Text>
      <PicPicker file={file} setfile={setFile}/>
      <Input text='Опис' value={description} setValue={setDescription} rows={6} limitation={512}/>
      <DatePicker text='Дата народженя' setActive={activeState} value={selected?.toLocaleString()}/>
      <Button text={t('NEXT')}/>
      {
        active ? 
        <DateTimePicker
          mode="single"
          date={selected}
          onChange={({ date }) => { setSelected(date), setActive(!active)}}
          style={styles.callendarContainer}
          styles={
            {
              day_label: {
                fontFamily:"ComfortaaRegular"
              },
              month_label: {
                fontFamily:"ComfortaaRegular"
              }

            }
          }
        /> :
         ""
    }
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
   callendarContainer: {
        position: 'absolute',
        backgroundColor: 'white'
   }
});
