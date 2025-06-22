import { Link } from 'expo-router';
import { useEffect, useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, View, Text,ScrollView } from 'react-native';
import { Image } from "expo-image";
import { element, User } from './types';
import React from 'react';
import { Image as RNImage } from 'react-native';
import { PostTextInput } from './PostTextInput';
import { PostImageInput } from './PostImageInput';
import { PostTableInput } from './PostTableInput';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';



type Props = Omit<ComponentProps<typeof Link>, 'href'> & {marking: element};

export type elementPrepared = {
    component: string,
    styles: Object,
    key?: string,
    value: string,
    children: element[],
    width: number,
    height: number,
    aspectRatio: number,
}

const resolveImageSizes = async (el: element): Promise<element> => {
  if (el.component === 'Image' && el.value) {
    return new Promise<element>((resolve) => {
      RNImage.getSize(
        el.value,
        (width, height) => {
          resolve({
            ...el,
            styles: {
                aspectRatio: width / height,   
            }
            
          });
        },
        () => {
          resolve({
            ...el,
            styles: {
              ...el.styles,
              aspectRatio: 1,
            }
          });
        }
      );
    });
  }

  if (el.children && Array.isArray(el.children)) {
    const resolvedChildren = await Promise.all(
      (el.children as element[]).map(resolveImageSizes)
    );
    return { ...el, children: resolvedChildren };
  }

  return el;
};

const VideoEl = ({ uri }: { uri: string }) => {
  const player = useVideoPlayer(uri, player => {
    player.loop = true;
  });

  return (
    <View style={{width: "100%", aspectRatio: 9/6}}>
      <VideoView style={styles.video_player} player={player} />
    </View>
  );
};

const RenderEl = (el: element, key: number | string): React.ReactNode => {
  switch (el.component) {
    case 'View':
      return (
        <View key={key} style={styles.view}>
          {el.children?.map((child, idx) => RenderEl(child, idx))}
        </View>
      );
    case 'Text':
      return (
        <Text key={key} style={styles.text}>
          {el.value}
        </Text>
      );
    case 'Image':
      return (
        <View key={key} style={styles.img_wrapper}>
          <Image
            source={{ uri: el.value }}
            style={[styles.img, el.styles]}
          />
        </View>
      );
    case 'Video':
      return <VideoEl key={key} uri={el.value} />;
    case 'Table':
      return (
        <View key={key} style={styles.table_wrapper}>
            <View style={styles.table}>
            {
                el.children.map(({key, value})=>(
                    <View style={styles.table_segment}>
                        <View style={styles.table_halfsegment}>
                            <Text style={styles.text}>
                                {key}
                            </Text>
                        </View>
                        <View style={styles.table_halfsegment}>
                            <Text style={styles.text}>
                                {value}
                            </Text>
                        </View>
                    </View>
                ))
            }
            </View>
        </View>
        
      );
    case 'List':
      return (
        <View key={key} style={styles.table_wrapper}>
            <View style={styles.table}>
            {
                el.children.map(({value}, index)=>(
                    <View style={[styles.table_segment,{width: "100%"}]} key={index}>
                        <View style={[styles.table_halfsegment,{width: "100%"}]}>
                            <Text style={styles.text}>
                              {index+1}. {value}
                            </Text>
                        </View>
                    </View>
                ))
            }
            </View>
        </View>
        
      );
    default:
      return null;
  }
};


export const JsonToReact = ({ marking }: Props) => {
  const [prepared, setPrepared] = useState<element | null>(null);

  useEffect(() => {
    const prepare = async () => {
      const resolved = await resolveImageSizes(marking);
      setPrepared(resolved);
    };
    prepare();
  }, [marking]);

  if (!prepared) return null;

  return <>{RenderEl(prepared, 'main')}</>;
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'ComfortaaRegular',
        fontSize: 14
    },
    view:{
        flex: 1,
        gap: 10,
        padding: 5,
        overflow: "hidden"
    },
    img: {
        width: "100%",
        aspectRatio: 1
    },
    img_wrapper: {
        width: "100%",
        alignItems: 'center',
        justifyContent: "center"
    },
    table_segment: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    table: {
        width: "100%",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 0.3
    },
    table_halfsegment: {
        width: "50%",
        borderColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 0.3,
        padding: 10
    },
    table_wrapper:{ 
        width: "100%",
        alignItems: 'center',
        justifyContent: "center"
    
    },
    video_player: {
        height: '100%',
        width: '100%'
    },

});
