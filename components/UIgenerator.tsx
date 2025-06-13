import React, { ReactElement, useEffect, useState } from 'react';
import { View,Text, StyleSheet} from 'react-native';
import { ComponentSelector } from './componentsselector';
import { elementToJson } from './ReactToJson';
import { element, marking, Table } from './types';


type UIinner = {
    value? : string,
    table? : Table[],
    uri? : string,
    name? : string,
    type? : string
}

type data ={
  marking: element, files: {uri: string,name: string,type: string}[]
}

type Props = {
    triger: boolean,
    setMarking: (data: data) => void,
}

export const UIgenerator =  ({triger, setMarking}:Props) => {
  const [post, setPost] = useState<ReactElement[]>([])
  const [counter, setCounter] = useState(0)
  const [postData, setPostData] = useState<UIinner[]>([])

  const getMarking = async () => {
    const dt = await elementToJson(post, postData, counter)
    setMarking(dt)
  }

  useEffect(()=>{
    if(triger === true){
      getMarking()
    }
  },[triger])

  const addEl = (x: ReactElement) => {
    setPost([...post, x])
    setPostData([...postData, 
        {
            value : "",
            table : [],
            uri : "",
            name : "",
            type : ""
        }])
    setCounter(counter+1)
  }

  const dellEl = (id: number, ) => {
  }

  const setText = (id: number, value: string,) => {
    const new_el = {...postData[id], value: value}
    const newPostData = [...postData]
    newPostData[id] = new_el
    setPostData([...newPostData])
  }

  const setImage= (id: number, uri: string, name: string, type: string) => {
    const new_el = {...postData[id], uri: uri, name: name, type: type }
    const newPostData = [...postData]
    newPostData[id] = new_el
    setPostData([...newPostData])
  }

  const setTable = (id: number, table: Table[]) => {
    const new_el = {...postData[id], table: table}
    const newPostData = [...postData]
    newPostData[id] = new_el
    setPostData([...newPostData])
  }

  return (
    <View>
        <View style={styles.post_body}>
            {post}
            <ComponentSelector setText={setText} setImage={setImage} setTable={setTable} counter={counter} addElement={addEl}/>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
  post_body: {
    backgroundColor: "white",
    borderColor:'black',
    borderWidth: 0.3,
    width: 350
  }
});

