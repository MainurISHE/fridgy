import { Ionicons } from "@expo/vector-icons";
import {
  TabList,
  Tabs,
  TabSlot,
  TabTrigger,
  type TabListProps,
  type TabTriggerSlotProps,
} from "expo-router/ui";
import { Pressable, StyleSheet, View } from "react-native";

import { MaxContentWidth } from "@/constants/theme";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />

      <TabList asChild>
        <CustomTabList>
          <TabTrigger name="home" href="/" asChild>
            <TabButton icon="home-outline" activeIcon="home">
              Главная
            </TabButton>
          </TabTrigger>

          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton icon="heart-outline" activeIcon="heart">
              Сохранённое
            </TabButton>
          </TabTrigger>

          <TabTrigger name="profile" href="/profile" asChild>
            <TabButton icon="person-outline" activeIcon="person">
              Профиль
            </TabButton>
          </TabTrigger>
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

type IconName = React.ComponentProps<typeof Ionicons>["name"];

type ButtonProps = TabTriggerSlotProps & {
  children: string;
  icon: IconName;
  activeIcon: IconName;
};

function TabButton({
  children,
  isFocused,
  icon,
  activeIcon,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}
    >
      <Ionicons
        name={isFocused ? activeIcon : icon}
        size={25}
        color={isFocused ? "#168CE1" : "#858585"}
      />

      <ThemedText
        style={[styles.tabLabel, { color: isFocused ? "#168CE1" : "#858585" }]}
      >
        {children}
      </ThemedText>
    </Pressable>
  );
}

function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.positioner}>
      <ThemedView type="backgroundElement" style={styles.tabBar}>
        {props.children}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  positioner: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    alignItems: "center",
    paddingHorizontal: 12,
  },

  tabBar: {
    width: "100%",
    maxWidth: MaxContentWidth,
    minHeight: 66,
    borderRadius: 28,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#292929",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    paddingVertical: 3,
  },

  tabLabel: {
    fontFamily: "Manrope_400Regular",
    fontSize: 12,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.7,
  },
});
