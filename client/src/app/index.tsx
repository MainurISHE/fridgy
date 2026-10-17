import { StyleSheet, Image, View, Text, StatusBar, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  useFonts, 
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold
} from '@expo-google-fonts/manrope';
import { useState } from 'react';
import { Color } from 'expo-router';
import { ViewSlot } from 'expo-router/build/ui/common';

export default function HomeScreen() {
  const [filter, setFilter] = useState<number>(1);
  
  let [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  const toggleFilters = (val: number) => {
    setFilter(prevval => prevval === val ? 0 : val);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false}/>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../../assets/img/logo.png")}/>
        
        <View style={styles.headerText}>
          <Text style={styles.greeting}>Добрый вечер</Text>
          <Text style={styles.heading}>Что приготовим сегодня?</Text>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerLabel}>AI-помощник</Text>
          
          <View style={styles.bannerTextGroup}>
            <Text style={styles.bannerTitle}>
              Покажи холодильник -{'\n'}найду ужин за минуту
            </Text>
            <Text style={styles.bannerSubtitle}>
              Сфотографируй продукты, и Fridgy предложит простые рецепты из того, что уже есть.
            </Text>
          </View>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Сканировать продукты</Text>
          </Pressable>
        </View>

        <View style={styles.filters}>
          <Text style={styles.filtersHeading}>Под тебя сегодня</Text>
          <View style={styles.filterItems}>
            <Pressable onPress={() => toggleFilters(1)} style={[
                styles.filterItem, 
                filter === 1 && styles.activeFilterItem
                ]}>
              <Text style={{color: filter === 1 ? '#fff' : '#000'}}>
                  До 20 мин
              </Text>
            </Pressable>
            <Pressable onPress={() => toggleFilters(2)} style={[
                styles.filterItem, 
                filter === 2 && styles.activeFilterItem
                ]}>
              <Text style={{color: filter === 2 ? '#fff' : '#000'}}>
                  ≤ 500 ккал
              </Text>
            </Pressable>
            <Pressable onPress={() => toggleFilters(3)} style={[
                styles.filterItem, 
                filter === 3 && styles.activeFilterItem
                ]}>
              <Text style={{color: filter === 3 ? '#fff' : '#000'}}>
                  Веган
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.IdeasHeading}>
          <Text style={styles.IdeasHeadingText}>Быстрые идеи</Text>

          <View style={styles.IdeaList}>
            <View style={styles.Idea}>
                <Text>🍝</Text>
                <Text style={styles.IdeaTitle}>Паста с овощами</Text>
                <Text style={styles.DescriptionSubtitle}>15 мин · 420 ккал</Text>
            </View>

            <View style={styles.Idea}>
                <Text>🍝</Text>
                <Text style={styles.IdeaTitle}>Паста с овощами</Text>
                <Text style={styles.DescriptionSubtitle}>15 мин · 420 ккал</Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 65,
    height: 52,
  },
  headerText: {
    marginTop: 24, 
    gap: 8,
    width: 334,
  },
  greeting: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
    color: '#8A8A8E',
  },
  heading: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 26,
    lineHeight: 26,
    color: '#1C1C1E',
  },
  banner: {
    width: 350,
    height: 220,
    backgroundColor: '#F4F9FD', 
    borderRadius: 24,
    marginTop: 24,
    paddingTop: 20,
    paddingRight: 25,
    paddingBottom: 16,
    paddingLeft: 30,
    gap: 10,
  },
  bannerLabel: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 12,
    color: '#168CE1',
  },
  bannerTextGroup: {
    width: 295,
    gap: 10,
  },
  bannerTitle: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 20,
    color: '#1C1C1E',
  },
  bannerSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 12,
    color: '#546871',
  },
  button: {
    width: 295,
    height: 40,
    backgroundColor: '#1479C9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
  },
  buttonText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: '#FFFFFF',
  },
  filters: {
    width: '100%',
    marginTop: 24,
    gap: 14
  },
  filtersHeading: {
    color: '#0A141A',
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 16,
  },
  filterItems: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterItem: {
    textAlign: 'center',
    width: '30%',
    backgroundColor: '#EDF2F5',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeFilterItem: {
    backgroundColor: '#1479C9'
  },
  IdeasHeading: {
    marginTop: 24,
  },
  IdeasHeadingText: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 26,
    color: '#1C1C1E',
  },
  IdeaList: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    gap: 18,
  },
  Idea: {
    backgroundColor: '#F4F9FD',
    padding: 12,
    flexDirection: 'column',
    gap: 16,
    borderRadius: 20,
  },
  IdeaTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 13,
    color: '#0A141A',
  },
  DescriptionSubtitle: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 11,
    color: '#546871',
  }
});