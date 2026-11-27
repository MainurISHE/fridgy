
import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
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
  onRegister: () => void;
  onForgotPassword: () => void;
};

export default function LoginScreen({
  onRegister,
  onForgotPassword,
}: Props) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [serverError, setServerError] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setEmailError('');
    setPasswordError('');
    setServerError('');

    let valid = true;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError('Некорректный email');
      valid = false;
    }

    if (!password.trim()) {
      setPasswordError('Введите пароль');
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      setLoading(true);

      await login(email, password);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setServerError('Неверный email или пароль');
          setEmailError(' ');
          setPasswordError(' ');
        } else if (!error.response) {
          setServerError('Нет подключения к серверу');
        } else {
          setServerError(
            'Не удалось войти. Попробуйте снова.'
          );
        }
      } else {
        setServerError('Произошла ошибка');
      }
    } finally {
      setLoading(false);
    }
  }

  function handleSocialLogin(provider: string) {
    Alert.alert(
      provider,
      'Авторизация через этот сервис пока недоступна.'
    );
  }

  return (
    <AuthScreen
      title="Войти"
      hint="Войдите, чтобы сохранять рецепты и сканировать продукты."
    >
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

      <AuthInput
        placeholder="Пароль"
        value={password}
        icon="lock-closed-outline"
        password
        error={passwordError}
        onChangeText={(value) => {
          setPassword(value);
          setPasswordError('');
          setServerError('');
        }}
      />

      <Pressable
        style={styles.forgotButton}
        onPress={onForgotPassword}
      >
        <Text style={styles.link}>
          Забыли пароль?
        </Text>
      </Pressable>

      <AuthButton
        title="Войти"
        onPress={handleLogin}
        loading={loading}
      />

      <View style={styles.divider}>
        <View style={styles.line} />

        <Text style={styles.dividerText}>
          Или
        </Text>

        <View style={styles.line} />
      </View>

      <View style={styles.socialContainer}>
        <Pressable
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Google')}
        >
          <Text style={styles.socialText}>
            Google
          </Text>
        </Pressable>

        <Pressable
          style={styles.socialButton}
          onPress={() => handleSocialLogin('Apple')}
        >
          <Text style={styles.socialText}>
            Apple
          </Text>
        </Pressable>
      </View>

      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>
          Нет аккаунта?
        </Text>

        <Pressable onPress={onRegister}>
          <Text style={styles.link}>
            Зарегистрироваться
          </Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 12,
  },

  link: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: colors.tabActive,
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginVertical: 16,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.cardBorder,
  },

  dividerText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.tabInactive,
  },

  socialContainer: {
    flexDirection: 'row',
    gap: 16,
  },

  socialButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    backgroundColor: colors.backgroundElement,
    justifyContent: 'center',
    alignItems: 'center',
  },

  socialText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: colors.textPrimary,
  },

  registerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
  },

  registerText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.tabInactive,
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
