import { NotificationFeedbackType } from 'expo-haptics';
import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { useHaptic } from '../../HapticFeedback';
import { IconSet } from '../../IconSet';

export default function GeneratePage(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const [sentence] = useState(
    'abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art',
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Generate Keychain',
        }}
      />
      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-6 flex-grow justify-between')}>
          <View>
            <View style={tailwind('flex-row items-center justify-between mx-6 mb-2')}>
              <Text style={tailwind('text-lg font-bold text-zinc-200')}>Keychain Mnemonic (BIP39)</Text>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.notificationAsync(NotificationFeedbackType.Success);
                }}
              >
                <IconSet name="reload1" size={20} style={tailwind('text-zinc-100')} />
              </TouchableOpacity>
            </View>
            <TextInput
              editable={false}
              multiline
              secureTextEntry
              value={sentence}
              style={tailwind('px-6 py-2 text-base text-zinc-200 bg-zinc-900 rounded h-48')}
            />
            <Text style={tailwind('text-sm text-zinc-500 mx-6 mt-2')}>
              Write down your mnemonic phrase and keep it in a safe place. You will need it to recover your wallet. You
              will be asked to confirm your mnemonic phrase in the next step.
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
