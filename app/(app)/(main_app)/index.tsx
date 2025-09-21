import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Posts } from '@/components/posts';
import { useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const { query } = useLocalSearchParams();
  const searchQuery = typeof query === 'string' ? query : '';


  return (
    <View style={{flex: 1}}>
       <Posts url={`/post/`} query={searchQuery}/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",     
  },
});
