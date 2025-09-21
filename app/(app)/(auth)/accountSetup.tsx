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

type FileType = {
  uri: string,
  file: string,
  mime: string
}

export default function AccountSetup() {
  //controll-hooks
  const {t} = useTranslation();
  const {reg_sstage, user}= useAuth()
  //data-hooks
  const [description, setDescription] = useState<string>('')
  const [file, setFile] = useState<FileType | null>(null)
  const [selected, setSelected] = useState<DateType | null>(new Date());
  //helper-hooks
  const [active, setActive] = useState<boolean>(false)
  const [date, setDate] = useState<string>()
  

  const UpdateAccount = async () => {
    const formData = new FormData()
    if(file){
      formData.append('isPublic', 'true')
      formData.append('file', {
        'uri': file.uri,
        'name': file.file,
        'type': file.mime
      } as any)
    }
    if(description.length > 0) formData.append('description', description)
    if(selected) formData.append('age', new Date(selected.toString()).toISOString())
    const result: AxiosResponse | void = await apiPrivate.put('/user-data/', formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }) 
    if (result?.data?.res === "updated" && result.data.result) {
      reg_sstage({ ...user, ...result.data.result });
    }
  }

  const handelDateChange = (date: DateType | null) => {
    if(!date) return
    setSelected(date)
    if(selected){
      const dt = new Date(selected.toString())
      setDate((dt.getMonth()+1)+"-"+dt.getDate()+"-"+dt.getFullYear())
    }
    setActive(false)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('SETTINGS')}</Text>
      <PicPicker file={file} setFile={setFile}/>
      <Input text={t('DESCRIPTION')} value={description} setValue={setDescription} rows={6} limitation={512}/>
      <DatePicker text={t('BIRTHDATE')} setActive={() => setActive(prev => !prev)} value={date}/>
      <Button text={t('NEXT')} action={UpdateAccount}/>
      {
        active && <DateTimePicker style={styles.callendarContainer}
            mode="single"
            date={selected}
            onChange={({ date }) => handelDateChange(date)}
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
          /> 
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
