import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { LinearGradient } from 'expo';
import { Button, Input } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { onSignIn } from '../utilities/helpers';

export default class App extends React.Component {

  static navigationOptions = {
    title: 'Login',
    headerStyle: { backgroundColor: '#2F80ED', borderBottomWidth: 0, },
    headerTintColor: 'white',
    headerTitleStyle: { color: 'white', fontSize: 20 }
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  loginButtonPressed = async () => {
    // this.setState({ isLoading: true })

    const { email, password } = this.state
    const { navigate } = this.props.navigation

    var details = {
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
      let response = await fetch(`https://daug-app.herokuapp.com/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      });

      let responseJSON = null

      if (response.status === 201) {
        responseJSON = await response.json();

        console.log(responseJSON);

        // this.setState({ isLoading: false })
        Alert.alert(
          'Logged in!',
          'You have successfully Logged in!',
          [
            { text: "Continue", onPress: () => onSignIn(responseJSON.user.id).then( () => navigate("Home"))}
          ],
          { cancelable: false }
        )
      } else {
        responseJSON = await response.json();
        const error = responseJSON.message

        console.log(responseJSON)

        // this.setState({ isLoading: false, errors: responseJSON.errors })
        this.setState({ errors: responseJSON.errors })

        Alert.alert('Login failed!', `Unable to login.. ${error}!`)
      }
    } catch (error) {
      this.setState({ isLoading: false, response: error })

      console.log(error)

      Alert.alert('Login failed!', 'Unable to Login. Please try again later')
    }
  }

  isCredentialsEmpty() {
    const { email, password } = this.state;

    return email.length > 0 && password.length > 0;
  }

  render() {
    const { email, password } = this.state;

    return (

      <LinearGradient
        colors={['#2F80ED', '#56CCF2']}
        style={styles.mainContainer}
      >

        <View style={styles.textInputContainer}>

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
          text='Login'
          buttonStyle={[styles.buttonStyle, !this.isCredentialsEmpty() && { backgroundColor: 'grey' }]}
          disabled={!this.isCredentialsEmpty()}
          onPress={this.loginButtonPressed}
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
