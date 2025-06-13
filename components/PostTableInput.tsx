import React, { useEffect } from "react"
import { ReactElement, useState } from "react"
import { TouchableOpacity, Text, StyleSheet, TextInput, View} from "react-native"
import { elementToJson } from "./ReactToJson"
import { Table } from "./types"


type Props = {
    id: number,
    setTable: (id: number, table: Table[]) => void
}

type segmentProps = {
    id: number, 
    setTableSegment: (x: number, table: Table) => void
}


const TableSegment = ({id, setTableSegment}: segmentProps) => {
    const [table, settable] = useState<Table>({key: "", value: ""})

    useEffect(()=>{
        setTableSegment(id, table)
    },[table])

    return (
        <>
            <View style={styles.segments}>
                <View style={styles.segment}>
                    <TextInput style={styles.text} value={table.key} onChangeText={(e)=>{
                        const tablePart = {
                            ...table,
                            key: e
                        }
                        settable(tablePart)
                    }}/>
                </View>
                <View style={styles.segment}>
                     <TextInput style={styles.text} value={table.value} onChangeText={(e)=>{
                        const tablePart = {
                            ...table,
                            value: e
                        }
                        settable(tablePart)
                        }}/>
                </View>
                <TouchableOpacity style={[styles.button, styles.delete_button, {width: "10%", height: '100%'}]}>
                    <Text style={[styles.control, styles.delete]}>X</Text>
                </TouchableOpacity>
            </View>
            
        </>
    )
}



export const PostTableInput = ({id, setTable}: Props) => {
    const [table, settable] = useState<Table[]>([])
    const [Segments, setSegments] = useState<ReactElement[]>([])
    const [counter, setCounter] = useState<number>(0)
    
    const updTable = (indx: number, data: Table) => {
        settable([...table, table[indx]=data])
        setTable(id, table)
    }

    const AddSegment = () => {
        settable([...table, {key:"", value:""}])
        setSegments([...Segments, React.createElement(TableSegment, {id: counter, setTableSegment: updTable  })])
        
    }

    return(
        <View>
            <View>
                {
                    Segments
                }
            </View>
            <View style={styles.controls}>
                <TouchableOpacity style={[styles.button, styles.delete_button]}>
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