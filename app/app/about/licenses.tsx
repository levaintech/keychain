import { ReactElement } from 'react';

import { ModalStackScreen } from '../_components/ModalStackScreen';

export default function LicensesPage(): ReactElement {
  return (
    <>
      <ModalStackScreen
        options={{
          title: 'Licenses',
        }}
      />
    </>
  );
}
