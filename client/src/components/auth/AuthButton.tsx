
import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Colors } from '@/constants/theme';

const colors = Colors.light;

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export default function AuthButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.text}>
          {title}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    backgroundColor: colors.accent,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 4,
  },

  disabled: {
    opacity: 0.5,
  },

  pressed: {
    opacity: 0.8,
  },

  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Manrope_600SemiBold',
  },
});
