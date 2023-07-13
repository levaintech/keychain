import { ReactElement } from 'react';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function ApiTab(): ReactElement {
  const tailwind = useTailwind();

  return (
    <>
      <View style={tailwind('flex-1 items-center justify-center bg-zinc-950')}>
        <Text style={tailwind('text-center text-xl text-white')}>API Requests</Text>
      </View>
    </>
  );
}
