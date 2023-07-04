import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function ScanPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <Stack.Screen options={{ title: 'Scan' }} />
      <View style={tailwind('flex-1 items-center justify-center bg-stone-900')}>
        <Text style={tailwind('text-center text-xl text-white')}>KeyChain — Scan</Text>
      </View>
    </>
  );
}
