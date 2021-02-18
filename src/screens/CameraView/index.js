import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

const { height } = Dimensions.get('screen');

export default function CameraView({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
    })();
  }, []);

  const onCapturePressed = async () => {
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    const image = `${FileSystem.documentDirectory}${date}.jpg`;
    const photo = await cameraRef.current.takePictureAsync();
    await FileSystem.moveAsync({
      from: photo.uri,
      to: image,
    });

    const { city, country_name: country, latitude, longitude } = await fetch(
      `https://geolocation-db.com/json/`
    ).then((res) => res.json());

    const {
      main: { temp },
    } = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=2cea44491007e0ca9a96133c3cdaae19`
    ).then((res) => res.json());

    const data = {
      image,
      city,
      country,
      temp,
      timestamp: Date.now(),
      description: '',
    };

    // TODO: CHECK IF ALREADY EXISTS, IF YES THEN DONT UPDATE DESC
    await AsyncStorage.setItem(date, JSON.stringify(data));
    navigation.navigate('DayEditView', { ...data, date, editable: true });
  };

  if (hasCameraPermission === null) return null;
  if (hasCameraPermission === false) return <Text>No access to camera</Text>;

  return (
    <View>
      <Camera
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        style={{ height }}
        ratio='16:9'
        type={Camera.Constants.Type.back}>
        <TouchableOpacity onPress={onCapturePressed}>
          <Text>lele</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({});
