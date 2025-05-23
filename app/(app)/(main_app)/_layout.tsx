import { Stack, Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Layout } from '@/components/layout';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  
  return (
    <Layout>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle:
        {
          display: 'none'
        }}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'main',
        }}
      />
      <Tabs.Screen
        name="followed"
        options={{
          title: 'subscribes',
        }}
      />
      </Tabs>
    </Layout>
        
    
  );
}
