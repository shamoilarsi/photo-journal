import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function Summary({ navigation }) {
  return (
    <View>
      <Text>THIS IS HOME PAGE</Text>
      <TouchableOpacity onPress={() => navigation.navigate('CameraView')}>
        <Text> go to camera </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
