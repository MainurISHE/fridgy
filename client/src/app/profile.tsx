
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Pressable,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';

import {
  userRoundIcon,
  saladIcon,
  bellIcon,
  headphonesIcon,
  chevronRightIcon,
  logOutIcon,
} from '@/constants/profile-icons';

import { useAuth } from '@/context/AuthContext';

const settings = [
  {
    id: 'personal',
    label: 'Личные данные',
    icon: userRoundIcon,
  },
  {
    id: 'nutrition',
    label: 'Настройки питания',
    icon: saladIcon,
  },
  {
    id: 'notifications',
    label: 'Уведомления',
    icon: bellIcon,
  },
  {
    id: 'support',
    label: 'Служба поддержки',
    icon: headphonesIcon,
  },
];

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  function handleLogout() {
    Alert.alert(
      'Выход из аккаунта',
      'Вы действительно хотите выйти?',
      [
        {
          text: 'Отмена',
          style: 'cancel',
        },
        {
          text: 'Выйти',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
            } catch {
              Alert.alert(
                'Ошибка',
                'Не удалось полностью очистить данные сессии.'
              );
            }
          },
        },
      ]
    );
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} />

      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('@/assets/img/logo.png')}
        />

        <View style={styles.info}>
          <Image
            style={styles.avatar}
            source={require('@/assets/img/user.jpg')}
          />

          <View style={styles.identity}>
            <Text style={styles.name}>
              {user?.displayName || 'Пользователь'}
            </Text>

            <Text style={styles.email}>
              {user?.email || ''}
            </Text>
          </View>
        </View>

        <View style={styles.settings}>
          {settings.map((item) => (
            <Pressable
              key={item.id}
              style={({ pressed }) => [
                styles.settingCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.settingIcon}>
                <SvgXml xml={item.icon} />
              </View>

              <Text style={styles.settingLabel}>
                {item.label}
              </Text>

              <SvgXml xml={chevronRightIcon} />
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logout,
            pressed && styles.pressed,
          ]}
        >
          <SvgXml xml={logOutIcon} />

          <Text style={styles.logoutLabel}>
            Выйти из аккаунта
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6FAFC',
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#F6FAFC',
  },

  logo: {
    width: 65,
    height: 52,
    marginBottom: 7,
  },

  info: {
    backgroundColor: '#ffffff',
    borderRadius: 22,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 26,
  },

  identity: {
    width: '100%',
    alignItems: 'center',
    gap: 4,
  },

  name: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 24,
    lineHeight: 29,
    color: '#192C38',
  },

  email: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#7F919F',
  },

  settings: {
    marginTop: 48,
    gap: 12,
  },

  settingCard: {
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },

  settingIcon: {
    width: 36,
    height: 36,
    backgroundColor: '#E7F5FE',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  settingLabel: {
    flex: 1,
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    lineHeight: 20,
    color: '#192C38',
  },

  logout: {
    height: 61,
    marginTop: 26,
    backgroundColor: '#FFF0F0',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },

  logoutLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    lineHeight: 20,
    color: '#D94C4C',
  },

  pressed: {
    opacity: 0.7,
  },
});
