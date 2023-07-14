import { NotificationFeedbackType } from 'expo-haptics';
import { PropsWithChildren, ReactElement } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../app/HapticFeedback';

/**
 * PrimaryActionButton is a button that is used for primary actions.
 * They should only be used once per screen, used to confirm an action, or to proceed to the next screen.
 */
export function PrimaryActionButton(props: PropsWithChildren<{ onPress: () => void }>): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();

  return (
    <TouchableOpacity
      onPress={async () => {
        await haptic.notificationAsync(NotificationFeedbackType.Success);
        props.onPress();
      }}
      style={tailwind('rounded-full bg-zinc-200 px-8 py-3 w-full')}
    >
      <Text style={tailwind('text-zinc-800 font-bold text-lg text-center')}>{props.children}</Text>
    </TouchableOpacity>
  );
}
