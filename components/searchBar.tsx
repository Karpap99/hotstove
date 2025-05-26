import { Link } from 'expo-router';
import { t } from 'i18next';
import { type ComponentProps } from 'react';
import { StyleSheet , TextInput} from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{  
  value: string, 
  setValue: (x: string) => void, 
};

export const SearchBar = ({value, setValue}: Props) => {
  return (
      <TextInput placeholder={t("SEARCH")} style={styles.input} onChangeText={(e)=>{setValue(e)}} defaultValue={value} />
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    fontSize: 14,
    lineHeight: 18,
    fontFamily:"ComfortaaRegular",
    padding: 5,
    backgroundColor:'white',
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 5 
  }
});
