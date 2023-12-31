import { Stack, useRouter } from 'expo-router';
import { ReactElement, useState } from 'react';
import { Animated, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../HapticFeedback';
import { IconSet, IconSetName } from '../IconSet';
import FlatList = Animated.FlatList;

export default function KeychainTab(): ReactElement {
  const [onboarding] = useState(false);
  if (!onboarding) {
    return <KeychainOnboarding />;
  }

  return <KeychainListView />;
}

function KeychainOnboarding(): ReactElement {
  const tailwind = useTailwind();
  const router = useRouter();
  const haptic = useHaptic();

  return (
    <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
      <ScrollView contentContainerStyle={tailwind('py-6')} centerContent>
        <View style={tailwind('flex-col items-center justify-center p-6')}>
          <View style={tailwind('p-8 bg-zinc-900 rounded-md')}>
            <IconSet name="key" size={64} color="white" />
          </View>

          <View style={tailwind('mt-3')}>
            <Text style={tailwind('text-2xl font-bold text-zinc-200')}>Levain Keychain</Text>
          </View>

          <View style={tailwind('mt-4 w-full')}>
            <CreateButton
              onPress={async () => {
                router.push('/keys/setup/generate');
                await haptic.selectionAsync();
              }}
              icon="calculator"
              title="Generate Keychain"
              caption="Create a new set of mnemonics using your device's secure element."
            />
            <CreateButton
              onPress={async () => {
                router.push('/keys/setup/import');
                await haptic.selectionAsync();
              }}
              icon="upload"
              title="Import Keychain"
              caption="Import a pre-existing set of mnemonics from another secure source."
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  function CreateButton(props: {
    onPress?: () => void;
    title: string;
    caption: string;
    icon: IconSetName;
  }): ReactElement {
    return (
      <TouchableOpacity style={tailwind('mt-4')} onPress={props.onPress}>
        <View style={tailwind('bg-zinc-900 flex-row items-center py-3 px-4 rounded')}>
          <View style={tailwind('p-2 bg-zinc-800 rounded mr-4')}>
            <IconSet name={props.icon} size={24} style={tailwind('text-zinc-200')} />
          </View>
          <View style={tailwind('shrink flex-col')}>
            <Text style={tailwind('text-lg font-bold text-zinc-200')}>{props.title}</Text>
            <Text style={tailwind('text-sm text-zinc-400 flex-1 w-full')}>{props.caption}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

function KeychainListView(): ReactElement {
  const tailwind = useTailwind();
  const router = useRouter();
  const haptic = useHaptic();

  return (
    <>
      <Stack.Screen
        options={{
          headerStyle: tailwind('bg-zinc-900'),
          headerRight: () => (
            <TouchableOpacity
              style={tailwind('px-4 py-2')}
              onPress={async () => {
                await haptic.selectionAsync();
                router.push('/keys/create');
              }}
            >
              <IconSet name="plus" size={24} style={tailwind('text-zinc-100')} />
            </TouchableOpacity>
          ),
        }}
      />
      <FlatList
        style={tailwind('flex-1 bg-zinc-950')}
        contentContainerStyle={tailwind('py-2')}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
        renderItem={({ item }) => <KeychainKeyRow data={item} />}
      />
    </>
  );
}

function KeychainKeyRow(props: { data: number }): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  const colors = [
    'bg-red-950',
    'bg-yellow-950',
    'bg-lime-950',
    'bg-teal-950',
    'bg-sky-950',
    'bg-blue-950',
    'bg-violet-950',
    'bg-fuchsia-950',
  ];

  return (
    <TouchableOpacity
      onPress={async () => {
        await haptic.selectionAsync();
      }}
      style={tailwind('px-4 py-2 flex-row items-center')}
    >
      <View
        style={{
          ...tailwind('bg-zinc-900 rounded-sm mr-3 bg-red-950 p-3'),
          ...tailwind(colors[props.data % Object.keys(colors).length]),
        }}
      >
        <IconSet name="key" size={28} style={tailwind('text-zinc-200')} />
      </View>
      <View>
        <Text style={tailwind('text-lg font-bold text-zinc-200')}>Key #{props.data}</Text>
        <Text style={tailwind('text-sm text-zinc-200 font-mono')}>4c8926b4-8a4e15fc</Text>
      </View>
    </TouchableOpacity>
  );
}
