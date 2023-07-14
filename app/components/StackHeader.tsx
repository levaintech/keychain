import classNames from 'classnames';
import { useRouter } from 'expo-router';
import { ReactElement } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../app/HapticFeedback';
import { IconSet } from '../app/IconSet';

/**
 * For use in a modal header, this component provides a close button with variable padding based on platform.
 */
export function StackHeaderClose(props: { onPress?: () => void }): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={async () => {
        await haptic.selectionAsync();
        if (props.onPress) {
          props.onPress();
        } else {
          router.back();
        }
      }}
      style={tailwind(
        classNames('py-2', {
          'px-4': Platform.OS !== 'ios',
        }),
      )}
    >
      <IconSet name="close" size={24} style={tailwind('text-zinc-100')} />
    </TouchableOpacity>
  );
}

export function StackHeaderBack(props: { onPress?: () => void }): ReactElement {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={async () => {
        await haptic.selectionAsync();
        if (props.onPress) {
          props.onPress();
        } else {
          router.back();
        }
      }}
      style={tailwind(
        classNames('py-2', {
          'px-4': Platform.OS !== 'ios',
        }),
      )}
    >
      <IconSet name="left" size={24} style={tailwind('text-zinc-100')} />
    </TouchableOpacity>
  );
}
