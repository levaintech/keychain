import { BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import * as Linking from 'expo-linking';
import { createContext, PropsWithChildren, useCallback, useContext, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTailwind } from 'tailwind-rn';

import { useHapticFeedback } from './HapticFeedback';
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
  const haptic = useHapticFeedback();

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
          snapPoints={['30%']}
          backdropComponent={(backdropProps) => (
            <BottomSheetBackdrop
              {...backdropProps}
              disappearsOnIndex={-1}
              appearsOnIndex={0}
              opacity={0.75}
              style={tailwind('bg-stone-900 top-0 bottom-0 left-0 right-0 absolute')}
              pressBehavior="close"
            />
          )}
          handleIndicatorStyle={tailwind('bg-stone-100')}
          backgroundStyle={tailwind('bg-stone-800')}
        >
          <View style={tailwind('bg-stone-800 p-4')}>
            <View style={tailwind('flex-row items-stretch')}>
              <View style={tailwind('rounded bg-stone-700 p-2')}>
                <IconSet name="link" size={16} style={tailwind('text-stone-100')} />
              </View>
              <View style={tailwind('rounded bg-stone-700 flex-grow px-2 ml-2 flex-row items-center')}>
                <Text style={tailwind('text-white text-base')}>{url}</Text>
              </View>
            </View>
            <Text style={tailwind('text-white py-2 text-base')}>
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
              >
                <View style={tailwind('rounded bg-stone-600 px-4 py-2')}>
                  <Text style={tailwind('text-white font-medium text-lg')}>Continue</Text>
                </View>
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
