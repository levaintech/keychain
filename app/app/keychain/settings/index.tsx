import { nativeApplicationVersion } from 'expo-application';
import { Stack, useRouter } from 'expo-router';
import { Platform, SectionList, Switch, Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHapticFeedback } from '../../HapticFeedback';
import { IconSet } from '../../IconSet';

export default function SettingPage(): JSX.Element {
  const tailwind = useTailwind();
  // TODO(fuxingloh): fill up all the settings with links, pages, etc.

  return (
    <>
      <Stack.Screen options={{ title: 'Settings' }} />
      <SectionList
        style={tailwind('bg-stone-900')}
        sections={[
          {
            title: 'KEYCHAIN',
            data: [
              {
                type: 'select',
                props: {
                  to: '/keychain/settings/app/keys',
                  icon: 'key',
                  title: 'Key Settings',
                },
              },
              {
                type: 'select',
                props: {
                  to: '/keychain/settings/app/api',
                  icon: 'API',
                  title: 'API Signing',
                },
              },
              {
                type: 'select',
                props: {
                  to: '/keychain/settings/app/scan',
                  icon: 'scan1',
                  title: 'Scan Signing',
                },
              },
            ],
          },
          {
            title: 'APP',
            data: [
              {
                type: 'haptic',
                props: {
                  icon: 'retweet',
                  title: 'Haptic Feedback',
                },
              },
            ],
          },
          {
            title: 'ABOUT',
            data: [
              {
                type: 'link',
                props: {
                  to: 'https://levain.tech',
                  icon: 'questioncircleo',
                  title: 'Help Center',
                },
              },
              {
                type: 'link',
                props: {
                  to: 'https://levain.tech',
                  icon: 'filetext1',
                  title: 'Terms of Use',
                },
              },
              {
                type: 'link',
                props: {
                  to: 'https://levain.tech',
                  icon: 'lock',
                  title: 'Privacy Policy',
                },
              },
              {
                type: 'select',
                props: {
                  to: '/keychain/settings/about/licenses',
                  icon: 'book',
                  title: 'Licenses',
                },
              },
              {
                type: 'select',
                props: {
                  to: '/keychain/settings/about/design',
                  icon: 'codesquareo',
                  title: 'Design System',
                },
              },
              {
                type: 'version',
                props: {
                  icon: 'infocirlceo',
                  title: 'Levain Keychain for',
                },
              },
            ],
          },
        ]}
        renderSectionHeader={({ section }) => (
          <Text style={tailwind('pt-8 pb-2 px-6 text-white bg-stone-900')}>{section.title}</Text>
        )}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'select':
              return <SettingRowSelect {...item.props} />;
            case 'link':
              return <SettingRowLink {...item.props} />;
            case 'version':
              return <SettingRowVersion {...item.props} />;
            case 'haptic':
              return <SettingRowHaptic {...item.props} />;
            default:
              return <></>;
          }
        }}
        keyExtractor={(item) => item.type + item.props.title}
      />
    </>
  );
}

interface RowProps {
  icon: any;
  to?: string;
  title: string;
}

function SettingRowVersion(props: RowProps): JSX.Element {
  const tailwind = useTailwind();
  const platform: string = (() => {
    switch (Platform.OS) {
      case 'ios':
        return 'iOS';
      case 'android':
        return 'Android';
      case 'web':
        return 'Web';
      default:
        return '???';
    }
  })();

  return (
    <View style={tailwind('px-6 bg-stone-800 flex-row items-center justify-between')}>
      <View style={tailwind('py-3 flex-row items-center justify-between')}>
        <IconSet name={props.icon} size={20} style={tailwind('text-white')}></IconSet>
        <Text style={tailwind('text-white text-base ml-2')}>
          {props.title} {platform}
        </Text>
      </View>
      <Text style={tailwind('text-white text-base')}>{nativeApplicationVersion}</Text>
    </View>
  );
}

function SettingRowHaptic(props: RowProps): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHapticFeedback();

  return (
    <View style={tailwind('px-6 bg-stone-800 flex-row items-center justify-between')}>
      <View style={tailwind('flex-row py-3 items-center justify-between')}>
        <IconSet name={props.icon} size={20} style={tailwind('text-white')}></IconSet>
        <Text style={tailwind('text-white text-base ml-2')}>{props.title}</Text>
      </View>
      <View>
        <Switch
          onValueChange={async (value: boolean) => {
            await haptic.setEnabled(value);
          }}
          value={haptic.isEnabled()}
        />
      </View>
    </View>
  );
}

function SettingRowLink(props: RowProps): JSX.Element {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('px-6 bg-stone-800 flex-row items-center justify-between')}>
      <View style={tailwind('py-3 flex-row items-center justify-between')}>
        <IconSet name={props.icon} size={20} style={tailwind('text-white')}></IconSet>
        <Text style={tailwind('text-white text-base ml-2')}>{props.title}</Text>
      </View>
      <View>
        <IconSet name="right" size={16} style={tailwind('text-stone-500')} />
      </View>
    </View>
  );
}

function SettingRowSelect(props: RowProps): JSX.Element {
  const tailwind = useTailwind();
  const router = useRouter();
  const haptic = useHapticFeedback();

  return (
    <TouchableOpacity
      onPress={async () => {
        router.push(props.to!);
        await haptic.selectionAsync();
      }}
    >
      <View style={tailwind('px-6 bg-stone-800 flex-row items-center justify-between')}>
        <View style={tailwind('py-3 flex-row items-center justify-between')}>
          <IconSet name={props.icon} size={20} style={tailwind('text-white')}></IconSet>
          <Text style={tailwind('text-white text-base ml-2')}>{props.title}</Text>
        </View>
        <View>
          <IconSet name="right" size={16} style={tailwind('text-stone-500')} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
