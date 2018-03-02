import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { profile } = this.props;

    return (
      <View style={styles.mainContainer}>

        {/* <View style={styles.headerContainer}> */}

        <Image
          style={styles.headerImage}
          source={{ url: 'https://static.pexels.com/photos/265393/pexels-photo-265393.jpeg' }}
          resizeMode='cover'
        />
        {/* </View> */}


        <View style={styles.contentContainer}>

          <View style={styles.profileDetailsMainContainer}>

            <View style={styles.profileDetailsSubContainer}>
              {/* <View style={styles.avatarContainer}> */}
              <Image
                style={styles.avatarContainer}
                source={{ url: 'https://static.pexels.com/photos/458825/pexels-photo-458825.jpeg' }}
              />
              {/* </View> */}

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
            onPress={this.buttonPressed}
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
    // backgroundColor: 'white',
  },

  headerImage: {
    flex: 2,
    // backgroundColor: 'yellow',
  },

  contentContainer: {
    flex: 2,
    backgroundColor: '#F9F9F9',
    // backgroundColor: 'blue',
  },

  profileDetailsMainContainer: {
    flex: 1,
    // backgroundColor: 'black'
  },

  profileDetailsSubContainer: {
    flex: 1,
    flexDirection: 'row',
    // backgroundColor: 'green'
  },

  avatarContainer: {
    flex: 1,
    borderRadius: 30,
    marginLeft: 20,
    // backgroundColor: 'pink'
  },

  textAndButtonContainer: {
    flex: 3,
    // backgroundColor: 'white',
  },

  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // backgroundColor: 'purple',
  },

  textSubContainer: {
    justifyContent: 'center'
  },

  editProfileButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    // backgroundColor: 'orange',
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
    // backgroundColor: 'red',
  },

  logoutButtonContainer: {
    height: 50,
    width: 300,
  },

  buttonTextStyle: {
    fontSize: 25,
  }

});
