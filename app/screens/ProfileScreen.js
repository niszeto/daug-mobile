import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import IntroScreen from './IntroScreen';
import { SOCIAL_FEED_MOCK_DATA } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class App extends React.Component {

  static navigationOptions = ({navigation}) => {
    return {
      headerVisible: navigation.state.params ? navigation.state.params.isHeaderShowing : false,
      title: 'Profile',
      headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, },
      headerTintColor: 'white',
      headerTitleStyle: { color: 'white', fontSize: 20 }
    }
  };

  constructor(props) {
    super(props);

    const user = props.navigation.state.params && props.navigation.state.params.user;
    const isHeaderShowing = props.navigation.state.params && props.navigation.state.params.isHeaderShowing;

    this.state = {
      user: user || SOCIAL_FEED_MOCK_DATA[0].user,
      isHeaderShowing: isHeaderShowing || false
    }

  }

  render() {
    const {navigate} = this.props.navigation;
    const {user, isHeaderShowing} = this.state;

    return (
      <ScrollView>
        <View style={styles.mainContainer}>

          <View style={styles.headerImageContainer}>
            <Image
              style={{
                height: 175,
                width: '100%'
              }}
              source={{uri: user.banner}}
              resizeMode='cover'
            />
          </View>

          <View style={styles.contentContainer}>

            <View style={styles.profileDetailsMainContainer}>

              <View style={styles.profileDetailsSubContainer}>
                <View style={styles.avatarContainer}>
                  <Image
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 50,
                    }}
                    source={{ uri: user.image }}
                    resizeMode='cover'
                  />
                </View>

                <View style={styles.textAndButtonContainer}>

                  <View style={styles.textContainer}>

                    <View style={styles.textSubContainer}>
                      <Text style={styles.textStyle}>{user.posts ? user.posts.length : '0'}</Text>
                      <Text>Posts</Text>
                    </View>

                    <View style={styles.textSubContainer}>
                      <Text style={styles.textStyle}>{user.followers}</Text>
                      <Text>Followers</Text>
                    </View>
                    <View style={styles.textSubContainer}>
                      <Text style={styles.textStyle}>{user.following}</Text>
                      <Text>Following</Text>
                    </View>

                  </View>

                  <View style={styles.editProfileButtonContainer}>
                    {
                      !isHeaderShowing ?
                        <Button
                          text='Edit Profile'
                          onPress={() => navigate('Edit')}
                        /> :
                        
                        <Button
                          text='Follow'
                          onPress={() => console.log('Followed')}
                        />
                    }
                  </View>

                </View>

              </View>

            </View>

            <View style={styles.descriptionContainer}>
              <Text>Clucky</Text>
              <Text>World's thickest and juiciest chicken around!</Text>
            </View>

          </View>


          <View style={styles.footerContainer}>
            <Button
              style={styles.logoutButtonContainer}
              text='Logout'
              onPress={() => this.props.navigation.navigate('Intro')}
              textStyle={styles.buttonTextStyle}
            />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  headerImageContainer: {
    flex: 2,
  },

  contentContainer: {
    flex: 2,
    backgroundColor: '#F9F9F9',
  },

  profileDetailsMainContainer: {
    flex: 1,
  },

  profileDetailsSubContainer: {
    flex: 1,
    flexDirection: 'row',
  },

  avatarContainer: {
    flex: 1,
    marginLeft: 20,
  },

  textAndButtonContainer: {
    flex: 3,
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  textSubContainer: {
    justifyContent: 'center'
  },

  editProfileButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  textStyle: {
    textAlign: 'center',
  },

  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
  },

  footerContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoutButtonContainer: {
    height: 50,
    width: 300,
  },

  buttonTextStyle: {
    fontSize: 25,
  }

});
