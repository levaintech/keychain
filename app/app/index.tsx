import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home(): JSX.Element {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-2xl text-amber-700">KeyChain — Open up index.tsx to start working on your app!</Text>
      {/* Use the `Screen` component to configure the layout. */}
      <Stack.Screen options={{ title: 'Overview' }} />
      {/* Use the `Link` component to enable optimized client-side routing. */}
      <Link href="/detail">
        <Text className="text-2xl">Go to Detail</Text>
      </Link>
    </View>
  );
}
