import { Tabs } from 'expo-router';
import { ComponentProps } from 'react';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../HapticFeedback';
import { IconSet } from '../IconSet';

export default function TabsLayout(): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  function tabScreenProps(props: {
    route: string;
    title: string;
    icon: ComponentProps<typeof IconSet>['name'];
  }): ComponentProps<typeof Tabs.Screen> {
    return {
      name: props.route,
      listeners: () => ({
        tabPress: () => haptic.selectionAsync(),
      }),
      options: {
        tabBarTestID: `/tabs/${props.route}`,
        title: props.title,
        tabBarIcon: ({ color }) => <IconSet name={props.icon} size={24} color={color} />,
      },
    };
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarStyle: tailwind('bg-zinc-900 border-t border-zinc-800'),
        headerTintColor: tailwind('text-white').color as string,
        headerStyle: tailwind('bg-zinc-900'),
        headerTitleStyle: tailwind('text-white'),
      }}
    >
      <Tabs.Screen {...tabScreenProps({ route: 'index', title: 'Keychain', icon: 'key' })} />
      <Tabs.Screen {...tabScreenProps({ route: 'api', title: 'API Requests', icon: 'API' })} />
      {/* TODO(fuxingloh): implement scan. It is a planned feature, but removed it first to keep the development lean. */}
      {/* <Tabs.Screen {...tabScreenProps({ route: 'scan', title: 'Scan', icon: 'scan1' })} /> */}
      <Tabs.Screen {...tabScreenProps({ route: 'settings', title: 'Settings', icon: 'setting' })} />
    </Tabs>
  );
}
