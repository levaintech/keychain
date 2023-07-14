import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';

export default function ImportPage(): ReactElement {
  const tailwind = useTailwind();
  const [sentence, setSentence] = useState(
    'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art',
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Import Keychain',
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
              style={tailwind('px-6 py-2 text-base text-zinc-200 bg-zinc-900 h-48')}
            />
            <Text style={tailwind('text-sm text-zinc-500 mx-6 mt-2')}>
              Import your mnemonic phrase to recover your wallet. Always procure your mnemonic phrase from a reliable
              source that ensures a high degree of entropy. Utilizing an untrusted source might lead to theft of your
              funds. It's not advisable to choose a mnemonic phrase randomly on your own due to inherent bias.
            </Text>
          </View>

          <View style={tailwind('mx-6')}>
            <PrimaryActionButton
              onPress={async () => {
                await router.push('keys/setup/confirm');
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
