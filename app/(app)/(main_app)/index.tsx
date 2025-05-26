import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Post } from '@/components/post';
import { post } from '@/components/types';


export default function HomeScreen() {
  const data: post = {
    marking: {
      component: "View",
      styles: '',
      value: '',
      children: [
        {
          component: "View",
          styles: '',
          value: 'Buga',
          children: []
        }
      ]
    }     
  }
 
  return (
    <View style={{flex: 1}}>
      <ScrollView style={styles.view} contentContainerStyle={{alignItems: 'center', gap: 5, paddingTop:5, paddingBottom: 10}}>
        <Post data={data}/>
        <Post data={data}/>
        <Post data={data}/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",     
  },
});
