/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';

import * as rssParser from 'react-native-rss-parser';

import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList
} from 'react-native';

const App: () => Node = () => {
  const [rssFeedData, setRssFeedData] = useState('');
  fetch('http://www.nasa.gov/rss/dyn/breaking_news.rss')
          .then((response) => response.text())
          .then((responseData) => rssParser.parse(responseData))
          .then((rss) => {
              console.log(rss);
              setRssFeedData(rss);
    });

    const item = ( {item} ) => (
      <Text style = {styles.item}>
        {item.title}
        {"\n"}
        {item.description}
        {"\n"}
      </Text>
    )    

  return (
    <SafeAreaView>
      <StatusBar/>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item => item.id)}
          data = { rssFeedData.items }
          renderItem={ item }
          style={ styles.feed }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    margin: 5,
    padding: 10,
    paddingBottom: 1,
    fontSize: 14,
    backgroundColor: '#fff',
  },
  feed: {
    color: 'black',
  },
});

export default App;
