import { Text, StyleSheet ,View, TextInput} from 'react-native';


type SingleInputProps = {
  setValue: (value: string) => void;
};

type ObjectInputProps = {
  setValue: (row: string, value: string) => void;
  field: string;
};

type Props = (SingleInputProps | ObjectInputProps) & { 
  text: string, 
  value: string,
  rows?: number, 
  limitation?: number, 
  password?: boolean,
  error?: string,
};

export const Input = (props: Props) => {
  const {text, value, rows, limitation, password, error} = props


  const handleChange = (data: string) => {
    if("field" in props) props.setValue(props.field, data)
    else props.setValue(data)
  }
  
  return (
    <View>
        <Text style={styles.text}>{text}</Text>
        <TextInput 
          multiline={rows ? true : false} 
          secureTextEntry={password} 
          numberOfLines={rows} 
          placeholder={text} 
          style={[styles.input, rows ? {height: 18 * rows, textAlignVertical: 'top', textAlign:"left"} : null]} 
          onChangeText={(e)=>{handleChange(e)}} maxLength={limitation} defaultValue={value} /> 
        <Text style={[styles.text, {fontSize:12 }, !limitation ? {display: "none"} : null]}>{value.length}/{limitation}</Text>
        <Text style={[styles.text, {fontSize:10, color:'red', lineHeight: 13, paddingLeft: 2},(error ? {visibility: 'none'} : null)]}>{error}</Text> 
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
function setValue(field: string, data: string) {
  throw new Error('Function not implemented.');
}

