import { Stack } from 'expo-router';
import { ReactElement } from 'react';

export default function ApiSettingsPage(): ReactElement {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'API Settings',
        }}
      />
    </>
  );
}
