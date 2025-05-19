import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { startNetworkLogging } from 'react-native-network-logger';
import "@/lang/i18n.ts"
import { useColorScheme } from '@/hooks/useColorScheme';
import { get } from '@/services/store';
import { useState } from 'react';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isLogged = () => {
    return get('isLoggedIn') == "true"
  }
  const [loaded] = useFonts({
    ComfortaaRegular: require('../assets/fonts/comfortaa/Comfortaa-Regular.ttf'),
  });
  startNetworkLogging();
  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme} >
      <Stack>
        <Stack.Protected guard={!isLogged()}>
          <Stack.Screen name="(auth)" options={{  headerShown: false, statusBarHidden: true, navigationBarHidden: true }} />
        </Stack.Protected>
        
        <Stack.Protected guard={isLogged()}>
          <Stack.Screen name="(main_app)" options={{ headerShown: false }} />
        </Stack.Protected>
        
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
