import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

import{ LinearGradient} from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <LinearGradient
        colors={['#2F80ED', '#56CCF2']}
        style={styles.headerContainer}
      >
        <Image
          style={styles.avatarContainer}
          source={require('../../assets/corgiLogo.png')}
          // source={require('../../assets/Corgi.png')}
          resizeMode='contain'
        />

        <Text style={styles.titleText}>DAUG</Text>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  
  headerContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  avatarContainer: {
    justifyContent: 'center',
    height: 300,
    width: 300,
  },

  titleText: {
    textAlign: 'center',
    fontSize: 50,
    color: 'white',
  }
});

