import { Link } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput,  ScrollView,TouchableOpacity } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string, setValue: (x: string) => void, values: Object[]};

export const Selector = ({ text, setValue, values}: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>(text)
  const [input, setInput] = useState<string>('')

  useEffect(()=>{
    setValue(selected)
    if(selected != text)
      setInput(selected)
  },[selected])

  return (
    <View style={styles.shadow}>
        <Text style={styles.text}>{text}</Text>
        <TouchableOpacity style={styles.selector} onPress={()=>setVisible(!visible)}>
          {visible ?
            <TextInput placeholder={text} style={styles.text} value={input} onChangeText={(e)=>setInput(e)}></TextInput>
            :
            <Text style={styles.text}>{selected}</Text>
          } 
        </TouchableOpacity>
        {
          visible ? 
            <ScrollView style={styles.list}  contentContainerStyle={{ flexGrow: 1 }}>
              {
                values.map(({name, key})=>(
                    name.includes(input) ? 
                      <TouchableOpacity style={styles.item} key={key} onPress={()=>{setSelected(name); setVisible(!visible)}}>
                        <Text style={styles.text}>{name}</Text>
                      </TouchableOpacity>
                    : null
                ))
              }
            </ScrollView> 
          :
          null
        }
    </View> 
  );
}


const styles = StyleSheet.create({
  selector: {
    height: 60,
    width: 290,
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily:"ComfortaaRegular",
    padding: 5,  
  },
  item:{
    borderBottomColor: "gray",
    borderBottomWidth: 0.3,
    height: 60,
    padding: 5,

  },
  list: {
    backgroundColor:"white",
    width: 290,
    minHeight: 60,
    maxHeight: 80,
    bottom: 0,
    flex: 1,
    overflow: 'hidden'
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {width: 5, height: 0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    position: 'relative'
  },
  text: {
    fontSize: 18,
    fontFamily:"ComfortaaRegular"
  }
});
