import { ReactElement } from 'react';

import { ModalStackScreen } from '../_components/ModalStackScreen';

export default function ApiSettingsPage(): ReactElement {
  return (
    <>
      <ModalStackScreen
        options={{
          title: 'API Settings',
        }}
      />
    </>
  );
}
