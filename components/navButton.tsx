import { StyleSheet ,TouchableOpacity, Text } from 'react-native';
import { Image } from 'expo-image';

type Props = {
    text?: string,
    image?: string,  
    action? () : void
}

export const NavButton = ({text,image, action}: Props) => {

    return (
        <TouchableOpacity style={[styles.navButton]} >
            <Image style={styles.navImage} source={image ? image : require("@/assets/images/authButton.svg")}/>
            {text ? <Text style={styles.navText}>
                {text}
            </Text> : "" }
        </TouchableOpacity>
        
    );
}


const styles = StyleSheet.create({
    navButton: {
        display:"flex",
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: "center",
        height: 50,
        width: 60,
        gap: 3
    },
    navText: {
        fontSize: 10,
        lineHeight: 12,
        fontFamily:"ComfortaaRegular",
        color: "rgb(41, 41, 41)"
    },
    navImage: {
        height: 25,
        width: 25
    }

});
