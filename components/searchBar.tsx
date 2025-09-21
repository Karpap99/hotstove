import { Href, router } from 'expo-router';
import { t } from 'i18next';
import { useState } from 'react';
import { StyleSheet , TextInput} from 'react-native';


export const SearchBar = () => {
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
