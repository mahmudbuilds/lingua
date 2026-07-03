import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { useRouter, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import VerificationModal from '@/components/VerificationModal';

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const router = useRouter();

  const handleSignIn = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24 }}>
          {/* Header Image */}
          <View className="items-center mb-8 mt-4">
            <Image 
              source={images.mascotAuth} 
              style={{ width: 160, height: 160 }} 
              resizeMode="contain" 
            />
          </View>

          {/* Form Content */}
          <Text className="h2 text-text-primary mb-2">Welcome back</Text>
          <Text className="body-lg text-text-secondary mb-8">Sign in to continue your progress</Text>

          {/* Email Input */}
          <View className="flex-row items-center bg-[#F3F4F6] rounded-2xl px-4 py-4 mb-6">
            <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-text-primary body-lg"
              placeholder="Email Address"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              style={{ padding: 0 }}
            />
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            className="bg-primary py-[18px] rounded-2xl items-center mb-8"
            onPress={handleSignIn}
            activeOpacity={0.8}
          >
            <Text className="h3 text-background font-bold">Sign In</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="mx-4 text-text-secondary body-md">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row justify-center gap-4 mb-8">
            {['google', 'apple', 'facebook'].map((provider, index) => (
              <TouchableOpacity 
                key={index}
                className="w-14 h-14 rounded-full border border-border items-center justify-center bg-white"
              >
                {provider === 'google' ? (
                  <Image source={images.googleLogo} style={{ width: 24, height: 24 }} />
                ) : (
                  <Ionicons 
                    name={`logo-${provider}` as any} 
                    size={24} 
                    color={provider === 'facebook' ? '#1877F2' : '#1F2937'} 
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Bottom Link */}
          <View className="flex-row justify-center mt-auto">
            <Text className="text-text-secondary body-lg">Don't have an account? </Text>
            <Link href="/(auth)/sign-up" asChild>
              <TouchableOpacity>
                <Text className="text-primary body-lg font-bold">Sign Up</Text>
              </TouchableOpacity>
            </Link>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
      <VerificationModal 
        visible={isModalVisible} 
        onClose={() => setModalVisible(false)} 
        email={email}
      />
    </SafeAreaView>
  );
}
