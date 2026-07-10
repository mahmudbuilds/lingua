import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { useRouter, Link, type Href } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import VerificationModal from '@/components/VerificationModal';
import { useSignIn, useSSO } from "@clerk/expo"
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';

WebBrowser.maybeCompleteAuthSession();

export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);
  const { signIn } = useSignIn();
  const { startSSOFlow } = useSSO();
  const router = useRouter();

  const handleSSO = async (strategy: 'oauth_google' | 'oauth_apple' | 'oauth_facebook') => {
    try {
      setLoadingProvider(strategy);
      const { createdSessionId, setActive } = await startSSOFlow({
        strategy,
        redirectUrl: Linking.createURL('/'),
      });
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
        router.replace('/');
      }
    } catch (err) {
      console.error('OAuth error:', err);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleSignIn = async () => {
    setIsSigningIn(true);
    try {
      const { error } = await signIn.password({ emailAddress: email, password });
      if (error) {
        console.error(JSON.stringify(error, null, 2));
        alert(error.message || 'Sign in failed');
        return;
      }

      if (signIn.status === 'complete') {
        await signIn.finalize({
          navigate: ({ session, decorateUrl }) => {
            if (session?.currentTask) {
              console.log(session?.currentTask);
              return;
            }
            const url = decorateUrl('/');
            if (url.startsWith('http')) {
              window.location.href = url;
            } else {
              router.replace(url as Href);
            }
          },
        });
      } else if (signIn.status === 'needs_second_factor') {
        // Handle 2FA if needed
      } else if (signIn.status === 'needs_client_trust') {
        const emailCodeFactor = signIn.supportedSecondFactors?.find(
          (factor) => factor.strategy === 'email_code',
        );

        if (emailCodeFactor) {
          await signIn.mfa?.sendEmailCode();
          setModalVisible(true);
        }
      } else {
        console.error('Sign-in attempt not complete:', signIn);
      }
    } finally {
      setIsSigningIn(false);
    }
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
          <View className="flex-row items-center bg-[#F3F4F6] rounded-2xl px-4 py-4 mb-4">
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

          {/* Password Input */}
          <View className="flex-row items-center bg-[#F3F4F6] rounded-2xl px-4 py-4 mb-6">
            <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-3 text-text-primary body-lg"
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
              style={{ padding: 0 }}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons 
                name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                size={20} 
                color="#9CA3AF" 
              />
            </TouchableOpacity>
          </View>

          {/* Sign In Button */}
          <TouchableOpacity 
            className="bg-primary py-[18px] rounded-2xl items-center mb-8"
            onPress={handleSignIn}
            activeOpacity={0.8}
            disabled={isSigningIn}
          >
            {isSigningIn ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="h3 text-background font-bold">Sign In</Text>
            )}
          </TouchableOpacity>

          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-[1px] bg-border" />
            <Text className="mx-4 text-text-secondary body-md">Or continue with</Text>
            <View className="flex-1 h-[1px] bg-border" />
          </View>

          {/* Social Buttons */}
          <View className="flex-row justify-center gap-4 mb-8">
            {['google', 'apple', 'facebook'].map((provider, index) => {
              const strategy = `oauth_${provider}` as any;
              const isLoading = loadingProvider === strategy;
              
              return (
                <TouchableOpacity 
                  key={index}
                  onPress={() => handleSSO(strategy)}
                  disabled={isLoading || loadingProvider !== null}
                  className="w-14 h-14 rounded-full border border-border items-center justify-center bg-white"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#1F2937" />
                  ) : provider === 'google' ? (
                    <Image source={images.googleLogo} style={{ width: 24, height: 24 }} />
                  ) : (
                    <Ionicons 
                      name={`logo-${provider}` as any} 
                      size={24} 
                      color={provider === 'facebook' ? '#1877F2' : '#1F2937'} 
                    />
                  )}
                </TouchableOpacity>
              );
            })}
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
