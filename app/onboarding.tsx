import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ONBOARDING_PAGES = [
  {
    id: '1',
    title: 'Your AI language',
    highlight: 'teacher.',
    subtitle: 'Real conversations, personalized lessons, anytime, anywhere.',
    image: images.mascotWelcome,
  },
  {
    id: '2',
    title: 'Learn at your own',
    highlight: 'pace.',
    subtitle: 'Choose from over 30 languages and practice every day.',
    image: images.mascotWelcome,
  },
  {
    id: '3',
    title: 'Achieve your',
    highlight: 'goals.',
    subtitle: 'Track your progress and become fluent faster.',
    image: images.mascotWelcome,
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  const handleNext = () => {
    if (currentIndex < ONBOARDING_PAGES.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      // Final action - usually go to login/signup or main app
      // router.push('/(auth)'); 
    }
  };

  const renderItem = ({ item }: { item: typeof ONBOARDING_PAGES[0] }) => {
    return (
      <View style={{ width }} className="flex-1 pt-8">
        {/* Header Text */}
        <View className="px-6">
          <Text className="h1 text-text-primary">
            {item.title}{'\n'}
            <Text className="text-primary">{item.highlight}</Text>
          </Text>
          <Text className="body-lg text-text-secondary mt-4 pr-4">
            {item.subtitle}
          </Text>
        </View>

        {/* Mascot Image */}
        <View className="items-center justify-center flex-1 w-full">
          <Image 
            source={item.image} 
            style={{ width: 320, height: 320 }} 
            resizeMode="contain" 
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View className="flex-1 pb-10">
        {/* Header Logo */}
        <View className="items-center mt-4 flex-row justify-center gap-2">
          <Image source={images.mascotLogo} style={{ width: 32, height: 32 }} resizeMode="contain" />
          <Text className="h2 text-text-primary">lingua</Text>
        </View>

        {/* FlatList for Pages */}
        <View className="flex-1">
          <FlatList
            ref={flatListRef}
            data={ONBOARDING_PAGES}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            bounces={false}
          />
        </View>

        {/* Bottom Section */}
        <View className="px-6 gap-8 mt-2">
          {/* Pagination Dots */}
          <View className="flex-row justify-center gap-3">
            {ONBOARDING_PAGES.map((_, index) => (
              <View
                key={index}
                className={`h-2.5 rounded-full ${
                  index === currentIndex ? 'w-2.5 bg-primary' : 'w-2.5 bg-border'
                }`}
              />
            ))}
          </View>

          {/* Button */}
          <TouchableOpacity 
            className="bg-primary py-[18px] rounded-2xl items-center justify-center flex-row relative"
            activeOpacity={0.8}
            onPress={handleNext}
          >
            <Text className="h3 text-background font-bold">Get Started</Text>
            <View className="absolute right-6">
               <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
