import { Stack } from 'expo-router';
import { ComponentProps, ReactNode } from 'react';
import { SafeAreaView, ScrollView, Switch, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../../../HapticFeedback';
import { IconSet } from '../../../IconSet';

export default function DesignSystemPage(): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Design',
          headerLargeTitle: true,
          headerStyle: tailwind('bg-stone-900'),
          headerLargeStyle: tailwind('bg-stone-900'),
          headerLargeTitleStyle: tailwind('text-4xl font-bold text-white'),
        }}
      />
      <SafeAreaView style={tailwind('flex-1 bg-stone-900')}>
        <ScrollView>
          <Section title="KEYCHAIN DESIGN SYSTEM">
            <Text style={tailwind('text-base text-stone-200')}>
              A collection of open source rules, principles, and constraints that govern how we design and build Levain
              Keychain. It is a living document that will grow and evolve as we add more features and functionality to
              Keychain. As a design system, it provides a common language and vocabulary to build cohesive, accessible,
              responsive, and efficient experiences.
            </Text>

            <Text style={tailwind('text-base text-stone-200 mt-2')}>
              Utilizing a utility-first approach, we build complex components from a constrained set of primitive
              utilities.
            </Text>
          </Section>

          <Section title="COLOR PALETTE">
            <View style={tailwind('flex-row items-center')}>
              <View style={tailwind('rounded-full w-10 h-10 bg-stone-200')} />
              <Text style={tailwind('text-lg font-bold text-stone-200 mx-6')}>Primary</Text>
              <Code>stone-200</Code>
            </View>

            <View style={tailwind('flex-row items-center mt-4')}>
              <View style={tailwind('rounded-full w-10 h-10 bg-teal-500')} />
              <Text style={tailwind('text-lg font-bold text-stone-200 mx-6')}>Accent</Text>
              <Code>teal-500</Code>
            </View>

            <View style={tailwind('flex-row items-center mt-4')}>
              <View style={tailwind('rounded-full w-10 h-10 bg-stone-900')} />
              <Text style={tailwind('text-lg font-bold text-stone-200 mx-6')}>Background</Text>
              <Code>stone-900</Code>
            </View>
          </Section>

          <Section title="TYPOGRAPHY">
            <View>
              <Text style={tailwind('text-2xl font-bold text-stone-200')}>Heading 1</Text>
              <Code>text-2xl font-bold text-stone-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-lg font-bold text-stone-200')}>Heading 2</Text>
              <Code>text-lg font-bold text-stone-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-base text-stone-200')}>Body</Text>
              <Code>text-base text-stone-200</Code>
            </View>
            <View style={tailwind('mt-2')}>
              <Text style={tailwind('text-sm text-stone-200')}>Caption</Text>
              <Code>text-sm text-stone-200</Code>
            </View>
          </Section>

          <Section title="ICONS">
            <View style={tailwind('flex-row items-center')}>
              <Text style={tailwind('text-lg font-bold text-stone-200 mr-2 w-6')}>24</Text>
              <IconSet name="key" size={24} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="API" size={24} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="scan1" size={24} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="setting" size={24} style={tailwind('text-stone-100 mr-2')} />
            </View>

            <View style={tailwind('flex-row items-center mt-2')}>
              <Text style={tailwind('text-lg font-bold text-stone-200 mr-2 w-6')}>16</Text>
              <IconSet name="link" size={16} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="up" size={16} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="down" size={16} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="left" size={16} style={tailwind('text-stone-100 mr-2')} />
              <IconSet name="right" size={16} style={tailwind('text-stone-100 mr-2')} />
            </View>
          </Section>

          <Section title="BUTTONS">
            <View style={tailwind('flex-row mb-1')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.selectionAsync();
                }}
              >
                <View style={tailwind('rounded bg-stone-200 px-4 py-2')}>
                  <Text style={tailwind('text-stone-800 font-bold text-base')}>Primary</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={tailwind('flex-row mt-4')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.selectionAsync();
                }}
              >
                <View style={tailwind('rounded bg-stone-200 px-3 py-1.5')}>
                  <Text style={tailwind('text-stone-700 text-sm font-medium')}>Secondary</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Section>
          <Section title="TOGGLE">
            <View style={tailwind('flex-row items-center')}>
              <Switch
                thumbColor={tailwind('text-stone-200').color as any}
                trackColor={{
                  false: tailwind('text-teal-500').color as any,
                  true: tailwind('text-teal-500').color as any,
                }}
                onValueChange={async (value: boolean) => {
                  await haptic.setEnabled(value);
                }}
                value={true}
              />

              <Switch
                style={tailwind('ml-4')}
                thumbColor={tailwind('text-stone-200').color as any}
                trackColor={{
                  false: tailwind('text-teal-500').color as any,
                  true: tailwind('text-teal-500').color as any,
                }}
                ios_backgroundColor={tailwind('text-stone-800').color as any}
                onValueChange={async (value: boolean) => {
                  await haptic.setEnabled(value);
                }}
                value={false}
              />
            </View>
          </Section>
          <Section title="LIST VIEW" innerStyle={tailwind('p-4 bg-stone-950')}>
            {(() => {
              function ListViewItem(props: {
                title: string;
                subtitle: string;
                icon: ComponentProps<typeof IconSet>['name'];
              }): JSX.Element {
                return (
                  <TouchableOpacity
                    onPress={async () => {
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

              return (
                <View style={tailwind('')}>
                  <ListViewItem title="Item 1" subtitle="" icon="filetext1" />
                  <View style={tailwind('pl-12 bg-stone-800')}>
                    <View style={tailwind('bg-stone-900 opacity-40 w-full h-px')} />
                  </View>
                  <ListViewItem title="Item 2" subtitle="" icon="infocirlceo" />
                  <Text style={tailwind('pt-8 pb-2 px-6 text-white bg-stone-900')}>SECTION</Text>
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

function Section(props: { title: string; children?: ReactNode; innerStyle?: StyleProp<ViewStyle> }): JSX.Element {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('px-4 py-2')}>
      <View style={tailwind('bg-stone-800 rounded')}>
        <View style={tailwind('py-3 px-4 border-b border-stone-700')}>
          <Text style={tailwind('text-xs text-stone-200')}>{props.title}</Text>
        </View>
        <View style={props.innerStyle ?? tailwind('p-4')}>{props.children}</View>
      </View>
    </View>
  );
}

function Code(props: { children: string }): JSX.Element {
  const tailwind = useTailwind();

  return (
    <View>
      <Text style={tailwind('text-sm text-stone-100')}>{props.children}</Text>
    </View>
  );
}
