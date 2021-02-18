import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const Item = ({ image: uri, city, country, temp, timestamp }) => {
  const date = new Date(timestamp);
  return (
    <View>
      <Image source={{ uri }} style={{ height: 184 }} />
      <View style={styles.topLeftDate}>
        <Text style={[styles.text, { fontSize: 14, textAlign: 'center' }]}>{months[date.getMonth()]}</Text>
        <Text style={[styles.text, { fontSize: 24 }]}>{date.getDate()}</Text>
      </View>
      <View style={styles.bottomLeftLocation}>
        <Feather name='map-pin' size={15} color='#fff' />
        <Text style={[styles.text, { fontSize: 12, marginLeft: 5 }]}>
          {city}, {country}
        </Text>
      </View>
      <View style={styles.bottomRightTemp}>
        <Text style={[styles.text, { fontSize: 12, marginRight: 5 }]}>{temp}°</Text>
        <Feather name='sun' size={15} color='#fff' />
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  topLeftDate: { position: 'absolute', left: 7, top: 5 },
  text: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
  },
  bottomLeftLocation: {
    position: 'absolute',
    bottom: 5,
    left: 7,
    flexDirection: 'row',
  },
  bottomRightTemp: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 5,
    right: 7,
  },
});
