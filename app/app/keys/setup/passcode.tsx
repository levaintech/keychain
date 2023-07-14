import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { PasscodeInput } from '../../../components/PasscodeInput';
import { StackHeaderBack } from '../../../components/StackHeader';

export default function SetupPasscodePage(): ReactElement {
  const tailwind = useTailwind();
  const [passcode, setPasscode] = useState('');
  const [state, setState] = useState({
    error: '',
    correctPasscode: '',
    correctCount: 0,
  });

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
            <Text style={tailwind('text-2xl font-bold text-zinc-200 text-center')}>
              {state.correctCount === 0 ? 'Enter Keychain Passcode' : 'Confirm Keychain Passcode'}
            </Text>

            {state.error !== '' && (
              <Text style={tailwind('text-base font-bold text-red-600 mt-2 text-center')}>{state.error}</Text>
            )}

            <PasscodeInput
              value={passcode}
              onValueChange={(text) => {
                if (text.length < 6) {
                  setPasscode(text);
                  return;
                }

                if (state.correctCount === 0) {
                  setPasscode('');
                  setState({
                    error: '',
                    correctCount: 1,
                    correctPasscode: text,
                  });
                  return;
                }

                if (state.correctPasscode === text) {
                  Keyboard.dismiss();
                  setPasscode(text);
                  setState({
                    error: '',
                    correctCount: state.correctCount + 1,
                    correctPasscode: state.correctPasscode,
                  });
                } else {
                  setPasscode('');
                  setState({
                    error: 'Incorrect passcode, please enter again.',
                    correctCount: 0,
                    correctPasscode: '',
                  });
                }
              }}
            />

            <Text style={tailwind('mt-6 text-sm text-zinc-400 text-center')}>
              Set up a 6-digit passcode to secure your keychain. This passcode will be required when you open the app or
              make a transaction. Note that this passcode is different from your device passcode or BIP39 passphrase.
            </Text>
          </View>

          <View style={tailwind('')}>
            <PrimaryActionButton
              disabled={state.correctCount < 2}
              onPress={async () => {
                await router.push('keys/setup/settings');
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
