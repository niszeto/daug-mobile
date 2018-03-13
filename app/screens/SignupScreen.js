import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import IntroScreen from './IntroScreen';

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Sign up',
    headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white', fontSize: 20 }
  };

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  buttonPressed = () => {
    const { name, email, password } = this.state;

    Alert.alert(
      'Success',
      `Name: ${name} Email: ${email} Password: ${password}`,
      [
        { text: 'OK', 
          onPress: () => {
            this.props.navigation.navigate('Home');
          }
        }
      ],
      { cancelable: false }
    )

  }

  async signupButtonPressed() {
    // this.setState({ isLoading: true })

    const { name, email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
      'name': name,
      'email': email,
      'password': password
    };

    var formBody = [];

    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);

      formBody.push(encodedKey + "=" + encodedValue);
    }

    formBody = formBody.join("&");

    try {
      let response = await fetch(`https://daug-app.herokuapp.com/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON)

        // this.setState({ isLoading: false })
        Alert.alert(
          'Signed Up!',
          'You have successfully signed up!',
          [
            { text: "Continue", onPress: () => navigate("Home") }
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        // this.setState({ isLoading: false, errors: responseJSON.errors })
        this.setState({ errors: responseJSON.errors })

        Alert.alert('Sign up failed!', `Unable to signup.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Sign up failed!', 'Unable to Signup. Please try again later')
    }
  }

  isCredentialsEmpty() {
    const { name, email, password } = this.state;

    return name.length > 0 && email.length > 0 && password.length > 0;
  }


  render() {
    const { name, email, password, screen } = this.state;

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
          onPress={this.signupButtonPressed.bind(this)}
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
