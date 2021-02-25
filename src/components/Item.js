import React from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
const Item = ({ data: { image: uri, temp, country, city, timestamp, editable }, onPress }) => {
  const date = new Date(timestamp);
  let newuri = uri;
  if (editable) newuri += `?${timestamp}`;
  return (
    <View>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image source={{ uri: newuri }} style={{ height: 184 }} />
      </TouchableWithoutFeedback>
      <View style={styles.circularGradientContainer}>
        <LinearGradient
          colors={['rgba(108, 108, 108, 0.90)', 'rgba(0, 0, 0, 0)']}
          style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 189,
            height: 189,
            borderRadius: 180,
            transform: [{ rotateZ: '-40deg' }],
          }}
        />
      </View>
      <View style={styles.topLeftDate}>
        <Text style={[styles.text, { fontSize: 14, textAlign: 'center' }]}>{months[date.getMonth()]}</Text>
        <Text style={[styles.text, { fontSize: 24 }]}>{date.getDate()}</Text>
      </View>
      <LinearGradient
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 37 }}
        colors={['transparent', 'rgba(0,0,0,0.2)']}
      />
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
  circularGradientContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  topLeftDate: { position: 'absolute', left: 7, top: 5 },
  text: {
    fontFamily: 'InterSemiBold',
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
