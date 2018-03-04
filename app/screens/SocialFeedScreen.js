import React from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';

import { Ionicons } from '@expo/vector-icons';

import ProfileScreen from './ProfileScreen';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      screen: null
    };
  }

  goToProfile = () => {
    this.setState({screen: 'profile'})
  }

  //render one post
  renderItem = ({ item }) => {
    return (
      <View style={styles.itemContainer}>

        <TouchableOpacity
        // onPress={({ item }) => this.renderProfile({ item })}
        onPress={this.goToProfile}
        >
          <View style={styles.headerContainer}>
            <Image
              source={{ uri: item.image }}
              style={{
                //always set width and height when getting a picture online
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />

            <View style={styles.nameAndLocationContainer}>
              <Text>{item.name}</Text>
              <Text>{item.location}</Text>
            </View>
          </View>
        </TouchableOpacity>

        <Image
          source={{ uri: item.post['image'] }}
          style={{
            width: '100%',
            height: 300,
          }}
          cover={true}
        />
        <Text style={styles.caption}>{item.post['caption']}</Text>

        <View style={styles.timeAndButtonContainer}>
          <Text style={styles.date}>{item.post['date']}</Text>
          <View style={styles.buttonContainer}>
            {/* <Ionicons
              style={styles.icon}
              name="ios-paper-plane-outline"
              size={30}
              color='#085947'
            /> */}

            <Ionicons
              style={styles.icon}
              name="ios-chatbubbles-outline"
              size={30}
              color='#085947'
            />

            <Text style={styles.iconNumbers}>96</Text>

            <Ionicons
              style={styles.icon}
              name="ios-heart-outline"
              size={30}
              color='#085947'
            />
            <Text style={styles.iconNumbers}>91939</Text>


          </View>
        </View>

      </View>
    );
  }

  render() {

    const{screen} = this.state;

    if(screen === 'profile'){
      return <ProfileScreen/>
    }
    
    return (
      <ScrollView style={styles.mainContainer}>

        <FlatList
          data={SOCIAL_FEED_MOCK_DATA}
          style={styles.mainContainer}
          renderItem={({ item, seperator }) => this.renderItem({ item })}
          keyExtractor={(item, index) => index}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flexGrow: 1,
    marginTop: 20,
  },

  itemContainer: {

  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  nameAndLocationContainer: {
    padding: 10,
  },

  timeAndButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
  },

  icon: {
    paddingRight: 10,
    paddingLeft: 10,
  },

  iconNumbers: {
    padding: 5,
  },

  caption: {
    padding: 10,
    backgroundColor: '#F9F9F9',
  },

  date: {
    padding: 20,
  },

});
