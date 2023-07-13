import { NotificationFeedbackType } from 'expo-haptics';
import { ReactElement, ReactNode } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { useTailwind } from 'tailwind-rn';

import { ModalStackScreen } from '../_components/ModalStackScreen';
import { useHaptic } from '../HapticFeedback';
import { IconSet, IconSetName } from '../IconSet';

export default function DesignSystemPage(): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  return (
    <>
      <ModalStackScreen
        options={{
          title: 'Design System',
        }}
      />
      <SafeAreaView style={tailwind('flex-1 bg-zinc-950')}>
        <ScrollView contentContainerStyle={tailwind('py-2')}>
          <Section title="LEVAIN KEYCHAIN DESIGN SYSTEM">
            <Text style={tailwind('text-base text-zinc-200')}>
              A collection of open source rules, principles, and constraints that govern how we design and build Levain
              Keychain. It is a living document that will grow and evolve as we add more features and functionality to
              Keychain. As a design system, it provides a common language and vocabulary to build cohesive, accessible,
              responsive, and efficient experiences.
            </Text>

            <Text style={tailwind('text-base text-zinc-200 mt-2')}>
              Utilizing a utility-first approach, we build complex components from a constrained set of primitive
              utilities.
            </Text>
          </Section>

          <Section title="COLOR PALETTE">
            <View style={tailwind('flex-row items-center')}>
              <View style={tailwind('rounded-full w-10 h-10 bg-zinc-200')} />
              <Text style={tailwind('text-lg font-bold text-zinc-200 mx-6')}>Primary</Text>
              <Code>zinc-200</Code>
            </View>

            <View style={tailwind('flex-row items-center mt-4')}>
              <View style={tailwind('rounded-full w-10 h-10 bg-teal-800')} />
              <Text style={tailwind('text-lg font-bold text-zinc-200 mx-6')}>Accent</Text>
              <Code>teal-800</Code>
            </View>

            <View style={tailwind('flex-row items-center mt-4')}>
              <View style={tailwind('rounded-full w-10 h-10 bg-zinc-950')} />
              <Text style={tailwind('text-lg font-bold text-zinc-200 mx-6')}>Background</Text>
              <Code>zinc-950</Code>
            </View>
          </Section>

          <Section title="TYPOGRAPHY">
            <View>
              <Text style={tailwind('text-2xl font-bold text-zinc-200')}>Heading 1</Text>
              <Code>text-2xl font-bold text-zinc-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-lg font-bold text-zinc-200')}>Heading 2</Text>
              <Code>text-lg font-bold text-zinc-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-base text-zinc-200')}>Body</Text>
              <Code>text-base text-zinc-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-sm text-zinc-200')}>Caption</Text>
              <Code>text-sm text-zinc-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-sm text-zinc-200 font-mono')}>Font-Mono</Text>
              <Code>text-sm text-zinc-200 font-mono</Code>
            </View>
          </Section>

          <Section title="ICONS">
            <View style={tailwind('flex-row items-center')}>
              <Text style={tailwind('text-lg font-bold text-zinc-200 mr-2 w-6')}>24</Text>
              <IconSet name="key" size={24} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="API" size={24} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="scan1" size={24} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="setting" size={24} style={tailwind('text-zinc-100 mr-2')} />
            </View>

            <View style={tailwind('flex-row items-center mt-2')}>
              <Text style={tailwind('text-lg font-bold text-zinc-200 mr-2 w-6')}>16</Text>
              <IconSet name="link" size={16} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="up" size={16} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="down" size={16} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="left" size={16} style={tailwind('text-zinc-100 mr-2')} />
              <IconSet name="right" size={16} style={tailwind('text-zinc-100 mr-2')} />
            </View>
          </Section>

          <Section title="BUTTONS">
            <View style={tailwind('flex-row')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.notificationAsync(NotificationFeedbackType.Success);
                }}
                style={tailwind('rounded-full bg-zinc-200 px-8 py-3 w-full')}
              >
                <Text style={tailwind('text-zinc-800 font-bold text-lg text-center')}>PRIMARY ACTION</Text>
              </TouchableOpacity>
            </View>

            <View style={tailwind('flex-row justify-end mt-4')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.selectionAsync();
                }}
                style={tailwind('rounded bg-zinc-200 px-5 py-2')}
              >
                <Text style={tailwind('text-zinc-800 font-bold text-lg')}>Primary</Text>
              </TouchableOpacity>
            </View>

            <View style={tailwind('flex-row justify-end mt-4')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.selectionAsync();
                }}
                style={tailwind('rounded bg-zinc-200 px-3.5 py-2')}
              >
                <Text style={tailwind('text-zinc-800 text-sm font-bold')}>Secondary</Text>
              </TouchableOpacity>
            </View>
          </Section>
          <Section title="TOGGLE">
            <View style={tailwind('flex-row items-center')}>
              <Switch
                thumbColor={tailwind('text-zinc-200').color as any}
                trackColor={{
                  false: tailwind('text-teal-800').color as any,
                  true: tailwind('text-teal-800').color as any,
                }}
                onValueChange={async (value: boolean) => {
                  await haptic.setEnabled(value);
                }}
                value={true}
              />

              <Switch
                style={tailwind('ml-4')}
                thumbColor={tailwind('text-zinc-200').color as any}
                trackColor={{
                  false: tailwind('text-teal-800').color as any,
                  true: tailwind('text-teal-800').color as any,
                }}
                ios_backgroundColor={tailwind('text-zinc-800').color as any}
                onValueChange={async (value: boolean) => {
                  await haptic.setEnabled(value);
                }}
                value={false}
              />
            </View>
          </Section>
          <Section title="LIST VIEW" innerStyle={tailwind('bg-zinc-900')}>
            {(() => {
              function ListViewItem(props: { title: string; subtitle: string; icon: IconSetName }): ReactElement {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      await haptic.selectionAsync();
                    }}
                    style={tailwind('px-6 bg-zinc-900 flex-row items-center justify-between')}
                  >
                    <View style={tailwind('py-3 flex-row items-center justify-between')}>
                      <IconSet name={props.icon} size={20} style={tailwind('text-white')}></IconSet>
                      <Text style={tailwind('text-white text-base ml-2')}>{props.title}</Text>
                    </View>
                    <View>
                      <IconSet name="right" size={16} style={tailwind('text-zinc-500')} />
                    </View>
                  </TouchableOpacity>
                );
              }

              return (
                <View style={tailwind('')}>
                  <ListViewItem title="Item 1" subtitle="" icon="filetext1" />
                  <View style={tailwind('pl-12 bg-zinc-900')}>
                    <View style={tailwind('bg-zinc-950 opacity-60 w-full h-px')} />
                  </View>
                  <ListViewItem title="Item 2" subtitle="" icon="infocirlceo" />
                  <Text style={tailwind('pt-8 pb-2 px-6 text-white bg-zinc-950')}>SECTION</Text>
                  <ListViewItem title="Item 3" subtitle="" icon="retweet" />
                </View>
              );
            })()}
          </Section>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

function Section(props: { title: string; children?: ReactNode; innerStyle?: StyleProp<ViewStyle> }): ReactElement {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('px-4 py-2')}>
      <View style={tailwind('bg-zinc-900 rounded')}>
        <View style={tailwind('py-3 px-4 border-b border-zinc-800')}>
          <Text style={tailwind('text-xs text-zinc-200')}>{props.title}</Text>
        </View>
        <View style={props.innerStyle ?? tailwind('p-4')}>{props.children}</View>
      </View>
    </View>
  );
}

function Code(props: { children: string }): ReactElement {
  const tailwind = useTailwind();

  return (
    <View>
      <Text style={tailwind('text-sm text-zinc-200 font-mono')}>{props.children}</Text>
    </View>
  );
}
