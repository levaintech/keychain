import { Stack } from 'expo-router';
import { TailwindProvider } from 'tailwind-rn';

import utilities from '../tailwind.json';

export default function Layout(): JSX.Element {
  return (
    // @ts-ignore because TailwindProvider is not typed correctly
    <TailwindProvider utilities={utilities}>
      <Stack />
    </TailwindProvider>
  );
}
