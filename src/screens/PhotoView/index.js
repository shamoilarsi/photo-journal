import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PhotoView = ({ route }) => {
  const { image: uri } = route.params;
  return (
    <View>
      <Text>{uri}</Text>
    </View>
  );
};

export default PhotoView;

const styles = StyleSheet.create({});
