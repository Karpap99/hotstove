import { Link } from 'expo-router';
import { type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string, value: string, setValue: (x: string) => void };

export const DatePicker = () => {
  return (
    <View style={styles.shadow}>
        <SelectDropdown
    data={[0,1,2,3,4]}
    onSelect={(selectedItem, index) => {
      console.log(selectedItem, index);
    }}
    renderButton={(selectedItem, isOpened) => {
      return (
        <View>
          <Text>
            {(selectedItem && selectedItem.title) || 'Select your mood'}
          </Text>
        </View>
      );
    }}
    renderItem={(item, index, isSelected) => {
      return (
        <View style={(isSelected && {backgroundColor: '#D2D9DF'})}>
          <Text>{item.title}</Text>
        </View>
      );
    }}
    showsVerticalScrollIndicator={false}
  />
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
