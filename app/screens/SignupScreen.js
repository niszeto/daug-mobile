import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

import { LinearGradient } from 'expo';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
    }
  }

  buttonPressed(name, email, password) {
    Alert.alert(
      'Success',
      `Name: ${name} Email: ${email} Password: ${password}`,
      [
        { text: 'OK', onPress: () => console.log('OK pressed') }
      ],
      { cancelable: false }
    )
  }

  isCredentialsEmpty() {
    const { name, email, password } = this.state;

    return name.length > 0 && email.length > 0 && password.length > 0;
  }


  render() {
    return (

      <LinearGradient
        colors={['#2F80ED', '#56CCF2']}
        style={styles.mainContainer}
      >

        <View style={styles.textInputContainer}>

          <TextInput
            style={styles.textInput}
            placeholderTextColor={'black'}
            placeholder={'Name'}
            value={this.state.name}
            onChangeText={(name) => this.setState({ name })}
          />

          <TextInput
            style={styles.textInput}
            placeholderTextColor={'black'}
            placeholder={'Email'}
            value={this.state.email}
            onChangeText={(email) => this.setState({ email })}
          />

          <TextInput
            style={styles.textInput}
            placeholderTextColor={'black'}
            placeholder={'Password'}
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            secureTextEntry={true}
          />

        </View>

        <View style={[styles.buttonContainer, !this.isCredentialsEmpty() && { backgroundColor: 'grey' }]}>
          <Button
            style={styles.button}
            disabled={!this.isCredentialsEmpty()}
            title='Sign Up'
            color='white'
            onPress={() => this.buttonPressed(this.state.email, this.state.password)}
          />
        </View>

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
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    marginBottom: 10,
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    width: 300,
  },

  buttonContainer: {
    backgroundColor: 'blue',
    height: 50,
    width: 300,
  },

  button: {
    justifyContent: 'center',
    textAlign: 'center',
    height: 50,
    width: 300,
  }

});
