import { apiPrivate } from '@/common/api/api';
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

export default function Channel() {
  const params = useLocalSearchParams<{ id?: string }>();
  const {user} = useAuth()
  const [User, setUser] = useState<User>()
  useEffect(()=>{
    console.log(params)
  },[])

  const getUser = async () => {
    const payload = {
      'id': params['id']
    }
    const result = await apiPrivate.post('user/getUserWithContent/', payload);
  }


  return (
    <View>
      <View style={styles.header}>
        <View>
          <Image style={styles.user_image} source={''}/>
          <Text style={styles.user_name}>@default_user</Text>
        </View>
        
        <TouchableOpacity style={styles.subscribe_button}>
          <Text style={styles.subscribe_text}>
            Підписатися
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height:"100%"}}>
        <ScrollView>

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
    paddingBottom: 15,
    paddingTop: 15,
    gap: 20
  },
  user_image: {
    height: 200,
    width: 200,
    backgroundColor: "gray",
    borderRadius: 5
  },
  subscribe_button:{
    width: 290,
    height: 60,
    backgroundColor: 'rgb(255, 70, 70)',
     borderRadius: 5
  },
  user_name: {
    fontSize: 22,
    fontFamily: "ComfortaaRegular"
  },
  subscribe_text: {
    color: "white",
    fontSize: 24,
    fontFamily: "ComfortaaRegular"
  }
});
