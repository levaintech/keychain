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
        tabBarTestID: `/keychain/${props.route}`,
        title: props.title,
        tabBarIcon: ({ color }) => <IconSet name={props.icon} size={24} color={color} />,
      },
    };
  }

  return (
    <Tabs
      initialRouteName="keys"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarStyle: tailwind('bg-stone-900 border-t border-stone-800'),
      }}
    >
      <Tabs.Screen name="index" redirect={true} />
      <Tabs.Screen {...tabScreenProps({ route: 'keys', title: 'KEYS', icon: 'key' })} />
      <Tabs.Screen {...tabScreenProps({ route: 'api', title: 'API', icon: 'API' })} />
      <Tabs.Screen {...tabScreenProps({ route: 'scan', title: 'SCAN', icon: 'scan1' })} />
      <Tabs.Screen {...tabScreenProps({ route: 'settings', title: 'SETTING', icon: 'setting' })} />
    </Tabs>
  );
}
