import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { LinearGradient } from 'expo';

import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import IntroSlider from '../components/IntroSlider';
import SocialFeedScreen from './SocialFeedScreen';
import ProfileScreen from './ProfileScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      screen: 'login'
      // screen: 'signup'
      // screen: 'socialfeed'
      // screen: 'profile'

    }

  }

  changeState(state) {
    this.setState({ screen: state })
    console.log(this.state);
  }

  render() {

    const { screen } = this.state;
    // const { profile } = this.props;

    if (screen === 'login') {
      return <LoginScreen />
    } else if (screen === 'signup') {
      return <SignupScreen />
    } else if(screen === 'socialfeed'){
      return <SocialFeedScreen/>
    }else if(screen === 'profile'){
      return <ProfileScreen/>
    }else {
      return (

        <View style={styles.mainContainer}>

          <IntroSlider />

          <LinearGradient
            style={styles.footerContainer}
            colors={['#5B86E5', '#36D1DC']}
          >

            <Button
              style={styles.buttonContainer}
              title='Login'
              onPress={this.changeState.bind(this, 'login')}
              color='white'
            />

            <Button
              style={styles.buttonContainer}
              title='Sign Up'
              onPress={this.changeState.bind(this, 'signup')}
              color='white'
            />

          </LinearGradient>

        </View>

      );
    }
  }
}

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
  },

  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#2F80ED'
  },

  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }

});

