import React, { useEffect } from "react"
import { ReactElement, useState } from "react"
import { TouchableOpacity, Text, StyleSheet, TextInput, View} from "react-native"
import { elementToJson } from "./ReactToJson"
import { Table } from "./types"


type Props = {
    id: number,
    setTable: (id: number, table: Table[]) => void,
    onDelete: (id: number) => void
}

type segmentProps = {
    id: number, 
    setTableSegment: (x: number, table: Table) => void,
    
}


const TableSegment = ({id, setTableSegment, onDeleteSegment}: segmentProps & { onDeleteSegment: (id: number) => void }) => {
  const [table, settable] = useState<Table>({key: "", value: ""});

  useEffect(() => {
    setTableSegment(id, table);
  }, [table]);

  return (
    <View style={styles.segments}>
      <View style={styles.segment}>
        <TextInput
          style={styles.text}
          value={table.key}
          onChangeText={e => settable({...table, key: e})}
        />
      </View>
      <View style={styles.segment}>
        <TextInput
          style={styles.text}
          value={table.value}
          onChangeText={e => settable({...table, value: e})}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, styles.delete_button, {width: "10%", height: '100%'}]}
        onPress={() => onDeleteSegment(id)}>
            <Text style={[styles.control, styles.delete]}>X</Text>
      </TouchableOpacity>
    </View>
  );
};



export const PostTableInput = ({id, setTable, onDelete}: Props) => {
    const [table, settable] = useState<Table[]>([])
    const [Segments, setSegments] = useState<ReactElement[]>([])
    const [counter, setCounter] = useState<number>(0)
    
    const updTable = (indx: number, data: Table) => {
        const newTable = [...table];
        newTable[indx] = data;
        settable(newTable);
        setTable(id, newTable);
    }

    const onDeleteSegment = (indx: number) => {
        const newTable = table.filter((_, i) => i !== indx);
        settable(newTable);
        setTable(id, newTable);
        setSegments(prev => prev.filter((_, i) => i !== indx));

    }


    const AddSegment = () => {
        settable([...table, {key:"", value:""}])
        setSegments(prev => [
            ...prev,
            <TableSegment key={counter} id={counter} setTableSegment={updTable} onDeleteSegment={onDeleteSegment} />
        ]);
        setCounter(prev=>prev+1)
        
    }

    return(
        <View>
            <View>
                {
                    Segments
                }
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={[styles.button, styles.delete_button]} onPress={()=>onDelete(id)}>
                    <Text style={[styles.control, styles.delete]}>Видалити елемент</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.edit_button]} onPress={()=>{AddSegment()}}>
                    <Text style={[styles.control, styles.edit]}>Додати сегмент</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        fontSize: 12,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(61, 60, 60)',
        
    },
    tag_container: {
        borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
        borderRadius: 3,
        paddingLeft: 5,
        paddingRight: 5
    },
    button: {
        borderColor: "rgb(0, 0, 0)",
        borderWidth: 0.5,
        height: 30,
        width: "50%",
        justifyContent: 'center',
        alignItems: "center"
    },
    delete_button: {
        backgroundColor:'rgb(255, 70, 70)',
    },
    edit_button:{
        backgroundColor:'rgb(255, 255, 255)'
    },

    controls: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: "center",
    },
    control: {
        fontSize: 12,
        fontFamily:"ComfortaaRegular",
       
    },
    delete: {
        color: 'rgb(255, 255, 255)',
    },
    edit: {
         color: 'rgb(61, 60, 60)',
    },
    segments:{ 
        display: 'flex',
        flexDirection: 'row',
        width: "100%",
        height: 45
    },
    segment: {
        width: "45%",
        borderColor:'rgb(61, 60, 60)',
        borderWidth: 0.3
    }
})