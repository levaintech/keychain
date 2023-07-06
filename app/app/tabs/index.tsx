import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function KeysPage(): JSX.Element {
  const tailwind = useTailwind();
  return (
    <>
      <View style={tailwind('flex-1 flex-col items-center justify-center bg-zinc-900')}>
        <Text style={tailwind('text-center text-xl text-white')}>Keys</Text>
      </View>
    </>
  );
}
