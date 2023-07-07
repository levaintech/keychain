import { ModalStackScreen } from '../_components/ModalStackScreen';

export default function KeySettingsPage(): JSX.Element {
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
