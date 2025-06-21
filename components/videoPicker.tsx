import { Link } from 'expo-router';
import { useState, type ComponentProps } from 'react';
import { StyleSheet ,TouchableOpacity, View, Text} from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';


type Props = Omit<ComponentProps<typeof Link>, 'href'> & {file: any, setfile: (x: any) => void };

export const VideoPicker = ({ file, setfile}: Props) => {
    const [error, setError] = useState(null);

    const player = useVideoPlayer(file, player => {
        player.loop = true;
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted")
        {
            const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, mediaTypes: "videos"});
            if (!result.canceled) {
                setfile({
                    uri: result.assets[0].uri,
                    name: 'file0',
                    type: result.assets[0].mimeType || 'video/mp4'
                })
                setError(null);
            }
        }   
    };

    const Pick = () => {
        if(file.uri != "") setfile({ uri: "", name: "", type: "" });
        else pickImage()
    }

    return (
        <View style={styles.container}>
            <View style={styles.picker} >
                {
                    file.uri ? 
                    <VideoView style={styles.video_player} player={player}/>
                    :
                    <></>
                }
            </View>
            <TouchableOpacity style={styles.select} onPress={()=>Pick()}>
                <Text style={styles.text}>{file.uri != "" ? "Натисніть для прибирання відео" : "Натисніть для вибору Відео"}</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    picker: {
        height: 200,
        width: 340,
        backgroundColor: 'gray',
        overflow:"hidden",
        borderRadius: 2,
        alignContent: 'center',
        alignItems: "center",
        justifyContent:"center"
    },
    container: {
        display:"flex",
        alignItems: "center",
        gap: 5
    },
    text:{
    fontSize: 14,
    fontFamily:"ComfortaaRegular",
    },
    video_player: {
        height: '100%',
        width: '100%'
    },
    select: {
        width: 340,
        height: 40, 
        backgroundColor: "white",
        borderWidth: 0.4,
        borderColor: 'gray',
        borderRadius: 2,
        alignItems: "center",
        justifyContent: "center"
    }
});
