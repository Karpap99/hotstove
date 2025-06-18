import { Image } from "expo-image"
import React, { memo, useState } from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { PostAction } from "./postAction"
import { Tag } from "./tag"
import { post_short } from "./types"
import { apiPrivate } from "@/common/api/api"
import { AxiosError, AxiosResponse } from "axios"
import { Href, router } from "expo-router"

type Props = {
    data: post_short
}

export const Post = memo(({data}:Props) => {
    const [postData, setPostData] = useState<post_short>(data)
    const profilePic = postData.creator?.profile_picture
        ? { uri: postData.creator.profile_picture }
        : require('@/assets/images/default_pfp.svg');
    

    const likedPic = postData.likes
        ? require('@/assets/images/likedRed.svg')
        : require('@/assets/images/like.svg');

    const toChannel =  () => {
        router.navigate(`/(app)/(main_app)/channel/${postData.creator.id}`as Href)
    }

    const toMessage =  () => {
        router.navigate(`/(app)/(main_app)/messages/${postData.id}`as Href)
    }
    
    const setLike = async () => {
        if(!postData.likes){
            setPostData({...postData, likeCount: postData.likeCount + 1 , likes: {}})
            await apiPrivate.post("/like/", { postId: data.id})
        }
        else{
            setPostData({...postData, likeCount: postData.likeCount - 1, likes: null})
            await apiPrivate.delete("/like/", {params: {postId: data.id}})
        }
        const post: AxiosResponse = await apiPrivate.get('/post/byId', {params: {postId: data.id} })
        if(typeof post !== 'undefined'){
            setPostData(post.data)
        }
    }

    return (
        <View style={styles.post} >
            <View style={styles.post_header}>
                <View style={styles.post_header_upper}>
                    <View style={styles.post_header_left}> 
                        <TouchableOpacity style={styles.image_container} onPress={()=>{toChannel()}}>
                            <Image style={styles.image} source={profilePic} />
                        </TouchableOpacity>
                        <View>
                            <Text style={styles.post_header_user}>@{postData.creator ? postData.creator?.nickname : 'default_user'}</Text>
                            <Text style={styles.post_header_user}>
                                {postData.createDateTime
                                    ? new Date(postData.createDateTime).toLocaleDateString('uk-UA', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                }): ''}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.post_header_right}>
                        {
                            postData.tags?.map(({id, content})=> (<Tag key={id} text={content}/>))
                        }
                    </View>
                </View>
                <Text style={styles.post_head}>{postData.title}</Text>
                <Text style={styles.post_description}>{data.description}</Text>
            </View>
            <View style={styles.post_content}>
                <Image style={styles.title_picture} source={postData.title_picture}/>
            </View>
            <View style={styles.post_footer}>
                <View style={styles.footer_actions}>
                    <PostAction 
                        text={(postData.likeCount ? `${postData.likeCount}` : "0")} 
                        image={likedPic}
                        action={setLike}
                    ></PostAction>
                    <PostAction text={(postData.messagesCount ? `${postData.messagesCount}` : "0")}  image={require('@/assets/images/message.svg')} action={toMessage}></PostAction>
                    <PostAction image={require('@/assets/images/share.svg')}></PostAction>
                </View>
                <View>
                    <Text>{(postData.views ? `${postData.views}` : "0")} переглядів</Text>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    post:{
       width: '98%',
       backgroundColor: 'white',
       borderColor: "rgba(0, 0, 0, 0.3)",
        borderWidth: 0.5,
       borderRadius: 5,
       position: "relative",
       paddingBottom: 40
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
        height: 120,
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
        padding: 1,
        alignItems: "center"
    },
    post_footer: {
        position: 'absolute',
        bottom: 0,
        width: "100%",
        borderTopColor: "rgba(0, 0, 0, 0.3)",
        borderTopWidth: 0.3,
        height: 35,
        justifyContent:'space-between',
        alignItems:"center",
        alignContent: 'center',
        display:"flex",
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10
    },
    footer_actions: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        gap: 15,

    },
    post_head:{
        fontSize: 22,
        fontFamily:"ComfortaaRegular",
        color: 'rgb(0, 0, 0)',
    },
    title_picture: {
        width: "100%",
        aspectRatio: "5/4",
        borderRadius: 1
    },
    post_description: {

    }
})