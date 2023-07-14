import classNames from 'classnames';
import { ReactElement } from 'react';
import { TextInput, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

export function PasscodeInput(props: { value?: string; onValueChange: (passcode: string) => void }): ReactElement {
  const tailwind = useTailwind();

  return (
    <View style={tailwind('py-6')}>
      <TextInput
        autoFocus
        editable
        secureTextEntry
        pointerEvents="box-only"
        selectTextOnFocus={false}
        style={tailwind('text-zinc-200 opacity-0 text-2xl text-center absolute left-0 right-0 top-0 bottom-0')}
        value={props.value}
        keyboardType="number-pad"
        onChangeText={(text) => {
          if (text.length <= 6) {
            props.onValueChange(text);
          }
        }}
      />
      <PasscodeBoxes passcode={props.value} />
    </View>
  );
}

function PasscodeBoxes(props: { passcode?: string }): ReactElement {
  const tailwind = useTailwind();
  const length = props.passcode?.length ?? 0;

  return (
    <View style={tailwind('flex-row items-center justify-center')}>
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <View
          key={index}
          style={tailwind(
            classNames('m-2 h-3.5 w-3.5 rounded-full border border-zinc-200', {
              'bg-zinc-900': index > length,
              'bg-zinc-200': index <= length,
            }),
          )}
        />
      ))}
    </View>
  );
}
