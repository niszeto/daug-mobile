import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IntroScreen from './IntroScreen';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      screen: null
    }
  }

  buttonPressed = () => {
    const { name, email, password } = this.state;

    Alert.alert(
      'Success',
      `Name: ${name} Email: ${email} Password: ${password}`,
      [
        { text: 'OK', onPress: () => console.log('OK pressed') }
      ],
      { cancelable: false }
    )

    this.setState({screen: 'homescreen'});
  }

  isCredentialsEmpty() {
    const { name, email, password } = this.state;

    return name.length > 0 && email.length > 0 && password.length > 0;
  }


  render() {
    const { name, email, password, screen } = this.state;

    if(screen === 'homescreen'){
      return <IntroScreen/>
    }

    return (

      <LinearGradient
        colors={['#2F80ED', '#56CCF2']}
        style={styles.mainContainer}
      >

        <View style={styles.textInputContainer}>

          <Input
            leftIcon={
              <MaterialCommunityIcons
                name='account-outline'
                color='white'
                size={25}
              />
            }
            value={name}
            onChangeText={name => this.setState({ name })}
            placeholder="Enter your full name here."
            placeholderTextColor="white"
            autoCapitalize="none"
            keyboardType="default"
            returnKeyType="next"
            displayError={false}
            errorMessage="Please enter a valid name"
            errorStyle={{ color: 'white' }}
            containerStyle={styles.textInput}
            inputStyle={{ color: 'white' }}
          />

          <Input
            leftIcon={
              <MaterialCommunityIcons
                name='email-outline'
                color='white'
                size={25}
              />
            }
            value={email}
            onChangeText={email => this.setState({ email })}
            placeholder="Enter your email here."
            placeholderTextColor="white"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
            displayError={false}
            errorMessage="Please enter a valid email address"
            errorStyle={{ color: 'white' }}
            containerStyle={styles.textInput}
            inputStyle={{ color: 'white' }}
          />

          <Input
            leftIcon={
              <MaterialCommunityIcons
                name='lock-outline'
                color='white'
                size={25}
              />
            }
            value={password}
            onChangeText={password => this.setState({ password })}
            placeholder="Enter your password here."
            secureTextEntry={true}
            placeholderTextColor="white"
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="go"
            displayError={false}
            errorMessage="Please enter a valid password"
            errorStyle={{ color: 'white' }}
            containerStyle={styles.textInput}
            inputStyle={{ color: 'white' }}
          />

        </View>

        <Button
          style={styles.buttonContainer}
          text='Sign Up'
          buttonStyle={[styles.buttonStyle, !this.isCredentialsEmpty() && { backgroundColor: 'grey' }]} //look at this later
          disabled={!this.isCredentialsEmpty()}
          onPress={this.buttonPressed}
          textStyle={styles.buttonTextStyle}
        />

      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  textInputContainer: {
    justifyContent: 'flex-end',
  },

  textInput: {
    justifyContent: 'center',
    marginBottom: 10,
    height: 50,
    width: 300,
  },

  buttonContainer: {
    marginTop: 50,
    height: 50,
    width: 300,
  },

  buttonTextStyle: {
    fontSize: 25,
  }

});
