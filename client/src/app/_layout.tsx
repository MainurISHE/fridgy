
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from 'expo-router';

import * as SplashScreen from 'expo-splash-screen';

import {
  useColorScheme,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

import {
  AuthProvider,
  useAuth,
} from '@/context/AuthContext';

import AuthNavigator from '@/components/auth/AuthNavigator';
import { Colors } from '@/constants/theme';

SplashScreen.preventAutoHideAsync().catch(() => {});

function AppContent() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={Colors.light.accent}
        />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <AuthNavigator />;
  }

  return <AppTabs />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider
      value={
        colorScheme === 'dark'
          ? DarkTheme
          : DefaultTheme
      }
    >
      <AuthProvider>
        <View style={styles.container}>
          <AppContent />
          <AnimatedSplashOverlay />
        </View>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.light.screen,
  },
});
