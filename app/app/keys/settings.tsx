import { Stack } from 'expo-router';
import { ReactElement } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../HapticFeedback';
import { IconSet, IconSetName } from '../IconSet';

export default function KeySettingsPage(): ReactElement {
  const tailwind = useTailwind();
  // TODO(fuxingloh): setting to toggle show your mnemonic

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Settings',
        }}
      />
      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-6')}>
          <Text style={tailwind('py-3 px-6 text-zinc-300 bg-zinc-950')}>SECURITY</Text>
          <KeychainSettingRowPassword />
          <Text style={tailwind('py-3 px-6 text-zinc-300 bg-zinc-950')}>BIP32 & BIP39</Text>
          <KeychainSettingRowBip32Scheme />
          <KeychainSettingRowDivider />
          <KeychainSettingRowMaxLength />
          <KeychainSettingRowDivider />
          <KeychainSettingRowBip32Hardened />
          <KeychainSettingRowBip39Language />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export function KeychainSettingRowBip32Scheme(): ReactElement {
  const tailwind = useTailwind();

  return (
    <KeychainSettingRow title="BIP32 Derivation Scheme" icon="bars">
      <Text style={tailwind('text-base text-zinc-200 opacity-60')}>m/0'/0'/0'/0'/i'</Text>
    </KeychainSettingRow>
  );
}

export function KeychainSettingRowBip32Hardened(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  return (
    <KeychainSettingRow
      title="BIP32 Hardened"
      icon="Safety"
      description="Restrict keychain to hardened derivation paths. This secure your keychain by preventing child keys from being used to derive the parent key."
    >
      <TouchableOpacity onPress={() => haptic.notificationAsync(NotificationFeedbackType.Error)}>
        <Switch
          disabled
          value
          thumbColor={tailwind('text-zinc-200').color as any}
          trackColor={{
            false: tailwind('text-teal-800').color as any,
            true: tailwind('text-teal-800').color as any,
          }}
        />
      </TouchableOpacity>
    </KeychainSettingRow>
  );
}

export function KeychainSettingRowBip39Language(): ReactElement {
  const tailwind = useTailwind();

  return (
    <KeychainSettingRow
      title="BIP39 Language"
      icon="infocirlceo"
      description="To ensure your keychain is compatible with other wallets, we only allow the default English wordlist."
    >
      <Text style={tailwind('text-base text-zinc-200 opacity-60')}>English</Text>
    </KeychainSettingRow>
  );
}

export function KeychainSettingRowMaxLength(): ReactElement {
  const tailwind = useTailwind();

  return (
    <KeychainSettingRow title="BIP32 Maximum Derivation" icon="pushpino">
      <Text style={tailwind('text-base text-zinc-200 opacity-60')}>1,000 Keys</Text>
    </KeychainSettingRow>
  );
}

export function KeychainSettingRowPassword(): ReactElement {
  const tailwind = useTailwind();

  return (
    <KeychainSettingRow
      title="Keychain Password"
      icon="lock1"
      description="This is not the same as your BIP39 passphrase. This password is used to decrypt the keychain from the device's secure keystore after the app is unlocked."
    >
      <Text style={tailwind('text-lg h-6 font-medium text-zinc-200 opacity-60')}>********</Text>
    </KeychainSettingRow>
  );
}

export function KeychainSettingRowDivider(): ReactElement {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('pl-12 bg-zinc-900')}>
      <View style={tailwind('bg-zinc-950 opacity-60 w-full h-px')} />
    </View>
  );
}

function KeychainSettingRow(props: {
  title: string;
  icon: IconSetName;
  description?: string;
  children: ReactElement;
}): ReactElement {
  const tailwind = useTailwind();
  return (
    <View>
      <View style={tailwind('px-6 bg-zinc-900 flex-row items-center justify-between')}>
        <View style={tailwind('flex-row py-3 items-center justify-between')}>
          <IconSet name={props.icon} size={20} style={tailwind('text-white')}></IconSet>
          <Text style={tailwind('text-white text-base ml-2')}>{props.title}</Text>
        </View>
        <View>{props.children}</View>
      </View>
      {props.description && (
        <View style={tailwind('px-6 mt-2 mb-6')}>
          <Text style={tailwind('text-sm text-zinc-400')}>{props.description}</Text>
        </View>
      )}
    </View>
  );
}
