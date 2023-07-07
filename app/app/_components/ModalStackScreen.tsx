import classNames from 'classnames';
import { Stack, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from '../HapticFeedback';
import { IconSet } from '../IconSet';

export function ModalStackScreen(props: { options: ComponentProps<typeof Stack.Screen>['options'] }): JSX.Element {
  const tailwind = useTailwind();
  const haptic = useHaptic();
  const router = useRouter();

  return (
    <Stack.Screen
      options={{
        presentation: 'modal',
        headerStyle: tailwind('bg-zinc-900'),
        headerRight: () => <HeaderRight />,
        headerLeft: () => null,
        ...props.options,
      }}
    />
  );

  /**
   * For use in a modal header, this component provides a close button with variable padding based on platform.
   */
  function HeaderRight(): JSX.Element {
    return (
      <TouchableOpacity
        onPress={async () => {
          await haptic.selectionAsync();
          router.back();
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
}
