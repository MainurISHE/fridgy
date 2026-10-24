import { Text, StatusBar, StyleSheet, View, Image } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { 
  useFonts, 
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold
} from '@expo-google-fonts/manrope';

export default function ProfileScreen() {
    let [fontsLoaded] = useFonts({
        Manrope_300Light,
        Manrope_400Regular,
        Manrope_600SemiBold,
        Manrope_700Bold,
    });

    if (!fontsLoaded) {
        return null;
    }
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar hidden={false} />
            <View style={styles.container}>
                <Image style={styles.logo} source={require("../../assets/img/logo.png")} />
                <View style={styles.info}>
                    <Image style={styles.avatar} source={require("@/assets/img/User.jpg")} />

                    <Text style={styles.name}>user</Text>
                    <Text style={styles.email}>user@example.com</Text>
                </View>

                <View style={styles.infoBar}>
                    <View>
                        <Text>Личные Данные</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
        backgroundColor: '#f6fafc'
    },
    logo: {
        width: 65,
        height: 52,
    },
    info: {
        backgroundColor: '#ffffff',
        borderRadius: 22,
        paddingBottom: 30,
        paddingTop: 30,
        alignItems: 'center'
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 26,
    },
    name: {
        fontFamily: 'Manrope_600SemiBold',
        fontSize: 24,
        color: "#192C38",
        marginTop: 12
    },
    email: {
        fontFamily: "Manrope_400Regular",
        fontSize: 14,
        color: "#7F919F"
    },
    infoBar: {
        alignItems: 'center',
        flexDirection: 'column'
    }
})