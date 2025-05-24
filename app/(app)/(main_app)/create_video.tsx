import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { get, save } from '@/services/store';
import { Image } from 'expo-image';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import * as fs from "expo-file-system"
import { PicPicker } from '@/components/profilepic';
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
