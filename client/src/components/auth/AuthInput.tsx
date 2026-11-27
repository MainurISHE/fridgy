
import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/theme';

const colors = Colors.light;

type Props = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon: 'mail-outline' | 'lock-closed-outline' | 'person-outline';
  password?: boolean;
  error?: string;
};

export default function AuthInput({
  placeholder,
  value,
  onChangeText,
  icon,
  password = false,
  error,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.inputContainer,
          error ? styles.errorBorder : null,
        ]}
      >
        <Ionicons
          name={icon}
          size={22}
          color={error ? '#D94C4C' : colors.tabInactive}
        />

        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.tabInactive}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={password && !showPassword}
          autoCapitalize={
            icon === 'person-outline' ? 'words' : 'none'
          }
          autoCorrect={false}
          keyboardType={
            icon === 'mail-outline'
              ? 'email-address'
              : 'default'
          }
        />

        {password && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            hitSlop={8}
          >
            <Ionicons
              name={
                showPassword
                  ? 'eye-outline'
                  : 'eye-off-outline'
              }
              size={22}
              color={colors.tabInactive}
            />
          </Pressable>
        )}
      </View>

      {!!error?.trim() && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },

  inputContainer: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: '#B7C5CE',
    borderRadius: 16,
    paddingHorizontal: 14,
    gap: 12,
  },

  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'Manrope_400Regular',
    color: colors.textPrimary,
    paddingVertical: 12,
  },

  errorBorder: {
    borderColor: '#D94C4C',
  },

  errorText: {
    fontSize: 11,
    fontFamily: 'Manrope_400Regular',
    color: '#D94C4C',
    marginTop: 4,
    marginLeft: 4,
  },
});
