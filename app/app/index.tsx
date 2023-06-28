import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export default function Home(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('flex-1 items-center justify-center bg-white')}>
      <Text style={tailwind('text-center text-xl text-blue-600')} testID="KeyChain">
        KeyChain — Open up index.tsx to start working on your app!
      </Text>
      {/* Use the `Screen` component to configure the layout. */}
      <Stack.Screen options={{ title: 'Overview' }} />
      {/* Use the `Link` component to enable optimized client-side routing. */}
      <Link href="/detail" style={tailwind('my-2')} testID="GoToDetail">
        <View style={tailwind('rounded bg-amber-300 px-4 py-1')}>
          <Text style={tailwind('text-xl')}>Go to Detail</Text>
        </View>
      </Link>

      <View>
        <Text>Version: {nativeApplicationVersion}</Text>
        <Text>Build: {nativeBuildVersion}</Text>
      </View>
    </View>
  );
}
