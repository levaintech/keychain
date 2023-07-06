import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function SignPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <View style={tailwind('flex-1 items-center justify-center bg-zinc-900')}>
        <Text style={tailwind('text-center text-xl text-white')}>Sign</Text>
      </View>
    </>
  );
}
