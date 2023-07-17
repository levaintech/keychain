import { router, Stack } from 'expo-router';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { PrimaryActionButton } from '../../../components/Button';
import { StackHeaderBack } from '../../../components/StackHeader';
import { NotificationFeedbackType, useHaptic } from '../../HapticFeedback';
import { IconSet, IconSetName } from '../../IconSet';

export default function SetupSettingsPage(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const [confirmed, setConfirmed] = useState(Object.fromEntries(acknowledgements.map((_, index) => [index, false])));

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Keychain Security',
          headerLeft: () => <StackHeaderBack />,
        }}
      />

      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('flex-grow justify-between')}>
          <View>
            <KeychainSettingHeader
              icon="Safety"
              title="Security Acknowledgements"
              description="For your security and safety, please confirm you understand the following."
            />
            {acknowledgements.map((confirm, index) => (
              <View key={index}>
                <KeychainAcknowledgementRow
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
              </View>
            ))}
          </View>

          <View style={tailwind('m-6')}>
            <PrimaryActionButton
              disabled={Object.values(confirmed).some((value) => !value)}
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

const acknowledgements = [
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

function KeychainSettingHeader(props: { icon: IconSetName; title: string; description: string }): ReactElement {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('py-4')}>
      <View style={tailwind('flex-row mx-6 items-center')}>
        <IconSet name={props.icon} size={24} style={tailwind('text-white')} />
        <Text style={tailwind('text-lg font-bold text-zinc-200 ml-2')}>{props.title}</Text>
      </View>
      <View style={tailwind('mx-6 mt-1')}>
        <Text style={tailwind('text-sm text-zinc-400')}>{props.description}</Text>
      </View>
    </View>
  );
}

function KeychainAcknowledgementRow(
  props: PropsWithChildren<{
    title: string;
    description: string;
    value: boolean;
    onPress: () => Promise<void>;
  }>,
): ReactElement {
  const tailwind = useTailwind();

  return (
    <>
      <TouchableOpacity
        style={tailwind('px-6 bg-zinc-900/60 flex-row items-center justify-between')}
        onPress={props.onPress}
      >
        <View style={tailwind('py-3 shrink')}>
          <View style={tailwind('mr-3')}>
            <Text style={tailwind('text-base font-bold text-zinc-200')}>{props.title}</Text>
            <Text style={tailwind('mt-[2px] text-sm text-zinc-400')}>{props.description}</Text>
          </View>
        </View>
        <Switch
          value={props.value}
          thumbColor={tailwind('text-zinc-200').color as any}
          trackColor={{
            false: tailwind('text-teal-800').color as any,
            true: tailwind('text-teal-800').color as any,
          }}
        />
      </TouchableOpacity>
      <View style={tailwind('pl-6 bg-zinc-900')}>
        <View style={tailwind('bg-zinc-950 opacity-60 w-full h-px')} />
      </View>
    </>
  );
}
