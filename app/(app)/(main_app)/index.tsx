import React from 'react';
import { StyleSheet, View} from 'react-native';
import { Posts } from '@/components/posts';

export default function HomeScreen() {
  return (
    <View style={{flex: 1}}>
       <Posts url='/post'/>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    overflow: "hidden",     
  },
});
