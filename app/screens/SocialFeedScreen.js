import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';

import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {

  //render one post
  renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>

      <TouchableOpacity
        onPress={({item}) => this.renderProfile({item})}
      >
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: item.image }}
            style={{
              //always set width and height when getting a picture online
              borderRadius: 25,
              width: 50,
              height: 50,
            }}
          />
          <View style={styles.nameContainer}>
            <Text>{item.name}</Text>
            <Text>{item.location}</Text>
          </View>

        </View>
      </TouchableOpacity>

        <Image
          source={{ uri: item.post['image'] }}
          style={{
            width: '100%',
            height: 400,
          }}
        />

        <View style={styles.captionContainer}>

          <View style={styles.buttonContainer}>
            <Ionicons
              name="ios-heart-outline"
              size={30}
              color='#085947'
              style={{ paddingRight: 8 }}
            />

            <Ionicons
              name="ios-chatbubbles-outline"
              size={30}
              color='#085947'
              style={{ paddingRight: 8 }}
            />

            <Ionicons
              name="ios-paper-plane-outline"
              size={30}
              color='#085947'
            />
          </View>

          <View>
            <Text>{item.post['caption']}</Text>
            <Text>{item.post['date']}</Text>
          </View>

        </View>


      </View>
    );
  }

  render() {
    return (
      <ScrollView style={styles.mainContainer}>

        <FlatList
          data={SOCIAL_FEED_MOCK_DATA}
          style={styles.mainContainer}
          renderItem={({ item, seperator }) => this.renderItem({ item })}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flexGrow: 1,
  },

  itemContainer: {

  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  nameContainer: {

  },

  dogImageStyle: {
    height: 300,
    width: 300,
  },

  captionContainer: {

  },

  buttonContainer: {
    flexDirection: 'row',
  }

});
