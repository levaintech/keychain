import { ReactElement } from 'react';

import { ModalStackScreen } from '../_components/ModalStackScreen';

export default function KeySettingsPage(): ReactElement {
  return (
    <>
      <ModalStackScreen
        options={{
          title: 'Keychain Settings',
        }}
      />
    </>
  );
}
