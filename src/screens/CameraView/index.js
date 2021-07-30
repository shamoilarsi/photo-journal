import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WEATHER_API } from '@env';

import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';

import FloatingButton from '../../components/FloatingButton';
import { getFormattedDate } from '../../utilities/common';

const { width } = Dimensions.get('screen');

export default function CameraView({ navigation }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus === 'granted');
    })();
  }, []);

  const onCapturePressed = async () => {
    setLoading(true);
    const date = getFormattedDate();
    const image = `${FileSystem.documentDirectory}${date}.jpg`;
    if (!isCameraReady) throw new Error('Camera is not Ready');

    const photo = await cameraRef.current.takePictureAsync();
    await FileSystem.moveAsync({
      from: photo.uri,
      to: image,
    });

    const { city, country_name: country, latitude, longitude } = await fetch(`https://geolocation-db.com/json/`)
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    const {
      main: { temp },
    } = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    const data = {
      image,
      city,
      country,
      temp,
      timestamp: Date.now(),
    };

    await AsyncStorage.mergeItem(date, JSON.stringify(data));
    setLoading(false);
    navigation.navigate('DayView', { ...data, date, editable: true });
  };

  if (hasCameraPermission === null) return null;
  if (hasCameraPermission === false) return <Text>No access to camera</Text>;

  return (
    <View>
      <Camera
        ref={(ref) => {
          cameraRef.current = ref;
        }}
        style={{ height: '100%' }}
        ratio='16:9'
        onCameraReady={() => setIsCameraReady(true)}
        type={Camera.Constants.Type.back}>
        <FloatingButton
          icon='camera'
          loading={loading}
          onPress={onCapturePressed}
          style={{ left: width / 2 - 45 / 2, bottom: 23, position: 'absolute' }}
        />
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({});
