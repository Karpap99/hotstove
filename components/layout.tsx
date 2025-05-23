import { Header } from "@/components/header"
import { ScrollView, StyleSheet, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"


export const Layout = ({ children }: { children: React.ReactNode})=> {
    return(
    <SafeAreaView style={styles.container} >
        <Header/>
        <ScrollView >
            {children}
        </ScrollView>
    </SafeAreaView>
    
)
}

const styles = StyleSheet.create({
    container: {
        display:"flex",
        alignContent: "stretch",
        alignItems: "stretch"
    }
})