
import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';

import AuthScreen from './AuthScreen';
import AuthInput from './AuthInput';
import AuthButton from './AuthButton';

const colors = Colors.light;

type Props = {
  onLogin: () => void;
  onSuccess: (email: string) => void;
};

export default function ForgotPasswordScreen({
  onLogin,
  onSuccess,
}: Props) {
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setEmailError('');
    setServerError('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setEmailError('Некорректный email');
      return;
    }

    try {
      setLoading(true);

      await forgotPassword(normalizedEmail);

      onSuccess(normalizedEmail);
    } catch (error) {
      if (axios.isAxiosError(error) && !error.response) {
        setServerError('Нет подключения к серверу');
      } else {
        setServerError(
          'Не удалось отправить запрос. Попробуйте снова.'
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScreen
      title="Восстановление пароля"
      hint="Введите email, который использовали при регистрации."
    >
      <Text style={styles.description}>
        Мы отправим инструкции для восстановления пароля
        на вашу электронную почту.
      </Text>

      {!!serverError && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color="#D94C4C"
          />

          <Text style={styles.errorText}>
            {serverError}
          </Text>
        </View>
      )}

      <AuthInput
        placeholder="Email"
        value={email}
        icon="mail-outline"
        error={emailError}
        onChangeText={(value) => {
          setEmail(value);
          setEmailError('');
          setServerError('');
        }}
      />

      <AuthButton
        title="Отправить"
        onPress={handleSubmit}
        loading={loading}
      />

      <Pressable
        style={styles.backButton}
        onPress={onLogin}
      >
        <Ionicons
          name="arrow-back-outline"
          size={18}
          color={colors.tabActive}
        />

        <Text style={styles.link}>
          Вернуться ко входу
        </Text>
      </Pressable>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  description: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    lineHeight: 20,
    color: colors.tabInactive,
    marginBottom: 20,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
  },

  link: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.tabActive,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFF0F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  errorText: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#D94C4C',
  },
});
