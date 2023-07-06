import { Redirect } from 'expo-router';

export default function App(): JSX.Element {
  return <Redirect href={'/tabs'} />;
}
