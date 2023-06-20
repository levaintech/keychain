import { Stack, useRouter } from 'expo-router';
import { Text, View } from 'react-native';

export default function Details(): JSX.Element {
  const router = useRouter();
  return (
    <View>
      <Stack.Screen options={{ title: 'Detail' }} />
      <Text
        className="text-2xl font-medium"
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          router.back();
        }}
      >
        Details Screen
      </Text>
    </View>
  );
}
