import { Stack } from 'expo-router';
import { Platform, View } from 'react-native';
import { TailwindProvider, useTailwind } from 'tailwind-rn';

import utilities from '../tailwind.json';

export default function Layout(): JSX.Element {
  return (
    // @ts-ignore because TailwindProvider is not typed correctly
    <TailwindProvider utilities={utilities}>
      <WebContainer />
    </TailwindProvider>
  );
}

function WebContainer(): JSX.Element {
  const tailwind = useTailwind();
  if (Platform.OS === 'web') {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-black')}>
        <View style={tailwind('w-[390px] h-[800px]')}>
          <AppContainer />
        </View>
      </View>
    );
  }
  return <AppContainer />;
}

function AppContainer(): JSX.Element {
  return (
    <Stack>
      <Stack.Screen name="keychain" options={{ headerShown: false }} />
      <Stack.Screen name="signing" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
