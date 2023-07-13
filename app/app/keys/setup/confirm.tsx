import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { StackHeaderBack } from '../../../components/StackHeader';
import { useHaptic } from '../../HapticFeedback';

export default function SetupConfirmPage(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const [sentence, setSentence] = useState('');

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Confirm Mnemonic (BIP39)',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-6')}>
          <Text style={tailwind('text-lg font-bold text-zinc-200 mb-2 mx-6')}>Keychain Mnemonic (BIP39)</Text>
          <TextInput
            editable
            multiline
            onChangeText={(text) => setSentence(text)}
            placeholder="Enter your mnemonic phrase here"
            value={sentence}
            style={tailwind('px-6 py-2 text-base text-zinc-200 bg-zinc-900 rounded h-48')}
          />

          <View style={tailwind('m-6')}>
            <TouchableOpacity
              onPress={async () => {
                await haptic.selectionAsync();
                await router.push({
                  pathname: 'keys/setup/passcode',
                  params: {
                    sentence,
                  },
                });
              }}
              style={tailwind('rounded-full bg-zinc-200 px-8 py-3 w-full')}
            >
              <Text style={tailwind('text-zinc-800 font-bold text-lg text-center')}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
