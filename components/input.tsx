import { Link } from 'expo-router';
import { useEffect, type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput} from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string, value: string, setValue: (x: string) => void, rows?: number, limitation?: number };

export const Input = ({ text, value, setValue, rows, limitation}: Props) => {
  useEffect(()=> {
  if(limitation){

  }
  },[value])
  return (
    <View style={styles.shadow}>
        <Text style={styles.button_text}>{text}</Text>
        {
          rows ? 
          <TextInput multiline numberOfLines={rows} placeholder={text} style={ [styles.input, {height: 18 * rows, textAlignVertical: 'top', textAlign:"left"}]} onChangeText={(e)=>{setValue(e)}} maxLength={limitation} defaultValue={value} /> :
          <TextInput placeholder={text} style={styles.input} onChangeText={(e)=>{setValue(e)}} defaultValue={value} />
        }
        {
          limitation ?
          <Text style={[styles.button_text, {fontSize:12}]}>{value.length}/{limitation}</Text>:
          ""
        }
        
    </View>
    
  );
}


const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 290,
    backgroundColor: 'white',
  
    fontSize: 14,
    lineHeight: 18,
    fontFamily:"ComfortaaRegular",
    padding: 5,  
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 5, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3
},
  button_text:{
    fontSize: 14,
    fontFamily:"ComfortaaRegular"
  }
});
