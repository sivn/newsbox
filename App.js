/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useState } from 'react';
 import * as rssParser from 'react-native-rss-parser';
 import Icon from 'react-native-ico';
 import { NavigationContainer } from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

 import {
   SafeAreaView,
   StatusBar,
   StyleSheet,
   Pressable,
   Text,
   View,
   FlatList
 } from 'react-native';
 
 var iconHeight = 26;
 var iconWidth = 26;

 const Tab = createBottomTabNavigator();

 export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

 function HomeScreen() {

  const feeds = ['https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss','https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss']

  feeds.forEach(function(x) {
    console.log(feeds.length);
  });

  const [rssFeedData, setRssFeedData] = useState('');
  console.log("TEST1");
   fetch('https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss')
           .then((response) => response.text())
           .then((responseData) => rssParser.parse(responseData))
           .then((rss) => {
               console.log(rss);
               setRssFeedData(rss);
     });

  const item = ( {item} ) => (
    <Text style = {styles.listItem}>
      {item.title}
      {"\n"}
      {item.date}
      {"\n"}
    </Text>
  )

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item => item.id)}
        data = { rssFeedData.items }
        renderItem={ item }
        style={ styles.feed }
      />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
  </View>
  );
}
 
 const styles = StyleSheet.create({
   container: {
     width: "100%",
     padding: 16,
     paddingTop: 5,
   },
   listItem: {
     padding: 20,
     marginBottom: 5,
     marginTop: 5,
     borderRadius: 2,
   },
 
   container_nav: {
     flex: 1,
     backgroundColor: '#3962FF',
     alignItems: 'center',
     justifyContent: 'center',
   },
 
   NavContainer: {
     position: 'absolute',
     alignItems: 'center',
     bottom: 20,
   },
 
   NavBar: {
     flexDirection: 'row',
     backgroundColor: '#eee',
     width: '90%',
     justifyContent: 'space-evenly',
     borderRadius: 50,
   },
   Iconbehave: {
     padding: 14,
   }
 });