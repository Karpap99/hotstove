import { Tabs } from 'expo-router';
import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Layout } from '@/components/layout';
import AppProvider from '@/context/appcontext';
import { useAuth } from '@/context/authcontext';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {isLoaded} = useAuth()
  
  if(!isLoaded) return

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
          }}}/>
    </Layout>
     </AppProvider>   
    
  );
}
