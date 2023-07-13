import classNames from 'classnames';
import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PasscodeInput } from '../../../components/PasscodeInput';
import { StackHeaderBack } from '../../../components/StackHeader';
import { useHaptic } from '../../HapticFeedback';

export default function SetupPasscodePage(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const [passcode, setPasscode] = useState('');

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Passcode',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('p-6 flex-grow justify-between')}>
          <View style={tailwind('py-12')}>
            <Text style={tailwind('text-2xl font-bold text-zinc-200 text-center')}>Enter Passcode</Text>

            <PasscodeInput onPasscodeChange={setPasscode} />

            <Text style={tailwind('mt-6 text-sm text-zinc-400 text-center')}>
              Enter a 6-digit passcode to protect your keychain. You will be asked to enter this passcode when you open
              the app or when you make a transaction. This passcode is not the same as your device passcode or BIP39
              paraphrase.
            </Text>
          </View>

          <View style={tailwind('')}>
            <TouchableOpacity
              disabled={passcode.length < 6}
              onPress={async () => {
                await haptic.selectionAsync();
                await router.push({
                  pathname: 'keys/setup/confirm',
                  params: {
                    passcode,
                  },
                });
              }}
              style={tailwind(
                classNames('rounded-full px-8 py-3 w-full', {
                  'bg-zinc-600': passcode.length < 6,
                  'bg-zinc-200': passcode.length === 6,
                }),
              )}
            >
              <Text style={tailwind('text-zinc-800 font-bold text-lg text-center')}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
