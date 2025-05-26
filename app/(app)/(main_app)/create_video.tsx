
import { Input } from '@/components/input';
import { t } from 'i18next';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { VideoPicker } from '@/components/videoPicker';



export default function CreateVideo() {
    const [title, setTitle] = useState<string>('')
    const [file, setFile] = useState<any>()


    return (
    <View style={styles.container}>
        <VideoPicker file={file} setfile={setFile}/>
        <Input text='Назва' value={title} setValue={setTitle} ></Input>
        <Input text='Опис' value={title} setValue={setTitle} rows={7} limitation={1024} ></Input>   
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  container: {
    alignItems: "center"
  }
});
