import { router, Stack } from 'expo-router';
import { ReactElement } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { StackHeaderBack } from '../../../components/StackHeader';
import { useHaptic } from '../../HapticFeedback';
import {
  KeychainSettingRowBip32Hardened,
  KeychainSettingRowBip32Scheme,
  KeychainSettingRowBip39Language,
  KeychainSettingRowDivider,
  KeychainSettingRowMaxLength,
} from '../settings';

export default function SetupSettingsPage(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Settings',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-6')}>
          <Text style={tailwind('text-sm text-zinc-400 mx-6 mb-4')}>
            You can't edit these settings, they're used to derive your private keys from your mnemonic phrase. We use
            BIP32 and BIP39 standards set to best practices by default to ensure your security.
          </Text>
          <KeychainSettingRowBip32Scheme />
          <KeychainSettingRowDivider />
          <KeychainSettingRowMaxLength />
          <KeychainSettingRowDivider />
          <KeychainSettingRowBip32Hardened />
          <KeychainSettingRowBip39Language />

          <View style={tailwind('m-6')}>
            <TouchableOpacity
              onPress={async () => {
                await haptic.selectionAsync();
                await router.push('/');
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
