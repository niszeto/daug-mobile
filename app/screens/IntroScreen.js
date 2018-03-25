import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { LinearGradient } from 'expo';
import IntroSlider from '../components/IntroSlider';
import IntroStack from '../navigation/IntroStack';

export default class App extends React.Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {

    }

  }

  componentDidMount = async () => {
    this.pingServer();
  }

  pingServer = async () => {
    // Check server status
    // Simple GET request to /api
    try {
      const response = await fetch(`https://daug-app.herokuapp.com/api`, {
        method: 'GET'
      });
      const responseJSON = await response.json();
      
      if (response.status === 200) {
        console.log(responseJSON.message);
        console.log('Server up and running!');
      } else {
        const error = responseJSON.message

        console.log("Server request failed " + error);
      }
    } catch (error) {
      console.log("Server is down " + error);
    }
  }

  render() {

    const { screen } = this.state;
      return (

        <View style={styles.mainContainer}>

          <IntroSlider/>

          <LinearGradient
            style={styles.footerContainer}
            colors={['#5B86E5', '#36D1DC']}
          >

            <Button
              style={styles.buttonContainer}
              title='Login'
              onPress={() => this.props.navigation.navigate('Login')}
              color='white'
            />

            <Button
              style={styles.buttonContainer}
              title='Sign Up'
              onPress={() => this.props.navigation.navigate('Signup')}
              color='white'
            />

          </LinearGradient>

        </View>

      );
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

