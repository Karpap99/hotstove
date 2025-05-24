import { StyleSheet, TouchableOpacity, View, Text } from "react-native"
import { Image } from "expo-image"
import { useAuth } from "@/context/authcontext"
import { ReactElement, useEffect, useState } from "react"
import { rgbaColor } from "react-native-reanimated/lib/typescript/Colors"
import React from "react"
import {User} from "./types"
import { Tag } from "./tag"
import { PostAction } from "./postAction"



type post = { 
  marking: element[],
  user?: User
}

type element = {
  component: string,
  styles: Object,
  value?: string,
  children: element[]
}


type Props = {
    data: post
}

export const Post = ({data}:Props) => {
    const [PostEl, setPostEl] = useState<ReactElement>()
    const [date, setDate] = useState<string>(new Date().toDateString())
    const [tags, setTags]  =useState<string[]>(['італія', "м'ясні страви", "спагеті",'італія', "м'ясні страви", "спагеті"])
    const JsonToReact =  (obj: post) => {
    
    const ReturnEl: any = (el: element, ky: number) => {
      switch(el.component){
        case 'View':
          return React.createElement(View, {style:el.styles, key:ky}, [el.children.map((elem, index) => ReturnEl(elem, index))])
          break
        case 'Text':
          return React.createElement(Text, {key:ky}, [el.value])
          break
        case 'Image':
          return React.createElement(Image, {style:el.styles,source: el.value,key:ky})
          break
        case 'List':
          break
      }
      
    }
    const components = obj['marking']
    const view = React.createElement(View, {}, [components.map((comp, index) => ReturnEl(comp, index))])
    return view
  }

  useEffect(()=>{
    setPostEl(JsonToReact(data))
  },[])

    return (
        <View style={styles.post} >
            <View style={styles.post_header}>
                <View style={styles.post_header_upper}>
                    <View style={styles.post_header_left}> 
                    <TouchableOpacity style={styles.image_container}>
                    {
                     data.user ? 
                        data.user.profile_picture ?
                            <Image style={styles.image} source={data.user.profile_picture}/> :
                            <Image style={styles.image} source={require("@/assets/images/default_pfp.svg")}/>
                            :
                            <Image style={styles.image} source={require("@/assets/images/default_pfp.svg")}/>
                                    
                    }
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.post_header_user}>@{data.user ? data.user.nickname : 'default_user'}</Text>
                        <Text style={styles.post_header_user}>{date}</Text>
                    </View>
                </View>
                <View style={styles.post_header_right}>
                    {
                        tags.map((str, index)=> (<Tag key={index} text={str}></Tag>))
                    }
                </View>
                </View>
                <Text style={styles.post_head}>Default Header</Text>
            </View>
            <View style={styles.post_content}>
                {
                PostEl
                }
            </View>
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
    }
    ,post_header_left:{
        display:'flex',
        flexDirection: "row",
        gap: 5
    }
    ,post_header_right:{
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