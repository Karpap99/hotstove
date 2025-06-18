import { apiPrivate } from '@/common/api/api';
import { Link } from 'expo-router';
import { useCallback, useEffect, useState, type ComponentProps } from 'react';
import { Text, StyleSheet ,View, TextInput,  ScrollView,TouchableOpacity, FlatList } from 'react-native';

type Props = Omit<ComponentProps<typeof Link>, 'href'> & { text: string, setValue: (x: TagType[]) => void, values?: Object[]};

type TagType = {
  id: string,
  content: string
}


export const Selector = ({ text, setValue}: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [selected, setSelected] = useState<TagType[]>([])
  const [input, setInput] = useState<string>('')
  const [Tags, setTags] = useState<TagType[]>([])
  const [query, setQuery] = useState<string>('')

  const load_tags = useCallback(async () => {
    try {
      const res = await apiPrivate.get("/tag/", { params: { q: query } });
      setTags(res.data);
    } catch (e) {
      console.error(e);
    }
  }, [input]);

  useEffect(() => {
    if (!visible) return;
    const delayDebounce = setTimeout(() => {
      load_tags();
    }, 3000);

    return () => clearTimeout(delayDebounce);
  }, [input, visible]);

  const Tag = useCallback(({ item }:{item: TagType}) => {
    return(
      <TouchableOpacity style={styles.item} onPress={()=>{setSelected(prevSelected => [...prevSelected, item]); setVisible(false); }}>
        <Text style={styles.text}>{item.content}</Text>
      </TouchableOpacity>
    )
    
  }, [])

  const InputChange = (e: string) => {
      setInput(e)
  }
  
  useEffect(()=>{console.log(visible)},[visible])

  useEffect(()=>{
    setInput(selected.map(tag => tag.content).join(', '))
    setValue(selected)
  },[selected])

  useEffect(()=>{
    const inpt= (input.split(","))
    setQuery(inpt[inpt.length - 1].trimStart())
  },[input])

  return (
    <View style={styles.shadow}>
        <Text style={[styles.text, styles.header_text]}>{text}</Text>
        <TouchableOpacity style={styles.selector} onPress={()=>{
            setVisible(!visible) 
          }}>
          {visible ?
            <TextInput placeholder={text} style={styles.input} value={input} onChangeText={InputChange}></TextInput>
            :
            <Text style={styles.text}>{selected.map(tag => tag.content).join(', ') || 'Оберіть теги'}</Text>
          } 
        </TouchableOpacity>
        {
          visible &&
          <View style={styles.list}>
            {
              Tags.map((tg)=><Tag key={tg.id} item={tg}/>)
            }
          </View>
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
    height: 40,
    padding: 5,
  },
  list: {
    position: 'absolute',
    backgroundColor:"white",
    width: 350,
    maxHeight: 120,
    borderColor:'black',
    borderWidth: 0.5,
    bottom: -120,
    zIndex:2,
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
