import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet ,View, TextInput} from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string };

export const Input = ({ text}: Props) => {
  return (
    <View style={styles.shadow}>
        <Text style={styles.button_text}>{text}</Text>
        <TextInput placeholder={text} style={styles.input} />
    </View>
    
  );
}


const styles = StyleSheet.create({
  input: {
    height: 60,
    width: 290,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 14,
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
