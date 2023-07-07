import { NotificationFeedbackType } from 'expo-haptics';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { ModalStackScreen } from '../_components/ModalStackScreen';
import { useHaptic } from '../HapticFeedback';
import { IconSet } from '../IconSet';

export default function KeysCreatePage(): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const [input, setInput] = useState('1');

  return (
    <>
      <ModalStackScreen
        options={{
          title: 'Keychain',
        }}
      />

      <ScrollView style={tailwind('flex-1')} automaticallyAdjustKeyboardInsets keyboardDismissMode="on-drag">
        <View style={tailwind('flex-col justify-center items-center py-8 px-6')}>
          <Text style={tailwind('text-lg font-bold text-zinc-200 text-center')}>Number of keys</Text>

          <View style={tailwind('flex-row items-center mt-2')}>
            <TouchableOpacity
              style={tailwind('p-6')}
              onPress={async () => {
                const num = Number.parseInt(input, 10);
                if (num <= 1) {
                  setInput('1');
                  await haptic.notificationAsync(NotificationFeedbackType.Error);
                  return;
                }

                setInput((num - 1).toString());
                await haptic.selectionAsync();
              }}
            >
              <IconSet name="minus" size={32} style={tailwind('text-zinc-200')} />
            </TouchableOpacity>
            <TextInput
              style={tailwind(
                'text-4xl font-bold text-zinc-200 text-center px-4 py-2 border-b-2 border-zinc-400 min-w-[120px]',
              )}
              inputMode="numeric"
              autoFocus
              onEndEditing={async () => {
                if (input === '' || Number.parseInt(input, 10) <= 0) {
                  setInput('1');
                  await haptic.notificationAsync(NotificationFeedbackType.Warning);
                }
              }}
              onChangeText={(text) => setInput(text)}
              value={input}
            />
            <TouchableOpacity
              style={tailwind('p-6')}
              onPress={async () => {
                const num = Number.parseInt(input, 10);
                setInput((num + 1).toString());
                await haptic.selectionAsync();
              }}
            >
              <IconSet name="plus" size={32} style={tailwind('text-zinc-200')} />
            </TouchableOpacity>
          </View>

          <Text style={tailwind('text-sm text-zinc-400 text-center my-6')}>
            Keys are generated from the mnemonic phrase stored in your Levain Keychain.
          </Text>

          <TouchableOpacity
            onPress={async () => {
              await haptic.selectionAsync();
            }}
            style={tailwind('rounded bg-zinc-200 px-5 py-2')}
          >
            <Text style={tailwind('text-zinc-800 font-bold text-lg')}>
              Generate {Number.parseInt(input, 10) > 1 ? `${input} Keys` : '1 Key'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}
