import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FloatingButton = ({ style, onPress, icon, loading }) => {
  const COLOR = '#00E3BA';
  let content = <MaterialIcons name={icon} size={20} color={COLOR} />;
  if (loading) content = <ActivityIndicator color={COLOR} />;

  return (
    <TouchableOpacity disabled={loading} style={[style, styles.button]} onPress={onPress}>
      {content}
    </TouchableOpacity>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  button: {
    width: 45,
    height: 45,
    borderRadius: 56,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
