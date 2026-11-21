
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import type { ProfileStackParamList } from './ProfileStack';

type ProfileNavigationProp =
    NativeStackNavigationProp<ProfileStackParamList, 'ProfileMain'>;

export default function ProfileScreen() {
    const navigation = useNavigation<ProfileNavigationProp>();

    return (
        <>
            <Button
                title="Личные данные"
                onPress={() => navigation.navigate('PersonalData')}
            />

            <Button
                title="Настройки питания"
                onPress={() => navigation.navigate('NutritionSettings')}
            />

            <Button
                title="Уведомления"
                onPress={() => navigation.navigate('Notifications')}
            />

            <Button
                title="Служба поддержки"
                onPress={() => navigation.navigate('Support')}
            />
        </>
    );
}
