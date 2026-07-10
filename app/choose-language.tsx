import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LANGUAGES } from '@/data/languages';
import { images } from '@/constants/images';

export default function ChooseLanguageScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguageId, setSelectedLanguageId] = useState<string | null>(LANGUAGES[0]?.id || null);

  const filteredLanguages = LANGUAGES.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    lang.nativeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={28} color="#111118" />
        </TouchableOpacity>
        <Text className="flex-1 text-center h2 text-text-primary mr-10">Choose a language</Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mt-4 mb-2">
        <View className="flex-row items-center bg-white border border-border/80 rounded-full px-5 py-3.5 shadow-sm">
          <Ionicons name="search" size={22} color="#757575" />
          <TextInput 
            className="flex-1 ml-3 body-lg text-text-primary"
            placeholder="Search languages"
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" contentContainerStyle={{ paddingBottom: 220 }}>
        <Text className="h3 text-text-primary mb-4 font-bold">Popular</Text>

        <View className="gap-y-3">
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguageId === lang.id;
            
            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => setSelectedLanguageId(lang.id)}
                className={`flex-row items-center justify-between p-4 bg-white rounded-3xl border ${
                  isSelected ? 'border-primary' : 'border-border/30'
                } shadow-sm`}
              >
                <View className="flex-row items-center">
                  <Image 
                    source={{ uri: lang.flag }} 
                    className="w-10 h-10 rounded-full"
                    resizeMode="cover"
                  />
                  <View className="ml-4">
                    <Text className="h3 text-text-primary font-bold">{lang.name}</Text>
                    <Text className="body-sm text-text-secondary mt-0.5">{lang.nativeName}</Text>
                  </View>
                </View>
                
                {isSelected ? (
                  <View className="w-7 h-7 rounded-full bg-primary items-center justify-center">
                    <Ionicons name="checkmark" size={18} color="white" />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={24} color="#BDBDBD" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Background Earth Image */}
      <View className="absolute bottom-0 left-0 right-0 pointer-events-none" pointerEvents="none">
        <Image 
          source={images.earth} 
          className="w-full h-48 opacity-90"
          resizeMode="cover"
        />
      </View>

      {/* Fixed Continue Button */}
      <View className="absolute bottom-10 left-6 right-6">
        <TouchableOpacity 
          className={`py-4 rounded-2xl items-center shadow-md ${selectedLanguageId ? 'bg-primary' : 'bg-border'}`}
          disabled={!selectedLanguageId}
          onPress={() => router.back()}
        >
          <Text className="body-lg text-white font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
