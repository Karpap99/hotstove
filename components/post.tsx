import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Image } from "expo-image"
import { ReactElement, useEffect, useState } from "react"
import React from "react"
import { Tag } from "./tag"
import { PostAction } from "./postAction"
import { JsonToReact } from "./JsonToReact"
import { post } from "./types"

type Props = {
    data: post
}

export const Post = ({data}:Props) => {
    const [PostEl, setPostEl] = useState<ReactElement>()
    const [date, setDate] = useState<string>(new Date().toDateString())
    const [tags, setTags] =useState<string[]>(['італія', "м'ясні страви", "спагеті",'італія', "м'ясні страви", "спагеті"])
    
    useEffect(()=>{
        setPostEl(JsonToReact(data))
    },[])

    return (
        <View style={styles.post} >
            <View style={styles.post_header}>
                <View style={styles.post_header_upper}>
                    <View style={styles.post_header_left}> 
                        <TouchableOpacity style={styles.image_container}>
                            <Image style={styles.image} source={data.user != undefined ? (data.user.profile_picture != "" ? data.user.profile_picture : require("@/assets/images/default_pfp.svg")) : require("@/assets/images/default_pfp.svg")}/>
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.post_header_user}>@{data.user ? data.user.nickname : 'default_user'}</Text>
                            <Text style={styles.post_header_user}>{date}</Text>
                        </View>
                    </View>
                    <View style={styles.post_header_right}>
                        {
                            tags.map((str, index)=> (<Tag key={index} text={str}/>))
                        }
                    </View>
                </View>
                <Text style={styles.post_head}>Default Header</Text>
            </View>
            <View style={styles.post_content}>{PostEl}</View>
            <View style={styles.post_footer}>
                <View style={styles.footer_actions}>
                    <PostAction text="0" image={require('@/assets/images/message.svg')}></PostAction>
                    <PostAction text="0" image={require('@/assets/images/message.svg')}></PostAction>
                    <PostAction text="0" image={require('@/assets/images/message.svg')}></PostAction>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    post:{
       width: '98%',
       height: 350,
       backgroundColor: 'white',
       borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
       borderRadius: 5,
       position: "relative"
    },
    image:{
        height:45,
        width: 45,
        backgroundColor: 'gray',
        borderRadius: "50%"
    },
    image_container: {
        height:45,
        width: 45,
        backgroundColor: 'gray',
        borderRadius: 3,
        overflow: 'hidden'
    },
    post_header: {
        height: 90,
        padding:5,
        paddingBottom: 10,
        display:'flex',
        justifyContent: "space-between",
        borderBottomColor: "rgba(0, 0, 0, 0.3)",
        borderBottomWidth: 0.3,
    },
    post_header_upper:{
        display:'flex',
        flexDirection: "row",
        justifyContent: "space-between",
    },
    post_header_left:{
        display:'flex',
        flexDirection: "row",
        gap: 5
    },
    post_header_right:{
        display:'flex',
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 5,
        width: '50%',
        flexWrap: 'wrap',
        maxHeight: 48, 
        overflow: "hidden"
    },
    post_header_user: {
        fontSize: 14,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(61, 60, 60)'
    },
    post_content: {
        padding: 5
    },
    post_footer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        borderTopColor: "rgba(0, 0, 0, 0.3)",
        borderTopWidth: 0.3,
        height: 35,
        justifyContent:'center'
    },
    footer_actions: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        paddingLeft: 10
    },
    post_head:{
        fontSize: 22,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(0, 0, 0)',
    }
})