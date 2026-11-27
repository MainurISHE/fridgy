import { View, Text, StyleSheet, StatusBar, Image, ImageBackground, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import {
  useFonts,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useTheme } from '@/hooks/use-theme';

export default function ScanScreen() {
  const theme = useTheme();
  const scheme = useColorScheme();

  let [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, { backgroundColor: theme.screen }]}>
      <StatusBar
        hidden={false}
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image style={styles.logo} source={require('@/assets/img/logo.png')} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Фонарик"
            style={({ pressed }) => [
              styles.flashlight,
              { backgroundColor: theme.iconButton, borderColor: theme.iconButtonBorder },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="flashlight-outline" size={21} color={theme.icon} />
          </Pressable>
        </View>

        <View style={[styles.hint, { backgroundColor: theme.accentSurface }]}>
          <View style={styles.hintLabelRow}>
            <Ionicons name="sparkles-outline" size={16} color={theme.accent} />
            <Text style={[styles.hintLabel, { color: theme.accent }]}>AI-подсказка</Text>
          </View>
          <Text style={[styles.hintText, { color: theme.textPrimary }]}>
            Сфотографируй полки целиком — так Fridgy точнее распознает продукты
          </Text>
        </View>

        <ImageBackground
          style={styles.viewfinder}
          source={require('@/assets/img/camera-bg.jpg')}
          resizeMode="cover"
        >
          <LinearGradient
            style={StyleSheet.absoluteFill}
            colors={['rgba(11, 37, 53, 0)', 'rgba(11, 37, 53, 0)', 'rgba(11, 37, 53, 0.65)']}
            locations={[0, 0.6, 1]}
          />
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>Поместите продукты в кадр</Text>
          </View>
        </ImageBackground>

        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.action,
              { backgroundColor: theme.accent },
              pressed && styles.pressed,
            ]}
          >
            <Ionicons name="scan-outline" size={21} color="#FFFFFF" />
            <Text style={styles.scanLabel}>Сканировать продукты</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.action,
              styles.upload,
              { backgroundColor: theme.card, borderColor: theme.cardBorder },
              pressed && styles.pressed,
            ]}
          >
            <Image style={styles.thumbnail} source={require('@/assets/img/camera-bg.jpg')} />
            <Text style={[styles.uploadLabel, { color: theme.textPrimary }]}>
              Загрузить из галереи
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    // Keeps the actions above the floating tab bar (66 tall, 12 from the bottom)
    paddingBottom: 96,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 2,
  },
  logo: {
    width: 65,
    height: 52,
  },
  flashlight: {
    width: 38,
    height: 38,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    marginTop: 36,
    padding: 18,
    gap: 9,
    borderRadius: 22,
  },
  hintLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  hintLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    lineHeight: 16,
  },
  hintText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    lineHeight: 21,
  },
  viewfinder: {
    marginTop: 23,
    flex: 1,
    minHeight: 180,
    maxHeight: 330,
    borderRadius: 26,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  instruction: {
    marginBottom: 20,
    paddingVertical: 9,
    paddingHorizontal: 13,
    borderRadius: 100,
    backgroundColor: 'rgba(18, 42, 60, 0.6)',
  },
  instructionText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 13,
    lineHeight: 18,
    color: '#FFFFFF',
  },
  actions: {
    marginTop: 27,
    gap: 12,
  },
  action: {
    height: 56,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 9,
  },
  upload: {
    borderWidth: 1,
    gap: 11,
  },
  thumbnail: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  scanLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 15,
    lineHeight: 20,
    color: '#FFFFFF',
  },
  uploadLabel: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 15,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.7,
  },
});
