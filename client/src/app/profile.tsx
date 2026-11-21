
import {
    Text,
    StatusBar,
    StyleSheet,
    View,
    Image,
    Pressable,
    ScrollView,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import {
    useFonts,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
} from "@expo-google-fonts/manrope";

import {
    UserRound,
    Salad,
    Bell,
    Headset,
    ChevronRight,
    LogOut,
} from "lucide-react-native";

export default function ProfileScreen() {
    const [fontsLoaded] = useFonts({
        Manrope_400Regular,
        Manrope_500Medium,
        Manrope_600SemiBold,
    });

    if (!fontsLoaded) {
        return null;
    }

    const menuItems = [
        {
            title: "Личные данные",
            icon: UserRound,
        },
        {
            title: "Настройки питания",
            icon: Salad,
        },
        {
            title: "Уведомления",
            icon: Bell,
        },
        {
            title: "Служба поддержки",
            icon: Headset,
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Logo */}
                    <Image style={styles.logo} source={require("../../assets/img/logo.png")} />

                    {/* User information */}
                    <View style={styles.info}>
                        <Image
                            style={styles.avatar}
                            source={require("@/assets/img/User.jpg")}
                        />

                        <Text style={styles.name}>user</Text>

                        <Text style={styles.email}>
                            user@example.com
                        </Text>
                    </View>

                    {/* Profile menu */}
                    <View style={styles.menu}>
                        {menuItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <Pressable
                                    key={index}
                                    style={({ pressed }) => [
                                        styles.infoBtn,
                                        pressed && styles.pressed,
                                    ]}
                                    onPress={() => console.log(item.title)}
                                >
                                    <View style={styles.iconContainer}>
                                        <Icon
                                            size={25}
                                            color="#0789E5"
                                            strokeWidth={2.2}
                                        />
                                    </View>

                                    <Text style={styles.infoBtnText}>
                                        {item.title}
                                    </Text>

                                    <ChevronRight
                                        size={25}
                                        color="#8295A3"
                                        strokeWidth={2.5}
                                    />
                                </Pressable>
                            );
                        })}
                    </View>

                    {/* Logout */}
                    <Pressable
                        style={({ pressed }) => [
                            styles.logoutBtn,
                            pressed && styles.pressedLogout,
                        ]}
                        onPress={() => console.log("Logout")}
                    >
                        <LogOut
                            size={26}
                            color="#EF4444"
                            strokeWidth={2.2}
                        />

                        <Text style={styles.logoutText}>
                            Выйти из аккаунта
                        </Text>
                    </Pressable>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F6FAFC",
    },

    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 10,
    },

    scrollContent: {
        paddingBottom: 20,
    },

    // Logo
    logo: {
        width: 65,
        height: 52,
    },

    // User information
    info: {
        backgroundColor: "#FFFFFF",
        borderRadius: 36,
        paddingVertical: 28,
        alignItems: "center",
        marginBottom: 44,
    },

    avatar: {
        width: 76,
        height: 76,
        borderRadius: 25,
    },

    name: {
        fontFamily: "Manrope_600SemiBold",
        fontSize: 24,
        color: "#192C38",
        marginTop: 12,
    },

    email: {
        fontFamily: "Manrope_400Regular",
        fontSize: 14,
        color: "#8295A3",
        marginTop: 2,
    },

    // Menu
    menu: {
        gap: 11,
    },

    infoBtn: {
        width: "100%",
        minHeight: 61,
        backgroundColor: "#FFFFFF",
        borderRadius: 24,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 17,
        backgroundColor: "#E8F5FC",
        alignItems: "center",
        justifyContent: "center",
        marginRight: 14,
    },

    infoBtnText: {
        flex: 1,
        fontFamily: "Manrope_500Medium",
        fontSize: 17,
        color: "#192C38",
    },

    pressed: {
        opacity: 0.7,
    },

    // Logout
    logoutBtn: {
        height: 58,
        backgroundColor: "#FFF0F0",
        borderRadius: 23,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        marginTop: 24,
    },

    logoutText: {
        fontFamily: "Manrope_500Medium",
        fontSize: 17,
        color: "#EF4444",
    },

    pressedLogout: {
        opacity: 0.7,
    },
});
