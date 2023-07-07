import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../HapticFeedback';
import { IconSet } from '../IconSet';

export default function ApiSettingsPage(): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          title: 'API Settings',
          headerStyle: tailwind('bg-zinc-900'),
          headerRight: () => (
            <TouchableOpacity
              onPress={async () => {
                await haptic.selectionAsync();
                router.back();
              }}
            >
              <IconSet name="close" size={24} style={tailwind('text-zinc-100')} />
            </TouchableOpacity>
          ),
        }}
      />
      <View style={tailwind('flex-1 items-center justify-center bg-zinc-950')}></View>
    </>
  );
}
