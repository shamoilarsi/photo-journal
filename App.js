/* eslint-disable global-require */
import React from 'react';
// import { StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigator from './src/navigation/StackNavigator';

export default function App() {
  const [loaded] = useFonts({
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    InterLight: require('./assets/fonts/Inter-Light.ttf'),
    InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
    InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
    InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
  });

  if (!loaded) return null;

  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
