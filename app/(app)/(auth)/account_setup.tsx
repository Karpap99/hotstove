import { StyleSheet,Text,View} from 'react-native';
import {Button} from "@/components/button"
import { useEffect, useReducer, useState } from 'react';
import { PicPicker } from '@/components/profilepic';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/input';
import { DatePicker } from '@/components/datepicker';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
import { apiPrivate } from '@/common/api/api';
import { useAuth } from '@/context/authcontext';



export default function Account_setup() {
  const [description, setDescription] = useState<string>('')
  const [file, setFile] = useState<any>()
  const {t} = useTranslation();
  const [active, setActive] = useState<boolean>(false)
  const [selected, setSelected] = useState<DateType>(new Date());
  const [date, setDate] = useState<string>()
  const {reg_sstage, user}= useAuth()

  const UpdateAccount = async () => {
    const formData = new FormData()
    if(file){
      formData.append('file', 
      {
        'uri': file.uri,
        'name': file.file,
        'type': file.mime
      })
      formData.append('isPublic', 'true')
    }

    if(description.length > 0){
      formData.append('description', description)
    }

    if(selected){
      const dt = new Date(selected.toString())
      formData.append('age', `${dt}`)
    }
    
    console.log(formData)  

    const result = await apiPrivate.put('user/', formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }).catch((e)=>{console.log(e)})
    if(result.data['res'] === "updated"){
      const u = {
        profile_picture: ""
      }
      if(result.data.result.profile_picture)
        u.profile_picture = result.data.result.profile_picture
      reg_sstage({...user, ...u})
    }
  }

  const activeState = () => {
    setActive(!active)
  }

  useEffect(()=>{
    
    if(selected){
      const dt = new Date(selected.toString())
      const dat = (dt.getMonth()+1)+"-"+dt.getDate()+"-"+dt.getFullYear()
      setDate(dat)
    }
  },[selected])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('SETTINGS')}</Text>
      <PicPicker file={file} setfile={setFile}/>
      <Input text={t('DESCRIPTION')} value={description} setValue={setDescription} rows={6} limitation={512}/>
      <DatePicker text={t('BIRTHDATE')} setActive={activeState} value={date}/>
      <Button text={t('NEXT')} action={UpdateAccount}/>
      {
        active ? 
          <DateTimePicker style={styles.callendarContainer}
            mode="single"
            date={selected}
            onChange={({ date }) => { setSelected(date), setActive(!active)}}
            
            styles={
            {
              day_label: {
                fontFamily:"ComfortaaRegular",
              },
              month_label: {
                fontFamily:"ComfortaaRegular"
              },
              
            }
          }
          /> :
         ""
    }
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
    gap: 20
  },
   callendarContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    width: 310,
  }
});
