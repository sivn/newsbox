import React, {Component, useState} from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import * as rssParser from 'react-native-rss-parser';

export default class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {
    fetch(
      'https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss',
    )
      .then(response => response.text())
      .then(responseData => rssParser.parse(responseData))
      .then(rss => {
        console.log('RENDERED FEED!');
        this.setState({content: rss});
      });
  }

  render() {
    const item = ({item}) => (
      <View>
        <Text style={styles.listItem}>
          <Text style={styles.headline}>{item.title}</Text>
          {'\n'}
          {item.imageUrl}
          {'\n'}
          {item.description.replace(/<\/?[^>]+(>|$)/g, '')}
          {'\n'}
          {'\n'}
          {'\n'}
          <Text style={styles.authors}>
            {new Date(item.published).toLocaleDateString('en-DE', dateOptions)}
            {'  -  '}
            {item.authors[0].name}
          </Text>
          <View style={styles.FavButton}>
            <Button
              title="<3"
              onPress={() => Alert.alert('Cannot press this one')}
              style={styles.FavButton}
            />
          </View>
        </Text>
      </View>
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
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 5,
    paddingTop: 5,
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
    marginBottom: 10,
    margin: 5,
    shadowColor: '#000',
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
  },
  FavButton: {
    height: 10,
    width: 10,
  },
});

/*
 function FeedScreen() {
  
  const [rssFeedData, setRssFeedData] = useState(''); 
  //feeds.forEach(function(x) {
  //    console.log(x);
  //});

  fetch('https://www.thm.de/wi/studium/sie-studieren/aktuelles?format=feed&type=rss')
          .then((response) => response.text())
          .then((responseData) => rssParser.parse(responseData))
          .then((rss) => {
              console.log('RENDERED FEED!');
              setRssFeedData(rss);
  });

  const doubleTapRef = useRef()

  const item = ( {item} ) => (
    <TapGestureHandler
      waitFor={doubleTapRef}
        onActivated={() => {
          console.log('SINGLE TAP')
        }}
    >
      <TapGestureHandler
        ref={doubleTapRef}
        numberOfTaps={2}
        onActivated={() => {
          console.log('DOUBLE TAP')
        }}
      >
        <View>
          <Text style = {styles.listItem}>
          <Text style = {styles.headline}>{item.title}</Text>
            {"\n"}
            {item.imageUrl}
            {"\n"}
            {item.description.replace(/<\/?[^>]+(>|$)/g, "")}
            {"\n"}{"\n"}{"\n"}
            <Text style = {styles.authors}>{new Date(item.published).toLocaleDateString('en-DE', dateOptions)}{"  -  "}{item.authors[0].name}</Text>
            <View style = {styles.FavButton}>
              <Button 
                title="<3"
                onPress={() => Alert.alert('Cannot press this one')}
                style = {styles.FavButton}
              />
            </View>
          </Text>
        </View>
      </TapGestureHandler>
    </TapGestureHandler>
  )

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item => item.id)}
        data = { rssFeedData.items }
        showsVerticalScrollIndicator = {false}
        style = { styles.feed } 
        renderItem = {item}
      />
    </View>
  );
}
*/
