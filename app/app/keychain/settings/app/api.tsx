import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function ApiSigningPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'API Signing',
          headerLargeTitle: true,
        }}
      />
      <View style={tailwind('flex-1 items-center justify-center bg-stone-900')}>
        <Text style={tailwind('text-center text-xl text-white')} testID="KeysPage.Keys">
          Settings - api.tsx
        </Text>
      </View>
    </>
  );
}
