import { Button } from "@/components/button";
import { useRoutes } from '@/hooks/useRouter';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

export default function AuthType() {
  const {navigateAuthorization, navigateRegistration} = useRoutes();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>HotStove</Text>
      <Text style={styles.description}>{t('FORAPPUSE')}</Text>
      <View style={{gap: 20}}>
        <Button text={t('AUTHORIZATION')} action={navigateAuthorization} image={require('@/assets/images/authButton.svg')} />
        <Button text={t("REGISTRATION")} action={navigateRegistration} image={require('@/assets/images/authButton.svg')}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontFamily:"ComfortaaRegular"
  },
  description: {
    fontSize: 18, 
    textAlign: "center",
    fontFamily:"ComfortaaRegular"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    textAlign: "center",
    justifyContent: 'center',
    backgroundColor: 'white',
    gap: 35
  },
});
