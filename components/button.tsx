import { Link} from 'expo-router';
import { act, type ComponentProps } from 'react';
import { TouchableOpacity, Text, StyleSheet ,View} from 'react-native';
import {Shadow} from "react-native-shadow-2"


type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string, action?: () => void};


export const Button = (props: Props) => {
  
  return (
    <TouchableOpacity style={[styles.button,styles.container]} onPress={() => props.action ? props.action() : ''}>
      <Text style={styles.button_text}>{props.text}</Text>
    </TouchableOpacity>  
  );
}


const styles = StyleSheet.create({
  button: {
    height: 60,
    width: 290,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 10
},
  button_text:{
    fontSize: 18,
    fontFamily:"ComfortaaRegular"
  }
});
