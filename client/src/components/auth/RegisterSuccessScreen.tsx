
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

import AuthScreen from './AuthScreen';
import AuthButton from './AuthButton';

const colors = Colors.light;

type Props = {
  onLogin: () => void;
};

export default function RegisterSuccessScreen({
  onLogin,
}: Props) {
  return (
    <AuthScreen
      footer={
        <AuthButton
          title="Войти"
          onPress={onLogin}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="checkmark-circle-outline"
            size={88}
            color={colors.accent}
          />
        </View>

        <Text style={styles.title}>
          Аккаунт создан!
        </Text>

        <Text style={styles.description}>
          Вы успешно зарегистрировались.
          Теперь войдите в свой аккаунт,
          чтобы начать пользоваться Fridgy.
        </Text>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 40,
  },

  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.accentSurface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 26,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
  },

  description: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.tabInactive,
  },
});
