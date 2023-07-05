import * as Linking from 'expo-linking';
import { Link, Stack } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useExternalLink } from '../../ExternalLinkProvider';
import { useHapticFeedback } from '../../HapticFeedback';
import { IconSet } from '../../IconSet';

export default function KeysPage(): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHapticFeedback();
  const external = useExternalLink();
  const url = 'https://google.com/testing';
  return (
    <>
      <Stack.Screen options={{ title: 'Keys' }} />
      <View style={tailwind('flex-1 flex-col items-center justify-center bg-stone-900')}>
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

        <TouchableOpacity onPress={() => external.open('https://google.com')} style={tailwind('my-2')} testID="">
          <View style={tailwind('rounded bg-white px-4 py-1')}>
            <Text style={tailwind('text-xl')}>Open External</Text>
          </View>
        </TouchableOpacity>

        <View style={tailwind('w-full p-2')}>
          <View style={tailwind('bg-stone-800 p-4')}>
            <View style={tailwind('flex-row items-stretch')}>
              <View style={tailwind('rounded bg-stone-700 p-2')}>
                <IconSet name="link" size={16} style={tailwind('text-stone-100')} />
              </View>
              <View style={tailwind('rounded bg-stone-700 flex-grow px-2 ml-2 flex-row items-center')}>
                <Text style={tailwind('text-white text-base')}>{url}</Text>
              </View>
            </View>
            <Text style={tailwind('text-white py-2 text-base')}>
              You're about to navigate to an external website. Please proceed with caution and avoid sharing sensitive
              information.
            </Text>
            <View style={tailwind('flex-row justify-end')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.selectionAsync();
                  await Linking.openURL(url);
                  external.close();
                }}
              >
                <View style={tailwind('rounded bg-stone-600 px-4 py-2')}>
                  <Text style={tailwind('text-white font-medium text-lg')}>Continue</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}
