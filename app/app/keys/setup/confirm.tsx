import { router, Stack } from 'expo-router';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { StackHeaderBack } from '../../../components/StackHeader';
import { NotificationFeedbackType, useHaptic } from '../../HapticFeedback';
import { IconSet } from '../../IconSet';

const confirmations = [
  {
    title: 'Secure Storage',
    description: 'Your mnemonic phrase is stored securely in a safe place.',
  },
  {
    title: "Device's Secure Enclave",
    description: 'Your mnemonic phrase is stored securely in a safe place.',
  },
  {
    title: "Device's Secure Enclave",
    description:
      'Your mnemonic phrase is stored securely in a safe place, multi line more lines testing. more more more more',
  },
];

export default function SetupConfirmPage(): ReactElement {
  const haptic = useHaptic();
  const tailwind = useTailwind();
  const [confirmed, setConfirmed] = useState({});
  const [sentence, setSentence] = useState('');

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Confirm Keychain',
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
              placeholder="Enter your mnemonic phrase here for verification."
              value={sentence}
              placeholderTextColor={tailwind('text-zinc-400').color as any}
              style={tailwind('px-6 py-2 text-base text-zinc-200 bg-zinc-900 h-48')}
            />

            <View style={tailwind('my-12')}>
              <View style={tailwind('flex-row mx-6 mb-2 items-center')}>
                <IconSet name="Safety" size={24} style={tailwind('text-white')} />
                <Text style={tailwind('text-lg font-bold text-zinc-200 ml-2')}>Security & Safety Confirmations</Text>
              </View>
              {confirmations.map((confirm, index) => (
                <>
                  <KeychainConfirmRow
                    title={confirm.title}
                    description={confirm.description}
                    value={confirmed[index]}
                    onPress={async () => {
                      await haptic.notificationAsync(NotificationFeedbackType.Success);
                      setConfirmed({
                        ...confirmed,
                        [index]: !confirmed[index],
                      });
                    }}
                  />
                  {index !== confirmations.length - 1 && <KeychainConfirmDivider />}
                </>
              ))}
            </View>
          </View>

          <View style={tailwind('mx-6')}>
            <PrimaryActionButton
              disabled={Object.values(confirmed).some((value) => !value)}
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

function KeychainConfirmRow(
  props: PropsWithChildren<{
    title: string;
    description: string;
    value: boolean;
    onPress: () => Promise<void>;
  }>,
): ReactElement {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('px-6 bg-zinc-900 flex-row items-center justify-between')}>
      <View style={tailwind('py-3 shrink')}>
        <View style={tailwind('mr-3')}>
          <Text style={tailwind('text-base font-bold text-zinc-200')}>{props.title}</Text>
          <Text style={tailwind('mt-[2px] text-sm text-zinc-400')}>{props.description}</Text>
        </View>
      </View>
      <Switch
        value={props.value}
        onValueChange={props.onPress}
        thumbColor={tailwind('text-zinc-200').color as any}
        trackColor={{
          false: tailwind('text-teal-800').color as any,
          true: tailwind('text-teal-800').color as any,
        }}
      />
    </View>
  );
}

function KeychainConfirmDivider(): ReactElement {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('pl-6 bg-zinc-900')}>
      <View style={tailwind('bg-zinc-950 opacity-60 w-full h-px')} />
    </View>
  );
}
