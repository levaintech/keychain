import { Stack } from 'expo-router';
import { ReactElement } from 'react';

export default function LicensesPage(): ReactElement {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Licenses',
        }}
      />
    </>
  );
}
