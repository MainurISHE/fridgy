import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { WebBadge } from "@/components/web-badge";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
} from "@expo-google-fonts/manrope";
import { useFonts } from "expo-font";
import { Image, Platform, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
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
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          {/* <AnimatedIcon /> */}
          <ThemedView>
            <Image
              style={styles.logo}
              source={require("../../assets/img/logo.png")}
            />
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.text}>Добрый вечер</ThemedText>

          <ThemedText style={styles.title}>Что приготовим сегодня?</ThemedText>
        </ThemedView>

        <ThemedView style={styles.scanContainer}>
          <ThemedText style={styles.scanLabel}>AI-помощник</ThemedText>

          <ThemedText style={styles.title}>
            Покажи холодильник - найду ужин за минуту
          </ThemedText>

          <ThemedText style={styles.scanDescription}>
            Сфотографируй продукты, и Fridgy предложит простые рецепты из того,
            что уже есть.
          </ThemedText>

          <Pressable style={styles.scanButton}>
            <ThemedText style={styles.scanButtonText}>
              Сканировать продукты
            </ThemedText>
          </Pressable>
        </ThemedView>

        <ThemedView style={styles.preferences}>
          <ThemedText style={styles.preferencesText}>
            Под тебя сегодня
          </ThemedText>

          <ThemedView style={styles.preferencesFilters}>
            <Pressable style={styles.preferencesFilterActive}>
              <ThemedText style={styles.filterText}>До 20 мин</ThemedText>
            </Pressable>

            <Pressable style={styles.preferencesFilter}>
              <ThemedText style={styles.filterText}>500 ккал</ThemedText>
            </Pressable>

            <Pressable style={styles.preferencesFilter}>
              <ThemedText style={styles.filterText}>Веган</ThemedText>
            </Pressable>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.ideasContainer}>
          <ThemedText style={styles.ideasTitle}>Быстрые идеи</ThemedText>

          <ThemedView style={styles.ideasCards}>
            <Pressable style={styles.ideaCard}>
              <ThemedText style={styles.ideaEmoji}>🍝</ThemedText>

              <ThemedView style={styles.ideaDetails}>
                <ThemedText style={styles.ideaName}>Паста с овощами</ThemedText>

                <ThemedText style={styles.ideaInfo}>
                  15 мин · 420 ккал
                </ThemedText>
              </ThemedView>
            </Pressable>

            <Pressable style={styles.ideaCard}>
              <ThemedText style={styles.ideaEmoji}>🥗</ThemedText>

              <ThemedView style={styles.ideaDetails}>
                <ThemedText style={styles.ideaName}>Греческий салат</ThemedText>

                <ThemedText style={styles.ideaInfo}>
                  20 мин · 380 ккал
                </ThemedText>
              </ThemedView>
            </Pressable>
          </ThemedView>
        </ThemedView>

        {Platform.OS === "web" && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  safeArea: {
    flex: 1,
    width: "100%",
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },

  header: {
    width: "100%",
  },

  logo: {
    width: 65,
    height: 52,
  },

  textContainer: {
    width: "100%",
    height: 60,
    gap: 3,
  },

  text: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
  },

  title: {
    fontFamily: "Manrope_700Bold",
    alignItems: "center",
    fontSize: 26,
    lineHeight: 28,
    includeFontPadding: true,
    width: 334,
  },

  scanContainer: {
    width: "100%",
    backgroundColor: "#06365A",
    borderRadius: 28,
    paddingHorizontal: 33,
    paddingTop: 24,
    paddingBottom: 17,
    gap: 16,
    marginTop: 10,
    marginBottom: 24,
  },

  scanLabel: {
    fontFamily: "Manrope_600SemiBold",
    color: "#168CE1",
    fontSize: 12,
    lineHeight: 18,
  },

  scanTitle: {
    width: 295,
    height: 54,
    color: "#ffffff",
    fontFamily: "Manrope_700Bold",
    fontSize: 20,
    lineHeight: 20,
  },

  scanDescription: {
    color: "#C5C5C5",
    fontFamily: "Manrope_400Regular",
    fontSize: 13,
    lineHeight: 20,
  },

  scanButton: {
    width: "100%",
    minHeight: 45,
    backgroundColor: "#1681D0",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
    paddingVertical: 10,
  },

  scanButtonText: {
    color: "#FFFFFF",
    fontFamily: "Manrope_600SemiBold",
    fontSize: 14,
    textAlign: "center",
  },

  preferences: {
    width: "100%",
    gap: 14,
  },

  preferencesText: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
  },

  preferencesFilters: {
    flexDirection: "row",
    alignItems: "center",
    width: "auto",
    gap: 24,
  },

  preferencesFilter: {
    flex: 1,
    minWidth: 0,
    height: 40,
    borderRadius: 17,
    backgroundColor: "#2A2A2A",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  preferencesFilterActive: {
    flex: 1,
    minWidth: 0,
    height: 40,
    borderRadius: 17,
    backgroundColor: "#1479C9",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  filterText: {
    color: "#FFFFFF",
    fontFamily: "Manrope_500Medium",
    fontSize: 13,
    textAlign: "center",
  },

  ideasContainer: {
    width: "100%",
    gap: 14,
  },

  ideasTitle: {
    fontFamily: "Manrope_600SemiBold",
    fontSize: 16,
    lineHeight: 24,
  },

  ideasCards: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
  },

  ideaCard: {
    flex: 1,
    minWidth: 0,
    height: 121,
    backgroundColor: "#2A2A2A",
    borderRadius: 22,
    padding: 16,
    justifyContent: "space-between",
  },

  ideaEmoji: {
    fontSize: 26,
    lineHeight: 32,
  },

  ideaDetails: {
    backgroundColor: "transparent",
    gap: 8,
  },

  ideaName: {
    fontFamily: "Manrope_500Medium",
    fontSize: 14,
    lineHeight: 20,
    color: "#FFFFFF",
  },

  ideaInfo: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    lineHeight: 18,
    color: "#858585",
  },
});
