import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Linking from 'expo-linking';
import { createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHaptic } from './HapticFeedback';
import { IconSet } from './IconSet';

export interface ExternalLinkOptions {
  open(url: string): void;

  close(): void;
}

const ExternalLinkContext = createContext<ExternalLinkOptions>({} as any);

export function ExternalLinkProvider(props: PropsWithChildren): JSX.Element {
  const tailwind = useTailwind();
  const modalRef = useRef<BottomSheetModal>(null);
  const [url, setUrl] = useState<string | undefined>(undefined);
  const haptic = useHaptic();

  const open = useCallback((openUrl: string) => {
    setUrl(openUrl);
    modalRef.current?.present();
  }, []);
  const close = useCallback(() => {
    modalRef.current?.dismiss();
    setUrl(undefined);
  }, []);

  return (
    <ExternalLinkContext.Provider
      value={{
        open,
        close,
      }}
    >
      {props.children}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={modalRef}
          index={0}
          snapPoints={['33%', '50%']}
          backdropComponent={(backdropProps) => (
            <BottomSheetBackdrop
              {...backdropProps}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              opacity={0.9}
              style={tailwind('bg-zinc-950 top-0 bottom-0 left-0 right-0 absolute')}
              pressBehavior="close"
            />
          )}
          handleIndicatorStyle={tailwind('bg-zinc-200')}
          backgroundStyle={tailwind('bg-zinc-900')}
        >
          <View style={tailwind('bg-zinc-900 p-4')}>
            <View style={tailwind('flex-row items-stretch')}>
              <View style={tailwind('rounded bg-zinc-800 p-2')}>
                <IconSet name="link" size={20} style={tailwind('text-zinc-200')} />
              </View>
              <View style={tailwind('rounded bg-zinc-800 flex-grow px-3 ml-2 flex-row items-center')}>
                <Text style={tailwind('text-base text-zinc-200')}>{url}</Text>
              </View>
            </View>
            <Text style={tailwind('text-base text-zinc-200 py-2')}>
              You're about to navigate to an external website. Please proceed with caution and avoid sharing sensitive
              information.
            </Text>
            <View style={tailwind('flex-row justify-end')}>
              <TouchableOpacity
                onPress={async () => {
                  await haptic.selectionAsync();
                  await Linking.openURL(url!);
                  close();
                }}
                style={tailwind('rounded bg-zinc-200 px-5 py-2')}
              >
                <Text style={tailwind('text-zinc-800 font-bold text-lg')}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </ExternalLinkContext.Provider>
  );
}

export function useExternalLink(): ExternalLinkOptions {
  return useContext(ExternalLinkContext);
}
