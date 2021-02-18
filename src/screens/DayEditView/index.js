import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from '../../components/Item';

const DayEditView = ({ navigation, route }) => {
  const { image, city, country, temp, timestamp, description, date: key, editable } = route.params;
  const [desc, setDesc] = useState(description);
  let descTimeout = null;

  useEffect(() => {
    descTimeout = setTimeout(async () => {
      await AsyncStorage.mergeItem(key, JSON.stringify({ description: desc }));
    }, 2000);

    return () => clearTimeout(descTimeout);
  }, [desc]);

  return (
    <View>
      <Item
        image={image}
        city={city}
        country={country}
        temp={temp}
        timestamp={timestamp}
        onPress={() => {
          navigation.navigate('PhotoView', { image });
        }}
      />
      <TextInput
        multiline
        value={desc}
        style={{ marginHorizontal: 5 }}
        onChangeText={(t) => setDesc(t)}
        placeholder='Type your thoughts here'
        editable={editable}
      />
    </View>
  );
};

export default DayEditView;

const styles = StyleSheet.create({});
