import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { setStatusBarStyle } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider, useTailwind } from 'tailwind-rn';

import utilities from '../tailwind.json';
import { ExternalLinkProvider } from './ExternalLinkProvider';
import { HapticFeedbackProvider } from './HapticFeedback';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

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
      <View style={tailwind('flex-1 justify-center items-center bg-zinc-800')}>
        <View style={tailwind('w-[390px] h-[800px]')}>
          <AppContainer />
        </View>
      </View>
    );
  }
  return <AppContainer />;
}

function AppContainer(): JSX.Element | null {
  const [loaded, error] = useFonts({
    // eslint-disable-next-line global-require
    AntDesign: require('../assets/fonts/AntDesign.ttf'),
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

  return (
    <SafeAreaProvider>
      <ThemeProvider value={DarkTheme}>
        <HapticFeedbackProvider>
          <ExternalLinkProvider>
            <Stack>
              <Stack.Screen name="tabs" options={{ headerShown: false }} />
              <Stack.Screen name="sign" options={{ presentation: 'modal' }} />
              <Stack.Screen name="about/design" options={{ presentation: 'modal' }} />
              <Stack.Screen name="about/licenses" options={{ presentation: 'modal' }} />
              <Stack.Screen name="api/settings" options={{ presentation: 'modal' }} />
              <Stack.Screen name="keys/settings" options={{ presentation: 'modal' }} />
              <Stack.Screen name="scan/settings" options={{ presentation: 'modal' }} />
            </Stack>
          </ExternalLinkProvider>
        </HapticFeedbackProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
