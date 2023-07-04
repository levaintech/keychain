import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TailwindProvider, useTailwind } from 'tailwind-rn';

import utilities from '../tailwind.json';
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
      <View style={tailwind('flex-1 justify-center items-center bg-stone-800')}>
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
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <HapticFeedbackProvider>
        <ThemeProvider value={DarkTheme}>
          <StatusBar style="light" />
          <Stack>
            <Stack.Screen name="keychain" options={{ headerShown: false }} />
            <Stack.Screen name="signing" options={{ presentation: 'modal' }} />
          </Stack>
        </ThemeProvider>
      </HapticFeedbackProvider>
    </SafeAreaProvider>
  );
}
