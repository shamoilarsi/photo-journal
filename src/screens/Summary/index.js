/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from './components/Item';

export default function Summary() {
  const [itemData, setItemData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const getScreenData = (type, data) => {
    let displayData = {};
    if (type === 'record') {
      const { days, total } = data;
      displayData = {
        top: 'Days',
        value: `${days} / ${total}`,
        bottom: `You have recored ${days} days since the first day`,
      };
    } else if (type === 'hottest') {
      const { temp, timestamp } = data;
      displayData = { top: 'Hottest Day', value: `${temp}°`, bottom: new Date(timestamp).toDateString() };
    } else if (type === 'coldest') {
      const { temp, timestamp } = data;
      displayData = { top: 'Coldest Day', value: `${temp}°`, bottom: new Date(timestamp).toDateString() };
    }
    return displayData;
  };

  async function onRefresh() {
    setRefreshing(true);
    const keys = await AsyncStorage.getAllKeys();
    const storage = await AsyncStorage.multiGet(keys);
    if (keys.length === 0) return;

    const allData = {};
    storage.forEach((value) => {
      allData[value[0]] = JSON.parse(value[1]);
    });

    const hot = { timestamp: null, temp: -Infinity };
    const cold = { timestamp: null, temp: Infinity };
    let firstday = Date.now();

    keys.forEach((key) => {
      const data = allData[key];
      if (data.temp > hot.temp) {
        hot.temp = data.temp;
        hot.timestamp = data.timestamp;
      }
      if (data.temp < cold.temp) {
        cold.temp = data.temp;
        cold.timestamp = data.timestamp;
      }
      if (data.timestamp < firstday) firstday = data.timestamp;
    });

    const totalDays = (Date.now() - firstday) / (1000 * 3600 * 24);
    const localList = [];
    localList[0] = getScreenData('record', { total: Math.floor(totalDays + 1), days: keys.length });
    localList[1] = getScreenData('hottest', hot);
    localList[2] = getScreenData('coldest', cold);

    setItemData(localList);
    setRefreshing(false);
  }

  useEffect(() => {
    onRefresh();
    return () => {};
  }, []);

  const renderItem = ({ item: { top, bottom, value } }) => <Item top={top} value={value} bottom={bottom} />;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={itemData}
        renderItem={renderItem}
        keyExtractor={(item) => item.top}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
