import { Link } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput} from 'react-native';
import { ShadowView } from 'react-native-inner-shadow';
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
  useEffect(()=> {
  if(limitation){

  }
  },[value])
  return (
    <View >
        <Text style={styles.text}>{text}</Text>
         {
          rows ? 
            <TextInput multiline numberOfLines={rows} placeholder={text} style={ [styles.input, {height: 18 * rows, textAlignVertical: 'top', textAlign:"left"}]} onChangeText={(e)=>{setValue(e)}} maxLength={limitation} defaultValue={value} /> 
            :
                password ?
                <TextInput secureTextEntry placeholder={text} style={styles.input} onChangeText={(e)=>{setValue(e)}} defaultValue={value}/>
                  :
                <TextInput placeholder={text} style={styles.input} onChangeText={(e)=>{setValue(e)}} defaultValue={value} />
          }
        {
          limitation ?
          <Text style={[styles.text, {fontSize:12}]}>{value.length}/{limitation}</Text>:
          ""
        }
        {
          error ? 
          <Text style={[styles.text, {fontSize:10, color:'red', lineHeight: 13, paddingLeft: 2}]}>{error}</Text> :
          <Text style={[styles.text, {fontSize:10, color:'red', lineHeight: 13, paddingLeft: 2, visibility: 'none'}]}>{error}</Text>
        }
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
