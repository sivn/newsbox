/**
 * -----------------------------------------
 *                  Newsbox
 * -----------------------------------------
 * Newsreader for RSS Feeds.
 * Team 04: Kevin Biehl, Vincent Simon
 * -----------------------------------------
 * The content you see is work in progress!
 */

import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as rssParser from 'react-native-rss-parser';
import {FAB} from 'react-native-paper';

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';

const Tab = createBottomTabNavigator();

let favs = new Array();
let feeds = new Array();

let dateOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

// Demo Data
feeds.push({
  title: 'THM',
  url: 'https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss',
});
feeds.push({
  title: 'Heise',
  url: 'https://www.heise.de/security/rss/news.rdf',
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconName;

            if (route.name === 'Feed') {
              iconName = 'rss-square';
            } else if (route.name === 'Favorites') {
              iconName = 'heart';
            } else if (route.name === 'Settings') {
              iconName = 'cog';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#80ba24',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Favorites"
          component={FavScreen}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

function FeedScreen() {
  const [rssFeedData, setRssFeedData] = useState('');

  fetch(
    'https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss',
  )
    .then(response => response.text())
    .then(responseData => rssParser.parse(responseData))
    .then(rss => {
      console.log('RSS FEED!');
      setRssFeedData(rss);
    });

  const item = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        Linking.openURL(item.links[0].url);
        console.log(item.links[0].url);
      }}>
      <View>
        <Text style={styles.listItem}>
          <Text style={styles.headline}>{item.title}</Text>
          {'\n'}
          {item.imageUrl}
          {'\n'}
          {item.description.replace(/<\/?[^>]+(>|$)/g, '')}
          {'\n'}
          {'\n'}
          <Text style={styles.authors}>
            {new Date(item.published).toLocaleDateString('en-DE', dateOptions)}
            {'  -  '}
            {item.authors[0].name}
            {'\n'}
            {'\n'}
          </Text>
          <View style={styles.FavButtonContainer}>
            <FAB
              style={styles.FavButton}
              icon="heart"
              small
              onPress={() => {
                favs.push(item);
                console.log(item.title, 'favs added!');
                console.log(favs.length);
              }}
            />
          </View>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.id}
        data={rssFeedData.items}
        showsVerticalScrollIndicator={false}
        style={styles.feed}
        renderItem={item}
      />
    </View>
  );
}

function FavScreen() {
  const item = ({item}) => (
    <TouchableWithoutFeedback
      onPress={() => console.log('Selected Item :', item.title)}>
      <View>
        <Text style={styles.listItem}>
          <Text style={styles.headline}>{item.title}</Text>
          {'\n'}
          {item.imageUrl}
          {'\n'}
          {item.description.replace(/<\/?[^>]+(>|$)/g, '')}
          {'\n'}
          {'\n'}
          <Text style={styles.authors}>
            {new Date(item.published).toLocaleDateString('en-DE', dateOptions)}
            {'  -  '}
            {item.authors[0].name}
            {'\n'}
            {'\n'}
          </Text>
          <View style={styles.FavButtonContainer}>
            <FAB
              style={styles.DelButton}
              icon="delete"
              small
              onPress={() => {
                favs.pop(item);
                console.log(item.title, 'favs removed!');
                console.log(favs.length);
              }}
            />
          </View>
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.title}
        data={favs}
        showsVerticalScrollIndicator={false}
        style={styles.feed}
        renderItem={item}
      />
    </View>
  );
}

function SettingsScreen() {
  const [setText] = React.useState('');

  const item = ({item}) => (
    <View>
      <Text style={styles.listItem}>
        <Text style={styles.headline}>{item.title}</Text>
        {'\n'}
        {'\n'}
        {item.url}
        {'\n'}
        {'\n'}
        {'\n'}
        <View style={styles.DelButtonContainer}>
          <FAB
            style={styles.DelButton}
            icon="delete"
            small
            onPress={() => {
              feeds.pop(item);
              console.log(item.title, 'feed removed!');
              console.log(feeds.length);
            }}
          />
        </View>
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.url}
        data={feeds}
        showsVerticalScrollIndicator={false}
        style={styles.feed}
        renderItem={item}
      />
      <View>
        <FAB
          style={styles.AddButton}
          icon="plus"
          small
          onPress={() => {
            text => setText(text);
            feed.pop(item);
            console.log(item.title, 'feed added!');
            console.log(favs.length);
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  authors: {
    fontStyle: 'italic',
    fontSize: 13,
  },
  listItem: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'white',
    padding: 25,
    borderRadius: 15,
    marginBottom: 5,
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  AddButton: {
    backgroundColor: '#03b1fc',
    marginLeft: 100,
    marginRight: 100,
    margin: 50,
  },
  FavButton: {
    backgroundColor: '#80ba24',
    left: 295,
  },
  FavButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 5,
  },
  DelButton: {
    backgroundColor: '#ff365e',
    left: 295,
  },
  DelButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    margin: 5,
  },
});
