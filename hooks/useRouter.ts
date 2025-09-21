import { useRouter } from "expo-router";

type Routes = {
  navigateAuthorization: () => void;
  navigateRegistration: () => void;
  navigateStart: () => void;
  navigateAuthorizationType: () => void;
  navigateAccountSetup: () => void
};

export const useRoutes = (): Routes => {
  const router = useRouter();

  const navigateAuthorization = () => router.push("/(app)/(auth)/authorization");
  const navigateRegistration = () => router.push("/(app)/(auth)/registration");
  const navigateStart = () => router.push("/(app)/(auth)");
  const navigateAuthorizationType = () => router.push("/(app)/(auth)/authType");
  const navigateAccountSetup = () => router.push("/(app)/(auth)/accountSetup")

  return { 
        navigateAuthorization,  
        navigateRegistration, 
        navigateStart, 
        navigateAuthorizationType,
        navigateAccountSetup
    };
};
