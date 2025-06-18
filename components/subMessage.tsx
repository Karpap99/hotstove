import { View, Text, StyleSheet, TouchableOpacity} from "react-native"
import { User } from "./types";
import { Image } from "expo-image";
import { Href, router } from "expo-router";
import { PostAction } from "./postAction";
import { useEffect, useState } from "react";
import { apiPrivate } from "@/common/api/api";



type data = {
    id: string,
    createDateTime: string,
    text: string,
    user: {
        id: string,
        nickname: string,
        profile_picture: string
    },
    receiver: {
        id: string,

    },
    likesCount?:number,
    isLiked: boolean, 
}

type message_to = {
  replyTo: 'message' | 'submessage', 
  messageId: string, 
  user: {
    id: string,
    nickname: string, 
    profile_picture: string 
  }
}

type Props = {
    dt: data,
    setSubmessageToAnswer: (x: message_to) => void
}





export const SubMessage = ({dt, setSubmessageToAnswer}: Props)=> {
    const [Message, setMessage] = useState<data>(dt)
    
    const setMessageToAnsw = () => {
        setSubmessageToAnswer(
            {
                replyTo: 'message',
                messageId: Message.id,
                user: {
                    id: Message.user.id,
                    nickname: Message.user.nickname,
                    profile_picture: Message.user.profile_picture
                }
            }
        )
    }   
    useEffect(() => {
        setMessage(dt);
    }, [dt]);

    const profilePic = Message.user.profile_picture
    ? { uri: dt.user.profile_picture }
    : require('@/assets/images/default_pfp.svg');
    
    const likedPic = Message.isLiked
    ? require('@/assets/images/likedRed.svg')
    : require('@/assets/images/like.svg');


    const toChannel =  () => {
        router.navigate(`/(app)/(main_app)/channel/${Message.user.id}`as Href)
    }

   const LikeMessage = async () => {
    if (!Message) return;

    if (Message.isLiked) {
        const res = await apiPrivate.delete('submessage-like', { params: { messageId: Message.id } });
        if(res){
            setMessage({
            ...Message,
            isLiked: false,
            likesCount: (Message.likesCount || 1) - 1
        });
        }
    } else {
        const res = await apiPrivate.post('submessage-like', { messageId: Message.id })
        if(res){
            setMessage({
            ...Message,
            isLiked: true,
            likesCount: (Message.likesCount || 0) + 1
        });
        }
        
    }
    };


    return(
        <View style={styles.message_body}>
            <View style={styles.message_header}>
                <TouchableOpacity style={styles.image_container} onPress={()=>{toChannel()}}>
                            <Image style={styles.image} source={profilePic} />
                </TouchableOpacity>
                <Text style={styles.user_nickname}>@{Message.user.nickname || 'default_user'} | {Message.createDateTime
                                    ? new Date(Message.createDateTime).toLocaleDateString('uk-UA', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                }): ''}</Text>
            </View>
            <View style={styles.content}>
                <Text style={styles.message_text}>
                    {Message.text}
                </Text>
            </View>
            <View style={styles.message_footer}>
                <View style={styles.action}>
                    <TouchableOpacity onPress={LikeMessage} >
                        <Image style={styles.ico} source={likedPic}/>
                    </TouchableOpacity>
                    <Text style={styles.message_text}>{Message.likesCount}</Text>
                </View>
                <TouchableOpacity onPress={setMessageToAnsw}>
                    <Text style={styles.message_text}>
                        відповісти
                    </Text>
                </TouchableOpacity>
            </View>
        </View>  
    )
}


const styles = StyleSheet.create({
    message_body:{
        width: "95%",
        backgroundColor: "white",
        borderColor: 'black',
        borderWidth: 0.3,
        borderRadius: 3
    },
    message_header: {
        display: 'flex',
        padding: 5,
        flexDirection: 'row',
        gap: 5,
        width: "100%",
        borderBottomColor: 'black',
    },
     image:{
        height:25,
        width: 25,
        backgroundColor: 'gray',
        borderRadius: "50%"
    },
    image_container: {
        height:25,
        width: 25,
        backgroundColor: 'gray',
        borderRadius: 3,
        overflow: 'hidden'
    },
    user_nickname: {
        color: "gray",
        fontSize: 14,
        fontFamily: "ComfortaaRegular"
    },
    content: {
        padding: 5, 
        borderBottomColor: 'black',
    },
    message_text:{
        fontSize: 14,
        fontFamily: "ComfortaaRegular",
        alignItems:"center"
    },
    message_footer: {
        display:"flex",
        flexDirection: 'row',
        alignItems: "center",
        gap: 20,
        paddingLeft: 5
    },
    action: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        padding: 2
    },
    ico: {
        height:20,
        width: 20,
    }
})