
import type { ReactNode } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from '@expo-google-fonts/manrope';

import { Colors } from '@/constants/theme';

const colors = Colors.light;

type Props = {
  title?: string;
  hint?: string;
  children: ReactNode;
  footer?: ReactNode;
};

export default function AuthScreen({
  title,
  hint,
  children,
  footer,
}: Props) {
  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios' ? 'padding' : undefined
        }
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={require('@/assets/img/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          {!!title && (
            <Text style={styles.title}>
              {title}
            </Text>
          )}

          {!!hint && (
            <View style={styles.hint}>
              <Text style={styles.hintTitle}>
                AI-помощник
              </Text>

              <Text style={styles.hintText}>
                {hint}
              </Text>
            </View>
          )}

          {children}

          {!!footer && (
            <View style={styles.footer}>
              {footer}
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    backgroundColor: colors.screen,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },

  logo: {
    width: 65,
    height: 52,
    alignSelf: 'flex-start',
  },

  title: {
    fontSize: 26,
    fontFamily: 'Manrope_700Bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 64,
    marginBottom: 64,
  },

  hint: {
    backgroundColor: colors.accentSurface,
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
  },

  hintTitle: {
    fontSize: 12,
    color: colors.tabActive,
    fontFamily: 'Manrope_600SemiBold',
    marginBottom: 10,
  },

  hintText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Manrope_400Regular',
    color: colors.tabInactive,
  },

  footer: {
    marginTop: 'auto',
    paddingTop: 24,
  },
});
