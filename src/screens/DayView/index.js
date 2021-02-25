import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Dimensions, AsyncStorage } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from '../../components/Item';
import FloatingButton from '../../components/FloatingButton';

const { width } = Dimensions.get('screen');

const DayEditView = ({ navigation, route }) => {
  const { image, city, country, temp, timestamp, description, date: key, editable } = route.params;
  const [desc, setDesc] = useState(description);
  let descTimeout = null;

  useEffect(() => {
    descTimeout = setTimeout(async () => {
      await AsyncStorage.mergeItem(key, JSON.stringify({ description: desc }));
    }, 1000);

    return () => clearTimeout(descTimeout);
  }, [desc]);

  return (
    <View style={{ flex: 1 }}>
      <Item
        data={{ image, city, country, temp, timestamp }}
        onPress={() => {
          navigation.navigate('PhotoView', { image });
        }}
      />
      <TextInput
        multiline
        value={desc}
        editable={editable}
        style={styles.textInput}
        onChangeText={(t) => setDesc(t)}
        placeholder='Type your thoughts here'
      />
      {editable && (
        <FloatingButton icon='camera' onPress={() => navigation.navigate('CameraView')} style={styles.cameraButton} />
      )}
    </View>
  );
};

export default DayEditView;

const styles = StyleSheet.create({
  cameraButton: { left: width / 2 - 45 / 2, top: 184 - 45 / 2, position: 'absolute' },
  textInput: { marginHorizontal: 5, marginTop: 20, fontFamily: 'InterRegular', fontSize: 16 },
});
