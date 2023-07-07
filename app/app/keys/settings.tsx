import { Stack, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../HapticFeedback';
import { IconSet } from '../IconSet';

export default function KeySettingsPage(): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Settings',
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
    </>
  );
}
