/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import "@/global.css";

import { Platform } from "react-native";

export const Colors = {
  light: {
    text: "#000000",
    background: "#ffffff",
    backgroundElement: "#F0F0F3",
    backgroundSelected: "#E0E1E6",
    textSecondary: "#60646C",
    screen: "#F5FAFD",
    textPrimary: "#192C38",
    card: "#FFFFFF",
    cardBorder: "#E5EDF3",
    iconButton: "#FFFFFF",
    iconButtonBorder: "transparent",
    icon: "#192C38",
    accent: "#1479C9",
    accentSurface: "#EAF7FD",
    tabBar: "#FFFFFF",
    tabActive: "#168CE1",
    tabInactive: "#546871",
  },
  dark: {
    text: "#ffffff",
    background: "#1B1B1B",
    backgroundElement: "#212225",
    backgroundSelected: "#2E3135",
    textSecondary: "#B0B4BA",
    screen: "#1B1B1B",
    textPrimary: "#FFFFFF",
    card: "#2A2A2A",
    cardBorder: "#7C8488",
    iconButton: "#1B1B1B",
    iconButtonBorder: "#7C8488",
    icon: "#FBFDFF",
    accent: "#1479C9",
    accentSurface: "#002E52",
    tabBar: "#2A2A2A",
    tabActive: "#168CE1",
    tabInactive: "#7C8488",
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "var(--font-display)",
    serif: "var(--font-serif)",
    rounded: "var(--font-rounded)",
    mono: "var(--font-mono)",
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
