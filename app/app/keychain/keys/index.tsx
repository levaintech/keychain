import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function KeysPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <View style={tailwind('flex-1 items-center justify-center bg-black')}>
        <Text style={tailwind('text-center text-xl text-white')} testID="KeysPage.Keys">
          Keys
        </Text>

        <Link href="/_sitemap" style={tailwind('my-2')} testID="">
          <View style={tailwind('rounded bg-white px-4 py-1')}>
            <Text style={tailwind('text-xl')}>Sitemap</Text>
          </View>
        </Link>

        <Link href="/signing" style={tailwind('my-2')} testID="">
          <View style={tailwind('rounded bg-white px-4 py-1')}>
            <Text style={tailwind('text-xl')}>Signing</Text>
          </View>
        </Link>
      </View>
    </>
  );
}
