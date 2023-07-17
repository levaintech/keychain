import { Stack } from 'expo-router';
import { ReactElement, useState } from 'react';
import { Keyboard, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PasscodeInput } from '../../../components/PasscodeInput';
import { StackHeaderBack } from '../../../components/StackHeader';

export default function SettingPasscodePage(): ReactElement {
  const tailwind = useTailwind();
  const [validated, setValidated] = useState(false);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Passcode Settings',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('p-6 flex-grow justify-between')}>
          {validated ? (
            <View style={tailwind('py-12')}>
              <Text style={tailwind('text-2xl font-bold text-zinc-200')}>Change Passcode</Text>
            </View>
          ) : (
            <View style={tailwind('py-12')}>
              <EnterPasscodeValidation
                onValidated={() => {
                  setValidated(true);
                }}
                onError={() => {}}
              />
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );

  function EnterPasscodeValidation(props: { onValidated: () => void; onError: () => void }): ReactElement {
    const [passcode, setPasscode] = useState('');

    return (
      <View>
        <Text style={tailwind('text-2xl font-bold text-zinc-200 text-center')}>Enter Keychain Passcode</Text>

        <PasscodeInput
          value={passcode}
          onValueChange={(text) => {
            setPasscode(text);
            if (text.length === 6) {
              props.onValidated();
              Keyboard.dismiss();
            }
          }}
        />
      </View>
    );
  }
}
