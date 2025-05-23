import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';
import { startNetworkLogging } from 'react-native-network-logger';
import "@/lang/i18n.ts"
import { useColorScheme } from '@/hooks/useColorScheme';
import AuthProvider, { useAuth } from '@/context/authcontext';

export default function AppLayout() {
  const {isLogged} = useAuth()

  return (
    <Stack>
      <Stack.Protected guard={!isLogged}>
        <Stack.Screen name="(auth)" options={{  headerShown: false, navigationBarHidden: true }} />
      </Stack.Protected>
      <Stack.Protected guard={isLogged}>
        <Stack.Screen name="(main_app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
