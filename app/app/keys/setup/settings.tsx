import { router, Stack } from 'expo-router';
import { ReactElement } from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { StackHeaderBack } from '../../../components/StackHeader';
import {
  KeychainSettingRowBip32Hardened,
  KeychainSettingRowBip32Scheme,
  KeychainSettingRowBip39Language,
  KeychainSettingRowDivider,
  KeychainSettingRowMaxLength,
} from '../settings';

export default function SetupSettingsPage(): ReactElement {
  const tailwind = useTailwind();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Settings',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-6 flex-grow justify-between')}>
          <View>
            <Text style={tailwind('text-sm text-zinc-400 mx-6 mb-4')}>
              For security reasons, these settings cannot be edited. They are used to generate your private keys from
              your mnemonic phrase. By default, we employ the BIP32 and BIP39 standards, adhering to best practices to
              ensure your security.
            </Text>
            <KeychainSettingRowBip32Scheme />
            <KeychainSettingRowDivider />
            <KeychainSettingRowMaxLength />
            <KeychainSettingRowDivider />
            <KeychainSettingRowBip32Hardened />
            <KeychainSettingRowBip39Language />
          </View>

          <View style={tailwind('mx-6')}>
            <PrimaryActionButton
              onPress={async () => {
                await router.push('/');
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
