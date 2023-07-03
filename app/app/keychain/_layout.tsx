import AntDesign from '@expo/vector-icons/AntDesign';
import { Tabs } from 'expo-router';
import { useTailwind } from 'tailwind-rn';

export default function TabsLayout(): JSX.Element {
  const tailwind = useTailwind();
  return (
    <Tabs
      initialRouteName="keys"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor: '#fff',
        tabBarStyle: tailwind('bg-black'),
      }}
    >
      <Tabs.Screen name="index" redirect={true} />
      <Tabs.Screen
        name="keys"
        options={{ title: 'KEYS', tabBarIcon: ({ color }) => <AntDesign name="key" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="qr"
        options={{ title: 'QR', tabBarIcon: ({ color }) => <AntDesign name="qrcode" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="rpc"
        options={{ title: 'RPC', tabBarIcon: ({ color }) => <AntDesign name="wifi" size={20} color={color} /> }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'SETTING',
          tabBarIcon: ({ color }) => <AntDesign name="setting" size={20} color={color} />,
        }}
      />
    </Tabs>
  );
}
