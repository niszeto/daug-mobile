import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import { Button } from 'react-native-elements';

export default class App extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    const { profile } = this.props;

    return (
      <View style={styles.mainContainer}>

        <View style={styles.headerContainer}>


        </View>


        <View style={styles.contentContainer}>

          <View style={styles.profileDetailsMainContainer}>

            <View style={styles.profileDetailsSubContainer}>
              <View style={styles.avatarContainer}>

              </View>

              <View style={styles.textContainer}>

                <View style={styles.textSubContainer}>
                  <Text>
                    Hello
                  </Text>
                  <Text>
                    There
                  </Text>
                  <Text>
                    Man
                  </Text>
                </View>

                <View style={styles.editProfileButtonContainer}>
                  <Button
                    text='edit profile'
                  />
                </View>

              </View>

            </View>

          </View>

          <View style={styles.descriptionContainer}>

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
    backgroundColor: 'white',
  },

  headerContainer: {
    flex: 2,
    backgroundColor: 'yellow',
  },

  contentContainer: {
    flex: 2,
    backgroundColor: 'blue',

  },

  profileDetailsMainContainer: {
    flex: 1,
    backgroundColor: 'black'
  },

  avatarContainer: {
    flex: 1,
    borderRadius: 70,
    backgroundColor: 'pink'
  },

  textContainer: {
    flex: 3,
    backgroundColor: 'white',
  },

  textSubContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'purple',
  },

  editProfileButtonContainer: {
    flex: 1,
    backgroundColor: 'orange',
  },

  textStyle:{
    
  },

  profileDetailsSubContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'green'
  },

  descriptionContainer: {
    flex: 1,
  },

  footerContainer: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },

  logoutButtonContainer: {
    height: 50,
    width: 300,
  },

  buttonTextStyle: {
    fontSize: 25,
  }

});
