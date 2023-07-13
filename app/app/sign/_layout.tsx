import { Stack } from 'expo-router';
import { ReactElement } from 'react';

export default function Layout(): ReactElement {
  return <Stack screenOptions={{ headerShown: false }} />;
}
