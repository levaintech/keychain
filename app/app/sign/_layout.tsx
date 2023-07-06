import { Stack } from 'expo-router';

export default function Layout(): JSX.Element {
  return <Stack screenOptions={{ headerShown: false }} />;
}
