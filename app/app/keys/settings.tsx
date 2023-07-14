import { Stack } from 'expo-router';
import { ReactElement } from 'react';

export default function KeySettingsPage(): ReactElement {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Settings',
        }}
      />
    </>
  );
}
