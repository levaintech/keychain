import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { ReactElement, useEffect } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider, useTailwind } from 'tailwind-rn';

import { StackHeaderClose } from '../components/StackHeader';
import utilities from '../tailwind.json';
import { ExternalLinkProvider } from './ExternalLinkProvider';
import { HapticFeedbackProvider } from './HapticFeedback';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function Layout(): ReactElement {
  return (
    // @ts-ignore because TailwindProvider is not typed correctly
    <TailwindProvider utilities={utilities}>
      <WebContainer />
    </TailwindProvider>
  );
}

function WebContainer(): ReactElement {
  const tailwind = useTailwind();
  if (Platform.OS === 'web') {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-zinc-800')}>
        <View style={tailwind('w-[390px] h-[800px]')}>
          <AppContainer />
        </View>
      </View>
    );
  }
  return <AppContainer />;
}

function AppContainer(): ReactElement | null {
  const tailwind = useTailwind();
  const [loaded, error] = useFonts({
    /* eslint-disable global-require */
    AntDesign: require('../assets/fonts/AntDesign.ttf'),
    JetBrainsMono: require('../assets/fonts/JetBrainsMono.ttf'),
    /* eslint-enable global-require */
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      setStatusBarStyle('light');
    }
    if (error) {
      throw error;
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <HapticFeedbackProvider>
          <ExternalLinkProvider>
            <Stack
              screenOptions={{
                headerShown: true,
                presentation: 'modal',
                headerStyle: tailwind('bg-zinc-900'),
                headerRight: () => <StackHeaderClose />,
                headerLeft: () => null,
              }}
            >
              <Stack.Screen name="index" redirect />
              <Stack.Screen name="tabs" options={{ headerShown: false }} />

              {/* For key related screens, they're set to full screen modal to force closing of modal to be a more deliberate action. */}
              <Stack.Screen name="keys/setup" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
              <Stack.Screen name="keys/settings" options={{ headerShown: false, presentation: 'fullScreenModal' }} />
            </Stack>
          </ExternalLinkProvider>
        </HapticFeedbackProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
