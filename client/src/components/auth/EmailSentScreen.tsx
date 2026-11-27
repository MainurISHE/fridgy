
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

import AuthScreen from './AuthScreen';
import AuthButton from './AuthButton';

const colors = Colors.light;

type Props = {
  email: string;
  onLogin: () => void;
  onBack: () => void;
};

export default function EmailSentScreen({
  email,
  onLogin,
  onBack,
}: Props) {
  return (
    <AuthScreen
      footer={
        <>
          <AuthButton
            title="Вернуться ко входу"
            onPress={onLogin}
          />

          <Pressable
            style={styles.backButton}
            onPress={onBack}
          >
            <Text style={styles.link}>
              Указать другой email
            </Text>
          </Pressable>
        </>
      }
    >
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Ionicons
            name="mail-outline"
            size={76}
            color={colors.accent}
          />
        </View>

        <Text style={styles.title}>
          Проверьте почту!
        </Text>

        <Text style={styles.description}>
          Если аккаунт с указанным email существует,
          на него будут отправлены инструкции
          для восстановления пароля.
        </Text>

        <Text style={styles.email}>
          {email}
        </Text>

        <Text style={styles.hint}>
          Не забудьте проверить папку «Спам».
        </Text>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    textAlign: 'center',
    color: colors.textPrimary,
    marginBottom: 12,
  },

  description: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 22,
    textAlign: 'center',
    color: colors.tabInactive,
  },

  email: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    textAlign: 'center',
    color: colors.accent,
    marginTop: 12,
  },

  hint: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    textAlign: 'center',
    color: colors.tabInactive,
    marginTop: 24,
  },

  backButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },

  link: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.tabActive,
  },
});
