import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';

import TabNavigator from './TabNavigator';
import CameraView from '../screens/CameraView';

import Logo from '../../assets/logo.png';

const Stack = createStackNavigator();

function LogoTitle() {
  return <Image style={{}} source={Logo} />;
}

function MainStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: false,
        headerTitle: () => <LogoTitle />,
        headerTitleAlign: 'center',
        headerStyle: { elevation: 0, shadowOpacity: 0 },
        headerLeft: ({ canGoBack, onPress }) => {
          if (canGoBack)
            return <AntDesign name='left' size={20} color='#000' onPress={onPress} style={{ marginLeft: 5 }} />;
          return null;
        },
      }}>
      <Stack.Screen name='Home' component={TabNavigator} />
      <Stack.Screen name='CameraView' component={CameraView} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
