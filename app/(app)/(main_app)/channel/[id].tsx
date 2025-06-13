import { apiPrivate } from '@/common/api/api';
import { Post } from '@/components/post';
import { useAuth } from '@/context/authcontext';
import { get, save } from '@/services/store';
import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import { subscribe } from 'expo-router/build/link/linking';
import { ComponentProps, useEffect, useState } from 'react';
import { Platform, StyleSheet, View, Text, TouchableOpacity, ScrollView} from 'react-native';


type Props = Omit<ComponentProps<typeof Link>, 'href'> & {};

type User = {
  id: string,
  nickname: string,
  email:string,
  description:string,
  profile_picture: string
}


type Post = {
  id: string,
  marking: Object,
  tags: string[]
}
const data =
{
    marking: {
      component: "ScrollView",
      styles: '',
      value: '',
      children: [
        {
          component: "View",
          styles: '',
          value: 'Buga',
          children: []
        }
      ]
    }     
  }
export default function Channel() {
  const params = useLocalSearchParams<{ id?: string }>();
  const {user, userData} = useAuth()
  const [User, setUser] = useState<User>()

  
  useEffect(()=>{
    if(params.id == user.id){
      setUser({...user, ...userData})
    }
  },[])

  const getUser = async () => {
    const payload = {
      'id': params['id']
    }
    const result = await apiPrivate.post('user/getUserWithContent/', payload);
  }


  return (
    <View style={{flex: 1, alignItems: "stretch"}}>
      <View style={styles.header}>
        <View>
          <Image style={styles.user_image} source={User?.profile_picture}/>
          <Text style={styles.user_name}>@{User?.nickname}</Text>
        </View>
        <TouchableOpacity style={styles.subscribe_button}>
          <Text style={styles.subscribe_text}>
            Підписатися
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 7}}>
        <ScrollView style={{overflow:"hidden"}} contentContainerStyle={{alignItems: 'center', gap: 5, paddingTop:5, paddingBottom: 10}}>
          <Post data={data}/>
          <Post data={data}/>
          <Post data={data}/>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "white",
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
    borderBottomWidth: 0.3,
    display: "flex",
    alignItems: 'center',
    paddingTop: 15,
    gap: 20,
    flex: 6
  },
  user_image: {
    height: 200,
    width: 200,
    backgroundColor: "gray",
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 0.3
  },
  subscribe_button:{
    width: 290,
    height: 60,
    backgroundColor: 'rgb(255, 70, 70)',
    borderRadius: 5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  user_name: {
    fontSize: 22,
    fontFamily: "ComfortaaRegular",
    textAlign: 'center', 
  },
  subscribe_text: {
    color: "white",
    fontSize: 24,
    fontFamily: "ComfortaaRegular"
  }
});
