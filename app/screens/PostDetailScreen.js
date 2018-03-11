import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { Ionicons } from '@expo/vector-icons';

export default class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      screen: null
    };
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.profileInformationContainer}>
          <TouchableOpacity>
            <View style={styles.headerContainer}>
              <Image
                source={{ uri: 'https://vignette.wikia.nocookie.net/en.futurama/images/1/13/Planet_express.png/revision/latest?cb=20130716185556' }}
                style={{
                  borderRadius: 25,
                  width: 50,
                  height: 50,
                  margin: 10,
                }}
              />
              <Text>Iggi</Text>
            </View>
          </TouchableOpacity>

          <Image
            source={{ uri: 'https://static.pexels.com/photos/164186/pexels-photo-164186.jpeg' }}
            style={{
              width: '100%',
              height: '50%',
            }}
            cover={true}
          />
          <Text style={styles.caption}>Planet Express, Inc. is the delivery compаny started by Professor Hubert J. Farnsworth to help fund his research and employs a range of individuals to help deliver packages to clients. </Text>

          <View style={styles.timeAndButtonContainer}>
            <Text style={styles.date}>3 hrs ago</Text>
            <View style={styles.buttonContainer}>

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

        <View style={styles.commentContainer}>
          <Text>5 comments</Text>

          <View style={styles.headerContainer}>
            <Image
              source={{ uri: 'https://pbs.twimg.com/profile_images/741947087978434560/6NpW135K_400x400.jpg' }}
              style={{
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />
            <View style={styles.nameAndCommentContainer}>
              <Text>Philip J. Fry</Text>
              <Text>Hey, what smells like blue?</Text>
            </View>
            
          </View>


                    <View style={styles.headerContainer}>
            <Image
              source={{ uri: 'https://res.cloudinary.com/teepublic/image/private/s--vxtKJItA--/t_Preview/b_rgb:191919,c_limit,f_jpg,h_630,q_90,w_630/v1478190929/production/designs/769348_1.jpg' }}
              style={{
                borderRadius: 25,
                width: 50,
                height: 50,
                margin: 10,
              }}
            />
            <View style={styles.nameAndCommentContainer}>
              <Text>Rick Sanchez</Text>
              <Text>Wubbalubbadubdub!</Text>
            </View>
            
          </View>

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    marginTop: 20,
  },

  profileInformationContainer:{
    flex: 3,
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  commentContainer: {
    flex: 2,
    marginTop: 30,
  },

});
