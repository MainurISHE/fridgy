
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
  onSuccess: () => void;
};

export default function RegisterScreen({
  onLogin,
  onSuccess,
}: Props) {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: '',
    server: '',
  });

  function clearError(field: keyof typeof errors) {
    setErrors((previous) => ({
      ...previous,
      [field]: '',
      server: '',
    }));
  }

  async function handleRegister() {
    const nextErrors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreement: '',
      server: '',
    };

    if (name.trim().length < 2) {
      nextErrors.name = 'Введите имя';
    } else if (name.trim().length > 100) {
      nextErrors.name = 'Не более 100 символов';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Некорректный email';
    }

    if (password.length < 8) {
      nextErrors.password = 'Минимум 8 символов';
    } else if (password.length > 128) {
      nextErrors.password = 'Не более 128 символов';
    } else if (!password.trim()) {
      nextErrors.password = 'Введите пароль';
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Повторите пароль';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'Пароли не совпадают';
    }

    if (!agreed) {
      nextErrors.agreement = 'Необходимо принять условия';
    }

    setErrors(nextErrors);

    if (Object.values(nextErrors).some(Boolean)) {
      return;
    }

    try {
      setLoading(true);

      await register(name, email, password);

      onSuccess();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setErrors((previous) => ({
            ...previous,
            email: 'Этот email уже зарегистрирован',
          }));
        } else if (!error.response) {
          setErrors((previous) => ({
            ...previous,
            server: 'Нет подключения к серверу',
          }));
        } else {
          setErrors((previous) => ({
            ...previous,
            server: 'Не удалось зарегистрироваться. Проверьте данные.',
          }));
        }
      } else {
        setErrors((previous) => ({
          ...previous,
          server: 'Произошла ошибка',
        }));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthScreen
      title="Регистрация"
      hint="Создайте аккаунт, чтобы пользоваться всеми возможностями Fridgy."
    >
      {!!errors.server && (
        <View style={styles.errorContainer}>
          <Ionicons
            name="alert-circle-outline"
            size={20}
            color="#D94C4C"
          />

          <Text style={styles.errorText}>
            {errors.server}
          </Text>
        </View>
      )}

      <AuthInput
        placeholder="Имя"
        value={name}
        icon="person-outline"
        error={errors.name}
        onChangeText={(value) => {
          setName(value);
          clearError('name');
        }}
      />

      <AuthInput
        placeholder="Email"
        value={email}
        icon="mail-outline"
        error={errors.email}
        onChangeText={(value) => {
          setEmail(value);
          clearError('email');
        }}
      />

      <AuthInput
        placeholder="Пароль"
        value={password}
        icon="lock-closed-outline"
        password
        error={errors.password}
        onChangeText={(value) => {
          setPassword(value);
          clearError('password');
        }}
      />

      <AuthInput
        placeholder="Повторите пароль"
        value={confirmPassword}
        icon="lock-closed-outline"
        password
        error={errors.confirmPassword}
        onChangeText={(value) => {
          setConfirmPassword(value);
          clearError('confirmPassword');
        }}
      />

      <Pressable
        style={styles.agreementContainer}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: agreed }}
        onPress={() => {
          setAgreed(!agreed);
          clearError('agreement');
        }}
      >
        <View
          style={[
            styles.checkbox,
            agreed && styles.checkboxActive,
            !!errors.agreement && styles.checkboxError,
          ]}
        >
          {agreed && (
            <Ionicons
              name="checkmark"
              size={16}
              color="#FFFFFF"
            />
          )}
        </View>

        <Text style={styles.agreementText}>
          Я соглашаюсь с условиями использования
          и политикой конфиденциальности
        </Text>
      </Pressable>

      {!!errors.agreement && (
        <Text style={styles.agreementError}>
          {errors.agreement}
        </Text>
      )}

      <AuthButton
        title="Зарегистрироваться"
        onPress={handleRegister}
        loading={loading}
      />

      <View style={styles.loginContainer}>
        <Text style={styles.loginText}>
          Уже есть аккаунт?
        </Text>

        <Pressable onPress={onLogin}>
          <Text style={styles.link}>
            Войти
          </Text>
        </Pressable>
      </View>
    </AuthScreen>
  );
}

const styles = StyleSheet.create({
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
    marginBottom: 16,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: colors.tabInactive,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.card,
  },

  checkboxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },

  checkboxError: {
    borderColor: '#D94C4C',
  },

  agreementText: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    lineHeight: 18,
    color: colors.tabInactive,
  },

  agreementError: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: '#D94C4C',
    marginBottom: 12,
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
    marginBottom: 16,
  },

  loginText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: colors.tabInactive,
  },

  link: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
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
