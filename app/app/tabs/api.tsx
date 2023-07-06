import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function ApiPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <Stack.Screen options={{ title: 'API' }} />
      <View style={tailwind('flex-1 items-center justify-center bg-zinc-900')}>
        <Text style={tailwind('text-center text-xl text-white')}>API</Text>
      </View>
    </>
  );
}
