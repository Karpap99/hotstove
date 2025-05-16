import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import {Button} from "@/components/button"
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs  screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: false,
            tabBarStyle: {}
          }}>
      <Tabs.Screen name='index' options={{  headerShown: false }}/>
      <Tabs.Screen name='authorization' options={{  headerShown: false }}/>
      <Tabs.Screen name='registration' options={{  headerShown: false }}/>
      <Tabs.Screen name='account_setup' options={{headerShown: false}}/>
    </Tabs>
  );
}
