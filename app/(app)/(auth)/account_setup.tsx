import { StyleSheet,Text,View} from 'react-native';
import {Button} from "@/components/button"
import { useEffect, useState } from 'react';
import { PicPicker } from '@/components/profilepic';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/input';
import { DatePicker } from '@/components/datepicker';
import DateTimePicker, { DateType} from 'react-native-ui-datepicker';
import { apiPrivate } from '@/common/api/api';
import { useAuth } from '@/context/authcontext';
import { AxiosResponse } from 'axios';



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
      formData.append('isPublic', 'true')
      formData.append('file', {
        'uri': file.uri,
        'name': file.file,
        'type': file.mime
      })
    }

    if(description.length > 0)
      formData.append('description', description)

    if(selected)
      formData.append('age', `${new Date(selected.toString())}`)

    const result: AxiosResponse | void = await apiPrivate.put('user/', formData, {headers: {"content-type": "multipart/form-data"},})

    if(result)
      if(result.data['res'] === "updated")
        reg_sstage({...user, ...result.data['result']})
  }

  const activeState = () => {
    setActive(!active)
  }

  useEffect(()=>{
    if(selected){
      const dt = new Date(selected.toString())
      setDate((dt.getMonth()+1)+"-"+dt.getDate()+"-"+dt.getFullYear())
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
