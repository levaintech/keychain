import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  impactAsync,
  ImpactFeedbackStyle,
  notificationAsync,
  NotificationFeedbackType,
  selectionAsync,
} from 'expo-haptics';
import { createContext, createElement, PropsWithChildren, ReactElement, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';

interface HapticFeedbackOptions {
  isAvailable(): boolean;

  isEnabled(): boolean;

  setEnabled(enabled: boolean): Promise<void>;

  selectionAsync(): Promise<void>;

  notificationAsync(type?: NotificationFeedbackType): Promise<void>;

  impactAsync(style?: ImpactFeedbackStyle): Promise<void>;
}

export { ImpactFeedbackStyle, NotificationFeedbackType };

const HapticFeedbackContext = createContext<HapticFeedbackOptions>({} as any);

/**
 * @return A hook that provides access to the haptic feedback API.
 */
export function useHaptic(): HapticFeedbackOptions {
  return useContext(HapticFeedbackContext);
}

export function HapticFeedbackProvider(props: PropsWithChildren<any>): ReactElement | null {
  const isAvailable = Platform.OS === 'ios' || Platform.OS === 'android';
  const [isEnabled, setEnabled] = useState(false);

  useEffect(() => {
    void AsyncStorage.getItem('app/HapticFeedback.ts').then((value) => {
      if (value === null) {
        setEnabled(true);
      } else {
        setEnabled(value === 'true');
      }
    });
  }, []);

  return createElement(
    HapticFeedbackContext.Provider,
    {
      value: {
        isAvailable: () => isAvailable,
        isEnabled: () => isEnabled,
        setEnabled: async (enabled: boolean) => {
          setEnabled(enabled);
          if (isAvailable) {
            await impactAsync(ImpactFeedbackStyle.Heavy);
          }
          await AsyncStorage.setItem('app/HapticFeedback.ts', enabled ? 'true' : 'false');
        },
        selectionAsync: async () => {
          if (!isEnabled || !isAvailable) {
            return;
          }
          await selectionAsync();
        },
        notificationAsync: async (type: NotificationFeedbackType = NotificationFeedbackType.Success) => {
          if (!isEnabled || !isAvailable) {
            return;
          }
          await notificationAsync(type);
        },
        impactAsync: async (style: ImpactFeedbackStyle = ImpactFeedbackStyle.Medium) => {
          if (!isEnabled || !isAvailable) {
            return;
          }
          await impactAsync(style);
        },
      },
    },
    props.children,
  );
}
