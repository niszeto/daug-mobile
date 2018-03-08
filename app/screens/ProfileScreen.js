import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

import IntroScreen from './IntroScreen';

export default class App extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

  }

  buttonPressed = () => {
    this.props.navigation.navigate('Intro');
  }


  render() {
    return (
      <View style={styles.mainContainer}>

        <Image
          style={styles.headerImage}
          source={{ uri: 'https://static.pexels.com/photos/265393/pexels-photo-265393.jpeg' }}
          resizeMode='cover'
        />

        <View style={styles.contentContainer}>

          <View style={styles.profileDetailsMainContainer}>

            <View style={styles.profileDetailsSubContainer}>
              <Image
                style={styles.avatarContainer}
                source={{ uri: 'https://static.pexels.com/photos/458825/pexels-photo-458825.jpeg' }}
                resizeMode='cover'
              />

              <View style={styles.textAndButtonContainer}>

                <View style={styles.textContainer}>

                  <View style={styles.textSubContainer}>
                    <Text style={styles.textStyle}>1</Text>
                    <Text>Posts</Text>
                  </View>

                  <View style={styles.textSubContainer}>
                    <Text style={styles.textStyle}>80619960</Text>
                    <Text>Followers</Text>
                  </View>
                  <View style={styles.textSubContainer}>
                    <Text style={styles.textStyle}>0</Text>
                    <Text>Following</Text>
                  </View>

                </View>

                <View style={styles.editProfileButtonContainer}>
                  <Button
                    text='edit profile'
                    transparent={true}
                  />
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
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  headerImage: {
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
    borderRadius: 30,
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
