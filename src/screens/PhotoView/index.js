import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const PhotoView = ({ route }) => {
  const { image: uri } = route.params;
  return (
    <View style={styles.container}>
      <Image source={{ uri: `${uri}?${Date.now()}` }} style={styles.image} />
    </View>
  );
};

export default PhotoView;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', marginBottom: 50 },
  image: { height: 184 },
});
