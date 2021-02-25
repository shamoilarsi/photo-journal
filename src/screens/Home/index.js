/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Item from '../../components/Item';
import { getFormattedDate } from '../../utilities/common';

export default function Home({ navigation }) {
  const [content, setContent] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  async function onRefresh() {
    setRefreshing(true);
    const keys = await AsyncStorage.getAllKeys();
    let data = await AsyncStorage.multiGet(keys);

    data = data.map((value) => [value[0], JSON.parse(value[1])]);
    data = data.sort((a, b) => new Date(a[1].timestamp) < new Date(b[1].timestamp));
    setContent(data);
    setRefreshing(false);
  }
  useEffect(() => {
    onRefresh();
    return () => {};
  }, []);

  const renderItem = ({ item }) => {
    const [key, data] = item;
    const editable = getFormattedDate() === key;
    return (
      <Item
        data={{ ...data, editable }}
        onPress={() => navigation.navigate('DayView', { ...data, date: key, editable })}
      />
    );
  };

  const EmptyComponent = (
    <View>
      <Text style={{ textAlign: 'center' }}>Press on + to add your first entry</Text>
    </View>
  );
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={content}
        renderItem={renderItem}
        keyExtractor={(item) => item[0]}
        onRefresh={onRefresh}
        refreshing={refreshing}
        ListEmptyComponent={EmptyComponent}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
