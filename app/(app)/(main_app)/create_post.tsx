import React, { ReactElement, use, useEffect, useState } from 'react';
import { Platform, StyleSheet, TextInput, Touchable, TouchableOpacity, View, Text, ScrollView} from 'react-native';
import { JsonToReact } from '@/components/JsonToReact';
import { Input } from '@/components/input';
import { Selector } from '@/components/selector';
import { Image } from 'expo-image';
import * as ImagePicker from "expo-image-picker";
import { VideoPicker } from '@/components/videoPicker';
import { Button } from '@/components/button';
import { ComponentSelector } from '@/components/componentsselector';
import { element } from '@/components/types';
import { elementToJson} from '@/components/ReactToJson';
import { UIgenerator } from '@/components/UIgenerator';
import { apiPrivate } from '@/common/api/api';
import { AxiosError, AxiosResponse } from 'axios';
type data = {
  marking: element,
  files: {
    uri: string,
    name: string,
    type: string
  }[]
}
export default function CreatePost() {
  const [publication_type, setPublicationType] = useState<boolean>(false)
  const [postName, setPostName] = useState<string>('')
  const [postDescription, setPostDescription] = useState<string>('')
  const [postTags, setPostTags] = useState<string>('')
  const [postImage, setPostImage] = useState<any>({'uri': "",'name' : "",'type' : ""})
  const [postVideo, setPostVideo] = useState<any>({'uri': "",'name' : "",'type' : ""})
  const [triger, setTriger] = useState<boolean>(false)
  const [postData, setPostData] = useState<data>()



  const postPublication = async () => {
    setTriger(true)
    if(typeof postData !== 'undefined'){
      if(postData?.marking.children.length > 0){
        const {files, marking} = postData
        const formdata = new FormData()
        if(files.length > 0){
          files.map((file)=> {
            formdata.append('files', file)
          })
          formdata.append('isPublic', 'true')
        }
        formdata.append('files', postImage)
        formdata.append('marking', JSON.stringify(marking))
        formdata.append('description', postDescription)
        formdata.append('title', postName)
        const result: AxiosResponse | void = await apiPrivate.post('/post/', formdata, {headers: {"content-type": "multipart/form-data"}})
        .catch((err: AxiosError)=>{console.log(err)})
      }
    
    setTriger(false)
    }
  }

  const [Tags, setTags] = useState<object[]>([{
    title: 'buga',
    id: "wuga"
  },{
    title: 'buga',
    id: "guga"
  },{
    title: 'buga',
    id: "gruga"
  }])

  const [error, setError] = useState(null);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted"){
      return;
    } 
    const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true});
    if (!result.canceled) {
      setPostImage({
        'uri': result.assets[0].uri,
        'name' : "title_picture",
        'type' : result.assets[0].mimeType
      })
      setError(null);
    }
  }   
  const Pick = () => {
    if(postImage.uri != "") setPostImage({'uri': "",'fileName' : "",'mimeType' : ""});
    else pickImage()
  }

  return (
    <View style={styles.container}>
      <ScrollView style={{overflow: 'hidden'}} contentContainerStyle={{alignItems: "center",
    display: "flex",
    paddingTop: 10,
    paddingBottom: 20,
    gap: 10}}>
        <View style={styles.change_type_container}>
          <TouchableOpacity style={[styles.publication_type_body, (!publication_type ? styles.active_type : "")]} onPress={()=>setPublicationType(false)}>
            <Text style={styles.publication_type}>публікація</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.publication_type_body, (publication_type ? styles.active_type : "")]} onPress={()=>setPublicationType(true)}>
            <Text  style={styles.publication_type}>відео</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.image_selector} onPress={()=>Pick()}>
        {
          postImage.uri != "" ? 
            <Image style={{height:"100%", width:"100%"}} source={{uri: postImage.uri}}/>
          : 
          ""
        }
        </TouchableOpacity>
        <Text style={styles.text}> {postImage.uri != "" ? "Натисніть для видалення зображення" : "Натисніть для додавання зображення"}</Text>
        <Input text='Назва' value={postName} setValue={setPostName}/>
        <Input rows={8} limitation={1024} text='Опис' value={postDescription} setValue={setPostDescription}/>
        <Selector values={Tags} setValue={setPostTags} text='Теги'/>
        {
          publication_type ?
          <VideoPicker file={postVideo} setfile={setPostVideo}/> 
          :
          <UIgenerator triger={triger} setMarking={setPostData} />
        }
        <Button text='Опубліковати' action={postPublication}/>
      </ScrollView>
   </View>   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  publication_type: {
    fontSize: 22,
    fontFamily:"ComfortaaRegular",
    textAlign: "center"
  },
  publication_type_body: {
    borderBottomWidth: 3, 
    borderBottomColor: 'gray',
    width: '45%',
    textAlign: "center"
  }
  ,
  active_type: {
    borderBottomColor: "rgb(93, 190, 255)"
  },
  change_type_container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  image_selector:{
    width: "90%",
    height: 190,
    backgroundColor: "gray"
  },
  text:{
    fontSize: 12,
    fontFamily:"ComfortaaRegular"
  },
  post_body: {
    backgroundColor: "white",
    borderColor:'black',
    borderWidth: 0.3,
    width: 350
  }
});
