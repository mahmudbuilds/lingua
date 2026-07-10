import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { useAuth } from "@clerk/expo";

export default function Index() {
  const { signOut } = useAuth();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F7FB' }}>
      <ScrollView contentContainerStyle={{ padding: 24, paddingBottom: 64 }} className="flex-1">
        <Text className="h1 text-text-primary mb-2">Brand Typography</Text>
        <Text className="body text-text-secondary mb-8">
          Poppins is a modern, geometric sans-serif typeface that provides excellent readability and a friendly personality.
        </Text>

        <View className="mb-8 p-4 bg-white rounded-xl border border-border">
          <Text className="h3 text-text-primary mb-2">Screens</Text>
          <Link href="/onboarding" asChild>
            <TouchableOpacity className="bg-primary py-3 px-4 rounded-xl items-center mb-2">
              <Text className="body-lg text-white font-bold">Go to Onboarding</Text>
            </TouchableOpacity>
          </Link>
          <Link href="/choose-language" asChild>
            <TouchableOpacity className="bg-primary-deep py-3 px-4 rounded-xl items-center mb-2">
              <Text className="body-lg text-white font-bold">Language Selection</Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity onPress={() => signOut()} className="bg-error py-3 px-4 rounded-xl items-center mb-2 mt-2">
            <Text className="body-lg text-white font-bold">Sign Out</Text>
          </TouchableOpacity>
        </View>

        <View className="mb-8">
          <Text className="h1 text-text-primary mb-4">H1 - Page / Screen Title</Text>
          <Text className="h2 text-text-primary mb-4">H2 - Section Title</Text>
          <Text className="h3 text-text-primary mb-4">H3 - Card / Module Title</Text>
          <Text className="h4 text-text-primary mb-4">H4 - Subheading</Text>
          <Text className="body-lg text-text-primary mb-4">Body Large - Important content</Text>
          <Text className="body text-text-primary mb-4">Body Medium - Body text</Text>
          <Text className="body-sm text-text-primary mb-4">Body Small - Supporting text</Text>
          <Text className="caption text-text-primary mb-4">Caption - Labels, meta text</Text>
        </View>

        <Text className="h2 text-text-primary mb-4">Colors</Text>
        
        <View className="flex-row flex-wrap gap-4 mb-8">
          <View className="w-24 h-24 rounded-2xl bg-primary items-center justify-center shadow-sm">
            <Text className="caption text-background">Primary</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-primary-deep items-center justify-center shadow-sm">
            <Text className="caption text-background">Deep Purple</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-primary-blue items-center justify-center shadow-sm">
            <Text className="caption text-background">Blue</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-primary-green items-center justify-center shadow-sm">
            <Text className="caption text-background">Green</Text>
          </View>
        </View>

        <Text className="h3 text-text-primary mb-4">Semantic Colors</Text>
        <View className="flex-row flex-wrap gap-4">
          <View className="w-24 h-24 rounded-2xl bg-success items-center justify-center shadow-sm">
            <Text className="caption text-background">Success</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-warning items-center justify-center shadow-sm">
            <Text className="caption text-text-primary">Warning</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-streak items-center justify-center shadow-sm">
            <Text className="caption text-background">Streak</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-error items-center justify-center shadow-sm">
            <Text className="caption text-background">Error</Text>
          </View>
          <View className="w-24 h-24 rounded-2xl bg-info items-center justify-center shadow-sm">
            <Text className="caption text-background">Info</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
