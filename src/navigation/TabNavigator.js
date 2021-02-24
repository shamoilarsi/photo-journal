import React from 'react';
import { Dimensions, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import FloatingButton from '../components/FloatingButton';

import Home from '../screens/Home';
import Summary from '../screens/Summary';

const { width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => (
  <View style={{ flex: 1, zIndex: 999 }}>
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

      <Tab.Screen
        name='AddItem'
        component={Summary}
        options={{
          tabBarButton: () => (
            <FloatingButton
              icon='add'
              onPress={() => navigation.navigate('CameraView')}
              style={{ left: width / 2 - 45 / 2, top: -15, position: 'absolute' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  </View>
);

export default BottomTabNavigator;
