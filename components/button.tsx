import { Link} from 'expo-router';
import { act, type ComponentProps } from 'react';
import { TouchableOpacity, Text, StyleSheet ,View} from 'react-native';
import { Image } from 'expo-image';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string, action?: () => void, image?: string};


export const Button = (props: Props) => {
  
  return (
    <TouchableOpacity style={[styles.button, (props.image ? {
      flexDirection:'row',
      paddingLeft: 15,
      gap: 10,
      justifyContent:"flex-start"} : "")]} onPress={() => props.action ? props.action() : ''}>
      {
        props.image ? 
        <Image style={styles.button_image} source={props.image}/> :
        ""
      }
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
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 10
  },
  button_text:{
    fontSize: 18,
    fontFamily:"ComfortaaRegular"
  },
  button_image:{
    height: 32,
    width: 32
  }
});
