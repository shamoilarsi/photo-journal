import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Summary from '../screens/Summary';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator tabBarOptions={{ showLabel: false }}>
    <Tab.Screen
      name='Home'
      component={Home}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={20} color='#000' />
        ),
      }}
    />
    <Tab.Screen
      name='Summary'
      component={Summary}
      options={{
        tabBarIcon: ({ focused }) => (
          <Ionicons
            name={focused ? 'ios-information-circle' : 'ios-information-circle-outline'}
            size={19}
            color='#000'
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
