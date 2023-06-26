import { nativeApplicationVersion, nativeBuildVersion } from 'expo-application';
import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-center text-xl text-amber-700">
        KeyChain — Open up index.tsx to start working on your app!
      </Text>
      {/* Use the `Screen` component to configure the layout. */}
      <Stack.Screen options={{ title: 'Overview' }} />
      {/* Use the `Link` component to enable optimized client-side routing. */}
      <Link href="/detail" className="my-2">
        <View className="rounded bg-amber-300 px-4 py-1">
          <Text className="text-xl">Go to Detail</Text>
        </View>
      </Link>

      <View>
        <Text>Version: {nativeApplicationVersion}</Text>
        <Text>Build: {nativeBuildVersion}</Text>
      </View>
    </View>
  );
}
