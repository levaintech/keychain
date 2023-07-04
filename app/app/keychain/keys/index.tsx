import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { IconSet } from '../../IconSet';

export default function KeysPage(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <>
      <Stack.Screen options={{ title: 'Keys' }} />
      <View style={tailwind('flex-1 items-center justify-center bg-stone-900')}>
        <Text style={tailwind('text-center text-xl text-white')} testID="KeysPage.Keys">
          Keys
        </Text>

        <Link href="/_sitemap" style={tailwind('my-2')} testID="">
          <View style={tailwind('rounded bg-white px-2 flex-row items-center justify-center')}>
            <IconSet name="scan1" size={24} color="#000"></IconSet>
            <Text style={tailwind('text-xl ml-2')}>Sitemap</Text>
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
