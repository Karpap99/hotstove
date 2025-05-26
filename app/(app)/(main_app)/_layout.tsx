import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Layout } from '@/components/layout';
import AppProvider from '@/context/appcontext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  
  return (
    <AppProvider>
    <Layout>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle:
        {
          display:'none'
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
     </AppProvider>   
    
  );
}
