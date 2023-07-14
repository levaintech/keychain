import { Stack, useRouter } from 'expo-router';
import { ReactElement } from 'react';
import { useTailwind } from 'tailwind-rn';

import { StackHeaderClose } from '../../../components/StackHeader';

export default function KeySettingLayout(): ReactElement {
  const tailwind = useTailwind();
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerStyle: tailwind('bg-zinc-900'),
        headerRight: () => (
          <StackHeaderClose
            onPress={() => {
              router.push('/tabs/settings');
            }}
          />
        ),
      }}
    />
  );
}
