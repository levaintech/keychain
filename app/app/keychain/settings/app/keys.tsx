import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function KeyStoragePage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <Stack.Screen options={{ title: 'Key Storage' }} />
      <View style={tailwind('flex-1 items-center justify-center bg-stone-900')}>
        <Text style={tailwind('text-center text-xl text-white')} testID="KeysPage.Keys">
          Settings - keys.tsx
        </Text>
      </View>
    </>
  );
}
