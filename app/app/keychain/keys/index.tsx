import { Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function KeysPage(): JSX.Element {
  const tailwind = useTailwind();
  return (
    <>
      <Stack.Screen options={{ title: 'Keys' }} />
      <View style={tailwind('flex-1 flex-col items-center justify-center bg-stone-900')}>
        <Text style={tailwind('text-center text-xl text-white')} testID="KeysPage.Keys">
          KeyChain — Keys
        </Text>
      </View>
    </>
  );
}
