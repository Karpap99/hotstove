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
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status === "granted")
        {
            const result = await ImagePicker.launchImageLibraryAsync({allowsEditing: true, mediaTypes: "videos"});
            if (!result.canceled) {
                setfile({
                    'uri': result.assets[0].uri,
                    'file' : result.assets[0].fileName,
                    'mime' : result.assets[0].mimeType
                })
                setError(null);
            }
        }   
    };

    const Pick = () => {
        if(file) setfile({ 'uri': "", 'fileName' : "",'mimeType' : ""});
        else pickImage()
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.picker} onPress={()=>Pick()}>
            {
                file ? 
                <>
                    <VideoView style={styles.video_player} player={player}/>
                    <Text style={styles.text}>Натисніть для прибирання відео</Text>
                </>
                :
                <Text style={styles.text}>Натисніть для вибору Відео</Text>
            }
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    picker: {
        height: 200,
        width: 350,
        backgroundColor: 'gray',
        overflow:"hidden",
        borderRadius: 5,
        alignContent: 'center',
        alignItems: "center",
        justifyContent:"center"
    },
    img: {
        height: 200,
        width: 200,
        backgroundColor: 'gray',
    },
    container: {
        display:"flex",
        alignItems: "center",
    },
    text:{
        position: 'absolute',
    fontSize: 14,
    fontFamily:"ComfortaaRegular",
    color: "white"
  },
  video_player: {
    height: '100%',
    width: '100%'
  }
});
