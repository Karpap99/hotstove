import { Href, Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import { type ComponentProps } from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet ,View} from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string };

export const Button = ({ text}: Props) => {
  return (
    <View style={styles.shadow}>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.button_text}>{text}</Text>
        </TouchableOpacity>
    </View>
    
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
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 5, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3
},
  button_text:{
    fontSize: 18,
    fontFamily:"ComfortaaRegular"
  }
});
