import { Link } from 'expo-router';
import { t } from 'i18next';
import { useEffect, useState, type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput} from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';
type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{  
  value: string, 
  setValue: (x: string) => void, 
  rows?: number, 
  limitation?: number, 
  password?: boolean,
  error?: string,
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
  },
  text:{
    fontSize: 14,
    fontFamily:"ComfortaaRegular"
  }
});
