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
        <Text style={[styles.text, styles.header_text]}>{text}</Text>
        <TouchableOpacity style={styles.selector} onPress={()=>setVisible(!visible)}>
          {visible ?
            <TextInput placeholder={text} style={styles.input} value={input} onChangeText={(e)=>setInput(e)}></TextInput>
            :
            <Text style={styles.text}>{selected}</Text>
          } 
        </TouchableOpacity>
        {
          visible ? 
            <ScrollView style={styles.list}  contentContainerStyle={{ flexGrow: 1 }}>
              {
                values.map(({title, id})=>(
                      title.includes(input) ? 
                      <TouchableOpacity style={styles.item} key={id} onPress={()=>{setSelected(title); setVisible(!visible)}}>
                        <Text style={styles.text}>{title}</Text>
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
    width: 350,
    backgroundColor: 'white',
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 5 ,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 16,
    fontFamily:"ComfortaaRegular",
  },
  item:{
    borderBottomColor: "gray",
    borderBottomWidth: 0.3,
    height: 60,
    padding: 5,
  },
  list: {
    backgroundColor:"white",
    width: 350,
    minHeight: 60,
    maxHeight: 80,
    borderColor:'black',
    borderWidth: 0.5,
    bottom: 0,
    flex: 1,
    overflow: 'hidden'
  },
  shadow: {
    position: 'relative'
  },
   input: {
    height: 60,
    width: 350,
    fontSize: 14,
    lineHeight: 18,
    fontFamily:"ComfortaaRegular",
    backgroundColor:'white',
    borderColor:'black',
    borderWidth: 0.5,
    borderRadius: 5 ,
    padding: 5
  },
  text:{
    paddingBottom: 5,
    paddingLeft: 5,
    fontSize: 14,
    fontFamily:"ComfortaaRegular"
  },
  header_text:{
    padding: 0
  }
});
