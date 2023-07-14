import { router, Stack } from 'expo-router';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { StackHeaderBack } from '../../../components/StackHeader';
import { NotificationFeedbackType, useHaptic } from '../../HapticFeedback';
import { IconSet } from '../../IconSet';

const confirmations = [
  {
    title: 'Multiple Secure Backups',
    description:
      'Ensure you have multiple backups located in different safe and secure places. In case one backup is lost or compromised, others will be available.',
  },
  {
    title: 'Secure Element Entropy',
    description:
      "The security of your keychain relies on your device's secure element which generates entropy. Your keychain is only as secure as your device.",
  },
  {
    title: 'Screenshots',
    description:
      'Avoid taking screenshots of your mnemonic phrase for security reasons. Bear in mind that any screenshots you take may be uploaded to the cloud. This means that anyone with access to your photos could potentially gain access to your keychain.',
  },
  {
    title: 'Cloud Storage',
    description:
      'Your device might back up your keychain to the cloud. If you have enabled cloud backup, be aware that your keychain could be stored there. This could give actors with access to your cloud storage the ability to access your keychain.',
  },
  {
    title: 'Password Managers',
    description:
      "Relying on a password manager entrusts your security to a third party. When you opt for a password manager, you effectively place your keychain's security in their hands.",
  },
  {
    title: 'Self Custodian',
    description:
      "You are the sole custodian of your keychain, no one else can assist you in recovering your keychain if it's lost.",
  },
];

export default function KeychainSafetyPage(): ReactElement {
  const haptic = useHaptic();
  const tailwind = useTailwind();
  const [confirmed, setConfirmed] = useState(Object.fromEntries(confirmations.map((_, index) => [index, false])));

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Safety',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-6 flex-grow justify-between')}>
          <View style={tailwind('')}>
            <View style={tailwind('flex-row mx-6 items-center')}>
              <IconSet name="Safety" size={24} style={tailwind('text-white')} />
              <Text style={tailwind('text-lg font-bold text-zinc-200 ml-2')}>Security & Safety Acknowledgements</Text>
            </View>
            <View style={tailwind('mx-6 mt-1 mb-3')}>
              <Text style={tailwind('text-sm text-zinc-400')}>
                For your security and safety, please confirm the following.
              </Text>
            </View>
            {confirmations.map((confirm, index) => (
              <View key={index}>
                <KeychainSafetyRow
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
                {index !== confirmations.length - 1 && <KeychainSafetyDivider />}
              </View>
            ))}
          </View>

          <View style={tailwind('mx-6 mt-6')}>
            <PrimaryActionButton
              disabled={Object.values(confirmed).some((value) => !value)}
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

function KeychainSafetyRow(
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

function KeychainSafetyDivider(): ReactElement {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('pl-6 bg-zinc-900')}>
      <View style={tailwind('bg-zinc-950 opacity-60 w-full h-px')} />
    </View>
  );
}
