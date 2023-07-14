import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { StackHeaderBack } from '../../../components/StackHeader';

export default function SetupConfirmPage(): ReactElement {
  const tailwind = useTailwind();
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
        <ScrollView contentContainerStyle={tailwind('py-6 flex-grow justify-between')}>
          <View>
            <Text style={tailwind('text-lg font-bold text-zinc-200 mb-2 mx-6')}>Keychain Mnemonic (BIP39)</Text>
            <TextInput
              editable
              multiline
              onChangeText={(text) => setSentence(text)}
              placeholder="Enter your mnemonic phrase here"
              value={sentence}
              placeholderTextColor={tailwind('text-zinc-400').color as any}
              style={tailwind('px-6 py-2 text-base text-zinc-200 bg-zinc-900 rounded h-48')}
            />
          </View>

          <View style={tailwind('mx-6')}>
            <PrimaryActionButton
              onPress={async () => {
                await router.push('keys/setup/passcode');
              }}
            >
              Continue
            </PrimaryActionButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
