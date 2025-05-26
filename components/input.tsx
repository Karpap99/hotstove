import { Link } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput} from 'react-native';
type Props = Omit<ComponentProps<typeof Link>, 'href'> & 
{ 
  text: string, 
  value: string, 
  setValue: (x: string) => void, 
  rows?: number, 
  limitation?: number, 
  password?: boolean,
  error?: string,
};

export const Input = ({ text, value, setValue, rows, limitation, password,error}: Props) => {
  return (
    <View >
        <Text style={styles.text}>{text}</Text>
        <TextInput 
          multiline={rows ? true : false} 
          secureTextEntry={password} 
          numberOfLines={rows} 
          placeholder={text} 
          style={[styles.input, rows ? {height: 18 * rows, textAlignVertical: 'top', textAlign:"left"} : null]} 
          onChangeText={(e)=>{setValue(e)}} maxLength={limitation} defaultValue={value} /> 
        <Text style={[styles.text, {fontSize:12 }, !limitation ? {display: "none"} : null]}>{value.length}/{limitation}</Text>
        <Text style={[styles.text, {fontSize:10, color:'red', lineHeight: 13, paddingLeft: 2},(error ? {visibility: 'none'} : null)]}>{error}</Text> 
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 350,
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
