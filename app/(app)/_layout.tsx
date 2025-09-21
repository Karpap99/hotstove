import { Stack } from 'expo-router';
import  { useAuth } from '@/context/authcontext';

export default function AppLayout() {
  const {isLogged} = useAuth()

  return (
    <Stack>
      <Stack.Protected guard={!isLogged}>
        <Stack.Screen name="(auth)" options={{  headerShown: false }} />
      </Stack.Protected>
      <Stack.Protected guard={isLogged}>
        <Stack.Screen name="(main_app)" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
}
