import { Stack } from 'expo-router';
import { useTailwind } from 'tailwind-rn';

export default function SettingLayout(): JSX.Element {
  const tailwind = useTailwind();

  return (
    <Stack
      screenOptions={{
        headerTintColor: tailwind('text-white').color as string,
        headerStyle: tailwind('bg-stone-900'),
        headerTitleStyle: tailwind('text-white'),
      }}
    />
  );
}
