import React, { ReactElement, useEffect, useState } from 'react';
import { View,Text, StyleSheet} from 'react-native';
import { ComponentSelector } from './componentsselector';
import { elementToJson } from './ReactToJson';
import { element, marking, Table } from './types';


type UIinner = {
  id: number,
  value? : string,
  table? : Table[],
  uri? : string,
  name? : string,
  type? : string
  }
    
type data ={
  marking: element, files: {uri: string,name: string,type: string}[]
}

type PostElement = {
  id: number,
  Post: ReactElement
}


type Props = {
    triger: boolean,
    setMarking: (data: data) => void,
}

export const UIgenerator =  ({triger, setMarking}:Props) => {
  const [counter, setCounter] = useState(0)
  const [post, setPost] = useState<PostElement[]>([])
  
  const [postData, setPostData] = useState<UIinner[]>([])
  const getMarking = async () => {
    const dt = await elementToJson({post, posdData:postData})
    setMarking(dt)
  }

  useEffect(()=>{
    if(triger === true){
      getMarking()
    }
  },[triger])

  const addEl = (element: ReactElement, id: number) => {
    setPost(prev => [...prev, { id, Post: element }]);
    setPostData([...postData, 
        {
            id: counter,
            value : "",
            table : [],
            uri : "",
            name : "",
            type : ""
        }])
    setCounter(prev => prev + 1);
  }

  const dellEl = (id: number) => {
    setPost(prev => prev.filter(el => el.id !== id));
    setPostData(prev => prev.filter(el => el.id !== id));
  };

  const setText = (id: number, value: string,) => {
    setPostData(prev =>
    prev.map(item =>
      item.id === id ?  { ...item, value } :  item
    )
    );
  }

  const setImage= (id: number, uri: string, name: string, type: string) => {
    setPostData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, uri, name, type } : item
      )
    );
  }

  const setTable = (id: number, table: Table[]) => {
    setPostData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, table } : item
      )
    );
  }

  const setList = (id: number, list: {id: number, value: string}[]) => {
    setPostData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, list } : item
      )
    );
  }

  return (
    <View>
        <View style={styles.post_body}>
            {post.map(({id, Post})=>Post)}
            <ComponentSelector setText={setText} setImage={setImage} setTable={setTable} setList={setList} nextId={counter} addElement={addEl} onDelete={dellEl}/>
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

