
import { createNativeStackNavigator } from '@react-navigation/native-stack';


export type ProfileStackParamList = {
    ProfileMain: undefined;
    PersonalData: undefined;
    NutritionSettings: undefined;
    Notifications: undefined;
    Support: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackTitle: 'Назад',
                gestureEnabled: true,
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={ProfileScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PersonalData"
                component={PersonalDataScreen}
                options={{ title: 'Личные данные' }}
            />

            <Stack.Screen
                name="NutritionSettings"
                component={NutritionSettingsScreen}
                options={{ title: 'Настройки питания' }}
            />

            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ title: 'Уведомления' }}
            />

            <Stack.Screen
                name="Support"
                component={SupportScreen}
                options={{ title: 'Служба поддержки' }}
            />
        </Stack.Navigator>
    );
}
