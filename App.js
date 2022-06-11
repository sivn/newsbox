/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
 import React, { useState } from 'react';
 import * as rssParser from 'react-native-rss-parser';
 import Icon from 'react-native-vector-icons/FontAwesome';
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
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'ios-list';
            } else if (route.name === 'Settings') {
              iconName = 'ios-list';
            }
            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#80ba24',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

 function HomeScreen() {

  const feeds = ['https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss','https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss']

  const [rssFeedData, setRssFeedData] = useState(''); 
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
      {item.imageUrl}
      {"\n"}
      {item.published}
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
     padding: 5,
     paddingTop: 5,
   },
   listItem: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    padding: 25,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
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