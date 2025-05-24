import { Input } from '@/components/input';
import { Image } from 'expo-image';
import React, { ReactElement, useState } from 'react';
import { useSSR } from 'react-i18next';
import { Platform, StyleSheet, TouchableOpacity,Text, View, ScrollView } from 'react-native';
import { Post } from '@/components/post';


export default function HomeScreen() {
  const post = {
      marking: [
        {
          component: "View",
          styles:{
            backgroundColor: 'red',
            height: 40,
            width: 80
          },
          children: [
            {
              component: "Text",
              styles: "",
              value:"Text",
              children: [
              ]
            }
          ]
        },
        {
          component: "View",
          styles:{
            backgroundColor: 'yellow',
            height: 40,
            width: 80
          },
          children: [
            {
              component: "Text",
              styles: "",
              value:"Text",
              children: [
              ]
            },
            {
              component: "Image",
              styles: {
                height: 20,
                width: 20
              },
              value:"https://i.scdn.co/image/ab67616d00001e02dbea8c7661303ef4636cbc54",
              children: [
              ]
            }
          ]
        }

      ]
    } 
  return (
    <View style={{flex: 1}}>
        <ScrollView style={styles.view} contentContainerStyle={{alignItems: 'center', gap: 5, paddingTop:5, paddingBottom: 10}}>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
      <Post data={post}/>
    </ScrollView>
    </View>
    
    
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",
          
  },
});
