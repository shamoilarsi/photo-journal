import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Item({ top, value, bottom }) {
  return (
    <View style={styles.container}>
      <Text style={styles.top}>{top}</Text>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.bottom}>{bottom}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
    marginHorizontal: 8,
    paddingVertical: 15,
  },
  top: { fontFamily: 'InterSemiBold', fontSize: 16 },
  value: { fontFamily: 'InterBold', fontSize: 56, color: '#314743' },
  bottom: { fontFamily: 'InterMedium', fontSize: 12 },
});
