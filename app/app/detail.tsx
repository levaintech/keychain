import { Stack, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function Details(): JSX.Element {
  const router = useRouter();
  const tailwind = useTailwind();
  return (
    <View>
      <Stack.Screen options={{ title: 'Detail' }} />
      <Text
        style={tailwind('text-2xl font-medium')}
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
