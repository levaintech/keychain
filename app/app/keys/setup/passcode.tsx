import { router, Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { PasscodeInput } from '../../../components/PasscodeInput';
import { StackHeaderBack } from '../../../components/StackHeader';

export default function SetupPasscodePage(): ReactElement {
  const tailwind = useTailwind();
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
            <PrimaryActionButton
              disabled={passcode.length < 6}
              onPress={async () => {
                await router.push({
                  pathname: 'keys/setup/confirm',
                  params: {
                    passcode,
                  },
                });
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
