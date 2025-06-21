import { useSearch } from '@/context/searchcontext';
import { Href, Link, router } from 'expo-router';
import { t } from 'i18next';
import { useState, type ComponentProps } from 'react';
import { StyleSheet , TextInput} from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{  

};

export const SearchBar = ({}: Props) => {
  const [SearchValue, setSearchValue] = useState<string>('')
  const sumbmit = () => {
    router.replace(`/(app)/(main_app)/?query=${SearchValue}` as Href)
  }

  return (
    <TextInput 
    placeholder={t("SEARCH")} 
    style={styles.input} 
    onChangeText={(e)=>{setSearchValue(e)}} 
    value={SearchValue} 
    onSubmitEditing={sumbmit}
    returnKeyType="search" />
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
