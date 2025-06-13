import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Post } from '@/components/post';
import { element, post_short } from '@/components/types';
import { useAuth } from '@/context/authcontext';
import { apiPrivate } from '@/common/api/api';
import { AxiosResponse } from 'axios';

export default function HomeScreen() {
  const [post, setPost] = useState<post_short[]>([])
  const getPosts = async () => {
    const result = await apiPrivate.get('post/')
    console.log(result.data)
    setPost(result.data)
  }
  useEffect(()=>{
    getPosts()
  },[])
 
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.view} contentContainerStyle={{alignItems: 'center', gap: 5, paddingTop:5, paddingBottom: 10}}>
        {
          post.map((el, index)=>(
            <Post key={index} data={el}/>
          ))
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",     
  },
});
