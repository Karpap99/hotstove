import React, { useEffect } from 'react';
import { StyleSheet, View} from 'react-native';
import { Posts } from '@/components/posts';
import { Href, useLocalSearchParams } from 'expo-router';

export default function Likes() {
  return (
    <View style={{flex: 1}}>
       <Posts url={`/post/GetLikedPosts`}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",     
  },
});
