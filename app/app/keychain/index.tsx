import { Redirect } from 'expo-router';

export default function Keychain(): JSX.Element {
  return <Redirect href={'/keys'} />;
}
