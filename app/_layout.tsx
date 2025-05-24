import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { startNetworkLogging } from 'react-native-network-logger';
import "@/lang/i18n.ts"
import { useColorScheme } from '@/hooks/useColorScheme';
import { get, get_async, save} from '@/services/store';
import { useState } from 'react';
import AuthProvider, { useAuth } from '@/context/authcontext';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    ComfortaaRegular: require('../assets/fonts/comfortaa/Comfortaa-Regular.ttf'),
  });
  startNetworkLogging();
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }



  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <Stack>
        <Stack.Screen name="(app)" options={{  headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      </ThemeProvider>
    </AuthProvider>
    
  );
}
